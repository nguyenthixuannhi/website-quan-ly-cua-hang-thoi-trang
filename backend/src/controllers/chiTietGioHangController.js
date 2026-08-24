const { models } = require('../models');
const { getOrCreateCart } = require('./gioHangController');

function getUserId(req) {
  return req.user?.id_nguoi_dung;
}

// Find current user's cart.

async function getUserCart(userId) {
  return models.GioHang.findOne({
    where: {
      id_nguoi_dung: userId,
    },
  });
}


// GET /api/chitietgiohang

async function getAll(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const cart = await getUserCart(userId);

    if (!cart) {
      return res.status(200).json({
        cart: null,
        items: [],
      });
    }

    const items = await models.ChiTietGioHang.findAll({
      where: {
        id_gio_hang: cart.id_gio_hang,
      },
      order: [['id_ct_gio', 'ASC']],
    });

    return res.status(200).json({
      cart: {
        id_gio_hang: cart.id_gio_hang,
        id_nguoi_dung: cart.id_nguoi_dung,
      },
      items,
    });
  } catch (err) {
    console.error('getAll cart items error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the lay chi tiet gio hang',
    });
  }
}

// GET /api/chitietgiohang/:id
async function getOne(req, res) {
  try {
    const userId = getUserId(req);
    const id = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const cart = await getUserCart(userId);

    if (!cart) {
      return res.status(404).json({
        message: 'Gio hang khong ton tai',
      });
    }

    const item = await models.ChiTietGioHang.findOne({
      where: {
        id_ct_gio: id,
        id_gio_hang: cart.id_gio_hang,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: 'San pham khong ton tai trong gio hang cua ban',
      });
    }

    return res.status(200).json(item);
  } catch (err) {
    console.error('getOne cart item error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the lay chi tiet gio hang',
    });
  }
}

// POST /api/chitietgiohang

async function addItem(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { id_bien_the, so_luong } = req.body || {};

    if (id_bien_the == null || so_luong == null) {
      return res.status(400).json({
        message: 'Thieu id_bien_the hoac so_luong',
      });
    }

    const quantity = Number(so_luong);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: 'so_luong phai la so nguyen lon hon 0',
      });
    }

    // Check product variant exists
    const variant = await models.KieuSanPham.findOne({
      where: {
        id_bien_the,
      },
    });

    if (!variant) {
      return res.status(404).json({
        message: 'Bien the san pham khong ton tai',
      });
    }

    // Check stock
    if (variant.so_luong_ton < quantity) {
      return res.status(400).json({
        message: 'So luong ton kho khong du',
        so_luong_ton: variant.so_luong_ton,
      });
    }

    // Get/create user's cart
    const cart = await getOrCreateCart(userId);

    // Check if this variant is already in cart
    const existing = await models.ChiTietGioHang.findOne({
      where: {
        id_gio_hang: cart.id_gio_hang,
        id_bien_the,
      },
    });

    if (existing) {
      const newQuantity = existing.so_luong + quantity;

      if (newQuantity > variant.so_luong_ton) {
        return res.status(400).json({
          message: 'So luong trong gio vuot qua ton kho',
          so_luong_ton: variant.so_luong_ton,
          so_luong_hien_tai: existing.so_luong,
        });
      }

      await existing.update({
        so_luong: newQuantity,
      });

      return res.status(200).json({
        message: 'Da tang so luong san pham trong gio hang',
        item: existing,
      });
    }

    // Generate ID
    const maxId = await models.ChiTietGioHang.max('id_ct_gio');

    const newId = (maxId || 0) + 1;

    const item = await models.ChiTietGioHang.create({
      id_ct_gio: newId,
      id_gio_hang: cart.id_gio_hang,
      id_bien_the,
      so_luong: quantity,
    });

    return res.status(201).json({
      message: 'Da them san pham vao gio hang',
      item,
    });
  } catch (err) {
    console.error('addItem error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the them san pham vao gio hang',
    });
  }
}

// PUT /api/chitietgiohang/:id

async function updateItem(req, res) {
  try {
    const userId = getUserId(req);
    const id = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { so_luong } = req.body || {};

    const quantity = Number(so_luong);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: 'so_luong phai la so nguyen lon hon 0',
      });
    }

    const cart = await getUserCart(userId);

    if (!cart) {
      return res.status(404).json({
        message: 'Gio hang khong ton tai',
      });
    }

    const item = await models.ChiTietGioHang.findOne({
      where: {
        id_ct_gio: id,
        id_gio_hang: cart.id_gio_hang,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: 'San pham khong ton tai trong gio hang cua ban',
      });
    }

    const variant = await models.KieuSanPham.findOne({
      where: {
        id_bien_the: item.id_bien_the,
      },
    });

    if (!variant) {
      return res.status(404).json({
        message: 'Bien the san pham khong ton tai',
      });
    }

    if (quantity > variant.so_luong_ton) {
      return res.status(400).json({
        message: 'So luong vuot qua ton kho',
        so_luong_ton: variant.so_luong_ton,
      });
    }

    await item.update({
      so_luong: quantity,
    });

    return res.status(200).json({
      message: 'Da cap nhat gio hang',
      item,
    });
  } catch (err) {
    console.error('updateItem error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the cap nhat gio hang',
    });
  }
}

// PATCH /api/chitietgiohang/:id
// Increase/decrease quantity 1/ -1
 
async function changeQuantity(req, res) {
  try {
    const userId = getUserId(req);
    const id = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const change = Number(req.body?.change);

    if (!Number.isInteger(change) || change === 0) {
      return res.status(400).json({
        message: 'change phai la so nguyen khac 0',
      });
    }

    const cart = await getUserCart(userId);

    if (!cart) {
      return res.status(404).json({
        message: 'Gio hang khong ton tai',
      });
    }

    const item = await models.ChiTietGioHang.findOne({
      where: {
        id_ct_gio: id,
        id_gio_hang: cart.id_gio_hang,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: 'San pham khong ton tai trong gio hang cua ban',
      });
    }

    const newQuantity = item.so_luong + change;

    // If quantity becomes zero, remove item
    if (newQuantity <= 0) {
      await item.destroy();

      return res.status(200).json({
        message: 'Da xoa san pham khoi gio hang',
      });
    }

    const variant = await models.KieuSanPham.findOne({
      where: {
        id_bien_the: item.id_bien_the,
      },
    });

    if (!variant) {
      return res.status(404).json({
        message: 'Bien the san pham khong ton tai',
      });
    }

    if (newQuantity > variant.so_luong_ton) {
      return res.status(400).json({
        message: 'So luong vuot qua ton kho',
        so_luong_ton: variant.so_luong_ton,
      });
    }

    await item.update({
      so_luong: newQuantity,
    });

    return res.status(200).json({
      message: 'Da thay doi so luong',
      item,
    });
  } catch (err) {
    console.error('changeQuantity error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the thay doi so luong',
    });
  }
}

// DELETE /api/chitietgiohang/:id

async function removeItem(req, res) {
  try {
    const userId = getUserId(req);
    const id = req.params.id;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const cart = await getUserCart(userId);

    if (!cart) {
      return res.status(404).json({
        message: 'Gio hang khong ton tai',
      });
    }

    const item = await models.ChiTietGioHang.findOne({
      where: {
        id_ct_gio: id,
        id_gio_hang: cart.id_gio_hang,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: 'San pham khong ton tai trong gio hang cua ban',
      });
    }

    await item.destroy();

    return res.status(200).json({
      message: 'Da xoa san pham khoi gio hang',
    });
  } catch (err) {
    console.error('removeItem error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the xoa san pham',
    });
  }
}

module.exports = {
  getAll,
  getOne,
  addItem,
  updateItem,
  changeQuantity,
  removeItem,
};