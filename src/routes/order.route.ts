import express from 'express';
import orderController from '../controllers/order.controller';

const orderRoute = express();

orderRoute.get('/orders', orderController.getAllOrders);

export default orderRoute;