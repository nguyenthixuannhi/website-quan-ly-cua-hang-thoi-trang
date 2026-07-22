const express = require('express');
const router = express.Router();
const uiController = require('../controllers/uiController');

router.get('/banners', uiController.getBanners);
router.get('/quang-cao', uiController.getQuangCao);

module.exports = router;

