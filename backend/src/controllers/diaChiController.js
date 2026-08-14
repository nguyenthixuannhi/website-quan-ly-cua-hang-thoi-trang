const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const addrs = await models.DiaChi.findAll({ order: [['id_dia_chi', 'ASC']] });
    return res.status(200).json(addrs);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch addresses' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const addr = await models.DiaChi.findByPk(id);
    if (!addr) return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
    return res.status(200).json(addr);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch address' });
  }
}

async function create(req, res) {
  try {
    const { id_dia_chi, id_nguoi_dung, dia_chi_chi_tiet } = req.body || {};
    if (!dia_chi_chi_tiet) return res.status(400).json({ message: 'Thiếu dia_chi_chi_tiet' });
    const addr = await models.DiaChi.create({
      id_dia_chi: id_dia_chi ?? (await getNextId(models.DiaChi, 'id_dia_chi')),
      id_nguoi_dung: id_nguoi_dung || null,
      dia_chi_chi_tiet,
    });
    return res.status(201).json(addr);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create address' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const addr = await models.DiaChi.findByPk(id);
    if (!addr) return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
    Object.keys(req.body || {}).forEach((k) => { if (req.body[k] !== undefined) addr[k] = req.body[k]; });
    await addr.save();
    return res.status(200).json(addr);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update address' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const addr = await models.DiaChi.findByPk(id);
    if (!addr) return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
    await addr.destroy();
    return res.status(200).json({ message: 'Xóa địa chỉ thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete address' });
  }
}

module.exports = { getAll, getById, create, update, remove };