import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import loginService from '../../../src/services/login.service';
import UserModel from '../../../src/database/models/user.model';
import { Request, Response, NextFunction } from 'express';
import validateAuth from '../../../src/middleware/auth.middleware';
import jwt from 'jsonwebtoken';

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

  it('deve retornar erro se o token for inválido', () => {
    const token = 'invalidToken';
    const authorizationHeader = `Bearer ${token}`;
    const req = {
      headers: { authorization: authorizationHeader },
    } as unknown as Request;
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;
    const next: NextFunction = sinon.stub() as unknown as NextFunction;

    const verifyStub: SinonStub<[string, string], jwt.JwtPayload> = sinon.stub(jwt, 'verify') as any;
    verifyStub.throws(new Error());

    validateAuth(req, res as Response, next);

    expect((res.status as SinonStub).firstCall.args[0]).to.equal(401);
    expect((res.json as SinonStub).calledOnceWith({ message: 'Invalid token' })).to.be.true;
    expect((next as SinonStub).notCalled).to.be.true;

    sinon.restore();
  });
});