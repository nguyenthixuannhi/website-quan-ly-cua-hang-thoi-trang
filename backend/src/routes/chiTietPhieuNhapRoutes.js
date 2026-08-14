const express = require('express');
const router = express.Router();
const chiTietPhieuNhapController = require('../controllers/chiTietPhieuNhapController');

router.get('/', chiTietPhieuNhapController.getAll);
router.get('/:id', chiTietPhieuNhapController.getById);
router.post('/', chiTietPhieuNhapController.create);
router.put('/:id', chiTietPhieuNhapController.update);
router.delete('/:id', chiTietPhieuNhapController.remove);

module.exports = router;
