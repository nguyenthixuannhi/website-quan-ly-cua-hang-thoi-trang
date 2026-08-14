const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const items = await models.ChiTietPhieuNhap.findAll({
      include: [
        { model: models.DonNhapHang, as: 'don_nhap_hang' },
        { model: models.KieuSanPham, as: 'bien_the' },
      ],
      order: [['id_chi_tiet_nhap', 'ASC']],
    });
    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch purchase detail list' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietPhieuNhap.findByPk(id, {
      include: [
        { model: models.DonNhapHang, as: 'don_nhap_hang' },
        { model: models.KieuSanPham, as: 'bien_the' },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy chi tiết phiếu nhập' });
    }

    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch purchase detail' });
  }
}

async function create(req, res) {
  try {
    const { id_chi_tiet_nhap, id_don_nhap, id_bien_the, so_luong } = req.body || {};

    if (so_luong == null) {
      return res.status(400).json({ message: 'Thiếu so_luong' });
    }

    const item = await models.ChiTietPhieuNhap.create({
      id_chi_tiet_nhap: id_chi_tiet_nhap ?? (await getNextId(models.ChiTietPhieuNhap, 'id_chi_tiet_nhap')),
      id_don_nhap: id_don_nhap || null,
      id_bien_the: id_bien_the || null,
      so_luong,
    });

    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create purchase detail' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietPhieuNhap.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy chi tiết phiếu nhập' });
    }

    Object.keys(req.body || {}).forEach((key) => {
      if (req.body[key] !== undefined) {
        item[key] = req.body[key];
      }
    });

    await item.save();
    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update purchase detail' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietPhieuNhap.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy chi tiết phiếu nhập' });
    }

    await item.destroy();
    return res.status(200).json({ message: 'Xóa chi tiết phiếu nhập thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete purchase detail' });
  }
}

module.exports = { getAll, getById, create, update, remove };
