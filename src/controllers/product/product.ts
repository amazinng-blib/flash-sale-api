import { Request, Response } from 'express';

import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from '../../services/product/product-service';
import { handleError } from '../../utils/handleError';
import { zodProductSchema } from '../../zodSchema/zodProductSchema';

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = zodProductSchema.parse(req.body);
    const product = await createProductService(data);
    res.status(201).json(product);
  } catch (error) {
    handleError(error, res);
  }
};

// Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    handleError(error, res);
  }
};

// Get Single Product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    handleError(error, res);
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await updateProductService(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    handleError(error, res);
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await deleteProductService(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    handleError(error, res);
  }
};
