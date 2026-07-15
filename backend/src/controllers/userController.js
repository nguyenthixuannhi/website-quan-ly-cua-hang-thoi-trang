const bcrypt = require('bcrypt');
const { models } = require('../models');

// POST /api/users
// Body: { id_nguoi_dung, email, mat_khau, vai_tro }
async function createUser(req, res) {
  try {
    const { id_nguoi_dung, email, mat_khau, vai_tro } = req.body || {};

    if (id_nguoi_dung == null || !email || !mat_khau || !vai_tro) {
      return res.status(400).json({
        message: 'Missing required fields: id_nguoi_dung, email, mat_khau, vai_tro',
      });
    }

    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    const created = await models.NguoiDung.create({
      id_nguoi_dung,
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

module.exports = { createUser };

