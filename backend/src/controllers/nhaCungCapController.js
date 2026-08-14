const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const suppliers = await models.NhaCungCap.findAll({
      order: [['id_nha_cung_cap', 'ASC']],
    });
    return res.status(200).json(suppliers);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch supplier list',
    });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const supplier = await models.NhaCungCap.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp' });
    }

    return res.status(200).json(supplier);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch supplier detail',
    });
  }
}

async function create(req, res) {
  try {
    const { id_nha_cung_cap, ten_ncc } = req.body || {};

    if (!ten_ncc) {
      return res.status(400).json({ message: 'Thiếu trường ten_ncc' });
    }

    const supplier = await models.NhaCungCap.create({
      id_nha_cung_cap: id_nha_cung_cap ?? (await getNextId(models.NhaCungCap, 'id_nha_cung_cap')),
      ten_ncc,
    });

    return res.status(201).json(supplier);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to create supplier',
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { ten_ncc } = req.body || {};

    const supplier = await models.NhaCungCap.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp' });
    }

    if (ten_ncc) supplier.ten_ncc = ten_ncc;
    await supplier.save();

    return res.status(200).json(supplier);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to update supplier',
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const supplier = await models.NhaCungCap.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: 'Không tìm thấy nhà cung cấp' });
    }

    await supplier.destroy();
    return res.status(200).json({ message: 'Xóa nhà cung cấp thành công' });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to delete supplier',
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
