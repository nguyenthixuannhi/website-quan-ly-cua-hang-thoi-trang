const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const notes = await models.PhieuGiaoHang.findAll({ include: [{ model: models.DonHang, as: 'don_hang' }], order: [['id_phieu_giao','ASC']] });
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch delivery notes' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const note = await models.PhieuGiaoHang.findByPk(id, { include: [{ model: models.DonHang, as: 'don_hang' }] });
    if (!note) return res.status(404).json({ message: 'Không tìm thấy phiếu giao hàng' });
    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch delivery note' });
  }
}

async function create(req, res) {
  try {
    const { id_phieu_giao, id_don_hang, don_vi_van_chuyen, trang_thai } = req.body || {};
    const note = await models.PhieuGiaoHang.create({
      id_phieu_giao: id_phieu_giao ?? (await getNextId(models.PhieuGiaoHang, 'id_phieu_giao')),
      id_don_hang: id_don_hang || null,
      don_vi_van_chuyen: don_vi_van_chuyen || null,
      trang_thai: trang_thai || null,
    });
    return res.status(201).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create delivery note' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const note = await models.PhieuGiaoHang.findByPk(id);
    if (!note) return res.status(404).json({ message: 'Không tìm thấy phiếu giao hàng' });
    Object.keys(req.body || {}).forEach((k) => { if (req.body[k] !== undefined) note[k] = req.body[k]; });
    await note.save();
    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update delivery note' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const note = await models.PhieuGiaoHang.findByPk(id);
    if (!note) return res.status(404).json({ message: 'Không tìm thấy phiếu giao hàng' });
    await note.destroy();
    return res.status(200).json({ message: 'Xóa phiếu giao hàng thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete delivery note' });
  }
}

module.exports = { getAll, getById, create, update, remove };