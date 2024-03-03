import mongoose from 'mongoose';
import { setupJSONTransform } from '@/lib/transform';
import type { IRole } from '@/types/role';

// Mongoose Schema for Roles
const roleSchema = new mongoose.Schema<IRole>({
  // @see User schema virtual field 'role'
  idRole: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true, unique: true },
});

// Mongoose Model for Role
export const Role = mongoose.model<IRole>('Role', setupJSONTransform(roleSchema));
