const { verifyToken } = require('../config/jwt');
const { models } = require('../models');
const path = require('path');

const ADMIN_ALLOWED_ROLES = new Set(['ADMIN', 'STAFF']);

const requireAdminAccess = async (req, res, next) => {
  try {
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
  // Import AdminJS and ComponentLoader correctly
  const adminjsModule = await import('adminjs');
  const AdminJS = adminjsModule.default || adminjsModule.AdminJS;
  const { ComponentLoader } = adminjsModule;

  const { buildRouter } = await import('@adminjs/express');
  const AdminJSSequelize = await import('@adminjs/sequelize');

  AdminJS.registerAdapter({
    Database: AdminJSSequelize.Database,
    Resource: AdminJSSequelize.Resource,
  });

  const componentLoader = new ComponentLoader();

  const uploadModule = await import('@adminjs/upload');
  const uploadFeature = uploadModule.default || uploadModule;
  const uploadBucket = path.join(__dirname, '../../uploads');

  const resources = [
    {
      resource: models.NguoiDung,
      options: {
        properties: {
          id_nguoi_dung: { isVisible: { list: true, show: true, edit: true, filter: true } },
          email: { isVisible: { list: true, show: true, edit: true, filter: true } },
          mat_khau: {
            isVisible: { list: false, show: false, edit: true, filter: false },
          },
          vai_tro: { isVisible: { list: true, show: true, edit: true, filter: true } },
        },
      },
    },
    {
      resource: models.QuangCao,
      options: {
        properties: {
          id: { isVisible: { list: true, show: true, edit: false, filter: true } },
          tieu_de: { isVisible: { list: true, show: true, edit: true, filter: true } },
          url_hinh_anh: { isVisible: { list: true, show: true, edit: false, filter: false } },
          url_dich: { isVisible: { list: true, show: true, edit: true, filter: false } },
          mua: { isVisible: { list: true, show: true, edit: true, filter: true } },
          danh_muc_trong_tam: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ngay_bat_dau: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ngay_ket_thuc: { isVisible: { list: true, show: true, edit: true, filter: true } },
          uu_tien: { isVisible: { list: true, show: true, edit: true, filter: true } },
          kich_hoat: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ngay_tao: { isVisible: { list: true, show: true, edit: false, filter: false } },
        },
      },
      features: [
        uploadFeature({
          componentLoader, 
          provider: { local: { bucket: uploadBucket } },
          properties: { key: 'url_hinh_anh' },
          uploadPath: (record, filename) => `quangcao/${Date.now()}-${filename}`,
        }),
      ],
    },
    { 
      resource: models.NhaCungCap,
      options: {
        properties: {
          id_nha_cung_cap: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ten_ncc: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.DanhMuc,
      options: {
        properties: {
          id_danh_muc: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ten_danh_muc: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    {
      resource: models.SanPham,
      options: {
        properties: {
          id_san_pham: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_danh_muc: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ten_san_pham: { isVisible: { list: true, show: true, edit: true, filter: true } },
          mo_ta: { isVisible: { list: true, show: true, edit: true, filter: false } },
          anh_san_pham: { isVisible: { list: true, show: true, edit: true, filter: false } },
        },
      },
      features: [
        uploadFeature({
          componentLoader,
          provider: { local: { bucket: uploadBucket } },
          properties: { key: 'anh_san_pham' },
          uploadPath: (record, filename) => `sanpham/${Date.now()}-${filename}`,
        }),
      ],
    },
    {
      resource: models.KieuSanPham,
      options: {
        properties: {
          id_bien_the: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_san_pham: { isVisible: { list: true, show: true, edit: true, filter: true } },
          size: { isVisible: { list: true, show: true, edit: true, filter: true } },
          mau_sac: { isVisible: { list: true, show: true, edit: true, filter: true } },
          so_luong_ton: { isVisible: { list: true, show: true, edit: true, filter: true } },
          gia_ban: { isVisible: { list: true, show: true, edit: true, filter: true } },
        },
      },
    },
    { 
      resource: models.ChuongTrinhGiamGia,
      options: {
        properties: {
          id_giam_gia: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_nguoi_dung: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ten_chuong_trinh: { isVisible: { list: true, show: true, edit: true, filter: true } },
          phan_tram_giam: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.ChiTietGiamGia,
      options: {
        properties: {
          id_chi_tiet_km: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_giam_gia: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_san_pham: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_danh_muc: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.DonHang,
      options: {
        properties: {
          id_don_hang: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_nguoi_dung: { isVisible: { list: true, show: true, edit: true, filter: true } },
          loai_don: { isVisible: { list: true, show: true, edit: true, filter: true } },
          trang_thai: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ngay_tao: { isVisible: { list: true, show: true, edit: false, filter: true } },
        }
      }
    },
    { 
      resource: models.ChiTietDonHang,
      options: {
        properties: {
          id_ct_don: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_don_hang: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_bien_the: { isVisible: { list: true, show: true, edit: true, filter: true } },
          so_luong: { isVisible: { list: true, show: true, edit: true, filter: true } },
          don_gia_thuc: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.GioHang,
      options: {
        properties: {
          id_gio_hang: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_nguoi_dung: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.ChiTietGioHang,
      options: {
        properties: {
          id_ct_gio: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_gio_hang: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_bien_the: { isVisible: { list: true, show: true, edit: true, filter: true } },
          so_luong: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.DonNhapHang,
      options: {
        properties: {
          id_don_nhap: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_nha_cung_cap: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_nguoi_dung: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ngay_nhap: { isVisible: { list: true, show: true, edit: false, filter: true } },
        }
      }
    },
    { 
      resource: models.ChiTietPhieuNhap,
      options: {
        properties: {
          id_chi_tiet_nhap: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_don_nhap: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_bien_the: { isVisible: { list: true, show: true, edit: true, filter: true } },
          so_luong: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.TraHang,
      options: {
        properties: {
          id_phieu_tra: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_don_hang: { isVisible: { list: true, show: true, edit: true, filter: true } },
          ly_do: { isVisible: { list: true, show: true, edit: true, filter: false } },
        }
      }
    },
    { 
      resource: models.ChiTietTraHang,
      options: {
        properties: {
          id_chi_tiet_tra: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_phieu_tra: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_bien_the: { isVisible: { list: true, show: true, edit: true, filter: true } },
          so_luong: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.DiaChi,
      options: {
        properties: {
          id_dia_chi: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_nguoi_dung: { isVisible: { list: true, show: true, edit: true, filter: true } },
          dia_chi_chi_tiet: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.LichSuKho,
      options: {
        properties: {
          id_lich_su: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_bien_the: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_nguoi_dung: { isVisible: { list: true, show: true, edit: true, filter: true } },
          loai_thao_tac: { isVisible: { list: true, show: true, edit: true, filter: true } },
          so_luong_thay_doi: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.PhieuGiaoHang,
      options: {
        properties: {
          id_phieu_giao: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_don_hang: { isVisible: { list: true, show: true, edit: true, filter: true } },
          don_vi_van_chuyen: { isVisible: { list: true, show: true, edit: true, filter: true } },
          trang_thai: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
    { 
      resource: models.ThanhToan,
      options: {
        properties: {
          id_thanh_toan: { isVisible: { list: true, show: true, edit: true, filter: true } },
          id_don_hang: { isVisible: { list: true, show: true, edit: true, filter: true } },
          phuong_thuc: { isVisible: { list: true, show: true, edit: true, filter: true } },
          so_tien: { isVisible: { list: true, show: true, edit: true, filter: true } },
        }
      }
    },
  ];

  const admin = new AdminJS({
    componentLoader,
    resources,
    rootPath: '/admin',
    branding: {
      companyName: 'Store Admin',
      softwareBrothers: false,
    },
  });
  admin.watch();
  const adminRouter = buildRouter(admin);
  app.use(admin.options.rootPath, requireAdminAccess, adminRouter);
};

module.exports = {
  initializeAdmin,
};