import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import productModel from '../../../src/database/models/product.model';
import productService from '../../../src/services/product.service';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';
import listProductsMock from '../../mocks/listProducts.mock';

chai.use(chaiHttp);

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

});
