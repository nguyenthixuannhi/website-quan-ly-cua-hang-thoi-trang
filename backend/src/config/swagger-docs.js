const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Store Management API',
    version: '1.0.0',
    description: 'Backend API documentation for the store management system.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id_nguoi_dung: { type: 'integer' },
          email: { type: 'string' },
          vai_tro: { type: 'string' },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['id_nguoi_dung', 'email', 'mat_khau', 'vai_tro'],
        properties: {
          id_nguoi_dung: { type: 'integer' },
          email: { type: 'string' },
          mat_khau: { type: 'string', format: 'password' },
          vai_tro: { type: 'string' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'mat_khau'],
        properties: {
          email: { type: 'string' },
          mat_khau: { type: 'string', format: 'password' },
        },
      },
      DanhMuc: {
        type: 'object',
        properties: {
          id_danh_muc: { type: 'integer' },
          ten_danh_muc: { type: 'string' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '400': { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '409': { description: 'Email exists' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'OK (returns token)' },
          '400': { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Invalid credentials' },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Create new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '400': { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '500': { description: 'Server error' },
        },
      },
    },
    '/test/dbconnect': {
      get: {
        tags: ['Test'],
        summary: 'Test database connection',
        responses: {
          '200': { description: 'Database connection OK' },
          '500': { description: 'Database connection failed', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/danhmuc': {
      get: {
        tags: ['DanhMuc'],
        summary: 'Get all danh muc categories',
        responses: {
          '200': {
            description: 'List of danh muc categories',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/DanhMuc' },
                },
              },
            },
          },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
  },
};

module.exports = swaggerDocs;
