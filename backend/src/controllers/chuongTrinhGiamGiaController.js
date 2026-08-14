const { models } = require('../models');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function getAll(req, res) {
  try {
    const programs = await models.ChuongTrinhGiamGia.findAll({
      include: [
        { model: models.NguoiDung, as: 'nguoi_dung', attributes: ['id_nguoi_dung', 'email'] },
        { model: models.ChiTietGiamGia, as: 'chi_tiet_giam_gia' },
      ],
      order: [['id_giam_gia', 'ASC']],
    });
    return res.status(200).json(programs);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch promotion program list' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const program = await models.ChuongTrinhGiamGia.findByPk(id, {
      include: [
        { model: models.NguoiDung, as: 'nguoi_dung', attributes: ['id_nguoi_dung', 'email'] },
        { model: models.ChiTietGiamGia, as: 'chi_tiet_giam_gia' },
      ],
    });

    if (!program) {
      return res.status(404).json({ message: 'Không tìm thấy chương trình khuyến mãi' });
    }

    return res.status(200).json(program);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch promotion program detail' });
  }
}

async function create(req, res) {
  try {
    const { id_giam_gia, id_nguoi_dung, ten_chuong_trinh, phan_tram_giam } = req.body || {};

    const program = await models.ChuongTrinhGiamGia.create({
      id_giam_gia: id_giam_gia ?? (await getNextId(models.ChuongTrinhGiamGia, 'id_giam_gia')),
      id_nguoi_dung: id_nguoi_dung || null,
      ten_chuong_trinh: ten_chuong_trinh || null,
      phan_tram_giam: phan_tram_giam || null,
    });

    return res.status(201).json(program);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create promotion program' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const program = await models.ChuongTrinhGiamGia.findByPk(id);

    if (!program) {
      return res.status(404).json({ message: 'Không tìm thấy chương trình khuyến mãi' });
    }

    Object.keys(req.body || {}).forEach((key) => {
      if (req.body[key] !== undefined) {
        program[key] = req.body[key];
      }
    });

    await program.save();
    return res.status(200).json(program);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update promotion program' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const program = await models.ChuongTrinhGiamGia.findByPk(id);

    if (!program) {
      return res.status(404).json({ message: 'Không tìm thấy chương trình khuyến mãi' });
    }

    await program.destroy();
    return res.status(200).json({ message: 'Xóa chương trình khuyến mãi thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to delete promotion program' });
  }
}

module.exports = { getAll, getById, create, update, remove };
