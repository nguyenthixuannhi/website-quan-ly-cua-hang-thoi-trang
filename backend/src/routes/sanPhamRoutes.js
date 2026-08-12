const express = require('express');
const router = express.Router();
const sanPhamController = require('../controllers/sanPhamController');


// Tìm kiếm và lọc sản phẩm (Phải đặt trước /:id)
router.get('/search', sanPhamController.searchAndFilterSanPham);

// Lấy chi tiết sản phẩm theo ID
router.get('/:id', sanPhamController.getSanPhamById);
// Lấy danh sách tất cả sản phẩm

router.get('/', sanPhamController.getSanPhamAll);

module.exports = router;