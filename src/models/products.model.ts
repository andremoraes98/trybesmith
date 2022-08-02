import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection.query(
      'SELECT id, name, amount, orderId FROM Trybesmith.Products',
    );

    const [rows] = result;

    return rows as Product[];
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount, orderId } = product;
    const result = await this.connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES(?, ?);',
      [name, amount, orderId],
    );
    
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  public async updateOrderIdWhereProductId(orderId:number, productId: number): Promise<void> {
    await this.connection.query(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?;',
      [orderId, productId],
    );
  }
}

export default ProductModel;