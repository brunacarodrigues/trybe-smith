import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { LoginData } from '../types/LoginData';
import { createToken } from './auth.service';

const login = async (loginData: LoginData): Promise<{ status: number, message: string }> => {
  const { username, password } = loginData;

  const user = await UserModel.findOne({ where: { username } });
  const response = user?.toJSON();

  if (!response) {
    return { status: 401, message: 'Username or password invalid' };
  }

  const validPass = bcrypt.compareSync(password, response.password);
  if (!validPass) {
    return { status: 401, message: 'Username or password invalid' };
  }

  const token = createToken({ id: response.id, username: response.username });

  return { status: 200, message: token };
};

export default {
  login,
};