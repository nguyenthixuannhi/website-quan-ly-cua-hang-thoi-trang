const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const purchases = await models.DonNhapHang.findAll({
      include: [
        { model: models.NhaCungCap, as: 'nha_cung_cap', attributes: ['id_nha_cung_cap', 'ten_ncc'] },
        { model: models.NguoiDung, as: 'nguoi_dung', attributes: ['id_nguoi_dung', 'email'] },
        { model: models.ChiTietPhieuNhap, as: 'chi_tiet_phieu_nhap' },
      ],
      order: [['id_don_nhap', 'ASC']],
    });
    return res.status(200).json(purchases);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch purchase list' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const purchase = await models.DonNhapHang.findByPk(id, {
      include: [
        { model: models.NhaCungCap, as: 'nha_cung_cap', attributes: ['id_nha_cung_cap', 'ten_ncc'] },
        { model: models.NguoiDung, as: 'nguoi_dung', attributes: ['id_nguoi_dung', 'email'] },
        { model: models.ChiTietPhieuNhap, as: 'chi_tiet_phieu_nhap' },
      ],
    });

    if (!purchase) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu nhập' });
    }

    return res.status(200).json(purchase);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch purchase detail' });
  }
}

async function create(req, res) {
  try {
    const { id_don_nhap, id_nha_cung_cap, id_nguoi_dung, ngay_nhap } = req.body || {};

    const purchase = await models.DonNhapHang.create({
      id_don_nhap: id_don_nhap ?? (await getNextId(models.DonNhapHang, 'id_don_nhap')),
      id_nha_cung_cap: id_nha_cung_cap || null,
      id_nguoi_dung: id_nguoi_dung || null,
      ngay_nhap: ngay_nhap || new Date(),
    });

    return res.status(201).json(purchase);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create purchase order' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const purchase = await models.DonNhapHang.findByPk(id);

    if (!purchase) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu nhập' });
    }

    Object.keys(req.body || {}).forEach((key) => {
      if (req.body[key] !== undefined) {
        purchase[key] = req.body[key];
      }
    });

    await purchase.save();
    return res.status(200).json(purchase);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update purchase order' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const purchase = await models.DonNhapHang.findByPk(id);

    if (!purchase) {
      return res.status(404).json({ message: 'Không tìm thấy phiếu nhập' });
    }

    await purchase.destroy();
    return res.status(200).json({ message: 'Xóa phiếu nhập thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete purchase order' });
  }
}

module.exports = { getAll, getById, create, update, remove };
