const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const backupController = require('../controllers/backupController');

const router = express.Router();

router.post('/create', authMiddleware, backupController.createBackup);

module.exports = router;
