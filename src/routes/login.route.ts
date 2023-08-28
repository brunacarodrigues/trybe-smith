import express from 'express';
import login from '../controllers/login.controller';
import validateLogin from '../middleware/login.middleware';

const loginRoute = express();

loginRoute.post('/', validateLogin, login);

export default loginRoute;