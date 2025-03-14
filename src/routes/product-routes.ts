import { Router } from 'express';
import { adminMiddleware } from '../middleware/adminMiddleware';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product/product';
import authMiddleware from '../middleware/authMiddleware';

export const router = Router();

router.post('/create', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
