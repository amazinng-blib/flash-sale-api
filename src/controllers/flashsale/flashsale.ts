import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import {
  getAllFlashSaleProductsService,
  startFlashSaleService,
} from '../../services/flashsale/flashsaleService';
import { endFlashSaleService } from '../../services/flashsale/endFlashSaleService';

export const startFlashSale = async (req: Request, res: Response) => {
  try {
    const { startTime, endTime, discount } = req.body;
    const result = await startFlashSaleService(startTime, endTime, discount);
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
};

export const endFlashSale = async (req: Request, res: Response) => {
  try {
    const result = await endFlashSaleService();
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllFlashSale = async (req: Request, res: Response) => {
  try {
    const result = await getAllFlashSaleProductsService();
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
};
