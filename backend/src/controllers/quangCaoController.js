const { models } = require('../models');

async function getAll(req, res) {
  try {
    const ads = await models.QuangCao.findAll({
      order: [['uu_tien', 'DESC'], ['id', 'DESC']],
    });

    return res.status(200).json(ads);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch ads list',
    });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const ad = await models.QuangCao.findByPk(id);

    if (!ad) {
      return res.status(404).json({ message: 'Không tìm thấy quảng cáo' });
    }

    return res.status(200).json(ad);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch ad detail',
    });
  }
}

async function create(req, res) {
  try {
    const {
      tieu_de,
      url_hinh_anh,
      url_dich,
      mua,
      danh_muc_trong_tam,
      ngay_bat_dau,
      ngay_ket_thuc,
      uu_tien,
      kich_hoat,
    } = req.body || {};

    if (!tieu_de || !url_hinh_anh) {
      return res.status(400).json({ message: 'Thiếu trường tieu_de hoặc url_hinh_anh' });
    }

    const ad = await models.QuangCao.create({
      tieu_de,
      url_hinh_anh,
      url_dich: url_dich || null,
      mua: mua || null,
      danh_muc_trong_tam: danh_muc_trong_tam || null,
      ngay_bat_dau: ngay_bat_dau || null,
      ngay_ket_thuc: ngay_ket_thuc || null,
      uu_tien: uu_tien ?? 0,
      kich_hoat: kich_hoat ?? true,
    });

    return res.status(201).json(ad);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to create ad',
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const ad = await models.QuangCao.findByPk(id);

    if (!ad) {
      return res.status(404).json({ message: 'Không tìm thấy quảng cáo' });
    }

    Object.keys(req.body || {}).forEach((key) => {
      if (req.body[key] !== undefined) {
        ad[key] = req.body[key];
      }
    });

    await ad.save();
    return res.status(200).json(ad);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to update ad',
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const ad = await models.QuangCao.findByPk(id);

    if (!ad) {
      return res.status(404).json({ message: 'Không tìm thấy quảng cáo' });
    }

    await ad.destroy();
    return res.status(200).json({ message: 'Xóa quảng cáo thành công' });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to delete ad',
    });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
