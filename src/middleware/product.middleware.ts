import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/user.interface';

const validateProductName = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) throw new CustomError('ValidationError', '"name" is required');
  if (typeof name !== 'string') throw new CustomError('TypeError', '"name" must be a string');
  if (name.length < 3) {
    throw new CustomError('TypeError', '"name" length must be at least 3 characters long');
  } 

  next();
};

const validateProductAmount = async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;

  if (!amount) throw new CustomError('ValidationError', '"amount" is required');
  if (typeof amount !== 'string') throw new CustomError('TypeError', '"amount" must be a string');
  if (amount.length < 3) {
    throw new CustomError('TypeError', '"amount" length must be at least 3 characters long');
  } 

  next();
};

export {
  validateProductName,
  validateProductAmount,
};