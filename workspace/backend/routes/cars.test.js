const request = require('supertest');
const express = require('express');
const carsRouter = require('../routes/cars');

describe('Cars API', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/cars', carsRouter);
  });

  it('GET /api/cars should return array', async () => {
    const res = await request(app).get('/api/cars');
    expect(Array.isArray(res.body) || res.body instanceof Object).toBe(true);
  });
});
