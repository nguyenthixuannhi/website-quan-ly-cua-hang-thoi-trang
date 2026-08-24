const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const adminCtrl = require('../controllers/adminController');

// All admin routes require authentication + admin role
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/models', adminCtrl.listModels);
router.get('/analytics', adminCtrl.analytics);
router.get('/:model', adminCtrl.listRecords);
router.post('/:model', adminCtrl.upload.single('file'), adminCtrl.createRecord);
router.get('/:model/:id', adminCtrl.getRecord);
router.put('/:model/:id', adminCtrl.upload.single('file'), adminCtrl.updateRecord);
router.delete('/:model/:id', adminCtrl.deleteRecord);

module.exports = router;
