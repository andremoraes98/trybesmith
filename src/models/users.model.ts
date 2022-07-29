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
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection.query(
      'SELECT id, username, classe, level, password FROM Trybesmith.Users',
    );

    const [rows] = result;
    return rows as User[];
  }
}

export default UserModel;