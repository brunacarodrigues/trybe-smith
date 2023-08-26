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

  const OrderWithProducts = orders.map((order) => ({
    id: order.dataValues.id,
    userId: order.dataValues.userId,
    productIds: order.dataValues.productIds?.map((product) => product.id) || [],
  }));

  return OrderWithProducts;
};

const ordersService = {
  getAllOrders,
};

export default ordersService;