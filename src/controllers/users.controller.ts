import { Request, Response } from 'express';
import User from '../interfaces/user.interface';
import UserService from '../services/users.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user: User = req.body;

    await this.userService.create(user);
    const token = this.userService.generateToken(user.username);

    return res.status(201).json({ token });
  };
}

export default UserController;