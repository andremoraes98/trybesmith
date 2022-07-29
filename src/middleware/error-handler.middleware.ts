import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateBody = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const schema = Joi.object({
      name: Joi.string().required().min(3),
      amount: Joi.string().required().min(3),
    });
  
    await schema.validateAsync(req.body);
  
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default validateBody;