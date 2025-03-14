import { Request, Response } from 'express';
import { zodOrderSchema } from '../../zodSchema/zodOrderSchema';
import { handleError } from '../../utils/handleError';
import * as orderService from '../../services/order/orderService';
import { leaderBoardService } from '../../services/order/leaderBoardService';

// Place an order
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const data = zodOrderSchema.parse(req.body);

    const order = await orderService.placeOrder(data);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    handleError(error, res);
  }
};

// Get user orders
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const orders = await orderService.getUserOrders(userId);
    res.status(200).json({ orders });
  } catch (error) {
    handleError(error, res);
  }
};

// Leaderboard api

export const leaderBoard = async (req: Request, res: Response) => {
  try {
    const orders = await leaderBoardService();
    res.status(200).json({ orders });
  } catch (error) {
    handleError(error, res);
  }
};

// Cancel an order
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const result = await orderService.cancelOrder(orderId);
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
};
