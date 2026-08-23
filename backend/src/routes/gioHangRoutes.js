const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const gioHangController = require('../controllers/gioHangController');

// All cart routes require login
router.use(authMiddleware);

// Get current user's cart
router.get('/', gioHangController.getCart);

// Count total quantity of items in current user's cart
router.get('/count', gioHangController.countCartItems);

// Delete all items from current user's cart
router.delete('/', gioHangController.clearCart);

module.exports = router;