const express = require('express');
const router = express.Router();
const phieuGiaoHangController = require('../controllers/phieuGiaoHangController');

router.get('/', phieuGiaoHangController.getAll);
router.get('/:id', phieuGiaoHangController.getById);
router.post('/', phieuGiaoHangController.create);
router.put('/:id', phieuGiaoHangController.update);
router.delete('/:id', phieuGiaoHangController.remove);

module.exports = router;