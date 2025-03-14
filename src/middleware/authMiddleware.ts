import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorhandler';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) throw new AppError('Unauthorized', 401);

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as JwtPayload;
    req.body.userId = decoded.id.id;
    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};

export default authMiddleware;
