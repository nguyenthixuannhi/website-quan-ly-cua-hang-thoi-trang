const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const orders = await models.DonHang.findAll({
      include: [
        { model: models.NguoiDung, as: 'nguoi_dung', attributes: ['id_nguoi_dung', 'email'] },
        { model: models.ChiTietDonHang, as: 'chi_tiet_don_hang' },
      ],
      order: [['id_don_hang', 'ASC']],
    });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch order list' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const order = await models.DonHang.findByPk(id, {
      include: [
        { model: models.NguoiDung, as: 'nguoi_dung', attributes: ['id_nguoi_dung', 'email'] },
        { model: models.ChiTietDonHang, as: 'chi_tiet_don_hang' },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch order detail' });
  }
}

async function create(req, res) {
  try {
    const { id_don_hang, id_nguoi_dung, loai_don, trang_thai, ngay_tao } = req.body || {};

    if (!loai_don && !trang_thai && id_nguoi_dung == null) {
      return res.status(400).json({ message: 'Thiếu thông tin đơn hàng' });
    }

    const order = await models.DonHang.create({
      id_don_hang: id_don_hang ?? (await getNextId(models.DonHang, 'id_don_hang')),
      id_nguoi_dung: id_nguoi_dung || null,
      loai_don: loai_don || 'online',
      trang_thai: trang_thai || 'pending',
      ngay_tao: ngay_tao || new Date(),
    });

    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create order' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const order = await models.DonHang.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    Object.keys(req.body || {}).forEach((key) => {
      if (req.body[key] !== undefined) {
        order[key] = req.body[key];
      }
    });

    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update order' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const order = await models.DonHang.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    await order.destroy();
    return res.status(200).json({ message: 'Xóa đơn hàng thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete order' });
  }
}

module.exports = { getAll, getById, create, update, remove };
