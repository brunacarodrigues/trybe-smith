import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productMock from '../../mocks/product.mock';
import productModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('o produto foi cadastrado com sucesso', async function () {
    const result = productModel.build(productMock.mockOneProduct);
    sinon.stub(productModel, 'create').resolves(result);

    const response = await chai
      .request(app)
      .post('/products')
      .send(productMock.mockOneProduct);

    expect(response).to.have.status(201);
  })
});
