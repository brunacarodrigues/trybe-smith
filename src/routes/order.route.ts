import express from 'express';
import orderController from '../controllers/order.controller';
import validateAuth from '../middleware/auth.middleware';
import validateNewOrder from '../middleware/order.middleware';

const orderRoute = express();

orderRoute.get('/orders', orderController.getAllOrders);
orderRoute.post(
  '/orders',
  validateAuth,
  validateNewOrder,
  orderController.createNewOrder,
);

export default orderRoute;