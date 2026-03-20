import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const deploymentId = searchParams.get('id');

    if (!deploymentId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Deployment ID is required',
        },
        { status: 400 },
      );
    }

    const vercelToken = process.env.VERCEL_TOKEN;

    if (!vercelToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vercel token not configured',
        },
        { status: 500 },
      );
    }

    const teamId = searchParams.get('teamId');
    const url = teamId
      ? `https://api.vercel.com/v13/deployments/${deploymentId}?teamId=${teamId}`
      : `https://api.vercel.com/v13/deployments/${deploymentId}`;

    const statusResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    });

    if (!statusResponse.ok) {
      const errorData = await statusResponse.json();
      return NextResponse.json(
        {
          success: false,
          error:
            errorData.error?.message || 'Failed to fetch deployment status',
        },
        { status: statusResponse.status },
      );
    }

    const statusData = await statusResponse.json();

    let deploymentUrl = `https://${statusData.url}`;
    if (statusData.alias && statusData.alias.length > 0) {
      deploymentUrl = `https://${statusData.alias[0]}`;
    }

    return NextResponse.json({
      success: true,
      status: statusData.readyState || statusData.state,
      url: deploymentUrl,
      error:
        statusData.readyState === 'ERROR' || statusData.state === 'ERROR'
          ? {
              message: statusData.error?.message || 'Deployment failed',
              logs:
                statusData.error?.logs ||
                JSON.stringify(statusData.error || {}, null, 2),
            }
          : undefined,
    });
  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
