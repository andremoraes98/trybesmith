import { Pool } from 'mysql2/promise';
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
}

export default ProductModel;