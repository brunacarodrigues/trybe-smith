import sinon, { SinonStub } from 'sinon';
import app from '../../../src/app';
import { expect } from 'chai';
import orderService from '../../../src/services/order.service';
import orderModel, { OrderSequelizeModel } from '../../../src/database/models/order.model';
import productModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import request from 'supertest';

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

  it('cria uma nova order com sucesso', async function () {

    const mockOrder = orderModel.build({ userId: 1 });
    const mockUser = UserModel.build({
      id: 1,
      username: 'Luke Ghostwalker',
      vocation: 'Jedi do futuro',
      level: 369,
      password: 'hashed_password',
    });

    sinon.stub(orderModel, 'create').resolves(mockOrder);
    sinon.stub(jwt, 'verify').resolves();
    sinon.stub(productModel, 'update').resolves([1]);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(UserModel, 'findOne').resolves(mockUser);


    const response = await request(app)
      .post('/orders')
      .send({ userId: 1, productIds: [1, 2] })
      .set('Authorization', '123456');

 
    expect(response.status).to.equal(201);
    sinon.restore();
  });
});