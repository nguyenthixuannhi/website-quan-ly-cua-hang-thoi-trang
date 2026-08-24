const swaggerDocs = 
{
  openapi: '3.0.0',
  info: {
    title: 'Store Management API',
    version: '1.0.0',
    description: 'Backend API documentation for the store management system.',
  },
  servers: [
    {
      url: process.env.BASE_URL || 'http://localhost:3000', // backend url (from .env BASE_URL)
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id_nguoi_dung: { type: 'integer' },
          email: { type: 'string' },
          vai_tro: { type: 'string' },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['id_nguoi_dung', 'email', 'mat_khau'],
        properties: {
          id_nguoi_dung: { type: 'integer' },
          email: { type: 'string' },
          mat_khau: { type: 'string', format: 'password' },
        },
        description: 'Vai tro mac dinh duoc dat la "khach hang"',
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'mat_khau'],
        properties: {
          email: { type: 'string' },
          mat_khau: { type: 'string', format: 'password' },
        },
      },
      DanhMuc: {
        type: 'object',
        properties: {
          id_danh_muc: { type: 'integer' },
          ten_danh_muc: { type: 'string' },
        },
      },
      SanPham: {
        type: 'object',
        properties: {
          id_san_pham: { type: 'integer' },
          id_danh_muc: { type: 'integer' },
          ten_san_pham: { type: 'string' },
          anh_san_pham: { type: 'string' },
          danh_muc: { $ref: '#/components/schemas/DanhMuc' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { type: 'string' },
        },
      },
      Banners: {
        type: 'object',
        properties: {
          hero: { type: 'string', description: 'Hero image URL' },
          loginBanner: { type: 'string', description: 'Login page banner URL' },
          signUpBanner: { type: 'string', description: 'Sign-up page banner URL' },
        },
      },
      QuangCao: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          tieu_de: { type: 'string', description: 'Tiêu đề quảng cáo' },
          url_hinh_anh: { type: 'string', description: 'Đường dẫn hình ảnh đầy đủ' },
          url_dich: { type: 'string', nullable: true, description: 'Đường dẫn chuyển hướng' },
          mua: { type: 'string', nullable: true, description: 'Mùa' },
          danh_muc_trong_tam: { type: 'string', nullable: true, description: 'Danh mục trọng tâm' },
          uu_tien: { type: 'integer', description: 'Độ ưu tiên' },
          ngay_bat_dau: { type: 'string', format: 'date-time', nullable: true, description: 'Ngày bắt đầu' },
          ngay_ket_thuc: { type: 'string', format: 'date-time', nullable: true, description: 'Ngày kết thúc' },
          kich_hoat: { type: 'boolean', description: 'Kích hoạt' },
        },
      },
      DiaChi: {
        type: 'object',
        properties: {
          id_dia_chi: { type: 'integer' },
          id_nguoi_dung: { type: 'integer' },
          dia_chi_chi_tiet: { type: 'string' },
        },
      },
      DonHang: {
        type: 'object',
        properties: {
          id_don_hang: { type: 'integer' },
          id_nguoi_dung: { type: 'integer' },
          loai_don: { type: 'string' },
          trang_thai: { type: 'string' },
          ngay_tao: { type: 'string', format: 'date-time' },
        },
      },
      ChiTietDonHang: {
        type: 'object',
        properties: {
          id_ct_don: { type: 'integer' },
          id_don_hang: { type: 'integer' },
          id_bien_the: { type: 'integer' },
          so_luong: { type: 'integer' },
          don_gia_thuc: { type: 'number' },
        },
      },
      DonNhapHang: {
        type: 'object',
        properties: {
          id_don_nhap: { type: 'integer' },
          id_nha_cung_cap: { type: 'integer' },
          id_nguoi_dung: { type: 'integer' },
          ngay_nhap: { type: 'string', format: 'date-time' },
        },
      },
      ChiTietPhieuNhap: {
        type: 'object',
        properties: {
          id_chi_tiet_nhap: { type: 'integer' },
          id_don_nhap: { type: 'integer' },
          id_bien_the: { type: 'integer' },
          so_luong: { type: 'integer' },
        },
      },
      ChuongTrinhGiamGia: {
        type: 'object',
        properties: {
          id_giam_gia: { type: 'integer' },
          id_nguoi_dung: { type: 'integer' },
          ten_chuong_trinh: { type: 'string' },
          phan_tram_giam: { type: 'number' },
        },
      },
      LichSuKho: {
        type: 'object',
        properties: {
          id_lich_su: { type: 'integer' },
          id_bien_the: { type: 'integer' },
          id_nguoi_dung: { type: 'integer' },
          loai_thao_tac: { type: 'string' },
          so_luong_thay_doi: { type: 'integer' },
        },
      },
      ThanhToan: {
        type: 'object',
        properties: {
          id_thanh_toan: { type: 'integer' },
          id_don_hang: { type: 'integer' },
          phuong_thuc: { type: 'string' },
          so_tien: { type: 'number' },
        },
      },
      PhieuGiaoHang: {
        type: 'object',
        properties: {
          id_phieu_giao: { type: 'integer' },
          id_don_hang: { type: 'integer' },
          don_vi_van_chuyen: { type: 'string' },
          trang_thai: { type: 'string' },
        },
      },
      TraHang: {
        type: 'object',
        properties: {
          id_phieu_tra: { type: 'integer' },
          id_don_hang: { type: 'integer' },
          ly_do: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '400': { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '409': { description: 'Email exists' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'OK (returns token)' },
          '400': { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Invalid credentials' },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Create new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '400': { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '500': { description: 'Server error' },
        },
      },
    },
    '/test/dbconnect': {
      get: {
        tags: ['Test'],
        summary: 'Test database connection',
        responses: {
          '200': { description: 'Database connection OK' },
          '500': { description: 'Database connection failed', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/danhmuc': {
      get: {
        tags: ['DanhMuc'],
        summary: 'Get all danh muc categories',
        responses: {
          '200': {
            description: 'List of danh muc categories',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/DanhMuc' },
                },
              },
            },
          },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/diachi': {
      get: {
        tags: ['DiaChi'],
        summary: 'Get all addresses',
        responses: { '200': { description: 'List of addresses', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/DiaChi' } } } } } },
      },
      post: {
        tags: ['DiaChi'],
        summary: 'Create address',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DiaChi' } } } },
        responses: { '201': { description: 'Created' }, '400': { description: 'Bad request' } },
      },
    },
    '/diachi/{id}': {
      get: { tags: ['DiaChi'], summary: 'Get address by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/DiaChi' } } } }, '404': { description: 'Not found' } } },
      put: { tags: ['DiaChi'], summary: 'Update address', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/DiaChi' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['DiaChi'], summary: 'Delete address', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/donhang': {
      get: { tags: ['DonHang'], summary: 'Get all orders', responses: { '200': { description: 'List of orders', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/DonHang' } } } } } } },
      post: { tags: ['DonHang'], summary: 'Create order', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DonHang' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/donhang/{id}': {
      get: { tags: ['DonHang'], summary: 'Get order by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/DonHang' } } } }, '404': { description: 'Not found' } } },
      put: { tags: ['DonHang'], summary: 'Update order', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/DonHang' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['DonHang'], summary: 'Delete order', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/chitietdonhang': {
      get: { tags: ['ChiTietDonHang'], summary: 'Get all order items', responses: { '200': { description: 'List of order items', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ChiTietDonHang' } } } } } } },
      post: { tags: ['ChiTietDonHang'], summary: 'Create order item', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ChiTietDonHang' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/chitietdonhang/{id}': {
      get: { tags: ['ChiTietDonHang'], summary: 'Get order item by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } } },
      put: { tags: ['ChiTietDonHang'], summary: 'Update order item', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ChiTietDonHang' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['ChiTietDonHang'], summary: 'Delete order item', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/donnhaphang': {
      get: { tags: ['DonNhapHang'], summary: 'Get all purchase orders', responses: { '200': { description: 'List of purchases', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/DonNhapHang' } } } } } } },
      post: { tags: ['DonNhapHang'], summary: 'Create purchase', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DonNhapHang' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/donnhaphang/{id}': {
      get: { tags: ['DonNhapHang'], summary: 'Get purchase by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } } },
      put: { tags: ['DonNhapHang'], summary: 'Update purchase', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/DonNhapHang' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['DonNhapHang'], summary: 'Delete purchase', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/chitietphieunhap': {
      get: { tags: ['ChiTietPhieuNhap'], summary: 'Get all purchase details', responses: { '200': { description: 'List', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ChiTietPhieuNhap' } } } } } } } ,
      post: { tags: ['ChiTietPhieuNhap'], summary: 'Create purchase detail', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ChiTietPhieuNhap' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/chitietphieunhap/{id}': {
      get: { tags: ['ChiTietPhieuNhap'], summary: 'Get by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } } },
      put: { tags: ['ChiTietPhieuNhap'], summary: 'Update', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ChiTietPhieuNhap' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['ChiTietPhieuNhap'], summary: 'Delete', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/chuongtrinhgiamgia': {
      get: { tags: ['ChuongTrinhGiamGia'], summary: 'Get all promotion programs', responses: { '200': { description: 'List', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ChuongTrinhGiamGia' } } } } } } },
      post: { tags: ['ChuongTrinhGiamGia'], summary: 'Create promotion', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ChuongTrinhGiamGia' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/chuongtrinhgiamgia/{id}': {
      get: { tags: ['ChuongTrinhGiamGia'], summary: 'Get promotion by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } } },
      put: { tags: ['ChuongTrinhGiamGia'], summary: 'Update promotion', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ChuongTrinhGiamGia' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['ChuongTrinhGiamGia'], summary: 'Delete promotion', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/lichsukho': {
      get: { tags: ['LichSuKho'], summary: 'Get inventory history', responses: { '200': { description: 'List', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/LichSuKho' } } } } } } },
      post: { tags: ['LichSuKho'], summary: 'Create inventory record', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LichSuKho' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/lichsukho/{id}': {
      get: { tags: ['LichSuKho'], summary: 'Get history by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } } },
      put: { tags: ['LichSuKho'], summary: 'Update history', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/LichSuKho' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['LichSuKho'], summary: 'Delete history', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/trahang': {
      get: { tags: ['TraHang'], summary: 'Get all returns', responses: { '200': { description: 'List', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/TraHang' } } } } } } } ,
      post: { tags: ['TraHang'], summary: 'Create return', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/TraHang' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/trahang/{id}': {
      get: { tags: ['TraHang'], summary: 'Get return by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } } },
      put: { tags: ['TraHang'], summary: 'Update return', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/TraHang' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['TraHang'], summary: 'Delete return', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/thanhtoan': {
      get: { tags: ['ThanhToan'], summary: 'Get all payments', responses: { '200': { description: 'List', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ThanhToan' } } } } } } },
      post: { tags: ['ThanhToan'], summary: 'Create payment', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ThanhToan' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/thanhtoan/{id}': {
      get: { tags: ['ThanhToan'], summary: 'Get payment by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } } },
      put: { tags: ['ThanhToan'], summary: 'Update payment', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ThanhToan' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['ThanhToan'], summary: 'Delete payment', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/phieugiaohang': {
      get: { tags: ['PhieuGiaoHang'], summary: 'Get all delivery notes', responses: { '200': { description: 'List', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/PhieuGiaoHang' } } } } } } } ,
      post: { tags: ['PhieuGiaoHang'], summary: 'Create delivery note', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PhieuGiaoHang' } } } }, responses: { '201': { description: 'Created' } } },
    },
    '/phieugiaohang/{id}': {
      get: { tags: ['PhieuGiaoHang'], summary: 'Get by id', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } } },
      put: { tags: ['PhieuGiaoHang'], summary: 'Update', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/PhieuGiaoHang' } } } }, responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } } },
      delete: { tags: ['PhieuGiaoHang'], summary: 'Delete', parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
    },
    '/sanpham': {
      get: {
        tags: ['SanPham'],
        summary: 'Get all products (SANPHAM)',
        responses: {
          '200': {
            description: 'List of products',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SanPham' },
                },
              },
            },
          },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/ui/banners': {
      get: {
        tags: ['UI'],
        summary: 'Get banner image URLs (hero, login, sign-up)',
        responses: {
          '200': {
            description: 'Banner URLs',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Banners' },
              },
            },
          },
          '500': { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/ui/quang-cao': {
      get: {
        tags: ['UI'],
        summary: 'Lấy danh sách quảng cáo đang kích hoạt',
        responses: {
          '200': {
            description: 'Danh sách quảng cáo đang kích hoạt',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/QuangCao' },
                },
              },
            },
          },
          '500': { description: 'Lỗi máy chủ', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
  },
};
module.exports = swaggerDocs;
