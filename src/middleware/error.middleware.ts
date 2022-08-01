import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/user.interface';

const errors: Record<string, number> = {
  ValidationError: 400,
  TypeError: 422,
  InvalidCredential: 401,
};

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, message } = err;
  const httpCode = errors[name];

  if (!httpCode) return res.status(500).json({ message: err.message });
  res.status(httpCode).json({ message });

  next();
};

export default errorMiddleware;