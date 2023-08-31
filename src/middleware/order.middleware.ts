import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/user.model';

interface ValidationResult {
  status: number;
  message: { message: string };
}

const validateUserId = async (userId: unknown): Promise<ValidationResult | null> => {
  if (userId === undefined) {
    return { status: 400, message: { message: '"userId" is required' } };
  }
  if (typeof userId !== 'number') {
    return { status: 422, message: { message: '"userId" must be a number' } };
  }
  if (!await UserModel.findOne({ where: { id: userId } })) {
    return { status: 404, message: { message: '"userId" not found' } };
  }
  return null;
};

const validateProductIds = (productIds: unknown): ValidationResult | null => {
  if (productIds === undefined) {
    return { status: 400, message: { message: '"productIds" is required' } };
  }
  if (!Array.isArray(productIds)) {
    return { status: 422, message: { message: '"productIds" must be an array' } };
  }
  if (productIds.length === 0 || !productIds.every((id) => typeof id === 'number')) {
    return { status: 422, message: { message: '"productIds" must include only numbers' } };
  }
  return null;
};

const validateNewOrder = async (req: Request, res: Response, next: NextFunction):
Promise<unknown> => {
  const { userId, productIds } = req.body;

  const userValidResult = await validateUserId(userId);
  if (userValidResult) {
    return res.status(userValidResult.status).json(userValidResult.message);
  }

  const productValidResult = validateProductIds(productIds);
  if (productValidResult) {
    return res.status(productValidResult.status).json(productValidResult.message);
  }

  next();
};

export default validateNewOrder;