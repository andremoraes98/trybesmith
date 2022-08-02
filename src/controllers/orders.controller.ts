import { Request, Response } from 'express';
import OrderService from '../services/orders.service';
import UserService from '../services/users.service';
import { Indexable } from '../interfaces/user.interface';
import ProductService from '../services/products.service';

const userService = new UserService();
const productService = new ProductService();

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.orderService.getAll();

    return res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { authorization: bearerToken }: any = req.headers; 
    const token = bearerToken?.replace('Bearer ', '');

    const { username } = userService.getUsernameFromToken(token);
    const { id } = await userService.getIdWhereUsername(username) as Indexable;
    const orderId = await this.orderService.create(id as number);

    const productsUpdated = productsIds.map((productId: number) => productService
      .updateOrderIdWhereProductId(orderId, productId));

    await Promise.all(productsUpdated);

    res.status(201).json({ userId: id, productsIds });
  };
}

export default OrderController;