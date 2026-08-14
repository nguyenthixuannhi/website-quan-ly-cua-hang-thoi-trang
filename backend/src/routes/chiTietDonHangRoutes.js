const express = require('express');
const router = express.Router();
const chiTietDonHangController = require('../controllers/chiTietDonHangController');

router.get('/', chiTietDonHangController.getAll);
router.get('/:id', chiTietDonHangController.getById);
router.post('/', chiTietDonHangController.create);
router.put('/:id', chiTietDonHangController.update);
router.delete('/:id', chiTietDonHangController.remove);

module.exports = router;
