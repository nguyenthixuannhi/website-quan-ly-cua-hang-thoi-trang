const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express REST API',
      version: '1.0.0',
      description: 'A structured Express API with Swagger',
    },
  },
  apis: ['./src/routes/*.js'], 
};

module.exports = swaggerJsdoc(swaggerOptions);
