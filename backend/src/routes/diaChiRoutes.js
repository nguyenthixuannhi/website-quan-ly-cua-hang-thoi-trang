const express = require('express');
const router = express.Router();
const diaChiController = require('../controllers/diaChiController');

router.get('/', diaChiController.getAll);
router.get('/:id', diaChiController.getById);
router.post('/', diaChiController.create);
router.put('/:id', diaChiController.update);
router.delete('/:id', diaChiController.remove);

module.exports = router;