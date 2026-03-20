import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectName,
      files, // Array of { path: string, content: string }
      framework,
      rootDirectory,
      buildCommand,
      outputDirectory,
      installCommand,
      envVars,
    } = body;

    const vercelToken = process.env.VERCEL_TOKEN;

    if (!vercelToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Vercel token not configured. Please add VERCEL_TOKEN to your environment variables.',
        },
        { status: 500 },
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            'No files provided for deployment. Please generate a website first.',
        },
        { status: 400 },
      );
    }

    console.log('🚀 Starting Vercel deployment...');
    console.log('📝 Project name:', projectName);
    console.log('📁 Files to deploy:', files.length);

    // Format files for Vercel API
    const vercelFiles = files
      .filter((file: { path: string; content: string }) => {
        if (!file.path || file.path.trim() === '') return false;
        if (file.content === undefined || file.content === null) return false;
        return true;
      })
      .map((file: { path: string; content: string }) => {
        const content = String(file.content || '');
        return {
          file: file.path,
          data: Buffer.from(content, 'utf-8').toString('base64'),
          encoding: 'base64' as const,
        };
      });

    if (vercelFiles.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid files to deploy after filtering.',
        },
        { status: 400 },
      );
    }

    const deploymentPayload: any = {
      name: projectName,
      files: vercelFiles,
      projectSettings: {
        framework: framework || null,
        rootDirectory: rootDirectory || null,
        buildCommand: buildCommand || null,
        outputDirectory: outputDirectory || null,
        installCommand: installCommand || null,
      },
      target: 'production',
    };

    if (envVars && Array.isArray(envVars) && envVars.length > 0) {
      const envObj: Record<string, string> = {};
      envVars.forEach((e: any) => {
        if (e.key && e.value) {
          envObj[e.key] = e.value;
        }
      });
      deploymentPayload.env = envObj;
    }

    const deploymentResponse = await fetch(
      'https://api.vercel.com/v13/deployments',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deploymentPayload),
      },
    );

    if (!deploymentResponse.ok) {
      const errorData = await deploymentResponse.json();
      console.error('❌ Vercel API Error:', JSON.stringify(errorData, null, 2));

      let errorMessage = 'Failed to deploy to Vercel';
      if (errorData.error) {
        if (typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        } else if (errorData.error.message) {
          errorMessage = errorData.error.message;
        }
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          details: errorData,
        },
        { status: deploymentResponse.status },
      );
    }

    const deploymentData = await deploymentResponse.json();

    // Prefer the alias (production URL) if available
    let deploymentUrl = `https://${deploymentData.url}`;
    if (deploymentData.alias && deploymentData.alias.length > 0) {
      deploymentUrl = `https://${deploymentData.alias[0]}`;
    }

    return NextResponse.json({
      success: true,
      deploymentId: deploymentData.id,
      teamId: deploymentData.team?.id,
      url: deploymentUrl,
    });
  } catch (error: any) {
    console.error('Deployment error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
