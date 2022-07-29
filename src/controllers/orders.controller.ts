import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.orderService.getAll();

    return res.status(200).json(result);
  };
}

export default OrderController;