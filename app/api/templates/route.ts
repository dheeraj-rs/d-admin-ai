import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/shared/lib/db';
import { TemplateModel } from '@/features/builder/services/models';

const ADMIN_EMAIL = 'drjsde@gmail.com';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    // Allow unauthenticated GET if we want people to see default templates?
    // User said "each login users based Database", so maybe only for logged in?
    // Let's allow public access to default templates.
    
    await connectDB();
    
    const query: any = {
      $or: [
        { isDefault: true },
      ]
    };

    if (session?.user?.email) {
      query.$or.push({ ownerEmail: session.user.email });
    }

    const templates = await TemplateModel.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(templates);
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

    const { id, title, author, authorAvatar, thumbnail, category, html, ownerEmail, isDefault } = data;

    // Security check: Only owner or admin can update
    if (ownerEmail && ownerEmail !== session.user.email && session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const templateData: any = {
      id,
      title,
      author,
      authorAvatar,
      thumbnail,
      category,
      html,
      ownerEmail: ownerEmail || session.user.email,
    };

    if (session.user.email === ADMIN_EMAIL) {
      templateData.isDefault = isDefault === true;
    }

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
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await connectDB();
    const template = await TemplateModel.findOne({ id });

    if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    if (template.ownerEmail !== session.user.email && session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await TemplateModel.deleteOne({ id });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
