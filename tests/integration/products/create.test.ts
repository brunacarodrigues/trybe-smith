import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productMock from '../../mocks/product.mock';
import productModel from '../../../src/database/models/product.model';
import app from '../../../src/app';
import errorsProductsMock from '../../mocks/errorsProducts.mock';

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

  it('retorna um erro ao não enviar um nome no formato de string', async function () {
    const result = await chai.request(app).post('/products').send(errorsProductsMock.nameError);

    expect(result.status).to.equal(422);
  })

  it('retorna um erro ao não enviar um nome no tamanho correto', async function () {
    const result = await chai.request(app).post('/products').send(errorsProductsMock.lengthNameError);

    expect(result.status).to.equal(422);
  })

  it('retorna um erro ao não enviar um nome', async function () {
    const result = await chai.request(app).post('/products').send(errorsProductsMock.nameOut);

    expect(result.status).to.equal(400);
  })

  it('retorna um erro ao não enviar um preço no formato de string', async function () {
    const result = await chai.request(app).post('/products').send(errorsProductsMock.priceError);

    expect(result.status).to.equal(422);
  })

  it('retorna um erro ao não enviar um preço', async function () {
    const result = await chai.request(app).post('/products').send(errorsProductsMock.productOutPrice);

    expect(result.status).to.equal(400);
  })

  it('retorna um erro ao não enviar um preço no tamanho correto', async function () {
    const result = await chai.request(app).post('/products').send(errorsProductsMock.lengthPriceError);

    expect(result.status).to.equal(422);
  })
});