const express = require('express');
const router = express.Router();
const danhMucController = require('../controllers/danhMucController');

router.get('/', danhMucController.getDanhMucAll);

module.exports = router;

