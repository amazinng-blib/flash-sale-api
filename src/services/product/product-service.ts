import { AppError } from '../../middleware/errorhandler';
import { Product } from '../../models/productModel';

// Create Product
export const createProductService = async (data: any) => {
  const product = await Product.create(data);
  return { message: 'Product created successfully', product };
};

//  Get All Products
export const getAllProductsService = async () => {
  return await Product.find();
};

// Get a Single Product
export const getProductByIdService = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product Not found', 404);
  }
  return product;
};

// Update Product
export const updateProductService = async (
  productId: string,
  updateData: any
) => {
  const productExist = await Product.findById(productId);
  if (!productExist) {
    throw new AppError('Product Not found', 404);
  }

  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });

  return { message: 'Product updated successfully', product };
};

//  Delete Product
export const deleteProductService = async (productId: string) => {
  const productExist = await Product.findById(productId);
  if (!productExist) {
    throw new AppError('Product Not found', 404);
  }
  return await Product.findByIdAndDelete(productId);
};
