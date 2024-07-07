// tests/auth.spec.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app');
const User = require('../models/user.model');

const { expect } = chai;

chai.use(chaiHttp);

describe('Authentication', () => {
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const userStub = sinon.stub(User, 'create').resolves({
        userId: 'test123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
      });

      const res = await chai.request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          phone: '1234567890'
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.property('firstName').to.equal('John');

      sinon.restore();
    });
  });

  // Add more tests using sinon for other scenarios
});
