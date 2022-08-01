import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { User, Credentials, Indexable } from '../interfaces/user.interface';

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

  public async getCredentialsWhereUsername(username: string): Promise<Credentials> {
    const result = await this.connection.query<RowDataPacket[]>(
      `SELECT
        username, password
      FROM Trybesmith.Users
      WHERE username=?`,
      [username],
    );

    const [[row]] = result;
    return row as Credentials;
  }

  public async getIdWhereUnsername(username:string): Promise<Indexable> {
    const result = await this.connection.query<RowDataPacket[]>(
      'SELECT id FROM Trybesmith.Users WHERE username=?',
      [username],
    );

    const [[row]] = result;
    return row as Indexable;
  }
}

export default UserModel;