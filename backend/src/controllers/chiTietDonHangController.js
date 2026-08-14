const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const items = await models.ChiTietDonHang.findAll({
      include: [
        { model: models.DonHang, as: 'don_hang' },
        { model: models.KieuSanPham, as: 'bien_the' },
      ],
      order: [['id_ct_don', 'ASC']],
    });
    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch order item list' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietDonHang.findByPk(id, {
      include: [
        { model: models.DonHang, as: 'don_hang' },
        { model: models.KieuSanPham, as: 'bien_the' },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn hàng' });
    }

    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch order item detail' });
  }
}

async function create(req, res) {
  try {
    const { id_ct_don, id_don_hang, id_bien_the, so_luong, don_gia_thuc } = req.body || {};

    if (so_luong == null || don_gia_thuc == null) {
      return res.status(400).json({ message: 'Thiếu so_luong hoặc don_gia_thuc' });
    }

    const item = await models.ChiTietDonHang.create({
      id_ct_don: id_ct_don ?? (await getNextId(models.ChiTietDonHang, 'id_ct_don')),
      id_don_hang: id_don_hang || null,
      id_bien_the: id_bien_the || null,
      so_luong,
      don_gia_thuc,
    });

    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create order item' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietDonHang.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn hàng' });
    }

    Object.keys(req.body || {}).forEach((key) => {
      if (req.body[key] !== undefined) {
        item[key] = req.body[key];
      }
    });

    await item.save();
    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update order item' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const item = await models.ChiTietDonHang.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn hàng' });
    }

    await item.destroy();
    return res.status(200).json({ message: 'Xóa chi tiết đơn hàng thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete order item' });
  }
}

module.exports = { getAll, getById, create, update, remove };
