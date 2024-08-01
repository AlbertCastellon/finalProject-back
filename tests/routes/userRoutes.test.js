const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db');

afterAll(async () => {
  await pool.end();
});

describe('User Routes', () => {
  it('GET /api/usuarios should return all users', async () => {
    const response = await request(app).get('/api/usuarios');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('POST /register should create a new user', async () => {
    const newUser = {
      nombre: 'Test',
      primer_apellido: 'User',
      email: 'testuser@example.com',
      username: 'testuser',
      password: 'password123'
    };
    const response = await request(app)
      .post('/register')
      .send(newUser);
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/');
  });

  it('POST /login should login a user and return a token', async () => {
    const loginUser = {
      username: 'testuser',
      password: 'password123'
    };
    const response = await request(app)
      .post('/login')
      .send(loginUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userId');
  });
});
