import mongoose from 'mongoose';
import { setupJSONTransform } from '@/lib/transform';
import type { IRoleDocument, IRoleModel } from '@/types/role';

// Mongoose Schema for Role
const roleSchema = new mongoose.Schema<IRoleDocument>({
  idRole: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true, unique: true },
});

// Mongoose Model for Role
export const Role = mongoose.model<IRoleModel>('Role', setupJSONTransform(roleSchema));
