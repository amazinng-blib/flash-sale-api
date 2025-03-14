import { FlashSale } from '../../models/flashSaleModel';
import { Product } from '../../models/productModel';
import { emitFlashSaleEvent } from '../../sockets/stock.socket';
import { FlashSaleType } from '../../zodSchema/zodFlashSaleSchema';
import mongoose from 'mongoose';
import schedule from 'node-schedule';
import { endFlashSaleService } from './endFlashSaleService';
import { AppError } from '../../middleware/errorhandler';

export const startFlashSaleService = async (startTime: Date, endTime: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to midnight

  const endDate = new Date(endTime);
  endDate.setHours(0, 0, 0, 0); // Normalize endTime to midnight

  if (endDate < today) {
    throw new AppError('Flash sale end time must be in the future.', 400);
  }

  // If endTime is today, ensure flash sale ends properly
  const isEndingToday = endDate.getTime() === today.getTime();

  const activeSale = await FlashSale.findOne({ status: 'active' });
  if (activeSale) {
    throw new AppError('A flash sale is already active.', 400);
  }

  const products = await Product.find();
  if (!products.length) {
    throw new AppError('No products available for flash sale.', 400);
  }

  const flashSaleEntries: Array<FlashSaleType> = [];
  const productUpdates: any[] = [];

  products.forEach((product) => {
    const flashSaleStock = product.stock >= 200 ? 200 : product.stock;
    if (flashSaleStock > 0) {
      flashSaleEntries.push({
        productId: (product._id as mongoose.Types.ObjectId).toString(),
        startTime,
        endTime,
        discount: 0,
        actualPrice: product.price,
        currentPrice: product.price,
        availableStock: flashSaleStock,
        status: 'active',
      });

      productUpdates.push({
        updateOne: {
          filter: { _id: (product._id as mongoose.Types.ObjectId).toString() },
          update: { $inc: { stock: -flashSaleStock } },
        },
      });
    }
  });

  if (!flashSaleEntries.length) {
    throw new AppError('Not enough stock to start a flash sale.', 400);
  }

  await FlashSale.insertMany(flashSaleEntries);
  await Product.bulkWrite(productUpdates);

  emitFlashSaleEvent('flashSaleStarted', { startTime, endTime });

  // **Schedule task to end sale if today is the end time**

  if (isEndingToday) {
    console.log('Flash sale will end today at:', endTime);
    schedule.scheduleJob(endTime, async () => {
      await endFlashSaleService();
    });
  }

  return { message: 'Flash sale started successfully', flashSaleEntries };
};
