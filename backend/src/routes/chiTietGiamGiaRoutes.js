const express = require('express');
const router = express.Router();
const chiTietGiamGiaController = require('../controllers/chiTietGiamGiaController');

router.get('/', chiTietGiamGiaController.getAll);
router.get('/:id', chiTietGiamGiaController.getById);
router.post('/', chiTietGiamGiaController.create);
router.put('/:id', chiTietGiamGiaController.update);
router.delete('/:id', chiTietGiamGiaController.remove);

module.exports = router;
