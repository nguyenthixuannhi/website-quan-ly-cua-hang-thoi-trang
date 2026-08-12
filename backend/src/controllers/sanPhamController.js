const { models } = require('../models');
const { Op } = require('sequelize');

// GET /sanpham/search
// Ví dụ:
// /sanpham/search?keyword=ao&page=1
// /sanpham/search?keyword=ao&page=2
// /sanpham/search?size=M&limit=10&page=1
// /sanpham/search?sortBy=gia_ban&order=ASC&page=1

async function searchAndFilterSanPham(req, res) {
  try {
    const {
      keyword,
      id_danh_muc,
      min_price,
      max_price,
      size,
      mau_sac,

      // Pagination
      page = 1,
      limit = 10,

      // Sorting
      sortBy = 'id_san_pham',
      order = 'ASC',
    } = req.query;

    // PAGINATION

    // giới hạn tối đa 10 sản phẩm mỗi lần tải
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = 10;

    const offset = (pageNumber - 1) * pageSize;

    // FILTER SANPHAM
    const whereSanPham = {};

    if (keyword) {
      whereSanPham.ten_san_pham = {
        [Op.like]: `%${keyword}%`,
      };
    }

    if (id_danh_muc) {
      whereSanPham.id_danh_muc = id_danh_muc;
    }

    // FILTER KIEUSANPHAM

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

    const hasVariantFilter =
      Object.keys(whereKieuSanPham).length > 0;

    // Sort

    const allowedSortFields = [
      'id_san_pham',
      'ten_san_pham',
      'gia_ban',
    ];

    const allowedOrders = ['ASC', 'DESC'];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'id_san_pham';

    const safeOrder = allowedOrders.includes(order.toUpperCase())
      ? order.toUpperCase()
      : 'ASC';

    let orderConfig = [];

    if (safeSortBy === 'gia_ban') {
      orderConfig = [
        [
          { model: models.KieuSanPham, as: 'bien_the' },
          'gia_ban',
          safeOrder,
        ],
        ['id_san_pham', 'ASC'],
      ];
    } else {
      orderConfig = [
        [safeSortBy, safeOrder],
        ['id_san_pham', 'ASC'],
      ];
    }

    // QUERY

    const sanPhams = await models.SanPham.findAll({
      where: whereSanPham,

      include: [
        {
          model: models.DanhMuc,
          as: 'danh_muc',
          attributes: [
            'id_danh_muc',
            'ten_danh_muc',
          ],
        },

        {
          model: models.KieuSanPham,
          as: 'bien_the',

          where: hasVariantFilter
            ? whereKieuSanPham
            : undefined,

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

      order: orderConfig,

      // Chỉ lấy 10 sản phẩm
      limit: pageSize,

      // Bỏ qua sản phẩm của các trang trước
      offset,
    });

    // CHECK CÒN SẢN PHẨM KHÔNG
    // Nếu lấy đủ 10 thì có khả năng còn trang tiếp theo.
    // Nếu lấy < 10 thì đã tới cuối.
    const hasMore = sanPhams.length === pageSize;

    // RES

    return res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      hasMore,
      data: sanPhams,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message:
        err.message ||
        'Failed to search, filter and sort products',
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


 // GET /sanpham
 // GET /sanpham?page=1
 // GET /sanpham?page=2
async function getSanPhamAll(req, res) {
  try {
    const { page = 1 } = req.query;

    // Luôn chỉ tải 10 sản phẩm mỗi lafn
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = 10;

    const offset = (pageNumber - 1) * pageSize;

    const sanPhams = await models.SanPham.findAll({
      include: [
        {
          model: models.DanhMuc,
          as: 'danh_muc',
          attributes: [
            'id_danh_muc',
            'ten_danh_muc',
          ],
        },
      ],

      // 10/request
      limit: pageSize,
      offset,
      order: [
        ['id_san_pham', 'ASC'],
      ],
    });
    const hasMore = sanPhams.length === pageSize;

    return res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      hasMore,
      data: sanPhams,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message:
        err.message ||
        'Failed to fetch san pham list',
    });
  }
}
module.exports = {
  getSanPhamAll,
  getSanPhamById,
  searchAndFilterSanPham,
};