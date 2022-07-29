import connection from '../models/connection';
import UserModel from '../models/users.model';
import User from '../interfaces/user.interface';

class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async create(user: User): Promise<void> {
    await this.userModel.create(user);
  }
}

export default UserService;