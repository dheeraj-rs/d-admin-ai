import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true },
);

// --- Types ---

export interface IPage {
  id: string;
  name: string;
  path: string;
  html: string;
}

export interface IProject extends Document {
  id: string; // Client-side UUID
  name: string;
  description?: string;
  pages: IPage[];
  thumbnail?: string;
  category?: string;
  deploymentUrl?: string;
  ownerEmail: string;
  updatedAt: Date;
}

export interface ITemplate extends Document {
  id: string; // Client-side UUID
  title: string;
  author: string;
  authorAvatar: string;
  isTeam?: boolean;
  thumbnail: string;
  video?: string;
  category: string;
  likes: string;
  views: string;
  usageCount?: string;
  html?: string;
  deploymentUrl?: string;
  ownerEmail: string;
  isDefault?: boolean;
}

export interface IUser extends Document {
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Schemas ---

const PageSchema = new Schema<IPage>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
  html: { type: String, required: true },
});

const ProjectSchema = new Schema<IProject>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  pages: [PageSchema],
  thumbnail: String,
  category: String,
  deploymentUrl: String,
  ownerEmail: { type: String, required: true, index: true },
}, { timestamps: true });

const TemplateSchema = new Schema<ITemplate>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  authorAvatar: { type: String, required: true },
  isTeam: { type: Boolean, default: false },
  thumbnail: { type: String, required: true },
  video: String,
  category: { type: String, required: true, index: true },
  likes: { type: String, default: '0' },
  views: { type: String, default: '0' },
  usageCount: { type: String, default: '0' },
  html: String,
  deploymentUrl: String,
  ownerEmail: { type: String, required: true, index: true },
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

// --- Models ---

export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export const TemplateModel = mongoose.models.Template || mongoose.model<ITemplate>('Template', TemplateSchema);
export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
