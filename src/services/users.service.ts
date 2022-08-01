import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connection from '../models/connection';
import UserModel from '../models/users.model';
import { User, Credentials } from '../interfaces/user.interface';

dotenv.config();

class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async create(user: User): Promise<void> {
    await this.userModel.create(user);
  }

  public generateToken = (username: string): string => {
    const payload = { data: { username } };
    const secret = process.env.JWT_PASSWORD || 'secret';
    const token = jwt.sign(payload, secret);
    return token;
  };

  public async getAll(): Promise<User[]> {
    const result = await this.userModel.getAll();

    return result;
  }

  public async getCredentialsWhereUsername(username: string): Promise<Credentials> {
    const result = await this.userModel.getCredentialsWhereUsername(username);

    return result;
  }
}

export default UserService;