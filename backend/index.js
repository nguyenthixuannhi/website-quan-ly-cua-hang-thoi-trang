const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger-docs');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const testRoutes = require('./src/routes/testRoutes');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/test', testRoutes);

app.use('/img', )




const { sequelize } = require('./src/models');



async function start() {
  try {
    await sequelize.authenticate();
    console.log('[DB] Sequelize connected successfully');
  } catch (err) {
    console.error('[DB] Sequelize connection failed:', err.message);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start();

