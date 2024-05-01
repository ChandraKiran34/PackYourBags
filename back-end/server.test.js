import request from 'supertest';
import app from './server'; // Assuming your Express app is defined in app.js

describe('Traveller Routes', () => {
  describe('POST /register', () => {
    it('should register a new traveller', async () => {
      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        phoneNumber: '1234567890',
        address: '123 Street, City'
      };

      const response = await request(app).post('/register').send(requestBody);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Traveller registered successfully');
    });
  });

  describe('POST /login', () => {
    it('should login a traveller', async () => {
      const requestBody = {
        email: 'john@example.com',
        password: 'password'
      };

      const response = await request(app).post('/login').send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  // Add similar tests for other routes
});
