const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// simple multer storage to backend/uploads/user
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const dest = path.join(__dirname, '../../uploads/user');
		try { require('fs').mkdirSync(dest, { recursive: true }); } catch (e) { }
		cb(null, dest);
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname) || '';
		const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
		cb(null, name);
	}
});
const upload = multer({ storage });

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.createUser);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

// profile routes for logged in user
router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, userController.updateMe);
router.post('/me/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);

module.exports = router;

