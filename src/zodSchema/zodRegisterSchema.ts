import { z } from 'zod';
import { Role } from '../models/userModel';

export const zodRegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.nativeEnum(Role).default(Role.USER),
});

export type zodRegisterType = z.infer<typeof zodRegisterSchema>;

/*
 * To edit user details either by user or admin
 */
export const zodUpdateUserSchema = zodRegisterSchema.partial().extend({
  role: z.nativeEnum(Role).optional(),
});
export type zodUpdateUserType = z.infer<typeof zodUpdateUserSchema>;
