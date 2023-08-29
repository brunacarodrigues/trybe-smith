import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response, NextFunction } from 'express';
import middleware from '../../../src/middleware/product.middleware';

chai.use(sinonChai);

describe('ProductsController', function () {
  const { validateProduct, validatePrice } = middleware;
  const req = {} as Request;
  const res = {} as Response;
  const next: NextFunction = () => {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('retorna sucesso se o nome for passado corretamente', () => {
    req.body = {
      price: "300",
      orderId: 2
    }

    validateProduct(req, res, next);

    expect(res.status).to.have.been.calledWith(400)
  });

});
