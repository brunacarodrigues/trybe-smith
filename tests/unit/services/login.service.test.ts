import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import loginService from '../../../src/services/login.service';
import UserModel from '../../../src/database/models/user.model';
import * as authService from '../../../src/services/auth.service';


describe('LoginService', function () {
  const { login } = loginService;

  afterEach(function () {
    sinon.restore();
  });

  it('deve retornar erro para credenciais inválidas', async () => {
    const loginData = {
      username: 'invalidUsername',
      password: 'invalidPassword',
    };

    const findOneStub = sinon.stub(UserModel, 'findOne').resolves(null);

    const result = await login(loginData);

    expect(findOneStub.calledOnceWithExactly({ where: { username: loginData.username } })).to.be.true;
    expect(result).to.deep.equal({ status: 401, message: 'Username or password invalid' });

    findOneStub.restore();
  });
 
  it('deve retornar erro para senha inválida', async () => {
    const loginData = {
      username: 'validUsername',
      password: 'invalidPassword',
    };

    const userResponse = {
      id: 1,
      username: loginData.username,
      password: bcrypt.hashSync('validPassword', 10),
      toJSON: () => ({ id: 1, username: 'validUsername', password: 'hashedPassword' }), // Simulando um método toJSON
    };

    const findOneStub = sinon.stub(UserModel, 'findOne').resolves(userResponse as any);
    const compareSyncStub = sinon.stub(bcrypt, 'compareSync').returns(false);

    const result = await login(loginData);

    expect(findOneStub.calledOnceWithExactly({ where: { username: loginData.username } })).to.be.true;
    expect(compareSyncStub.calledOnceWithExactly(loginData.password, userResponse.password)).to.be.false;
    expect(result).to.deep.equal({ status: 401, message: 'Username or password invalid' });

    findOneStub.restore();
    compareSyncStub.restore();
  });
  
});