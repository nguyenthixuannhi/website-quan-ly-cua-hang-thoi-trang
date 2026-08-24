const { models, sequelize } = require('../models');

function getUserId(req) {
  return req.user?.id_nguoi_dung;
}

async function getOrCreateCart(userId) {
  let cart = await models.GioHang.findOne({
    where: {
      id_nguoi_dung: userId,
    },
  });

  if (!cart) {
    // Generate a new cart ID.
    const maxCart = await models.GioHang.max('id_gio_hang');

    const newCartId = (maxCart || 0) + 1;

    cart = await models.GioHang.create({
      id_gio_hang: newCartId,
      id_nguoi_dung: userId,
    });
  }

  return cart;
}

// GET /api/giohang
async function getCart(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const cart = await getOrCreateCart(userId);

    return res.status(200).json({
      id_gio_hang: cart.id_gio_hang,
      id_nguoi_dung: cart.id_nguoi_dung,
    });
  } catch (err) {
    console.error('getCart error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the lay gio hang',
    });
  }
}


// GET /api/giohang/count 

async function countCartItems(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const cart = await models.GioHang.findOne({
      where: {
        id_nguoi_dung: userId,
      },
    });

    if (!cart) {
      return res.status(200).json({
        count: 0,
      });
    }

    const result = await models.ChiTietGioHang.sum('so_luong', {
      where: {
        id_gio_hang: cart.id_gio_hang,
      },
    });

    return res.status(200).json({
      count: result || 0,
    });
  } catch (err) {
    console.error('countCartItems error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the dem gio hang',
    });
  }
}

// DELETE /api/giohang

async function clearCart(req, res) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const cart = await models.GioHang.findOne({
      where: {
        id_nguoi_dung: userId,
      },
    });

    if (!cart) {
      return res.status(200).json({
        message: 'Gio hang dang trong',
      });
    }

    await models.ChiTietGioHang.destroy({
      where: {
        id_gio_hang: cart.id_gio_hang,
      },
    });

    return res.status(200).json({
      message: 'Da xoa tat ca san pham khoi gio hang',
    });
  } catch (err) {
    console.error('clearCart error:', err);

    return res.status(500).json({
      message: err.message || 'Khong the xoa gio hang',
    });
  }
}

module.exports = {
  getCart,
  countCartItems,
  clearCart,
  getOrCreateCart,
};