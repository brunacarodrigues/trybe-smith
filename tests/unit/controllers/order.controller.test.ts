import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderService from '../../../src/services/order.service';
import orderController from '../../../src/controllers/order.controller';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('retorna todas as orders', async () => {
    const mockOrders = [
      {
        id: 1,
        userId: 1,
        productIds: [101, 102],
      },
    ];

    sinon.stub(orderService, 'getAllOrders').resolves(mockOrders);

    const mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await orderController.getAllOrders({} as any, mockResponse as any);

    expect(mockResponse.status.calledWith(200)).to.be.true;
    expect(mockResponse.json.calledWith(mockOrders)).to.be.true;

    sinon.restore();
  });

});
