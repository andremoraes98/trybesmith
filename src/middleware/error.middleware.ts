import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/user.interface';

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, message, httpCode } = err;

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'InvalidCredential':
      res.status(httpCode).json({ message });
      break;
    default:
      console.log(err.message);
      res.status(500).json({ message });
  }

  next();
};

export default errorMiddleware;