const express = require('express');
const router = express.Router();
const danhMucController = require('../controllers/danhMucController');

router.get('/', danhMucController.getAll);
router.get('/:id', danhMucController.getById);
router.post('/', danhMucController.create);
router.put('/:id', danhMucController.update);
router.delete('/:id', danhMucController.remove);

module.exports = router;

