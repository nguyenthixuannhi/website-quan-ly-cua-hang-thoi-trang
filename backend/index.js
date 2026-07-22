const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger-docs');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const testRoutes = require('./src/routes/testRoutes');
const danhMucRoutes = require('./src/routes/danhMucRoutes');
const sanPhamRoutes = require('./src/routes/sanPhamRoutes');
const uiRoutes = require('./src/routes/uiRoutes');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/test', testRoutes);
app.use('/danhmuc', danhMucRoutes);
app.use('/sanpham', sanPhamRoutes);
app.use('/ui', uiRoutes);




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

