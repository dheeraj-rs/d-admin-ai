import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/shared/lib/db';
import { ProjectModel } from '@/features/builder/services/models';

const ADMIN_EMAIL = 'drjsde@gmail.com';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Admins see all projects? Or just their own? 
    // Usually, users only see their own projects.
    const projects = await ProjectModel.find({ ownerEmail: session.user.email }).sort({ updatedAt: -1 });
    
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    const { id, name, pages, thumbnail, category, ownerEmail } = data;

    // Security check: If ownerEmail is provided, it must match the session or be admin
    if (ownerEmail && ownerEmail !== session.user.email && session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const projectData = {
      id,
      name,
      pages,
      thumbnail,
      category,
      ownerEmail: ownerEmail || session.user.email,
    };

    const project = await ProjectModel.findOneAndUpdate(
      { id },
      { ...projectData, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids')?.split(',');

    await connectDB();

    if (id) {
      const project = await ProjectModel.findOne({ id });
      if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      
      if (project.ownerEmail !== session.user.email && session.user.email !== ADMIN_EMAIL) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      await ProjectModel.deleteOne({ id });
    } else if (ids) {
      // Delete multiple
      const query: any = { id: { $in: ids } };
      if (session.user.email !== ADMIN_EMAIL) {
        query.ownerEmail = session.user.email;
      }
      await ProjectModel.deleteMany(query);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
