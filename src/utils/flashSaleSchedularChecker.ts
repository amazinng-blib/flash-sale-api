import schedule from 'node-schedule';
import { FlashSale } from '../models/flashSaleModel';
import { endFlashSaleService } from '../services/flashsale/endFlashSaleService';

export const dailyCheckFlashSale = () => {
  schedule.scheduleJob('0 0 * * *', async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log('🔎 Checking for expired flash sales...');

    const expiredSales = await FlashSale.find({
      status: 'active',
      endTime: { $lte: today },
    });

    if (expiredSales.length > 0) {
      console.log(
        `Found ${expiredSales.length} expired flash sales. Ending now...`
      );
      await endFlashSaleService();
    } else {
      console.log('No flash sales expired today.');
    }
  });
};
