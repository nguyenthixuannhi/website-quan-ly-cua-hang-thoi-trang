const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/chiTietGioHangController');

router.use(authMiddleware);

// Get all items in my cart
router.get('/', controller.getAll);

// Get one item from my cart
router.get('/:id', controller.getOne);

// Add item to my cart
router.post('/', controller.addItem);

// Set exact quantity
router.put('/:id', controller.updateItem);

// Increase/decrease quantity
router.patch('/:id', controller.changeQuantity);

// Remove one item
router.delete('/:id', controller.removeItem);

module.exports = router;