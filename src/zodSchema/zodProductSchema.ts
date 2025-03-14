import { z } from 'zod';

export const zodProductSchema = z.object({
  name: z.string().min(1),
  stock: z.number().min(0),
  imageUrl: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  price: z.number().min(1),
});

export type zodProductSchemaType = z.infer<typeof zodProductSchema>;
