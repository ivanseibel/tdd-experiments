const truncate = require('../utils/truncate');
const request = require('supertest');
const {User} = require('../../src/app/models');
const app = require('../../src/app');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Ivan',
      email: 'ivan@gmail.com',
      password: '123456'
    })
    
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid password', async () => {
    const user = await User.create({
      name: 'Ivan',
      email: 'ivan@gmail.com',
      password: '123456'
    })
    
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '12345'
      });

    expect(response.status).toBe(401);
  });

  it('should not authenticate with invalid email', async () => {
    const user = await User.create({
      name: 'Ivan',
      email: 'ivan@gmail.com',
      password: '123456'
    })
    
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'user@email.com',
        password: '123456'
      });

    expect(response.status).toBe(404);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await User.create({
      name: 'Ivan',
      email: 'ivan@gmail.com',
      password: '123456'
    })
    
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });



    expect(response.body).toHaveProperty('token');
  });


})
