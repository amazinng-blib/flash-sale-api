import { Order } from '../../models/orderModel';

export async function leaderBoardService() {
  const leaderboard = await Order.find()
    .populate('userId', 'items')
    .sort({ purchaseTime: 1 })
    .lean();

  return { message: 'Orders fetched', data: leaderboard };
}
