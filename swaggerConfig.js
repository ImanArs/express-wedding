const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wedding Guests API',
      version: '1.0.0',
      description: 'API for managing wedding guests',
    },
    servers: [
      {
        url: 'https://airim6.pythonanywhere.com:8080',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
