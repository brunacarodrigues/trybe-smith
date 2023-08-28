import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

});
