const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const pays = await models.ThanhToan.findAll({ include: [{ model: models.DonHang, as: 'don_hang' }], order: [['id_thanh_toan','ASC']] });
    return res.status(200).json(pays);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch payments' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const pay = await models.ThanhToan.findByPk(id, { include: [{ model: models.DonHang, as: 'don_hang' }] });
    if (!pay) return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
    return res.status(200).json(pay);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch payment' });
  }
}

async function create(req, res) {
  try {
    const { id_thanh_toan, id_don_hang, phuong_thuc, so_tien } = req.body || {};
    if (so_tien == null) return res.status(400).json({ message: 'Thiếu so_tien' });
    const pay = await models.ThanhToan.create({
      id_thanh_toan: id_thanh_toan ?? (await getNextId(models.ThanhToan, 'id_thanh_toan')),
      id_don_hang: id_don_hang || null,
      phuong_thuc: phuong_thuc || null,
      so_tien,
    });
    return res.status(201).json(pay);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create payment' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const pay = await models.ThanhToan.findByPk(id);
    if (!pay) return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
    Object.keys(req.body || {}).forEach((k) => { if (req.body[k] !== undefined) pay[k] = req.body[k]; });
    await pay.save();
    return res.status(200).json(pay);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update payment' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const pay = await models.ThanhToan.findByPk(id);
    if (!pay) return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
    await pay.destroy();
    return res.status(200).json({ message: 'Xóa thanh toán thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete payment' });
  }
}

module.exports = { getAll, getById, create, update, remove };