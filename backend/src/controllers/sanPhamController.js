const { models } = require('../models');

// GET /sanpham
async function getAll(req, res) {
  try {
    const sanPhams = await models.SanPham.findAll({
      include: [
        {
          model: models.DanhMuc,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc'],
        },
      ],
    });
    return res.status(200).json(sanPhams);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch san pham list',
    });
  }
}

module.exports = { getAll };

