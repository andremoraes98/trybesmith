import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';

class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<void> {
    const { username, classe, level, password } = user;
    await this.connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount, orderId) VALUES(?, ?, ?, ?)',
      [username, classe, level, password],
    );
  }
}

export default UserModel;