const express = require('express');
const router = express.Router();
const sanPhamController = require('../controllers/sanPhamController');

router.get('/', sanPhamController.getSanPhamAll);

module.exports = router;

