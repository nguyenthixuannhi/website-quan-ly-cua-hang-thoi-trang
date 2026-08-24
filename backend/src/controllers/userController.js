const bcrypt = require('bcrypt');
const { models } = require('../models');
const fs = require('fs');
const path = require('path');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const users = await models.NguoiDung.findAll({
      order: [['id_nguoi_dung', 'ASC']],
    });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch user list',
    });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const user = await models.NguoiDung.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch user detail',
    });
  }
}

// GET /api/users/me (requires auth middleware to populate req.user)
async function getProfile(req, res) {
  try {
    const userId = req.user && req.user.id_nguoi_dung;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await models.NguoiDung.findByPk(userId, {
      attributes: ['id_nguoi_dung', 'email', 'vai_tro'],
      include: [
        { model: models.DiaChi, as: 'dia_chi' },
        {
          model: models.DonHang,
          as: 'don_hang',
          include: [
            { model: models.ChiTietDonHang, as: 'chi_tiet_don_hang' },
            { model: models.PhieuGiaoHang, as: 'phieu_giao' },
          ],
        },
      ],
    });

    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    // attach avatar URL from mapping file if present
    try {
      const avatarsFile = path.join(__dirname, '../../uploads/user/avatars.json');
      if (fs.existsSync(avatarsFile)) {
        const map = JSON.parse(fs.readFileSync(avatarsFile, 'utf8') || '{}');
        const avatarPath = map[String(userId)];
        if (avatarPath) user.dataValues.avatar = `${req.protocol}://${req.get('host')}/${avatarPath}`;
      }
    } catch (err) {
      // ignore avatar lookup errors
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch user profile' });
  }
}

// PUT /api/users/me - update current user's editable fields
async function updateMe(req, res) {
  try {
    const userId = req.user && req.user.id_nguoi_dung;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await models.NguoiDung.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    const { email, mat_khau } = req.body || {};
    if (email) user.email = email;
    if (mat_khau) user.mat_khau = await bcrypt.hash(mat_khau, 10);

    await user.save();
    return res.status(200).json({ id_nguoi_dung: user.id_nguoi_dung, email: user.email, vai_tro: user.vai_tro });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update profile' });
  }
}

// POST /api/users/me/avatar - upload avatar image (multipart/form-data file: avatar)
async function uploadAvatar(req, res) {
  try {
    const userId = req.user && req.user.id_nguoi_dung;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const uploadsRelPath = `uploads/user/${req.file.filename}`;

    // ensure mapping file dir exists
    const uploadsDir = path.join(__dirname, '../../uploads/user');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const mapFile = path.join(__dirname, '../../uploads/user/avatars.json');
    let map = {};
    if (fs.existsSync(mapFile)) {
      try { map = JSON.parse(fs.readFileSync(mapFile, 'utf8') || '{}'); } catch (e) { map = {}; }
    }
    map[String(userId)] = uploadsRelPath;
    fs.writeFileSync(mapFile, JSON.stringify(map, null, 2));

    return res.status(201).json({ avatar: `${req.protocol}://${req.get('host')}/${uploadsRelPath}` });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to upload avatar' });
  }
}

async function createUser(req, res) {
  try {
    const { id_nguoi_dung, email, mat_khau, vai_tro } = req.body || {};

    if (!email || !mat_khau || !vai_tro) {
      return res.status(400).json({
        message: 'Missing required fields: email, mat_khau, vai_tro',
      });
    }

    const existing = await models.NguoiDung.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    const created = await models.NguoiDung.create({
      id_nguoi_dung: id_nguoi_dung ?? (await getNextId(models.NguoiDung, 'id_nguoi_dung')),
      email,
      mat_khau: hashedPassword,
      vai_tro,
    });

    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to create user',
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { email, mat_khau, vai_tro } = req.body || {};

    const user = await models.NguoiDung.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    if (email) user.email = email;
    if (vai_tro) user.vai_tro = vai_tro;
    if (mat_khau) user.mat_khau = await bcrypt.hash(mat_khau, 10);

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to update user',
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const user = await models.NguoiDung.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    await user.destroy();
    return res.status(200).json({ message: 'Xóa người dùng thành công' });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to delete user',
    });
  }
}

module.exports = {
  getAll,
  getById,
  getProfile,
  updateMe,
  uploadAvatar,
  create: createUser,
  update,
  remove,
  createUser,
};

