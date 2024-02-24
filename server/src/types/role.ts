import { Document, Model } from 'mongoose';

// Interface for Role
export interface IRole {
  idRole: number;
  name: string;
}

export interface IRoleDocument extends IRole, Document {}

export interface IRoleModel extends Model<IRoleDocument> {
  getAll(id?: string): Promise<IRoleDocument[]>; // Declare static method getAll
}

export interface IRoleCreatePayload {
  name: string;
}
