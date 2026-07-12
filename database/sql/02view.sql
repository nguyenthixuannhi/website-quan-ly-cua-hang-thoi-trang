
-- CHITIETDONHANG
CREATE OR REPLACE VIEW V_CHITIETDONHANG AS 
SELECT id_ct_don, id_don_hang, id_bien_the, so_luong, don_gia_thuc 
FROM CHITIETDONHANG;

CREATE OR REPLACE VIEW V_CHITIETDONHANGv1 AS 
SELECT id_ct_don, id_don_hang, id_bien_the, so_luong, don_gia_thuc 
FROM CHITIETDONHANG;

-- CHITIETGIAMGIA
CREATE OR REPLACE VIEW V_CHITIETGIAMGIA AS 
SELECT id_chi_tiet_km, id_giam_gia, id_san_pham, id_danh_muc 
FROM CHITIETGIAMGIA;

CREATE OR REPLACE VIEW V_CHITIETGIAMGIAv1 AS 
SELECT id_chi_tiet_km, id_giam_gia, id_san_pham, id_danh_muc 
FROM CHITIETGIAMGIA;

-- CHITIETGIOHANG
CREATE OR REPLACE VIEW V_CHITIETGIOHANG AS 
SELECT id_ct_gio, id_gio_hang, id_bien_the, so_luong 
FROM CHITIETGIOHANG;

CREATE OR REPLACE VIEW V_CHITIETGIOHANGv1 AS 
SELECT id_ct_gio, id_gio_hang, id_bien_the, so_luong 
FROM CHITIETGIOHANG;

-- CHITIETPHIEUNHAP
CREATE OR REPLACE VIEW V_CHITIETPHIEUNHAP AS 
SELECT id_chi_tiet_nhap, id_don_nhap, id_bien_the, so_luong 
FROM CHITIETPHIEUNHAP;

CREATE OR REPLACE VIEW V_CHITIETPHIEUNHAPv1 AS 
SELECT id_chi_tiet_nhap, id_don_nhap, id_bien_the, so_luong 
FROM CHITIETPHIEUNHAP;

-- CHITIETTRAHANG
CREATE OR REPLACE VIEW V_CHITIETTRAHANG AS 
SELECT id_chi_tiet_tra, id_phieu_tra, id_bien_the, so_luong 
FROM CHITIETTRAHANG;

CREATE OR REPLACE VIEW V_CHITIETTRAHANGv1 AS 
SELECT id_chi_tiet_tra, id_phieu_tra, id_bien_the, so_luong 
FROM CHITIETTRAHANG;

-- CHUONGTRINHGIAMGIA
CREATE OR REPLACE VIEW V_CHUONGTRINHGIAMGIA AS 
SELECT id_giam_gia, id_nguoi_dung, ten_chuong_trinh, phan_tram_giam 
FROM CHUONGTRINHGIAMGIA;

CREATE OR REPLACE VIEW V_CHUONGTRINHGIAMGIAv1 AS 
SELECT id_giam_gia, id_nguoi_dung, ten_chuong_trinh, phan_tram_giam 
FROM CHUONGTRINHGIAMGIA;

-- DANHMUC
CREATE OR REPLACE VIEW V_DANHMUC AS 
SELECT id_danh_muc, ten_danh_muc 
FROM DANHMUC;

CREATE OR REPLACE VIEW V_DANHMUCv1 AS 
SELECT id_danh_muc, ten_danh_muc 
FROM DANHMUC;

-- DIACHI
CREATE OR REPLACE VIEW V_DIACHI AS 
SELECT id_dia_chi, id_nguoi_dung, dia_chi_chi_tiet 
FROM DIACHI;

CREATE OR REPLACE VIEW V_DIACHIv1 AS 
SELECT id_dia_chi, id_nguoi_dung, dia_chi_chi_tiet 
FROM DIACHI;

-- DONHANG
CREATE OR REPLACE VIEW V_DONHANG AS 
SELECT id_don_hang, id_nguoi_dung, loai_don, trang_thai, ngay_tao 
FROM DONHANG;

CREATE OR REPLACE VIEW V_DONHANGv1 AS 
SELECT id_don_hang, id_nguoi_dung, loai_don, trang_thai, ngay_tao 
FROM DONHANG;

-- DONNHAPHANG
CREATE OR REPLACE VIEW V_DONNHAPHANG AS 
SELECT id_don_nhap, id_nha_cung_cap, id_nguoi_dung, ngay_nhap 
FROM DONNHAPHANG;

CREATE OR REPLACE VIEW V_DONNHAPHANGv1 AS 
SELECT id_don_nhap, id_nha_cung_cap, id_nguoi_dung, ngay_nhap 
FROM DONNHAPHANG;

-- GIOHANG
CREATE OR REPLACE VIEW V_GIOHANG AS 
SELECT id_gio_hang, id_nguoi_dung 
FROM GIOHANG;

CREATE OR REPLACE VIEW V_GIOHANGv1 AS 
SELECT id_gio_hang, id_nguoi_dung 
FROM GIOHANG;

-- KIEUSANPHAM
CREATE OR REPLACE VIEW V_KIEUSANPHAM AS 
SELECT id_bien_the, id_san_pham, `size`, mau_sac, so_luong_ton, gia_ban 
FROM KIEUSANPHAM;

CREATE OR REPLACE VIEW V_KIEUSANPHAMv1 AS 
SELECT id_bien_the, id_san_pham, `size`, mau_sac, so_luong_ton, gia_ban 
FROM KIEUSANPHAM;

-- LICHSUKHO
CREATE OR REPLACE VIEW V_LICHSUKHO AS 
SELECT id_lich_su, id_bien_the, id_nguoi_dung, loai_thao_tac, so_luong_thay_doi 
FROM LICHSUKHO;

CREATE OR REPLACE VIEW V_LICHSUKHOv1 AS 
SELECT id_lich_su, id_bien_the, id_nguoi_dung, loai_thao_tac, so_luong_thay_doi 
FROM LICHSUKHO;

-- NGUOIDUNG
CREATE OR REPLACE VIEW V_NGUOIDUNG AS 
SELECT id_nguoi_dung, email, mat_khau, vai_tro 
FROM NGUOIDUNG;

CREATE OR REPLACE VIEW V_NGUOIDUNGv1 AS 
SELECT id_nguoi_dung, email, mat_khau, vai_tro 
FROM NGUOIDUNG;

-- NHACUNGCAP
CREATE OR REPLACE VIEW V_NHACUNGCAP AS 
SELECT id_nha_cung_cap, ten_ncc 
FROM NHACUNGCAP;

CREATE OR REPLACE VIEW V_NHACUNGCAPv1 AS 
SELECT id_nha_cung_cap, ten_ncc 
FROM NHACUNGCAP;

-- PHIEUGIAOHANG
CREATE OR REPLACE VIEW V_PHIEUGIAOHANG AS 
SELECT id_phieu_giao, id_don_hang, don_vi_van_chuyen, trang_thai 
FROM PHIEUGIAOHANG;

CREATE OR REPLACE VIEW V_PHIEUGIAOHANGv1 AS 
SELECT id_phieu_giao, id_don_hang, don_vi_van_chuyen, trang_thai 
FROM PHIEUGIAOHANG;

-- SANPHAM
CREATE OR REPLACE VIEW V_SANPHAM AS 
SELECT id_san_pham, id_danh_muc, ten_san_pham, anh_san_pham 
FROM SANPHAM;

CREATE OR REPLACE VIEW V_SANPHAMv1 AS 
SELECT id_san_pham, id_danh_muc, ten_san_pham, anh_san_pham 
FROM SANPHAM;

-- THANHTOAN
CREATE OR REPLACE VIEW V_THANHTOAN AS 
SELECT id_thanh_toan, id_don_hang, phuong_thuc, so_tien 
FROM THANHTOAN;

CREATE OR REPLACE VIEW V_THANHTOANv1 AS 
SELECT id_thanh_toan, id_don_hang, phuong_thuc, so_tien 
FROM THANHTOAN;

-- TRAHANG
CREATE OR REPLACE VIEW V_TRAHANG AS 
SELECT id_phieu_tra, id_don_hang, ly_do 
FROM TRAHANG;

CREATE OR REPLACE VIEW V_TRAHANGv1 AS 
SELECT id_phieu_tra, id_don_hang, ly_do 
FROM TRAHANG;
