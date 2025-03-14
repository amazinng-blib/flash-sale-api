import mongoose, { Document, Schema } from 'mongoose';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MARKETER = 'MARKETER',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), default: Role.USER },
});
export const User = mongoose.model<IUser>('User', UserSchema);
