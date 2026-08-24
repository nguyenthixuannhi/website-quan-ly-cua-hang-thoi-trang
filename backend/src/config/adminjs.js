const { verifyToken } = require('../config/jwt');
const { models } = require('../models');

const ADMIN_ALLOWED_ROLES = new Set(['ADMIN', 'STAFF']);

const requireAdminAccess = async (req, res, next) => {
  try {
    // Accept token from Authorization header, cookie named 'token', or query param 'token'
    let token;
    const authHeader = req.headers.authorization || '';
    const [, headerToken] = authHeader.split(' ');
    if (headerToken) token = headerToken;
    if (!token && req.headers.cookie) {
      const match = req.headers.cookie.match(/(?:^|; )token=([^;]+)/);
      if (match) token = match[1];
    }
    if (!token && req.query && req.query.token) token = req.query.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: missing Bearer token' });
    }

    const decoded = verifyToken(token);
    const role = String(decoded.vai_tro || '').toUpperCase();

    if (!ADMIN_ALLOWED_ROLES.has(role)) {
      return res.status(403).json({ message: 'Forbidden: admin dashboard is restricted to ADMIN and STAFF users' });
    }

    const user = await models.NguoiDung.findByPk(decoded.id_nguoi_dung, {
      attributes: ['id_nguoi_dung', 'email', 'vai_tro'],
    });

    if (!user || !ADMIN_ALLOWED_ROLES.has(String(user.vai_tro || '').toUpperCase())) {
      return res.status(403).json({ message: 'Forbidden: account is not allowed to access admin dashboard' });
    }

    req.user = {
      id_nguoi_dung: user.id_nguoi_dung,
      email: user.email,
      vai_tro: user.vai_tro,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid or expired token' });
  }
};

const initializeAdmin = async (app) => {
  const { AdminJS } = await import('adminjs');
  const { buildRouter } = await import('@adminjs/express');
  const AdminJSSequelize = await import('@adminjs/sequelize');

  AdminJS.registerAdapter({
    Database: AdminJSSequelize.Database,
    Resource: AdminJSSequelize.Resource,
  });

  const admin = new AdminJS({
    resources: [
      {
        resource: models.NguoiDung,
        options: {
          properties: {
            mat_khau: {
              isVisible: { list: false, show: false, edit: true, filter: false },
            },
          },
        },
      },
      { resource: models.QuangCao },
      { resource: models.NhaCungCap },
      { resource: models.DanhMuc },
      { resource: models.SanPham },
      { resource: models.KieuSanPham },
      { resource: models.ChuongTrinhGiamGia },
      { resource: models.ChiTietGiamGia },
      { resource: models.DonHang },
      { resource: models.ChiTietDonHang },
      { resource: models.GioHang },
      { resource: models.ChiTietGioHang },
      { resource: models.DonNhapHang },
      { resource: models.ChiTietPhieuNhap },
      { resource: models.TraHang },
      { resource: models.ChiTietTraHang },
      { resource: models.DiaChi },
      { resource: models.LichSuKho },
      { resource: models.PhieuGiaoHang },
      { resource: models.ThanhToan },
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'Store Admin',
      softwareBrothers: false,
    },
  });

  const adminRouter = buildRouter(admin);
  app.use(admin.options.rootPath, requireAdminAccess, adminRouter);
};

module.exports = {
  initializeAdmin,
};
