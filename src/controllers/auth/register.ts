// controllers/register.ts
import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { zodRegisterSchema } from '../../zodSchema/zodRegisterSchema';
import { registerService } from '../../services/auth/registerService';

export async function register(req: Request, res: Response) {
  try {
    const data = zodRegisterSchema.parse(req.body);
    const result = await registerService(data);
    res.status(201).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
