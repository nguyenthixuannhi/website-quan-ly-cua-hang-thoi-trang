const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Swagger available at http://localhost:${port}/api-docs`);
});
