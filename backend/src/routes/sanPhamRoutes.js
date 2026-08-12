const express = require('express');
const router = express.Router();
const sanPhamController = require('../controllers/sanPhamController');

// Route lấy danh sách sản phẩm
router.get('/', sanPhamController.getSanPhamAll);

// Route lấy chi tiết sản phẩm theo ID
router.get('/:id', sanPhamController.getSanPhamById);

module.exports = router;