import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/user.interface';
import UserService from '../services/users.service';

const userService = new UserService();

const validateProduct = {
  productName: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
  
    if (!name) throw new CustomError('ValidationError', '"name" is required');
    if (typeof name !== 'string') throw new CustomError('TypeError', '"name" must be a string');
    if (name.length < 3) {
      throw new CustomError('TypeError', '"name" length must be at least 3 characters long');
    } 
  
    next();
  },
  productAmount: async (req: Request, res: Response, next: NextFunction) => {
    const { amount } = req.body;
  
    if (!amount) throw new CustomError('ValidationError', '"amount" is required');
    if (typeof amount !== 'string') throw new CustomError('TypeError', '"amount" must be a string');
    if (amount.length < 3) {
      throw new CustomError('TypeError', '"amount" length must be at least 3 characters long');
    } 
  
    next();
  },
  validToken: async (req: Request, _res: Response, next: NextFunction) => {
    // const { username } = req.body;
    const { authorization: bearerToken } = req.headers;
    
    if (!bearerToken) throw new CustomError('InvalidCredential', 'Token not found');
    
    const token = bearerToken.replace('Bearer ', '');
  
    const { username } = userService.getUsernameFromToken(token);
  
    const userId = await userService.getIdWhereUsername(username);
  
    if (!userId || !username) throw new CustomError('InvalidCredential', 'Invalid token');
  
    next();
  },
  bodyProduct: async (req: Request, _res: Response, next: NextFunction) => {
    const { productsIds } = req.body;
  
    if (!productsIds) throw new CustomError('ValidationError', '"productsIds" is required');

    if (typeof productsIds !== 'object') {
      throw new CustomError('TypeError', '"productsIds" must be an array');
    }
    
    if (productsIds.length === 0) {
      throw new CustomError('TypeError', '"productsIds" must include only numbers');
    }

    next();
  },
};

export default validateProduct;