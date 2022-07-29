import connection from '../models/connection';
import UserModel from '../models/users.model';

class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }
}

export default UserService;