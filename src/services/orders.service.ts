import OrderModel from '../models/orders.model';
import connection from '../models/connection';
import { OrderProduct } from '../interfaces/order.interface';

class OrderService {
  orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  public async getAll(): Promise<OrderProduct[]> {
    const result = await this.orderModel.getAll();

    return result;
  }
}

export default OrderService;