const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const records = await models.LichSuKho.findAll({
      include: [
        { model: models.KieuSanPham, as: 'bien_the' },
        { model: models.NguoiDung, as: 'nguoi_dung', attributes: ['id_nguoi_dung', 'email'] },
      ],
      order: [['id_lich_su', 'ASC']],
    });
    return res.status(200).json(records);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch inventory history list' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const record = await models.LichSuKho.findByPk(id, {
      include: [
        { model: models.KieuSanPham, as: 'bien_the' },
        { model: models.NguoiDung, as: 'nguoi_dung', attributes: ['id_nguoi_dung', 'email'] },
      ],
    });

    if (!record) {
      return res.status(404).json({ message: 'Không tìm thấy lịch sử kho' });
    }

    return res.status(200).json(record);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch inventory history detail' });
  }
}

async function create(req, res) {
  try {
    const { id_lich_su, id_bien_the, id_nguoi_dung, loai_thao_tac, so_luong_thay_doi } = req.body || {};

    const record = await models.LichSuKho.create({
      id_lich_su: id_lich_su ?? (await getNextId(models.LichSuKho, 'id_lich_su')),
      id_bien_the: id_bien_the || null,
      id_nguoi_dung: id_nguoi_dung || null,
      loai_thao_tac: loai_thao_tac || null,
      so_luong_thay_doi: so_luong_thay_doi || 0,
    });

    return res.status(201).json(record);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create inventory history record' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const record = await models.LichSuKho.findByPk(id);

    if (!record) {
      return res.status(404).json({ message: 'Không tìm thấy lịch sử kho' });
    }

    Object.keys(req.body || {}).forEach((key) => {
      if (req.body[key] !== undefined) {
        record[key] = req.body[key];
      }
    });

    await record.save();
    return res.status(200).json(record);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update inventory history record' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const record = await models.LichSuKho.findByPk(id);

    if (!record) {
      return res.status(404).json({ message: 'Không tìm thấy lịch sử kho' });
    }

    await record.destroy();
    return res.status(200).json({ message: 'Xóa lịch sử kho thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete inventory history record' });
  }
}

module.exports = { getAll, getById, create, update, remove };
