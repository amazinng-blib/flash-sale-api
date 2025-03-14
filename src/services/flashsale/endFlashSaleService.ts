import mongoose from 'mongoose';
import { Product } from '../../models/productModel';
import { emitFlashSaleEvent } from '../../sockets/stock.socket';
import { FlashSale } from '../../models/flashSaleModel';

export const endFlashSaleService = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeSales = await FlashSale.find({
      status: 'active',
      endTime: { $lte: today },
    }).session(session);
    if (!activeSales.length) {
      console.log(' No active flash sales to end.');
      return;
    }

    const productRestores = [];

    for (const sale of activeSales) {
      if (sale.availableStock > 0) {
        productRestores.push({
          updateOne: {
            filter: { _id: sale.productId },
            update: { $inc: { stock: sale.availableStock } },
          },
        });
      }
    }

    await FlashSale.updateMany(
      { status: 'active' },
      { status: 'expired' },
      { session }
    );

    if (productRestores.length > 0) {
      await Product.bulkWrite(productRestores, { session });
    }

    await session.commitTransaction();
    session.endSession();

    emitFlashSaleEvent('flashSaleEnded', { message: 'Flash sale has ended' });

    return { message: 'Flash sale ended successfully' };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('❌ Error ending flash sale:', error);
    throw error;
  }
};
