import { Request, Response } from 'express';
import orderService from '../services/order.service';

const getAllOrders = async (req: Request, res: Response) => {
  const allOrders = await orderService.getAllOrders();

  return res.status(200).json(allOrders);
};

const createNewOrder = async (req: Request, res: Response) => {
  const { userId, productIds } = req.body;
  const newOrder = await orderService.createNewOrder(userId, productIds);
  res.status(201).json(newOrder);
};

const orderController = {
  getAllOrders,
  createNewOrder,
};

export default orderController;