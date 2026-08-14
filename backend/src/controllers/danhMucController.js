const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const danhMucs = await models.DanhMuc.findAll({
      order: [['id_danh_muc', 'ASC']],
    });
    return res.status(200).json(danhMucs);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch danh muc list',
    });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const danhMuc = await models.DanhMuc.findByPk(id);

    if (!danhMuc) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    return res.status(200).json(danhMuc);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch danh muc detail',
    });
  }
}

async function create(req, res) {
  try {
    const { id_danh_muc, ten_danh_muc } = req.body || {};

    if (!ten_danh_muc) {
      return res.status(400).json({ message: 'Thiếu trường ten_danh_muc' });
    }

    const payload = {
      id_danh_muc: id_danh_muc ?? (await getNextId(models.DanhMuc, 'id_danh_muc')),
      ten_danh_muc,
    };

    const danhMuc = await models.DanhMuc.create(payload);
    return res.status(201).json(danhMuc);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to create danh muc',
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { ten_danh_muc } = req.body || {};

    const danhMuc = await models.DanhMuc.findByPk(id);
    if (!danhMuc) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    if (ten_danh_muc) {
      danhMuc.ten_danh_muc = ten_danh_muc;
    }

    await danhMuc.save();
    return res.status(200).json(danhMuc);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to update danh muc',
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const danhMuc = await models.DanhMuc.findByPk(id);

    if (!danhMuc) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    await danhMuc.destroy();
    return res.status(200).json({ message: 'Xóa danh mục thành công' });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to delete danh muc',
    });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getDanhMucAll: getAll,
};

