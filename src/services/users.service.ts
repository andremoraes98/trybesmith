import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connection from '../models/connection';
import UserModel from '../models/users.model';
import { Username, User, Credentials, Indexable } from '../interfaces/user.interface';

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
    const payload = { data: { username } };
    const token = jwt.sign(payload, SECRET);
    return token;
  };

  public getUsernameFromToken = (token: string): Username => {
    const { data }: any = jwt.verify(token, SECRET);

    return data as Username;
  };

  public async getAll(): Promise<User[]> {
    const result = await this.userModel.getAll();

    return result;
  }

  public async getCredentialsWhereUsername(username: string): Promise<Credentials> {
    const result = await this.userModel.getCredentialsWhereUsername(username);

    return result;
  }

  public async getIdWhereUsername(username: string): Promise<Indexable | undefined> {
    const result = await this.userModel.getIdWhereUsername(username);

    return result;
  }
}

export default UserService;