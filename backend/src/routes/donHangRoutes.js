const express = require('express');
const router = express.Router();
const donHangController = require('../controllers/donHangController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', donHangController.getAll);
router.get('/user/:id', authMiddleware, donHangController.getByUserId);
router.get('/:id', donHangController.getById);
router.post('/', donHangController.create);
router.put('/:id', donHangController.update);
router.delete('/:id', donHangController.remove);

module.exports = router;
