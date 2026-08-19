const express = require('express');
const router = express.Router();
const sanPhamController = require('../controllers/sanPhamController');

router.get('/search', sanPhamController.searchAndFilterSanPham);
router.get('/related/:id', sanPhamController.getRelatedProducts);
router.get('/', sanPhamController.getAll);
router.get('/:id', sanPhamController.getById);
router.post('/', sanPhamController.create);
router.put('/:id', sanPhamController.update);
router.delete('/:id', sanPhamController.remove);

module.exports = router;