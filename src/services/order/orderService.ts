import mongoose from 'mongoose';
import { FlashSale } from '../../models/flashSaleModel';
import { Order } from '../../models/orderModel';
import { AppError } from '../../middleware/errorhandler';
import { zodOrderSchemaType } from '../../zodSchema/zodOrderSchema';
import { io } from '../../sockets/stock.socket';

export const placeOrder = async (input: zodOrderSchemaType) => {
  if (
    !input.userId ||
    !Array.isArray(input.items) ||
    input.items.length === 0
  ) {
    throw new AppError('Invalid order details', 400);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const flashSaleUpdates = [];
    let totalPrice = 0;
    const orderItems = [];

    for (const item of input.items) {
      const flashSale = await FlashSale.findOne({
        productId: item.productId,
      }).session(session);
      if (!flashSale)
        throw new AppError(`Flash sale not found: ${item.productId}`, 404);
      if (flashSale.availableStock < item.quantity) {
        throw new AppError(
          `Not enough stock for flash sale item: ${item.productId}`,
          400
        );
      }

      // Reduce stock
      flashSaleUpdates.push({
        updateOne: {
          filter: { _id: flashSale._id },
          update: { $inc: { availableStock: -item.quantity } },
        },
      });

      // Calculate total price
      totalPrice += flashSale.currentPrice * item.quantity;

      // Store order item
      orderItems.push({
        product: flashSale._id,
        quantity: item.quantity,
      });
    }

    if (totalPrice !== input.totalPrice) {
      throw new AppError(`There's a miscalculation in price.`, 400);
    }
    // Bulk update stock
    await FlashSale.bulkWrite(flashSaleUpdates, { session });

    // Create order with total price
    const order = new Order({
      user: input.userId,
      items: orderItems,
      totalPrice,
      purchaseTime: new Date(),
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    // **Emit real-time updates via Socket.io**
    io.emit('orderPlaced', { order, message: 'New order placed!' });
    io.emit('stockUpdated', {
      items: flashSaleUpdates,
      message: 'Stock updated!',
    });

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getUserOrders = async (userId: string) => {
  const orders = await Order.find({ user: userId }).populate('items.productId');
  return orders.length ? orders : null;
};

export const cancelOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError('Order not found', 404);

  // Restore stock
  const flashSaleUpdates = order.items.map((item) => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $inc: { availableStock: item.quantity } },
    },
  }));

  await FlashSale.bulkWrite(flashSaleUpdates);
  await Order.findByIdAndDelete(orderId);

  return { message: 'Order canceled successfully' };
};
