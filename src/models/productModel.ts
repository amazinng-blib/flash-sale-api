import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  stock: number;
  imageUrl?: string;
  rating?: number;
  price: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, default: '' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
