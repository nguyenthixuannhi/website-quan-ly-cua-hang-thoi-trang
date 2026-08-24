const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const items = await models.ChiTietGiamGia.findAll({
      include: [
        { model: models.ChuongTrinhGiamGia, as: 'chuong_trinh_giam_gia' },
        { model: models.SanPham, as: 'san_pham' },
        { model: models.DanhMuc, as: 'danh_muc' },
      ],
      order: [['id_chi_tiet_km', 'ASC']],
    });

    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch chi tiet giam gia' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietGiamGia.findByPk(id, {
      include: [
        { model: models.ChuongTrinhGiamGia, as: 'chuong_trinh_giam_gia' },
        { model: models.SanPham, as: 'san_pham' },
        { model: models.DanhMuc, as: 'danh_muc' },
      ],
    });

    if (!item) return res.status(404).json({ message: 'Không tìm thấy chi tiết giảm giá' });

    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch chi tiet giam gia' });
  }
}

async function create(req, res) {
  try {
    const { id_chi_tiet_km, id_giam_gia, id_san_pham, id_danh_muc } = req.body || {};

    const item = await models.ChiTietGiamGia.create({
      id_chi_tiet_km: id_chi_tiet_km ?? (await getNextId(models.ChiTietGiamGia, 'id_chi_tiet_km')),
      id_giam_gia: id_giam_gia || null,
      id_san_pham: id_san_pham || null,
      id_danh_muc: id_danh_muc || null,
    });

    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create chi tiet giam gia' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietGiamGia.findByPk(id);

    if (!item) return res.status(404).json({ message: 'Không tìm thấy chi tiết giảm giá' });

    Object.keys(req.body || {}).forEach((key) => {
      if (req.body[key] !== undefined) item[key] = req.body[key];
    });

    await item.save();
    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update chi tiet giam gia' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietGiamGia.findByPk(id);

    if (!item) return res.status(404).json({ message: 'Không tìm thấy chi tiết giảm giá' });

    await item.destroy();
    return res.status(200).json({ message: 'Xóa chi tiết giảm giá thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete chi tiet giam gia' });
  }
}

module.exports = { getAll, getById, create, update, remove };
