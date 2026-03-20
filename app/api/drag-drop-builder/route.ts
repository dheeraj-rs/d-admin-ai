import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm, File as FormidableFile } from 'formidable';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';

const development = process.env.NODE_ENV !== 'production';
const rootPath = process.cwd();
const dataFolder = 'public/data';
const uploadFolder = 'uploaded';

// Helper to check if path exists
async function exists(path: string): Promise<boolean> {
  try {
    await fs.promises.access(path);
    return true;
  } catch {
    return false;
  }
}

// Helper to convert NextRequest to Node.js IncomingMessage-like object
async function convertToNodeRequest(req: NextRequest): Promise<any> {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const buffer = await req.arrayBuffer();
  const readable = Readable.from(Buffer.from(buffer));

  return Object.assign(readable, {
    headers,
    method: req.method,
    url: req.url,
  });
}

// Upload files handler
async function uploadFiles(req: NextRequest): Promise<string[]> {
  const uploadPath = path.join(rootPath, 'public', uploadFolder);
  const uploadFolderExists = await exists(uploadPath);
  if (!uploadFolderExists) {
    await fs.promises.mkdir(uploadPath, { recursive: true });
  }

  const nodeReq = await convertToNodeRequest(req);
  const form = new IncomingForm({
    uploadDir: uploadPath,
    keepExtensions: true,
    multiples: true,
  });

  return new Promise((resolve, reject) => {
    form.on('fileBegin', (_, file) => {
      const f = file as any;
      if (f.originalFilename) {
        // Create a unique filename to prevent caching
        const timestamp = Date.now();
        const uniqueSuffix = Math.random().toString(36).substring(7);
        const fileName = `${timestamp}-${uniqueSuffix}-${f.originalFilename}`;

        f.filepath = path.join(uploadPath, fileName);
        // Store the filename for later use
        f.newFilename = fileName;
      }
    });

    form.parse(nodeReq, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      const urls: string[] = [];
      Object.values(files).forEach((f) => {
        if (Array.isArray(f)) {
          f.forEach((file) => {
            const fileName = path.basename((file as any).filepath || '');
            if (fileName) urls.push(`/${uploadFolder}/${fileName}`);
          });
        } else if (f) {
          const fileName = path.basename((f as any).filepath || '');
          if (fileName) urls.push(`/${uploadFolder}/${fileName}`);
        }
      });
      resolve(urls);
    });
  });
}

// Get filename from route
const getFileNameFromRoute = (route: string) =>
  route === '/' ? 'default' : route;

// Load data from file
async function loadData(route: string, ext: string): Promise<string> {
  const fileName = getFileNameFromRoute(route);
  const dataPath = path.join(rootPath, dataFolder, `${fileName}.${ext}`);
  const dataExists = await exists(dataPath);

  if (!dataExists) {
    return ext === 'json' ? '{}' : '<div>Not found</div>';
  }

  const content = await fs.promises.readFile(dataPath, 'utf8');
  return content;
}

// Update/save data to file
async function updateData(
  route: string,
  ext: string,
  data: string,
): Promise<void> {
  const fileName = getFileNameFromRoute(route);
  const updatePath = path.join(rootPath, dataFolder);
  const updateFolderExists = await exists(updatePath);

  if (!updateFolderExists) {
    await fs.promises.mkdir(updatePath, { recursive: true });
  }

  await fs.promises.writeFile(
    path.join(updatePath, `${fileName}.${ext}`),
    data,
  );
}

// Handle data GET/POST
async function handleData(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const pathParam = searchParams.get('path') || '/';
  const ext = searchParams.get('ext') || 'html';

  if (req.method === 'GET') {
    const data = await loadData(pathParam, ext);
    return new NextResponse(data, { status: 200 });
  } else if (req.method === 'POST') {
    const contentType = req.headers.get('content-type') || '';
    const isMultiPart = contentType.startsWith('multipart/form-data');

    if (!isMultiPart) {
      const body = await req.text();
      await updateData(pathParam, ext, body);
      return new NextResponse('', { status: 200 });
    } else {
      const urls = await uploadFiles(req);
      return NextResponse.json(urls, { status: 200 });
    }
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

// Get package path for themes
function getPackagePath(): string {
  // In our case, themes are in public/themes
  return path.join(rootPath, 'public');
}

// Handle asset requests
async function handleAsset(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const assetPath = searchParams.get('path');

  if (!assetPath) {
    return NextResponse.json({ error: 'Path required' }, { status: 400 });
  }

  let fullPath;
  if (assetPath.startsWith('/themes')) {
    fullPath = path.join(
      getPackagePath(),
      'builder-elements',
      assetPath.replace('/themes', ''),
    );
  } else {
    fullPath = path.join(getPackagePath(), assetPath);
  }

  const data = await fs.promises.readFile(fullPath);

  return new NextResponse(data, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': data.length.toString(),
    },
  });
}

// Handle theme requests
async function handleTheme(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const themeName = searchParams.get('name');

  if (!themeName) {
    return NextResponse.json({ error: 'Theme name required' }, { status: 400 });
  }

  const folderPath = path.join(getPackagePath(), 'builder-elements', themeName);
  const folderExists = await exists(folderPath);

  if (!folderExists) {
    const debugInfo = {
      attemptedPath: folderPath,
      cwd: process.cwd(),
      publicContents: await fs.promises
        .readdir(path.join(rootPath, 'public'))
        .catch((e) => e.toString()),
    };
    console.log('Theme loading failed:', debugInfo);
    return NextResponse.json(
      { error: 'Theme not found', debug: debugInfo },
      { status: 404 },
    );
  }

  const allFiles = await fs.promises.readdir(folderPath);
  const componentNames = allFiles.filter(
    (c) => c !== 'index.ts' && !c.startsWith('.'),
  );

  const componentsP = componentNames.map(async (c) => {
    const assetPath = path.join(folderPath, c, 'index.html');
    const assetExists = await exists(assetPath);

    if (!assetExists) {
      return null;
    }

    const source = await fs.promises.readFile(assetPath, 'utf-8');
    return { source, folder: c };
  });

  const components = (await Promise.all(componentsP)).filter(Boolean);
  return NextResponse.json(components, { status: 200 });
}

// Main handler
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (type === 'data') {
      return await handleData(req);
    } else if (type === 'asset') {
      return await handleAsset(req);
    } else if (type === 'theme') {
      return await handleTheme(req);
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error: any) {
    console.error('Drag Drop Builder API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // if (!development) {
  //   return NextResponse.json({ error: 'Forbiddan' }, { status: 403 });
  // }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (type === 'data') {
    return handleData(req);
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}

// Disable body parser for file uploads
