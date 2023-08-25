import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('O produto foi cadastrado com sucesso', async function () {
    const product = productModel.build({ name: 'Excalibur', price: '900', orderId: 1 })
    sinon.stub(productModel, 'create').resolves(product)
  
    const response = await chai.request(app).post('/products').send({
      name: 'Excalibur', price: '900', orderId: 1
    })
  
    expect(response.status).to.be.equal(201)
  })
});
