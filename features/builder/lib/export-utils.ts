import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Page } from '../store/projects-store';

const extractUploadedImageUrls = (htmlContent: string): string[] => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  const urls: string[] = [];
  let match;

  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const url = match[1];
    if (url.includes('/uploaded/')) {
      urls.push(url);
    }
  }

  return Array.from(new Set(urls));
};

const fetchImageAsBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Failed to fetch image: ${imageUrl}`, error);
    return imageUrl;
  }
};

const fetchImageAsBlob = async (imageUrl: string): Promise<Blob | null> => {
  try {
    const response = await fetch(imageUrl);
    return await response.blob();
  } catch (error) {
    console.error(`Failed to fetch image: ${imageUrl}`, error);
    return null;
  }
};

const processHtmlContent = async (
  html: string,
  pages: Page[],
  format: 'html' | 'react',
): Promise<string> => {
  let processed = html;
  if (format === 'html') {
    const imageUrls = extractUploadedImageUrls(html);
    for (const imageUrl of imageUrls) {
      const base64 = await fetchImageAsBase64(imageUrl);
      processed = processed.replace(
        new RegExp(imageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        base64,
      );
    }
  }

  if (format === 'html') {
    pages.forEach((p) => {
      const path = p.path;
      const fileName =
        path === '/index' || path === '/'
          ? 'index.html'
          : `${path.replace(/^\//, '')}.html`;

      const regex = new RegExp(`href=["']${path}["']`, 'g');
      processed = processed.replace(regex, `href="${fileName}"`);
    });
  }

  return processed;
};

export const exportAsHTML = async (
  pages: Page[],
  projectName: string = 'project',
  darkMode: boolean = false,
) => {
  if (pages.length === 0) return;

  const tailwindScript = `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class'
      }
    </script>
  `;

  if (pages.length === 1) {
    const page = pages[0];
    const processedHtml = await processHtmlContent(page.html, pages, 'html');

    const fullHTML = `<!DOCTYPE html>
<html lang="en"${darkMode ? ' class="dark"' : ''}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.name}</title>
    ${tailwindScript}
</head>
<body>
${processedHtml}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    saveAs(blob, `${page.name.toLowerCase().replace(/\s+/g, '-')}.html`);
    return;
  }

  const zip = new JSZip();

  for (const page of pages) {
    const processedHtml = await processHtmlContent(page.html, pages, 'html');

    const fullHTML = `<!DOCTYPE html>
<html lang="en"${darkMode ? ' class="dark"' : ''}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.name}</title>
    ${tailwindScript}
</head>
<body>
${processedHtml}
</body>
</html>`;
    const filename =
      page.path === '/index' || page.path === '/'
        ? 'index.html'
        : `${page.path.replace(/^\//, '')}.html`;
    zip.file(filename, fullHTML);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${projectName}-html.zip`);
};

export const exportAsReactProject = async (
  pages: Page[],
  projectName: string = 'project',
  darkMode: boolean = false,
) => {
  const zip = new JSZip();

  const allHtml = pages.map((p) => p.html).join('');
  const imageUrls = extractUploadedImageUrls(allHtml);

  const publicFolder = zip.folder('public');
  const uploadedFolder = publicFolder?.folder('uploaded');

  for (const imageUrl of imageUrls) {
    const blob = await fetchImageAsBlob(imageUrl);
    if (blob && uploadedFolder) {
      const filename = imageUrl.split('/uploaded/').pop() || 'image.png';
      uploadedFolder.file(filename, blob);
    }
  }

  const packageJson = {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.22.0',
    },
    devDependencies: {
      '@types/react': '^18.0.28',
      '@types/react-dom': '^18.0.11',
      '@vitejs/plugin-react': '^4.2.1',
      autoprefixer: '^10.4.16',
      postcss: '^8.4.32',
      tailwindcss: '^3.4.0',
      vite: '^5.2.0',
    },
  };
  zip.file('package.json', JSON.stringify(packageJson, null, 2));

  zip.file(
    'vite.config.js',
    `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
  );

  zip.file(
    'tailwind.config.js',
    `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
  );

  zip.file(
    'postcss.config.js',
    `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
  );

  zip.file(
    'index.html',
    `<!doctype html>
<html lang="en"${darkMode ? ' class="dark"' : ''}>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
  );

  const srcFolder = zip.folder('src');
  srcFolder?.file(
    'index.css',
    `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  );

  srcFolder?.file(
    'main.jsx',
    `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)`,
  );

  const pagesFolder = srcFolder?.folder('pages');

  const getComponentName = (path: string) => {
    if (path === '/index' || path === '/') return 'Home';
    return path
      .replace(/^\//, '')
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
  };

  for (const page of pages) {
    const componentName = getComponentName(page.path);

    const pageContent = `import React from 'react';

const ${componentName} = () => {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${page.html
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$')}\` }} />
  );
};

export default ${componentName};`;

    pagesFolder?.file(`${componentName}.jsx`, pageContent);
  }

  const imports = pages
    .map(
      (p) =>
        `import ${getComponentName(p.path)} from './pages/${getComponentName(p.path)}';`,
    )
    .join('\n');
  const routes = pages
    .map((p) => {
      const path = p.path === '/index' ? '/' : p.path;
      return `<Route path="${path}" element={<${getComponentName(p.path)} />} />`;
    })
    .join('\n        ');

  const appJsx = `import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
${imports}

function App() {
  return (
    <div>
      <Routes>
        ${routes}
      </Routes>
    </div>
  );
}

export default App;`;

  srcFolder?.file('App.jsx', appJsx);
  const readme = `# React + Vite + Tailwind CSS Project
 
 This project was exported from the Drag-Drop Builder.
 
 ## Project Structure
 - \`src/pages/\`: Contains a React component for each page of your project.
 - \`src/App.jsx\`: Handles routing using \`react-router-dom\`.
 
 ## Getting Started
 
 1. Install dependencies:
 \`\`\`bash
 npm install
 \`\`\`
 
 2. Run development server:
 \`\`\`bash
 npm run dev
 \`\`\`
 
 3. Build for production:
 \`\`\`bash
 npm run build
 \`\`\`
 `;
  zip.file('README.md', readme);

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${projectName}-react.zip`);
};

export const generateReactProjectFiles = async (
  pages: Page[],
  projectName: string = 'project',
  darkMode: boolean = false,
) => {
  const files: Record<string, any> = {};
  const WORK_DIR = '/home/project';

  const allHtml = pages.map((p) => p.html).join('');
  const imageUrls = extractUploadedImageUrls(allHtml);

  files[`${WORK_DIR}/public`] = { type: 'folder' };
  files[`${WORK_DIR}/public/uploaded`] = { type: 'folder' };
  files[`${WORK_DIR}/src`] = { type: 'folder' };
  files[`${WORK_DIR}/src/pages`] = { type: 'folder' };

  for (const imageUrl of imageUrls) {
    const base64 = await fetchImageAsBase64(imageUrl);
    const filename = imageUrl.split('/uploaded/').pop() || 'image.png';
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
    files[`${WORK_DIR}/public/uploaded/${filename}`] = {
      type: 'file',
      content: base64Data,
      isBinary: true,
    };
  }

  const packageJson = {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.22.0',
    },
    devDependencies: {
      '@types/react': '^18.0.28',
      '@types/react-dom': '^18.0.11',
      '@vitejs/plugin-react': '^4.2.1',
      autoprefixer: '^10.4.16',
      postcss: '^8.4.32',
      tailwindcss: '^3.4.0',
      vite: '^5.2.0',
    },
  };

  files[`${WORK_DIR}/package.json`] = {
    type: 'file',
    content: JSON.stringify(packageJson, null, 2),
    isBinary: false,
  };

  files[`${WORK_DIR}/vite.config.js`] = {
    type: 'file',
    content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
    isBinary: false,
  };

  files[`${WORK_DIR}/tailwind.config.js`] = {
    type: 'file',
    content: `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    isBinary: false,
  };

  files[`${WORK_DIR}/postcss.config.js`] = {
    type: 'file',
    content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
    isBinary: false,
  };

  files[`${WORK_DIR}/index.html`] = {
    type: 'file',
    content: `<!doctype html>
<html lang="en"${darkMode ? ' class="dark"' : ''}>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
    isBinary: false,
  };

  files[`${WORK_DIR}/src/index.css`] = {
    type: 'file',
    content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
    isBinary: false,
  };

  files[`${WORK_DIR}/src/main.jsx`] = {
    type: 'file',
    content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)`,
    isBinary: false,
  };

  const getComponentName = (path: string) => {
    if (path === '/index' || path === '/') return 'Home';
    return path
      .replace(/^\//, '')
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('');
  };

  for (const page of pages) {
    const componentName = getComponentName(page.path);
    const pageContent = `import React from 'react';\n\nconst ${componentName} = () => {\n  return (\n    <div dangerouslySetInnerHTML={{ __html: \`${page.html.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />\n  );\n};\n\nexport default ${componentName};`;
    files[`${WORK_DIR}/src/pages/${componentName}.jsx`] = {
      type: 'file',
      content: pageContent,
      isBinary: false,
    };
  }

  const imports = pages
    .map((p) => `import ${getComponentName(p.path)} from './pages/${getComponentName(p.path)}';`)
    .join('\n');
  
  const routes = pages
    .map((p) => {
      const path = p.path === '/index' ? '/' : p.path;
      return `<Route path="${path}" element={<${getComponentName(p.path)} />} />`;
    })
    .join('\n        ');

  const appJsx = `import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
${imports}

function App() {
  return (
    <div>
      <Routes>
        ${routes}
      </Routes>
    </div>
  );
}

export default App;`;

  files[`${WORK_DIR}/src/App.jsx`] = {
    type: 'file',
    content: appJsx,
    isBinary: false,
  };

  const readme = `# React + Vite + Tailwind CSS Project

This project was exported from the Drag-Drop Builder.

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run development server:
\`\`\`bash
npm run dev
\`\`\`

3. Build for production:
\`\`\`bash
npm run build
\`\`\`
`;
  
  files[`${WORK_DIR}/README.md`] = {
    type: 'file',
    content: readme,
    isBinary: false,
  };

  return files;
};
