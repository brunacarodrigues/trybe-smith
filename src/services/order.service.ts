import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

const getAllOrders = async (): Promise<unknown[]> => {
  const orders = await OrderModel.findAll({
    include: [
      {
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });

  const orderWithProducts = orders.map((order) => ({
    id: order.dataValues.id,
    userId: order.dataValues.userId,
    productIds: order.dataValues.productIds?.map((product) => product.id),
  }));

  return orderWithProducts;
};

interface Order {
  id: number;
}

const createOrder = async (userId: number): Promise<unknown> => OrderModel.create({ userId });

const updateProduct = async (productIds: number[], orderId: number):Promise<void> => {
  const updatePromises = productIds.map((productId) =>
    ProductModel.update({ orderId }, { where: { id: productId } }));
  await Promise.all(updatePromises);
};

const createNewOrder = async (userId: number, productIds: number[]): Promise<unknown> => {
  const newOrder = await createOrder(userId);
  await updateProduct(productIds, (newOrder as Order).id);

  return { userId, productIds };
};

const ordersService = {
  getAllOrders,
  createOrder,
  createNewOrder,
  updateProduct,
};

export default ordersService;