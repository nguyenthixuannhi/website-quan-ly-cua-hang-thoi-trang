const express = require('express');
const { sequelize } = require('../models');

const router = express.Router();

router.get('/dbconnect', async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({ status: 'ok', message: 'DB connection successful' });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: 'DB connection failed',
      error: err.message,
    });
  }
});

module.exports = router;

