import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';

const { JWT_SECRET = 'jwt_secret' } = process.env;

const createToken = (userId: number, username: string): string => 
  jwt.sign({ id: userId, username }, JWT_SECRET);

const login = async (user: { username: string; password: string }): 
Promise<{ status: number; message: string }> => {
  const { username, password } = user;

  const userData = await UserModel.findOne({ where: { username } });

  if (!userData || !bcrypt.compareSync(password, userData.dataValues.password)) {
    return { status: 401, message: 'Username or password invalid' };
  }
  const token = createToken(userData.dataValues.id, username);
  return { status: 200, message: token };
};

const loginService = {
  login,
};

export default loginService;