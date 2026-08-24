-- Enforce UTF-8 connection settings before running any INSERT queries
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- 1. Thêm người dùng (NGUOIDUNG)
INSERT INTO NGUOIDUNG (id_nguoi_dung, email, mat_khau, vai_tro) VALUES
-- admin123
(1, 'admin@shop.com', '$2b$10$Dooy5inzhyes35oGFhqKt.zXxNMELqr2Ihx8bLGXy8IC6fw1DJZ2G', 'ADMIN'),
-- staff123 
(2, 'nhanvien@shop.com', '$2b$10$BvJXPWxPSE5d5bMqlhzfj.KHjnecqDfSJRMwgfWdxmFs0J3cPsxY.', 'STAFF'),
-- user123
(3, 'nguyenvana@gmail.com', '$2b$10$SIDZ6Etjajg3xC6pTxEbZ.F.E8grZWzc77dRB4Ir3KlOL4bUmRM2e', 'CUSTOMER'),
-- user456
(4, 'tranthib@gmail.com', '$2b$10$EpOLTW.EGla1cJOZoRQF5e5spuwgDX68KQtFmwYgvkYq/98FqB09C', 'CUSTOMER');

-- 2. Thêm nhà cung cấp (NHACUNGCAP)
INSERT INTO NHACUNGCAP (id_nha_cung_cap, ten_ncc) VALUES
(1, 'Công ty Thời trang ABC Vietnam'),
(2, 'Xưởng May Gia Định');

-- 3. Thêm danh mục (DANHMUC)
INSERT INTO DANHMUC (id_danh_muc, ten_danh_muc) VALUES
(1, 'Áo'),
(2, 'Váy + đầm'),
(3, 'Quần'),
(4, 'Giày'),
(5, 'Túi xách'),
(6, 'Phụ kiện');

-- 4. Thêm sản phẩm (SANPHAM)
INSERT INTO SANPHAM (id_san_pham, id_danh_muc, ten_san_pham, anh_san_pham) VALUES
(1, 1, 'Áo Thun Nam Cotton Basic', 'https://placehold.net/main.svg'),
(2, 2, 'Đầm Maxi Hoa Nhí Đi Biển', 'https://placehold.net/main.svg'),
(3, 3, 'Quần Jeans Slimfit Nam', 'https://placehold.net/main.svg'),
(4, 4, 'Giày Sneaker White Classic', 'https://placehold.net/main.svg'),
(5, 5, 'Túi Xách Da Đeo Chéo Nữ', 'https://placehold.net/main.svg'),
(6, 6, 'Kính Mát Thời Trang Unisex', 'https://placehold.net/main.svg');

-- 5. Thêm kiểu sản phẩm (KIEUSANPHAM)
INSERT INTO KIEUSANPHAM (id_bien_the, id_san_pham, `size`, mau_sac, so_luong_ton, gia_ban) VALUES
(1, 1, 'M', 'Trắng', 50, 150000.00),
(2, 1, 'L', 'Đen', 30, 150000.00),
(3, 2, 'S', 'Hồng', 20, 350000.00),
(4, 3, '30', 'Xanh đậm', 40, 450000.00),
(5, 4, '41', 'Trắng', 15, 600000.00),
(6, 5, 'Free', 'Nâu', 25, 320000.00),
(7, 6, 'Free', 'Đen', 60, 120000.00);

-- 6. Thêm chương trình giảm giá (CHUONGTRINHGIAMGIA)
INSERT INTO CHUONGTRINHGIAMGIA (id_giam_gia, id_nguoi_dung, ten_chuong_trinh, phan_tram_giam) VALUES
(1, 1, 'Khuyến Mãi Khai Trương Mùa Hè', 10.00);

-- 7. Thêm chi tiết giảm giá (CHITIETGIAMGIA)
INSERT INTO CHITIETGIAMGIA (id_chi_tiet_km, id_giam_gia, id_san_pham, id_danh_muc) VALUES
(1, 1, 1, NULL);

-- 8. Thêm địa chỉ người dùng (DIACHI)
INSERT INTO DIACHI (id_dia_chi, id_nguoi_dung, dia_chi_chi_tiet) VALUES
(1, 3, '123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh'),
(2, 4, '456 Đường Lê Lợi, Quận Hải Châu, Đà Nẵng');

-- 9. Thêm đơn hàng (DONHANG)
INSERT INTO DONHANG (id_don_hang, id_nguoi_dung, loai_don, trang_thai, ngay_tao) VALUES
(1, 3, 'ONLINE', 'HOAN_THANH', CURRENT_TIMESTAMP);

-- 10. Thêm chi tiết đơn hàng (CHITIETDONHANG)
INSERT INTO CHITIETDONHANG (id_ct_don, id_don_hang, id_bien_the, so_luong, don_gia_thuc) VALUES
(1, 1, 1, 2, 150000.00);

-- 11. Thêm giỏ hàng (GIOHANG)
INSERT INTO GIOHANG (id_gio_hang, id_nguoi_dung) VALUES
(1, 3);

-- 12. Thêm chi tiết giỏ hàng (CHITIETGIOHANG)
INSERT INTO CHITIETGIOHANG (id_ct_gio, id_gio_hang, id_bien_the, so_luong) VALUES
(1, 1, 2, 1);

-- 13. Thêm đơn nhập hàng (DONNHAPHANG)
INSERT INTO DONNHAPHANG (id_don_nhap, id_nha_cung_cap, id_nguoi_dung, ngay_nhap) VALUES
(1, 1, 2, CURRENT_TIMESTAMP);

-- 14. Thêm chi tiết phiếu nhập (CHITIETPHIEUNHAP)
INSERT INTO CHITIETPHIEUNHAP (id_chi_tiet_nhap, id_don_nhap, id_bien_the, so_luong) VALUES
(1, 1, 1, 50);

-- 15. Thêm phiếu trả hàng (TRAHANG)
INSERT INTO TRAHANG (id_phieu_tra, id_don_hang, ly_do) VALUES
(1, 1, 'Sản phẩm bị lỗi đường may bên vai');

-- 16. Thêm chi tiết trả hàng (CHITIETTRAHANG)
INSERT INTO CHITIETTRAHANG (id_chi_tiet_tra, id_phieu_tra, id_bien_the, so_luong) VALUES
(1, 1, 1, 1);

-- 17. Thêm lịch sử kho (LICHSUKHO)
INSERT INTO LICHSUKHO (id_lich_su, id_bien_the, id_nguoi_dung, loai_thao_tac, so_luong_thay_doi) VALUES
(1, 1, 2, 'NHAP_KHO', 50);

-- 18. Thêm phiếu giao hàng (PHIEUGIAOHANG)
INSERT INTO PHIEUGIAOHANG (id_phieu_giao, id_don_hang, don_vi_van_chuyen, trang_thai) VALUES
(1, 1, 'Giao Hàng Nhanh (GHN)', 'DA_GIAO');

-- 19. Thêm thanh toán (THANHTOAN)
INSERT INTO THANHTOAN (id_thanh_toan, id_don_hang, phuong_thuc, so_tien) VALUES
(1, 1, 'VNPAY', 300000.00);

-- 20. Thêm quảng cáo (QUANGCAO)
INSERT INTO QUANGCAO (id, tieu_de, url_hinh_anh, url_dich, mua, danh_muc_trong_tam, ngay_bat_dau, ngay_ket_thuc, uu_tien, kich_hoat) VALUES
(1, 'Bộ sưu tập mùa hè giảm giá cực sốc', 'https://placehold.net/main.svg', '/category/1', 'Summer', 'Áo', CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 30 DAY), 1, TRUE);