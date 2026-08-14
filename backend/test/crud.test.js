const test = require('node:test');
const assert = require('node:assert/strict');

const danhMucController = require('../src/controllers/danhMucController');
const sanPhamController = require('../src/controllers/sanPhamController');
const donHangController = require('../src/controllers/donHangController');
const chiTietDonHangController = require('../src/controllers/chiTietDonHangController');
const donNhapHangController = require('../src/controllers/donNhapHangController');
const chiTietPhieuNhapController = require('../src/controllers/chiTietPhieuNhapController');
const chuongTrinhGiamGiaController = require('../src/controllers/chuongTrinhGiamGiaController');
const lichSuKhoController = require('../src/controllers/lichSuKhoController');
const diaChiController = require('../src/controllers/diaChiController');
const traHangController = require('../src/controllers/traHangController');
const thanhToanController = require('../src/controllers/thanhToanController');
const phieuGiaoHangController = require('../src/controllers/phieuGiaoHangController');

test('danhMucController exposes CRUD operations', () => {
  assert.equal(typeof danhMucController.getAll, 'function');
  assert.equal(typeof danhMucController.getById, 'function');
  assert.equal(typeof danhMucController.create, 'function');
  assert.equal(typeof danhMucController.update, 'function');
  assert.equal(typeof danhMucController.remove, 'function');
});

test('sanPhamController exposes CRUD operations', () => {
  assert.equal(typeof sanPhamController.getAll, 'function');
  assert.equal(typeof sanPhamController.getById, 'function');
  assert.equal(typeof sanPhamController.create, 'function');
  assert.equal(typeof sanPhamController.update, 'function');
  assert.equal(typeof sanPhamController.remove, 'function');
});

test('order and inventory controllers expose CRUD operations', () => {
  const targets = [
    donHangController,
    chiTietDonHangController,
    donNhapHangController,
    chiTietPhieuNhapController,
    chuongTrinhGiamGiaController,
    lichSuKhoController,
    diaChiController,
    traHangController,
    thanhToanController,
    phieuGiaoHangController,
  ];

  for (const controller of targets) {
    assert.equal(typeof controller.getAll, 'function');
    assert.equal(typeof controller.getById, 'function');
    assert.equal(typeof controller.create, 'function');
    assert.equal(typeof controller.update, 'function');
    assert.equal(typeof controller.remove, 'function');
  }
});
