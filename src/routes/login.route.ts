import express from 'express';
import loginController from '../controllers/login.controller';
import validateLogin from '../middleware/login.middleware';

const loginRoute = express();

loginRoute.post('/', validateLogin, loginController.login);

export default loginRoute;