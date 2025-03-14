import { Request, Response } from 'express';
import { zodLoginSchema } from '../../zodSchema/zodLoginSchema';
import { loginService } from '../../services/auth/loginService';
import { handleError } from '../../utils/handleError';

export async function login(req: Request, res: Response) {
  try {
    const data = zodLoginSchema.parse(req.body);
    const result = await loginService(data);
    res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
