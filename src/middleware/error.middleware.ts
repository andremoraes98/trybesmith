import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/user.interface';

const errors: Record<string, number> = {
  ValidationError: 400,
  TypeError: 422,
  InvalidCredential: 401,
  JsonWebTokenError: 401,
};

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, message } = err;
  const httpCode = errors[name];

  if (name === 'JsonWebTokenError') return res.status(httpCode).json({ message: 'Invalid token' });

  if (!httpCode) return res.status(500).json({ message });
  res.status(httpCode).json({ message });

  next();
};

export default errorMiddleware;