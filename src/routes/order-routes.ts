import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import {
  cancelOrder,
  getUserOrders,
  leaderBoard,
  placeOrder,
} from '../controllers/order/order';

export const router = Router();

router.post('/', authMiddleware, placeOrder);
router.get('/', getUserOrders);
router.get('/all-orders', authMiddleware, leaderBoard);
router.delete('/cancel-order/:orderId', authMiddleware, cancelOrder);
