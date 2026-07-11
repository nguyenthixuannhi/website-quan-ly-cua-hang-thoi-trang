const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);

const { sequelize } = require('./src/models');


async function start() {
  try {
    await sequelize.authenticate();
    console.log('[DB] Sequelize connected successfully');
  } catch (err) {
    console.error('[DB] Sequelize connection failed:', err.message);
    // Keep server running to allow swagger/docs; comment out next line if you want hard fail
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Swagger available at http://localhost:${port}/api-docs`);
  });
}

start();

