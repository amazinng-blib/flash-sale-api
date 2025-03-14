import { Router } from 'express';
import {
  endFlashSale,
  startFlashSale,
} from '../controllers/flashsale/flashsale';
import { adminMiddleware } from '../middleware/adminMiddleware';

export const router = Router();

router.post('/start', adminMiddleware, startFlashSale);
router.post('/end', endFlashSale);
