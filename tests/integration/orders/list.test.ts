import sinon, { SinonStub } from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Request, Response, NextFunction } from 'express';
import validateNewOrder from '../../../src/middleware/order.middleware';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('deve retornar erro para userId inválido', async () => {
    const mockRequest = {
      body: {
        userId: 'invalidUserId',
        productIds: [1, 2],
      },
    } as unknown as Request;

    const mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    const mockNext = sinon.stub() as unknown as NextFunction;

    await validateNewOrder(mockRequest, mockResponse, mockNext);

    expect((mockResponse.status as unknown as SinonStub).calledOnceWithExactly(422)).to.be.true;
    expect((mockResponse.json as SinonStub).calledOnceWithExactly({ message: '"userId" must be a number' })).to.be.true;
    expect((mockNext as SinonStub).notCalled).to.be.true;
  });

  it('deve retornar erro para productIds inválidos', async () => {
    const mockRequest = {
      body: {
        userId: 1,
        productIds: 'invalidProductIds',
      },
    } as Request;

    const mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    const mockNext = sinon.stub() as unknown as NextFunction;

    await validateNewOrder(mockRequest, mockResponse, mockNext);

    expect((mockResponse.status as SinonStub).calledOnceWithExactly(422)).to.be.true;
    expect((mockResponse.json as SinonStub).calledOnceWithExactly({ message: '"productIds" must be an array' })).to.be.true;
    expect((mockNext as SinonStub).notCalled).to.be.true;
  });

  it('deve retornar erro para productIds vazio', async () => {
    const mockRequest = {
      body: {
        userId: 1,
        productIds: [],
      },
    } as Request;

    const mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    const mockNext = sinon.stub() as unknown as NextFunction;

    await validateNewOrder(mockRequest, mockResponse, mockNext);

    expect((mockResponse.status as SinonStub).calledOnceWithExactly(422)).to.be.true;
    expect((mockResponse.json as SinonStub).calledOnceWithExactly({ message: '"productIds" must include only numbers' })).to.be.true;
    expect((mockNext as SinonStub).notCalled).to.be.true;
  });
});
