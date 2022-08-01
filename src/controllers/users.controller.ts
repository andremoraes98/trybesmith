import { Request, Response } from 'express';
import { User, Credentials } from '../interfaces/user.interface';
import UserService from '../services/users.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user: User = req.body;

    await this.userService.create(user);
    const token = this.userService.generateToken(user.username);

    return res.status(201).json({ token });
  };

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.userService.getAll();

    return res.status(200).json(result);
  };

  public login = async (req: Request, res: Response) => {
    const userCredential: Credentials = req.body;

    const token = this.userService.generateToken(userCredential.username);

    res.status(200).json({ token });
  };
}

export default UserController;