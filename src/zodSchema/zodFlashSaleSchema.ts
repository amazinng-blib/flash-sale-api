import { z } from 'zod';

export const FlashSaleSchema = z.object({
  productId: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  discount: z.number().min(0, { message: 'Discount must be non-negative' }),
  actualPrice: z
    .number()
    .min(0, { message: 'Actual price must be non-negative' }),
  currentPrice: z
    .number()
    .min(0, { message: 'Current price must be non-negative' }),
  availableStock: z
    .number()
    .int()
    .min(0, { message: 'Stock must be a positive integer' }),
  status: z.enum(['active', 'ended']),
});

export type FlashSaleType = z.infer<typeof FlashSaleSchema>;
