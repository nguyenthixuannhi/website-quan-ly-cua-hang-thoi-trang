const { models } = require('../models');
const { Op } = require('sequelize');

// GET /sanpham　全て
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
// Get /Sanpham/:id
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
          as: 'bien_the',
          attributes: [
            'id_bien_the',
            'size',
            'mau_sac',
            'so_luong_ton',
            'gia_ban',
          ],
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

// Get /sanpham/search?keyword=ao&id_danh_muc=1&min_price=100000&max_price=500000&size=M&mau_sac=den
async function searchAndFilterSanPham(req, res) {
  try {
    const {
      keyword,
      id_danh_muc,
      min_price,
      max_price,
      size,
      mau_sac,
    } = req.query;

    const whereSanPham = {};

    if (keyword) {
      whereSanPham.ten_san_pham = {
        [Op.like]: `%${keyword}%`,
      };
    }

    if (id_danh_muc) {
      whereSanPham.id_danh_muc = id_danh_muc;
    }

    const whereKieuSanPham = {};

    if (min_price || max_price) {
      whereKieuSanPham.gia_ban = {};

      if (min_price) {
        whereKieuSanPham.gia_ban[Op.gte] = Number(min_price);
      }

      if (max_price) {
        whereKieuSanPham.gia_ban[Op.lte] = Number(max_price);
      }
    }

    if (size) {
      whereKieuSanPham.size = size;
    }

    if (mau_sac) {
      whereKieuSanPham.mau_sac = {
        [Op.like]: `%${mau_sac}%`,
      };
    }

    const hasVariantFilter = Object.keys(whereKieuSanPham).length > 0;

    const sanPhams = await models.SanPham.findAll({
      where: whereSanPham,
      include: [
        {
          model: models.DanhMuc,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc'],
        },
        {
          model: models.KieuSanPham,
          as: 'bien_the',
          where: hasVariantFilter ? whereKieuSanPham : undefined,
          required: hasVariantFilter,
          attributes: [
            'id_bien_the',
            'size',
            'mau_sac',
            'so_luong_ton',
            'gia_ban',
          ],
        },
      ],
    });

    return res.status(200).json({
      total: sanPhams.length,
      data: sanPhams,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to search and filter products',
    });
  }
}

module.exports = {
  getSanPhamAll,
  getSanPhamById,
  searchAndFilterSanPham,
};