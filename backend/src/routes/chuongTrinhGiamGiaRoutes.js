const express = require('express');
const router = express.Router();
const chuongTrinhGiamGiaController = require('../controllers/chuongTrinhGiamGiaController');

router.get('/', chuongTrinhGiamGiaController.getAll);
router.get('/:id', chuongTrinhGiamGiaController.getById);
router.post('/', chuongTrinhGiamGiaController.create);
router.put('/:id', chuongTrinhGiamGiaController.update);
router.delete('/:id', chuongTrinhGiamGiaController.remove);

module.exports = router;
