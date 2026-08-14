const express = require('express');
const router = express.Router();
const donNhapHangController = require('../controllers/donNhapHangController');

router.get('/', donNhapHangController.getAll);
router.get('/:id', donNhapHangController.getById);
router.post('/', donNhapHangController.create);
router.put('/:id', donNhapHangController.update);
router.delete('/:id', donNhapHangController.remove);

module.exports = router;
