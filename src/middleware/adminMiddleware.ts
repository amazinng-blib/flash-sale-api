import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';
import { handleError } from '../utils/handleError';
import { AppError } from './errorhandler';

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.body;

    const userExist = await User.findById(userId);
    if (!userExist) {
      throw new AppError('User not found', 404);
    }

    if (userExist.role !== 'ADMIN') {
      throw new AppError('UnAuthorized user', 401);
    }

    next();
  } catch (error) {
    handleError(error, res);
  }
}
