import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/shared/lib/db';
import { TemplateModel } from '@/features/builder/services/models';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const query: any = {};

    const templates = await TemplateModel.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(templates);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {

    const data = await req.json();
    await connectDB();

    const { id, title, author, authorAvatar, thumbnail, category, html, ownerEmail, isDefault } = data;

    const templateData: any = {
      id,
      title,
      author,
      authorAvatar,
      thumbnail,
      category,
      html,
      ownerEmail: ownerEmail || 'local',
    };

    const template = await TemplateModel.findOneAndUpdate(
      { id },
      { ...templateData },
      { upsert: true, new: true }
    );

    return NextResponse.json(template);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await connectDB();
    const template = await TemplateModel.findOne({ id });

    if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await TemplateModel.deleteOne({ id });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
