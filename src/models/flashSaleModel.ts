import mongoose, { Document, Schema } from 'mongoose';

interface IFlashSale extends Document {
  productId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  discount: number;
  actualPrice: number;
  currentPrice: number;
  availableStock: number;
  status: 'active' | 'ended';
}

const FlashSaleSchema = new Schema<IFlashSale>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    discount: { type: Number, required: true, default: 0 }, // Discount percentage
    actualPrice: { type: Number, required: true }, // Original price before discount
    currentPrice: { type: Number, required: true }, // Price after discount
    availableStock: { type: Number, required: true, default: 200 },
    status: { type: String, enum: ['active', 'ended'], default: 'active' },
  },
  { timestamps: true }
);

// Create indexes for efficient queries
FlashSaleSchema.index({ productId: 1, status: 1 });
FlashSaleSchema.index({ startTime: 1, endTime: 1 });

export const FlashSale = mongoose.model<IFlashSale>(
  'FlashSale',
  FlashSaleSchema
);
