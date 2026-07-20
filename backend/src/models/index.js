const { sequelize } = require('../../db/connection');

const NguoiDungModel = require('./NguoiDung');
const NhaCungCapModel = require('./NhaCungCap');
const DanhMucModel = require('./DanhMuc');
const SanPhamModel = require('./SanPham');
const KieuSanPhamModel = require('./KieuSanPham');
const ChuongTrinhGiamGiaModel = require('./ChuongTrinhGiamGia');
const ChiTietGiamGiaModel = require('./ChiTietGiamGia');
const DonHangModel = require('./DonHang');
const ChiTietDonHangModel = require('./ChiTietDonHang');
const GioHangModel = require('./GioHang');
const ChiTietGioHangModel = require('./ChiTietGioHang');
const DonNhapHangModel = require('./DonNhapHang');
const ChiTietPhieuNhapModel = require('./ChiTietPhieuNhap');
const TraHangModel = require('./TraHang');
const ChiTietTraHangModel = require('./ChiTietTraHang');
const DiaChiModel = require('./DiaChi');
const LichSuKhoModel = require('./LichSuKho');
const PhieuGiaoHangModel = require('./PhieuGiaoHang');
const ThanhToanModel = require('./ThanhToan');

const models = {
  NguoiDung: NguoiDungModel(sequelize),
  NhaCungCap: NhaCungCapModel(sequelize),
  DanhMuc: DanhMucModel(sequelize),
  SanPham: SanPhamModel(sequelize),
  KieuSanPham: KieuSanPhamModel(sequelize),
  ChuongTrinhGiamGia: ChuongTrinhGiamGiaModel(sequelize),
  ChiTietGiamGia: ChiTietGiamGiaModel(sequelize),
  DonHang: DonHangModel(sequelize),
  ChiTietDonHang: ChiTietDonHangModel(sequelize),
  GioHang: GioHangModel(sequelize),
  ChiTietGioHang: ChiTietGioHangModel(sequelize),
  DonNhapHang: DonNhapHangModel(sequelize),
  ChiTietPhieuNhap: ChiTietPhieuNhapModel(sequelize),
  TraHang: TraHangModel(sequelize),
  ChiTietTraHang: ChiTietTraHangModel(sequelize),
  DiaChi: DiaChiModel(sequelize),
  LichSuKho: LichSuKhoModel(sequelize),
  PhieuGiaoHang: PhieuGiaoHangModel(sequelize),
  ThanhToan: ThanhToanModel(sequelize),
};

// ===================== ASSOCIATIONS =====================

// --- DanhMuc ---
models.DanhMuc.hasMany(models.SanPham, { foreignKey: 'id_danh_muc', as: 'san_phams' });
models.DanhMuc.hasMany(models.ChiTietGiamGia, { foreignKey: 'id_danh_muc', as: 'chi_tiet_giam_gias' });

// --- SanPham ---
models.SanPham.belongsTo(models.DanhMuc, { foreignKey: 'id_danh_muc', as: 'danh_muc' });
models.SanPham.hasMany(models.KieuSanPham, { foreignKey: 'id_san_pham', as: 'bien_thes' });
models.SanPham.hasMany(models.ChiTietGiamGia, { foreignKey: 'id_san_pham', as: 'chi_tiet_giam_gias' });

// --- KieuSanPham ---
models.KieuSanPham.belongsTo(models.SanPham, { foreignKey: 'id_san_pham', as: 'san_pham' });
models.KieuSanPham.hasMany(models.ChiTietDonHang, { foreignKey: 'id_bien_the', as: 'chi_tiet_don_hangs' });
models.KieuSanPham.hasMany(models.ChiTietGioHang, { foreignKey: 'id_bien_the', as: 'chi_tiet_gio_hangs' });
models.KieuSanPham.hasMany(models.ChiTietPhieuNhap, { foreignKey: 'id_bien_the', as: 'chi_tiet_phieu_nhaps' });
models.KieuSanPham.hasMany(models.ChiTietTraHang, { foreignKey: 'id_bien_the', as: 'chi_tiet_tra_hangs' });
models.KieuSanPham.hasMany(models.LichSuKho, { foreignKey: 'id_bien_the', as: 'lich_su_khos' });

// --- NguoiDung ---
models.NguoiDung.hasMany(models.DonHang, { foreignKey: 'id_nguoi_dung', as: 'don_hangs' });
models.NguoiDung.hasOne(models.GioHang, { foreignKey: 'id_nguoi_dung', as: 'gio_hang' });
models.NguoiDung.hasMany(models.DiaChi, { foreignKey: 'id_nguoi_dung', as: 'dia_chis' });
models.NguoiDung.hasMany(models.ChuongTrinhGiamGia, { foreignKey: 'id_nguoi_dung', as: 'chuong_trinh_giam_gias' });
models.NguoiDung.hasMany(models.DonNhapHang, { foreignKey: 'id_nguoi_dung', as: 'don_nhap_hangs' });
models.NguoiDung.hasMany(models.LichSuKho, { foreignKey: 'id_nguoi_dung', as: 'lich_su_khos' });

// --- NhaCungCap ---
models.NhaCungCap.hasMany(models.DonNhapHang, { foreignKey: 'id_nha_cung_cap', as: 'don_nhap_hangs' });

// --- DonHang ---
models.DonHang.belongsTo(models.NguoiDung, { foreignKey: 'id_nguoi_dung', as: 'nguoi_dung' });
models.DonHang.hasMany(models.ChiTietDonHang, { foreignKey: 'id_don_hang', as: 'chi_tiet_don_hangs' });
models.DonHang.hasOne(models.PhieuGiaoHang, { foreignKey: 'id_don_hang', as: 'phieu_giao' });
models.DonHang.hasOne(models.ThanhToan, { foreignKey: 'id_don_hang', as: 'thanh_toan' });
models.DonHang.hasOne(models.TraHang, { foreignKey: 'id_don_hang', as: 'tra_hang' });

// --- ChiTietDonHang ---
models.ChiTietDonHang.belongsTo(models.DonHang, { foreignKey: 'id_don_hang', as: 'don_hang' });
models.ChiTietDonHang.belongsTo(models.KieuSanPham, { foreignKey: 'id_bien_the', as: 'bien_the' });

// --- GioHang ---
models.GioHang.belongsTo(models.NguoiDung, { foreignKey: 'id_nguoi_dung', as: 'nguoi_dung' });
models.GioHang.hasMany(models.ChiTietGioHang, { foreignKey: 'id_gio_hang', as: 'chi_tiet_gio_hangs' });

// --- ChiTietGioHang ---
models.ChiTietGioHang.belongsTo(models.GioHang, { foreignKey: 'id_gio_hang', as: 'gio_hang' });
models.ChiTietGioHang.belongsTo(models.KieuSanPham, { foreignKey: 'id_bien_the', as: 'bien_the' });

// --- ChuongTrinhGiamGia ---
models.ChuongTrinhGiamGia.belongsTo(models.NguoiDung, { foreignKey: 'id_nguoi_dung', as: 'nguoi_dung' });
models.ChuongTrinhGiamGia.hasMany(models.ChiTietGiamGia, { foreignKey: 'id_giam_gia', as: 'chi_tiet_giam_gias' });

// --- ChiTietGiamGia ---
models.ChiTietGiamGia.belongsTo(models.ChuongTrinhGiamGia, { foreignKey: 'id_giam_gia', as: 'chuong_trinh_giam_gia' });
models.ChiTietGiamGia.belongsTo(models.SanPham, { foreignKey: 'id_san_pham', as: 'san_pham' });
models.ChiTietGiamGia.belongsTo(models.DanhMuc, { foreignKey: 'id_danh_muc', as: 'danh_muc' });

// --- DonNhapHang ---
models.DonNhapHang.belongsTo(models.NhaCungCap, { foreignKey: 'id_nha_cung_cap', as: 'nha_cung_cap' });
models.DonNhapHang.belongsTo(models.NguoiDung, { foreignKey: 'id_nguoi_dung', as: 'nguoi_dung' });
models.DonNhapHang.hasMany(models.ChiTietPhieuNhap, { foreignKey: 'id_don_nhap', as: 'chi_tiet_phieu_nhaps' });

// --- ChiTietPhieuNhap ---
models.ChiTietPhieuNhap.belongsTo(models.DonNhapHang, { foreignKey: 'id_don_nhap', as: 'don_nhap_hang' });
models.ChiTietPhieuNhap.belongsTo(models.KieuSanPham, { foreignKey: 'id_bien_the', as: 'bien_the' });

// --- TraHang ---
models.TraHang.belongsTo(models.DonHang, { foreignKey: 'id_don_hang', as: 'don_hang' });
models.TraHang.hasMany(models.ChiTietTraHang, { foreignKey: 'id_phieu_tra', as: 'chi_tiet_tra_hangs' });

// --- ChiTietTraHang ---
models.ChiTietTraHang.belongsTo(models.TraHang, { foreignKey: 'id_phieu_tra', as: 'phieu_tra' });
models.ChiTietTraHang.belongsTo(models.KieuSanPham, { foreignKey: 'id_bien_the', as: 'bien_the' });

// --- DiaChi ---
models.DiaChi.belongsTo(models.NguoiDung, { foreignKey: 'id_nguoi_dung', as: 'nguoi_dung' });

// --- LichSuKho ---
models.LichSuKho.belongsTo(models.KieuSanPham, { foreignKey: 'id_bien_the', as: 'bien_the' });
models.LichSuKho.belongsTo(models.NguoiDung, { foreignKey: 'id_nguoi_dung', as: 'nguoi_dung' });

// --- PhieuGiaoHang ---
models.PhieuGiaoHang.belongsTo(models.DonHang, { foreignKey: 'id_don_hang', as: 'don_hang' });

// --- ThanhToan ---
models.ThanhToan.belongsTo(models.DonHang, { foreignKey: 'id_don_hang', as: 'don_hang' });

module.exports = { sequelize, models };


