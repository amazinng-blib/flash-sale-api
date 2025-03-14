import { z } from 'zod';

export const zodOrderSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product ID is required'),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, 'At least one product is required'),
  totalPrice: z.number().positive('Total price must be a positive number'),
});

export type zodOrderSchemaType = z.infer<typeof zodOrderSchema>;
