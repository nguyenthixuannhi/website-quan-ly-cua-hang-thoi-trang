const { models } = require('../models');

// GET /sanpham (Lấy tất cả)
async function getSanPhamAll(req, res) {
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

// GET /sanpham/:id (Lấy chi tiết sản phẩm)
async function getSanPhamById(req, res) {
  try {
    const { id } = req.params;

    const sanPham = await models.SanPham.findOne({
      where: { id_san_pham: id },
      include: [
        {
          model: models.DanhMuc,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc'],
        },
        {
          model: models.KieuSanPham,
          as: 'bien_the', // Đảm bảo alias khớp với lúc bạn định nghĩa quan hệ hasMany
          attributes: ['id_bien_the', 'size', 'mau_sac', 'so_luong_ton', 'gia_ban'],
        },
      ],
    });

    if (!sanPham) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm',
      });
    }

    return res.status(200).json(sanPham);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch san pham detail',
    });
  }
}

module.exports = { 
  getSanPhamAll, 
  getSanPhamById 
};