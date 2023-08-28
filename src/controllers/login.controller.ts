import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const data = await loginService.login({ username, password });

  if (data.status === 401) {
    return res.status(data.status).json({ message: data.message });
  }
  return res.status(data.status).json({ token: data.message });
};

export default login;