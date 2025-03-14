import { z } from 'zod';

export const zodLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type zodLoginType = z.infer<typeof zodLoginSchema>;
