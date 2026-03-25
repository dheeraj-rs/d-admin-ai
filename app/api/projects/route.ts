import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/shared/lib/db';
import { ProjectModel } from '@/features/builder/services/models';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const projects = await ProjectModel.find({}).sort({ updatedAt: -1 });
    
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {

    const data = await req.json();
    await connectDB();

    const { id, name, pages, thumbnail, category, ownerEmail } = data;

    const projectData = {
      id,
      name,
      pages,
      thumbnail,
      category,
      ownerEmail: ownerEmail || 'local',
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids')?.split(',');

    await connectDB();

    if (id) {
      const project = await ProjectModel.findOne({ id });
      if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

      await ProjectModel.deleteOne({ id });
    } else if (ids) {
      // Delete multiple
      const query: any = { id: { $in: ids } };
      await ProjectModel.deleteMany(query);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
