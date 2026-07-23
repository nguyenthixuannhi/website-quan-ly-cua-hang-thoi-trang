const bcrypt = require('bcrypt');
const { models } = require('../models');
const { signToken } = require('../config/jwt');


function sanitizeUser(user) {
  if (!user) return null;
  const { id_nguoi_dung, email, vai_tro } = user;
  return { id_nguoi_dung, email, vai_tro };
}


// POST /api/auth/register
async function register(req, res) {
  try {
    const { id_nguoi_dung, email, mat_khau } = req.body || {};

    if (id_nguoi_dung == null || !email || !mat_khau) {
      return res.status(400).json({
        message: 'Missing required fields: id_nguoi_dung, email, mat_khau',
      });
    }

    const existing = await models.NguoiDung.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email da ton tai' });
    }

    const hashedPassword = await bcrypt.hash(mat_khau, 10);

    const created = await models.NguoiDung.create({
      id_nguoi_dung,
      email,
      mat_khau: hashedPassword,
      vai_tro: 'khach hang',
    });

    return res.status(201).json({ user: sanitizeUser(created) });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Ko dang ky dc' });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, mat_khau } = req.body || {};

    if (!email || !mat_khau) {
      return res.status(400).json({ message: 'dien con thieu o' });
    }

    const user = await models.NguoiDung.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'mat khhau hoac email không đạt tiêu chuẩn' });
    }

    const ok = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!ok) {
      return res.status(401).json({ message: 'at khhau hoac email không đạt tiêu chuẩn' });
    }

    const token = signToken({
      id_nguoi_dung: user.id_nguoi_dung,
      email: user.email,
      vai_tro: user.vai_tro,
    });

    return res.status(200).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'lỗi đăn nhập' });
  }
}

// GET /api/auth/me
async function me(req, res) {
  return res.status(200).json({ user: req.user });
}

module.exports = {
  register,
  login,
  me,
};

