const express = require('express');
const router = express.Router();
const nhaCungCapController = require('../controllers/nhaCungCapController');

router.get('/', nhaCungCapController.getAll);
router.get('/:id', nhaCungCapController.getById);
router.post('/', nhaCungCapController.create);
router.put('/:id', nhaCungCapController.update);
router.delete('/:id', nhaCungCapController.remove);

module.exports = router;
