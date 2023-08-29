import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productModel from '../../../src/database/models/product.model';
import listProductsMock from '../../mocks/listProducts.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  
  it('retorna todos os produtos cadastrados', async function () {
    const allProducts = productModel.bulkBuild(listProductsMock.mockListProducts)
    sinon.stub(productModel, 'findAll').resolves(allProducts)

    const response = await chai.request(app).get('/products')
    expect(response.status).to.be.equal(200)
  })

});
