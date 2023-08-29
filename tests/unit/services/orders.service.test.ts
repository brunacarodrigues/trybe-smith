import { expect } from 'chai';
import sinon from 'sinon';
import orderService from '../../../src/services/order.service';
import orderModel, { OrderSequelizeModel } from '../../../src/database/models/order.model';
import productModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('retorna todas as orders com os respectivos productId', async () => {
    const mockOrders = [
      {
        dataValues: {
          id: 1,
          userId: 1,
          productIds: [{ id: 101 }, { id: 102 }],
        },
      },
    ] as OrderSequelizeModel[];

    sinon.stub(orderModel, 'findAll').resolves(mockOrders);
    sinon.stub(productModel, 'findAll').resolves([]);

    const result = await orderService.getAllOrders();

    expect(result).to.deep.equal([
      {
        id: 1,
        userId: 1,
        productIds: [101, 102],
      },
    ]);

    sinon.restore();
  });
  });
