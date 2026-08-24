const { models } = require('../models');
const { Op } = require('sequelize');

async function getNextId(model, fieldName) {
  const maxValue = await model.max(fieldName);
  return Number(maxValue || 0) + 1;
}

async function searchAndFilterSanPham(req, res) {
  try {
    const {
      keyword,
      id_danh_muc,
      min_price,
      max_price,
      size,
      mau_sac,
      page = 1,
      limit = 12,
      sortBy = "id_san_pham",
      order = "ASC",
    } = req.query;

    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 12, 1), 100);
    const offset = (pageNumber - 1) * pageSize;
    
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

    const hasVariantFilter =
      Object.keys(whereKieuSanPham).length > 0;

    const allowedSortFields = [
      "id_san_pham",
      "ten_san_pham",
      "gia_ban",
    ];

    const allowedOrders = ["ASC", "DESC"];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "id_san_pham";

    const safeOrder = allowedOrders.includes(
      String(order).toUpperCase()
    )
      ? String(order).toUpperCase()
      : "ASC";

    let orderConfig;

    if (safeSortBy === "gia_ban") {
      orderConfig = [
        [
          {
            model: models.KieuSanPham,
            as: "bien_the",
          },
          "gia_ban",
          safeOrder,
        ],
        ["id_san_pham", "ASC"],
      ];
    } else {
      orderConfig = [
        [safeSortBy, safeOrder],
        ["id_san_pham", "ASC"],
      ];
    }
    const total = await models.SanPham.count({
      where: whereSanPham,

      distinct: true,

      col: "id_san_pham",

      include: [
        {
          model: models.KieuSanPham,
          as: "bien_the",

          where: hasVariantFilter
            ? whereKieuSanPham
            : undefined,

          required: hasVariantFilter,
        },
      ],
    });

    const sanPhams = await models.SanPham.findAll({
      where: whereSanPham,

      include: [
        {
          model: models.DanhMuc,
          as: "danh_muc",
          attributes: [
            "id_danh_muc",
            "ten_danh_muc",
          ],
        },

        {
          model: models.KieuSanPham,
          as: "bien_the",

          where: hasVariantFilter
            ? whereKieuSanPham
            : undefined,

          required:
            hasVariantFilter ||
            safeSortBy === "gia_ban",

          attributes: [
            "id_bien_the",
            "size",
            "mau_sac",
            "so_luong_ton",
            "gia_ban",
          ],
        },
      ],

      distinct: true,

      order: orderConfig,

      limit: pageSize,
      offset,
    });

    const totalPages = Math.ceil(total / pageSize);

    const hasMore = pageNumber < totalPages;

    return res.status(200).json({
      page: pageNumber,
      limit: pageSize,

      total,
      totalPages,

      hasMore,

      data: sanPhams,
    });
  } catch (err) {
    console.error("Search/filter error:", err);

    return res.status(500).json({
      message:
        err.message ||
        "Failed to search, filter and sort products",
    });
  }
}

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
          attributes: ['id_bien_the', 'size', 'mau_sac', 'so_luong_ton', 'gia_ban'],
        },
      ],
    });

    if (!sanPham) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    return res.status(200).json(sanPham);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to fetch san pham detail',
    });
  }
}

async function getSanPhamAll(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const offset = (pageNumber - 1) * pageSize;

    const sanPhams = await models.SanPham.findAll({
      include: [
        {
          model: models.DanhMuc,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc'],
        },
        {
          model: models.KieuSanPham,
          as: 'bien_the',
          attributes: ['id_bien_the', 'size', 'mau_sac', 'so_luong_ton', 'gia_ban'],
        },
      ],
      order: [['id_san_pham', 'ASC']],
      limit: pageSize,
      offset,
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
      message: err.message || 'Failed to fetch products',
    });
  }
}

async function getRelatedProducts(req, res) {
  try {
    const { id } = req.params;
    const { limit = 4 } = req.query;
    const safeLimit = Math.min(Math.max(Number(limit) || 4, 1), 20);

    const currentProduct = await models.SanPham.findOne({
      where: { id_san_pham: id },
      include: [
        {
          model: models.DanhMuc,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc'],
        },
      ],
    });

    if (!currentProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    if (!currentProduct.id_danh_muc) {
      return res.status(200).json({
        data: [],
        id_san_pham: Number(id),
        id_danh_muc: null,
      });
    }

    const relatedProducts = await models.SanPham.findAll({
      where: {
        id_danh_muc: currentProduct.id_danh_muc,
        id_san_pham: { [Op.ne]: Number(id) },
      },
      include: [
        {
          model: models.DanhMuc,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc'],
        },
        {
          model: models.KieuSanPham,
          as: 'bien_the',
          attributes: ['id_bien_the', 'size', 'mau_sac', 'so_luong_ton', 'gia_ban'],
        },
      ],
      order: [['id_san_pham', 'ASC']],
      limit: safeLimit,
    });

    return res.status(200).json({
      id_san_pham: Number(id),
      id_danh_muc: currentProduct.id_danh_muc,
      ten_danh_muc: currentProduct.danh_muc?.ten_danh_muc || null,
      data: relatedProducts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || 'Failed to fetch related products',
    });
  }
}

async function create(req, res) {
  try {
    const { id_san_pham, id_danh_muc, ten_san_pham, anh_san_pham } = req.body || {};

    if (!ten_san_pham) {
      return res.status(400).json({ message: 'Thiếu trường ten_san_pham' });
    }

    const product = await models.SanPham.create({
      id_san_pham: id_san_pham ?? (await getNextId(models.SanPham, 'id_san_pham')),
      id_danh_muc: id_danh_muc || null,
      ten_san_pham,
      anh_san_pham: anh_san_pham || null,
    });

    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to create san pham',
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { id_danh_muc, ten_san_pham, anh_san_pham } = req.body || {};

    const product = await models.SanPham.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    if (id_danh_muc !== undefined) product.id_danh_muc = id_danh_muc;
    if (ten_san_pham) product.ten_san_pham = ten_san_pham;
    if (anh_san_pham !== undefined) product.anh_san_pham = anh_san_pham;

    await product.save();
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to update san pham',
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const product = await models.SanPham.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    await product.destroy();
    return res.status(200).json({ message: 'Xóa sản phẩm thành công' });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Failed to delete san pham',
    });
  }
}

module.exports = {
  getAll: getSanPhamAll,
  getById: getSanPhamById,
  getRelatedProducts,
  create,
  update,
  remove,
  getSanPhamAll,
  getSanPhamById,
  searchAndFilterSanPham,
};