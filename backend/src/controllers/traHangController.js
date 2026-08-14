const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const returns = await models.TraHang.findAll({ include: [{ model: models.DonHang, as: 'don_hang' }] , order: [['id_phieu_tra','ASC']] });
    return res.status(200).json(returns);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch returns' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const ret = await models.TraHang.findByPk(id, { include: [{ model: models.DonHang, as: 'don_hang' }] });
    if (!ret) return res.status(404).json({ message: 'Không tìm thấy phiếu trả hàng' });
    return res.status(200).json(ret);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch return' });
  }
}

async function create(req, res) {
  try {
    const { id_phieu_tra, id_don_hang, ly_do } = req.body || {};
    const ret = await models.TraHang.create({
      id_phieu_tra: id_phieu_tra ?? (await getNextId(models.TraHang, 'id_phieu_tra')),
      id_don_hang: id_don_hang || null,
      ly_do: ly_do || null,
    });
    return res.status(201).json(ret);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create return' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const ret = await models.TraHang.findByPk(id);
    if (!ret) return res.status(404).json({ message: 'Không tìm thấy phiếu trả hàng' });
    Object.keys(req.body || {}).forEach((k) => { if (req.body[k] !== undefined) ret[k] = req.body[k]; });
    await ret.save();
    return res.status(200).json(ret);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update return' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const ret = await models.TraHang.findByPk(id);
    if (!ret) return res.status(404).json({ message: 'Không tìm thấy phiếu trả hàng' });
    await ret.destroy();
    return res.status(200).json({ message: 'Xóa phiếu trả hàng thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete return' });
  }
}

module.exports = { getAll, getById, create, update, remove };