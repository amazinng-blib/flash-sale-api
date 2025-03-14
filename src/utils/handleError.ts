import { Response } from 'express';
import { AppError } from '../middleware/errorhandler';
import { ZodError } from 'zod';

export function handleError(error: any, res: Response) {
  // check if the error is instance appError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  //   check if it's zod error

  if (error instanceof ZodError) {
    return res.status(400).json({ error: 'Input type error' });
  }

  // For other unhandled errors, send a 500 Internal Server Error
  // log the error to developers for debugging
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}
