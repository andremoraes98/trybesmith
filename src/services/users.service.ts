import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connection from '../models/connection';
import UserModel from '../models/users.model';
import { User, Credentials } from '../interfaces/user.interface';

dotenv.config();
const SECRET = 'secret';

class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async create(user: User): Promise<void> {
    await this.userModel.create(user);
  }

  public generateToken = (username: string): string => {
    const payload = { username };
    const token = jwt.sign(payload, SECRET);
    return token;
  };

  public getUsernameFromToken = (token: string) => {
    const { username } = jwt.verify(token, SECRET);
    return username;
  };

  public async getAll(): Promise<User[]> {
    const result = await this.userModel.getAll();

    return result;
  }

  public async getCredentialsWhereUsername(username: string): Promise<Credentials> {
    const result = await this.userModel.getCredentialsWhereUsername(username);

    return result;
  }

  public async getIdWhereUsername(username: string): Promise<number> {
    const result = await this.userModel.getIdWhereUsername(username);

    const { id } = result;
    return id as number;
  }
}

export default UserService;