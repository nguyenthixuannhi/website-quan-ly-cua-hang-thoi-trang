const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger-docs');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const testRoutes = require('./src/routes/testRoutes');
const danhMucRoutes = require('./src/routes/danhMucRoutes');
const sanPhamRoutes = require('./src/routes/sanPhamRoutes');
const uiRoutes = require('./src/routes/uiRoutes');
const nhaCungCapRoutes = require('./src/routes/nhaCungCapRoutes');
const quangCaoRoutes = require('./src/routes/quangCaoRoutes');
const donHangRoutes = require('./src/routes/donHangRoutes');
const { initializeAdmin } = require('./src/config/adminjs');
const chiTietDonHangRoutes = require('./src/routes/chiTietDonHangRoutes');
const donNhapHangRoutes = require('./src/routes/donNhapHangRoutes');
const chiTietPhieuNhapRoutes = require('./src/routes/chiTietPhieuNhapRoutes');
const chuongTrinhGiamGiaRoutes = require('./src/routes/chuongTrinhGiamGiaRoutes');
const lichSuKhoRoutes = require('./src/routes/lichSuKhoRoutes');
const diaChiRoutes = require('./src/routes/diaChiRoutes');
const traHangRoutes = require('./src/routes/traHangRoutes');
const thanhToanRoutes = require('./src/routes/thanhToanRoutes');
const phieuGiaoHangRoutes = require('./src/routes/phieuGiaoHangRoutes');
const gioHangRoutes = require('./src/routes/gioHangRoutes');
const chiTietGioHangRoutes = require('./src/routes/chiTietGioHangRoutes');
const chiTietGiamGiaRoutes = require('./src/routes/chiTietGiamGiaRoutes');
const backupRoutes = require('./src/routes/backupRoutes');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

initializeAdmin(app).catch((error) => {
  console.error('[AdminJS] failed to initialize:', error);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/danhmuc', danhMucRoutes);
app.use('/api/sanpham', sanPhamRoutes);
app.use('/api/nhacungcap', nhaCungCapRoutes);
app.use('/api/quangcao', quangCaoRoutes);
app.use('/api/donhang', donHangRoutes);
app.use('/api/chitietdonhang', chiTietDonHangRoutes);
app.use('/api/donnhaphang', donNhapHangRoutes);
app.use('/api/chitietphieunhap', chiTietPhieuNhapRoutes);
app.use('/api/chuongtrinhgiamgia', chuongTrinhGiamGiaRoutes);
app.use('/api/lichsukho', lichSuKhoRoutes);
app.use('/api/diachi', diaChiRoutes);
app.use('/api/trahang', traHangRoutes);
app.use('/api/thanhtoan', thanhToanRoutes);
app.use('/api/phieugiaohang', phieuGiaoHangRoutes);
app.use('/api/ui', uiRoutes);
app.use('/api/giohang', gioHangRoutes);
app.use('/api/chitietgiohang', chiTietGioHangRoutes);
app.use('/api/chitietgiamgia', chiTietGiamGiaRoutes);
app.use('/api/backup', backupRoutes);
app.use('/auth', authRoutes);
app.use('/test', testRoutes);

app.use('/backups', express.static(path.resolve(__dirname, '../backups')));




const { sequelize } = require('./src/models');



async function start() {
  try {
    await sequelize.authenticate();
    console.log('[DB] Sequelize connected successfully');
  } catch (err) {
    console.error('[DB] Sequelize connection failed:', err.message);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start();