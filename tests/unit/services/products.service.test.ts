import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/Product.mock';
import listProductsMock from '../../mocks/listProducts.mock';

chai.use(chaiHttp);

describe('ProductsService', function () {
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

  it('retorna todos os produtos cadastrados', async function () {
    const allProducts = productModel.bulkBuild(listProductsMock.mockListProducts)
    sinon.stub(productModel, 'findAll').resolves(allProducts)

    const response = await chai.request(app).get('/products').send()
    expect(response.status).to.be.equal(200)
  })

});
