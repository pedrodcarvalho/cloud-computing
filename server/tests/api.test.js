const request = require('supertest');
const app = require('../app');
let server;

beforeAll(() => {
  server = app.listen(5001, () => console.log('Test server running on port 5001'));
});

afterAll(() => {
  server.close();
});

describe('API Tests', () => {
  test('GET /api/health - should return healthy status', async () => {
    const res = await request(server).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('API is healthy');
  });

  test('POST /api/test - should create test data', async () => {
    const data = { name: 'Test User' };
    const res = await request(server).post('/api/test').send(data);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Test data created');
    expect(res.body.data.name).toBe('Test User');
  });
});
