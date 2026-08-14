const express = require('express');
const router = express.Router();
const quangCaoController = require('../controllers/quangCaoController');

router.get('/', quangCaoController.getAll);
router.get('/:id', quangCaoController.getById);
router.post('/', quangCaoController.create);
router.put('/:id', quangCaoController.update);
router.delete('/:id', quangCaoController.remove);

module.exports = router;
