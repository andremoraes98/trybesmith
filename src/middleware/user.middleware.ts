import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Credentials, CustomError } from '../interfaces/user.interface';
import UserService from '../services/users.service';

const userService = new UserService();

const validateUser = {
  body: async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  
    await schema.validateAsync(req.body);
  
    next();
  },
  credentials: async (req: Request, res: Response, next: NextFunction) => {
    const userCredential: Credentials = req.body;
  
    const dbCredential = await userService.getCredentialsWhereUsername(userCredential.username);
  
    if (!dbCredential || dbCredential.password !== userCredential.password
    ) {
      throw new CustomError('InvalidCredential', 'Username or password invalid');
    }
  
    next();
  },
  username: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
  
    if (!username) throw new CustomError('ValidationError', '"username" is required');
    if (typeof username !== 'string') {
      throw new CustomError('TypeError', '"username" must be a string');
    }
    if (username.length < 3) {
      throw new CustomError('TypeError', '"username" length must be at least 3 characters long');
    } 
  
    next();
  },
  classe: async (req: Request, res: Response, next: NextFunction) => {
    const { classe } = req.body;
  
    if (!classe) throw new CustomError('ValidationError', '"classe" is required');
    if (typeof classe !== 'string') {
      throw new CustomError('TypeError', '"classe" must be a string');
    }
    if (classe.length < 3) {
      throw new CustomError('TypeError', '"classe" length must be at least 3 characters long');
    } 
  
    next();
  },
  level: async (req: Request, res: Response, next: NextFunction) => {
    const { level } = req.body;
  
    if (level <= 0) {
      throw new CustomError('TypeError', '"level" must be greater than or equal to 1');
    } 
    if (!level) throw new CustomError('ValidationError', '"level" is required');
    if (typeof level !== 'number') {
      throw new CustomError('TypeError', '"level" must be a number');
    }
  
    next();
  },
  password: async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
  
    if (!password) throw new CustomError('ValidationError', '"password" is required');
    if (typeof password !== 'string') {
      throw new CustomError('TypeError', '"password" must be a string');
    } 
    if (password.length < 8) {
      throw new CustomError('TypeError', '"password" length must be at least 8 characters long');
    } 
  
    next();
  },
};

export default validateUser;
