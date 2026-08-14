const express = require('express');
const router = express.Router();
const traHangController = require('../controllers/traHangController');

router.get('/', traHangController.getAll);
router.get('/:id', traHangController.getById);
router.post('/', traHangController.create);
router.put('/:id', traHangController.update);
router.delete('/:id', traHangController.remove);

module.exports = router;