import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('o login é efetuado com sucesso', async function () {
    const user = {
      username: 'Helga',
      password: 'valquíria',
    };

    const response = await chai.request(app).post('/login').send({ username: 'Helga', password: 'valquíria' });
    expect(response.status).to.equal(200);
  });

  it('retorna erro se o password estiver errado', async function() {
    const user = {
      username: 'Hagar',
      password: 'normalize'
    };

    const passError = await chai.request(app).post('/login').send(user);
    expect(passError.status).to.be.equal(401);
    expect(passError.body).to.be.deep.equal({ message: 'Username or password invalid'});
  });
});
