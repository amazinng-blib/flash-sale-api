import { Router } from 'express';
import {
  endFlashSale,
  getAllFlashSale,
  startFlashSale,
} from '../controllers/flashsale/flashsale';
import { adminMiddleware } from '../middleware/adminMiddleware';
import authMiddleware from '../middleware/authMiddleware';

export const router = Router();

router.post('/start', authMiddleware, adminMiddleware, startFlashSale);
router.post('/end', endFlashSale);
router.get('/', getAllFlashSale);
