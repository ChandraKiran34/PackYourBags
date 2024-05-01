import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pack Your Bags API',
      version: '1.0.0',
      description: 'APIs for our website',
    },
    servers: [
      {
        url: 'http://localhost:9000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

export default specs;
