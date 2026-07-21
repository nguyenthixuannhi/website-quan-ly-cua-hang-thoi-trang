const express = require('express');
const router = express.Router();
const danhMucController = require('../controllers/danhMucController');

router.get('/', danhMucController.getAll);

module.exports = router;

