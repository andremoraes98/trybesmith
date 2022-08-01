import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message } = err;

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'InvalidCredential':
      res.status(401).json({ message });
      break;
    default:
      console.log(err.message);
      res.status(500).json({ message });
  }

  next();
};

export default errorMiddleware;