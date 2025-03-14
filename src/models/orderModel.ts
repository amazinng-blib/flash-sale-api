import mongoose, { Document, Schema } from 'mongoose';

interface IOrderItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  purchaseTime: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    purchaseTime: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
