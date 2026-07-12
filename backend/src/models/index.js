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

// assoc placeholder

module.exports = { sequelize, models };


