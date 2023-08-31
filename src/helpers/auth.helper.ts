import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/TokenPayload';

const secret = process.env.JWT_SECRET || 'secret';

const createToken = (payload: TokenPayload): string => jwt.sign(payload, secret);

const checkToken = (token: string): unknown => jwt.verify(token, secret);

export {
  createToken,
  checkToken,
};