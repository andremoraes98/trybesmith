import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Credentials, CustomError } from '../interfaces/user.interface';
import UserService from '../services/users.service';

const userService = new UserService();

const validateBody = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  await schema.validateAsync(req.body);

  next();
};

const validateCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const userCredential: Credentials = req.body;

  const dbCredential = await userService.getCredentialsWhereUsername(userCredential.username);

  if (!dbCredential || dbCredential.password !== userCredential.password
  ) {
    throw new CustomError('InvalidCredential', 'Username or password invalid');
  }

  next();
};

export {
  validateBody,
  validateCredentials,
};
