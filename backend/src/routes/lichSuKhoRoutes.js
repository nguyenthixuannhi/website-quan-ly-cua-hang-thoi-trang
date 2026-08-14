const express = require('express');
const router = express.Router();
const lichSuKhoController = require('../controllers/lichSuKhoController');

router.get('/', lichSuKhoController.getAll);
router.get('/:id', lichSuKhoController.getById);
router.post('/', lichSuKhoController.create);
router.put('/:id', lichSuKhoController.update);
router.delete('/:id', lichSuKhoController.remove);

module.exports = router;
