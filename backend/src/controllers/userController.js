const bcrypt = require('bcrypt');
const { models } = require('../models');

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
  create: createUser,
  update,
  remove,
  createUser,
};

