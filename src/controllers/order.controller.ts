import { Request, Response } from 'express';
import orderService from '../services/order.service';

const getAllOrders = async (req: Request, res: Response) => {
  const allOrders = await orderService.getAllOrders();

  return res.status(200).json(allOrders);
};

const orderController = {
  getAllOrders,
};

export default orderController;