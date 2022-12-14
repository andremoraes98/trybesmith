import { Pool, ResultSetHeader } from 'mysql2/promise';
import { OrderProduct } from '../interfaces/order.interface';

class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<OrderProduct[]> {
    const result = await this.connection.query(
      `SELECT
        O.id, O.userId, JSON_ARRAYAGG(P.id) as productsIds
      FROM Trybesmith.Products as P
      INNER JOIN Trybesmith.Orders as O
      ON P.orderId = O.id
      GROUP BY O.id
      ORDER BY O.userId`,
    );

    const [rows] = result;
    return rows as OrderProduct[];
  }

  public async create(userId: number): Promise<number> {
    const result = await this.connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    
    const [dataInserted] = result;
    const { insertId: orderId } = dataInserted;
    return orderId;
  }
}

export default OrderModel;