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

-- 4. Thêm sản phẩm (SANPHAM) - Tổng cộng 50 sản phẩm
INSERT INTO SANPHAM (id_san_pham, id_danh_muc, ten_san_pham, mo_ta, anh_san_pham) VALUES
(1, 1, 'Áo Thun Nam Cotton Basic', 'Áo thun nam chất liệu 100% cotton mềm mại, thoáng mát, thấm hút mồ hôi tốt. Kiểu dáng basic dễ phối đồ.', 'sanpham/1787594146458-maid.jpg'),
(2, 2, 'Đầm Maxi Hoa Nhí Đi Biển', 'Đầm maxi dáng dài họa tiết hoa nhí nữ tính, chất vải voan lót lụa nhẹ nhàng, cực kỳ thích hợp cho các chuyến đi biển.', 'sanpham/1787594146458-maid.jpg'),
(3, 3, 'Quần Jeans Slimfit Nam', 'Quần jeans nam form ôm vừa vặn, chất liệu denim co giãn nhẹ, mang lại cảm giác thoải mái suốt cả ngày.', 'sanpham/1787594146458-maid.jpg'),
(4, 4, 'Giày Sneaker White Classic', 'Giày sneaker trắng cổ điển phong cách unisex, đế cao su chống trượt bền bỉ, dễ dàng kết hợp mọi outfit.', 'sanpham/1787594146458-maid.jpg'),
(5, 5, 'Túi Xách Da Đeo Chéo Nữ', 'Túi xách nữ chất liệu da PU cao cấp, thiết kế sang trọng, ngăn chứa rộng rãi phù hợp đi chơi hoặc đi làm.', 'sanpham/1787594146458-maid.jpg'),
(6, 6, 'Kính Mát Thời Trang Unisex', 'Kính mát chống tia UV400 bảo vệ mắt tối ưu, thiết kế gọng vuông cá tính phù hợp cho cả nam và nữ.', 'sanpham/1787594146458-maid.jpg'),
(7, 1, 'Áo Sơ Mi Nam Công Sở Oxford', 'Áo sơ mi nam dài tay vải Oxford chống nhăn lịch lãm, form dáng regular fit tôn dáng.', 'sanpham/1787594146458-maid.jpg'),
(8, 1, 'Áo Khoác Bomber Nam Dù 2 Lớp', 'Áo khoác bomber thời trang chống gió nhẹ, 2 lớp dày dặn, thiết kế trẻ trung năng động.', 'sanpham/1787594146458-maid.jpg'),
(9, 1, 'Áo Polo Nam Cổ Bẻ Thể Thao', 'Áo polo nam vải cá sấu cotton co giãn 4 chiều, thoáng khí, phù hợp đi chơi và chơi thể thao.', 'sanpham/1787594146458-maid.jpg'),
(10, 1, 'Áo Hoodie Nam Nữ Form rộng', 'Áo hoodie nỉ bông dày dặn ấm áp, phong cách streetwear cá tính cho giới trẻ.', 'sanpham/hoodienamnuthongrong.jpeg'),
(11, 2, 'Đầm Ôm Body Dự Tiệc Sang Trọng', 'Đầm ôm sát tôn đường cong cơ thể, chất liệu thun kim tuyến lấp lánh cuốn hút mọi ánh nhìn.', 'sanpham/1787594146458-maid.jpg'),
(12, 2, 'Chân Váy Xếp Ly Dáng Dài', 'Chân váy dài xếp ly phong cách Hàn Quốc dịu dàng, dễ phối cùng áo thun hoặc áo sơ mi.', 'sanpham/1787594146458-maid.jpg'),
(13, 2, 'Đầm Sơ Mi Công Sở Thanh Lịch', 'Đầm dáng sơ mi kèm đai lưng thời trang, lịch sự nhưng không kém phần trẻ trung.', 'sanpham/1787594146458-maid.jpg'),
(14, 2, 'Set Đồ Bộ Len Cardigan Nữ', 'Set bộ thời trang thu đông gồm áo khoác cardigan và chân váy len tăm ấm áp.', 'sanpham/1787594146458-maid.jpg'),
(15, 3, 'Quần Short Kaki Nam Năng Động', 'Quần đùi kaki nam túi hộp khỏe khoắn, chất vải mềm mịn mặc nhà hoặc dạo phố.', 'sanpham/1787594146458-maid.jpg'),
(16, 3, 'Quần Tây Nam Ống Suông', 'Quần âu nam công sở đứng form, lưng cao, thiết kế lịch lãm cho phái mạnh.', 'sanpham/1787594146458-maid.jpg'),
(17, 3, 'Quần Jogger Thể Thao Nam Nữ', 'Quần jogger bo gấu chun năng động, thích hợp tập gym, chạy bộ hoặc mặc thường ngày.', 'sanpham/1787594146458-maid.jpg'),
(18, 3, 'Quần Culottes Nữ Lưng Cao', 'Quần ống rộng nữ chất liệu tuyết mưa mềm mại, hack chiều cao cực đỉnh.', 'sanpham/1787594146458-maid.jpg'),
(19, 4, 'Giày Loafer Da Nam Công Sở', 'Giày lười nam da bò thật 100%, thiết kế lịch lãm, sang trọng cho quý ông.', 'sanpham/1787594146458-maid.jpg'),
(20, 4, 'Giày Sandal Quai Chéo Unisex', 'Sandal quai hậu đế bệt siêu nhẹ, chống thấm nước, thoải mái di chuyển mùa mưa.', 'sanpham/1787594146458-maid.jpg'),
(21, 4, 'Giày Cao Gót Nữ Mũi Nhọn 7cm', 'Giày cao gót thanh lịch, tôn dáng, thiết kế êm chân không gây đau mỏi.', 'sanpham/1787594146458-maid.jpg'),
(22, 4, 'Giày Boot Chelsea Nam Dáng Lật', 'Chelsea boot nam da lộn phong cách Âu Mỹ bụi bặm và nam tính.', 'sanpham/1787594146458-maid.jpg'),
(23, 5, 'Túi Tote Vải Canvas Đựng Laptop', 'Túi vải bố canvas cỡ lớn, đựng vừa laptop 15.6 inch, thích hợp đi học, đi làm.', 'sanpham/1787594146458-maid.jpg'),
(24, 5, 'Balo Laptop Chống Nước Nam Nữ', 'Balo nhiều ngăn tiện lợi, chất liệu vải oxford trượt nước bảo vệ đồ đạc an toàn.', 'sanpham/1787594146458-maid.jpg'),
(25, 5, 'Ví Da Nam Cầm Tay Khóa Kéo', 'Ví dài nam da tổng hợp cao cấp nhiều ngăn đựng thẻ và tiền mặt.', 'sanpham/1787594146458-maid.jpg'),
(26, 5, 'Ví Mini Kẹp Tiền Nhỏ Gọn', 'Ví mini thiết kế siêu nhỏ gọn, phong cách tối giản hiện đại.', 'sanpham/1787594146458-maid.jpg'),
(27, 6, 'Thắt Lưng Nam Da Bò Khóa Tự Động', 'Dây nịt nam da thật sang trọng, mặt khóa hợp kim không gỉ bền bỉ.', 'sanpham/1787594146458-maid.jpg'),
(28, 6, 'Mũ Lưỡi Trai Thêu Chữ Hàn Quốc', 'Nón kết cotton thoáng khí, thêu chữ phong cách Ulzzang trẻ trung.', 'sanpham/1787594146458-maid.jpg'),
(29, 6, 'Khăn Quàng Cổ Len Cashmere', 'Khăn len mềm mại giữ ấm cổ mùa đông, họa tiết caro cổ điển.', 'sanpham/1787594146458-maid.jpg'),
(30, 6, 'Vớ (Tất) Nam Nữ Cổ Cao Cotton', 'Tất cổ cao thấm hút mồ hôi tốt, co giãn đa chiều kháng khuẩn.', 'sanpham/1787594146458-maid.jpg'),
(31, 1, 'Áo Len Cổ Lọ Giữ Ấm Mùa Đông', 'Áo len dệt kim mỏng ôm sát cơ thể, giữ ấm tốt trong thời tiết lạnh.', 'sanpham/1787594146458-maid.jpg'),
(32, 1, 'Áo Khoác Jean Bụi Bặm Nam', 'Áo khoác denim nam phong cách vintage cá tính, form rộng thoải mái.', 'sanpham/1787594146458-maid.jpg'),
(33, 1, 'Áo Two-Piece Set Thể Thao', 'Bộ đồ thời trang thể thao năng động gồm áo thun và áo khoác ngoài.', 'sanpham/1787594146458-maid.jpg'),
(34, 2, 'Đầm Suông Chữ A Đơn Giản', 'Đầm suông che khuyết điểm vòng 2 hoàn hảo, mặc nhà hay đi dạo phố đều đẹp.', 'sanpham/1787594146458-maid.jpg'),
(35, 2, 'Đầm Trễ Vai Dự Tiệc Cưới', 'Đầm thiết kế trễ vai gợi cảm, tôn lên phần xương quai xanh quyến rũ.', 'sanpham/1787594146458-maid.jpg'),
(36, 3, 'Quần Short Jean Rách Cá Tính', 'Quần jean đùi rách gối phong cách đường phố năng động cho giới trẻ.', 'sanpham/1787594146458-maid.jpg'),
(37, 3, 'Quần Baggy Vải Phong Cách Nhật', 'Quần baggy suông rộng rãi, thoải mái vận động cả ngày dài.', 'sanpham/1787594146458-maid.jpg'),
(38, 4, 'Giày Thể Thao Chạy Bộ Lightweight', 'Giày chạy bộ siêu nhẹ, đệm lót êm ái hỗ trợ tối đa chuyển động bàn chân.', 'sanpham/1787594146458-maid.jpg'),
(39, 4, 'Giày Búp Bê Nữ Nơ Xinh Xắn', 'Giày bệt nữ mũi tròn đính nơ dễ thương, chất liệu da mềm không đau gót.', 'sanpham/1787594146458-maid.jpg'),
(40, 5, 'Túi Đeo Hông (Bum Bag) Thể Thao', 'Túi bao tử đeo chéo trước ngực tiện lợi khi đi phượt, đạp xe, dạo phố.', 'sanpham/1787594146458-maid.jpg'),
(41, 1, 'Áo Thun Oversize Unisex In Hình', 'Áo thun form rộng oversize cá tính, chất cotton dày mịn không xù lông.', 'sanpham/1787594146458-maid.jpg'),
(42, 1, 'Áo Khoác Gió 2 Lớp Chống Nước', 'Áo gió thể thao trượt nước tốt, nhẹ nhàng, thuận tiện mang theo khi du lịch.', 'sanpham/1787594146458-maid.jpg'),
(43, 2, 'Chân Váy Tennis Xếp Ly Ngắn', 'Chân váy ngắn năng động có lớp quần lót bảo vệ bên trong an toàn.', 'sanpham/1787594146458-maid.jpg'),
(44, 3, 'Quần Legging Đen Co Giãn Tập Gym', 'Quần legging ôm sát tôn dáng, chất thun lạnh dày dặn không lộ.', 'sanpham/1787594146458-maid.jpg'),
(45, 4, 'Giày Sục (Mule) Nam Nữ Tiện Dụng', 'Giày sục thời trang dễ dàng xỏ chân nhanh chóng, không gò bó.', 'sanpham/1787594146458-maid.jpg'),
(46, 5, 'Balo Mini Thời Trang Dạo Phố', 'Balo kích thước nhỏ gọn xinh xắn dành riêng cho các bạn nữ dạo phố.', 'sanpham/1787594146458-maid.jpg'),
(47, 6, 'Mũ Bucket (Tai Bèo) Vải Cotton', 'Nón tai bèo chống nắng thời trang, gấp gọn tiện lợi mang theo.', 'sanpham/1787594146458-maid.jpg'),
(48, 6, 'Kính Gọng Tròn Retro Cổ Điển', 'Kính mắt thời trang phong cách thập niên cũ mang lại vẻ tri thức, vintage.', 'sanpham/1787594146458-maid.jpg'),
(49, 1, 'Áo Ba Lỗ (Tanktop) Thể Thao Nam', 'Áo sát nách nam tập gym thoáng mát, khoe bờ vai vạm vỡ.', 'sanpham/1787594146458-maid.jpg'),
(50, 2, 'Set Đồ Ngủ Pijama Lụa Satin', 'Bộ đồ mặc nhà pijama chất lụa satin mềm mịn, mát mẻ và sang trọng.', 'sanpham/1787594146458-maid.jpg');

-- 5. Thêm kiểu sản phẩm (KIEUSANPHAM) - Đa dạng hóa size và màu sắc cho 50 sản phẩm (150 biến thể)
INSERT INTO KIEUSANPHAM (id_bien_the, id_san_pham, `size`, mau_sac, so_luong_ton, gia_ban) VALUES
(1, 1, 'M', 'Trắng', 25, 150000.00),
(2, 1, 'L', 'Trắng', 30, 150000.00),
(3, 1, 'M', 'Đen', 20, 150000.00),
(4, 1, 'L', 'Đen', 35, 150000.00),
(5, 1, 'XL', 'Xám', 15, 160000.00),
(6, 2, 'S', 'Hồng', 15, 350000.00),
(7, 2, 'M', 'Hồng', 20, 350000.00),
(8, 2, 'S', 'Xanh', 12, 350000.00),
(9, 2, 'M', 'Xanh', 18, 350000.00),
(10, 3, '29', 'Xanh đậm', 15, 450000.00),
(11, 3, '30', 'Xanh đậm', 25, 450000.00),
(12, 3, '31', 'Xanh nhạt', 20, 450000.00),
(13, 3, '32', 'Xanh nhạt', 10, 450000.00),
(14, 4, '39', 'Trắng', 10, 600000.00),
(15, 4, '40', 'Trắng', 15, 600000.00),
(16, 4, '41', 'Trắng', 20, 600000.00),
(17, 4, '42', 'Trắng', 12, 600000.00),
(18, 5, 'Free', 'Nâu', 15, 320000.00),
(19, 5, 'Free', 'Đen', 20, 320000.00),
(20, 5, 'Free', 'Be', 10, 320000.00),
(21, 6, 'Free', 'Đen', 30, 120000.00),
(22, 6, 'Free', 'Trà', 20, 120000.00),
(23, 7, 'M', 'Xanh dương', 20, 280000.00),
(24, 7, 'L', 'Xanh dương', 25, 280000.00),
(25, 7, 'XL', 'Trắng', 15, 280000.00),
(26, 8, 'M', 'Đen', 10, 420000.00),
(27, 8, 'L', 'Đen', 15, 420000.00),
(28, 8, 'XL', 'Xanh rêu', 12, 420000.00),
(29, 9, 'M', 'Xám', 20, 220000.00),
(30, 9, 'L', 'Xanh navy', 25, 220000.00),
(31, 9, 'XL', 'Đen', 18, 220000.00),
(32, 10, 'M', 'Đỏ', 10, 380000.00),
(33, 10, 'L', 'Đen', 15, 380000.00),
(34, 10, 'XL', 'Xám', 15, 380000.00),
(35, 11, 'S', 'Đỏ đô', 8, 450000.00),
(36, 11, 'M', 'Đỏ đô', 12, 450000.00),
(37, 11, 'S', 'Đen', 10, 450000.00),
(38, 12, 'S', 'Be', 15, 260000.00),
(39, 12, 'M', 'Đen', 20, 260000.00),
(40, 13, 'S', 'Xanh mint', 10, 340000.00),
(41, 13, 'M', 'Trắng', 15, 340000.00),
(42, 14, 'Free', 'Hồng Pastel', 12, 520000.00),
(43, 14, 'Free', 'Kem', 15, 520000.00),
(44, 15, '29', 'Rêu', 15, 250000.00),
(45, 15, '30', 'Kaki', 20, 250000.00),
(46, 15, '31', 'Đen', 15, 250000.00),
(47, 16, '30', 'Đen', 20, 390000.00),
(48, 16, '31', 'Xám đậm', 18, 390000.00),
(49, 16, '32', 'Đen', 22, 390000.00),
(50, 17, 'M', 'Xám lông chuột', 20, 290000.00),
(51, 17, 'L', 'Đen', 25, 290000.00),
(52, 18, 'S', 'Trắng', 15, 310000.00),
(53, 18, 'M', 'Đen', 20, 310000.00),
(54, 19, '39', 'Nâu bò', 6, 750000.00),
(55, 19, '40', 'Đen', 10, 750000.00),
(56, 19, '41', 'Đen', 8, 750000.00),
(57, 20, '38', 'Đen', 15, 180000.00),
(58, 20, '39', 'Đen', 20, 180000.00),
(59, 20, '40', 'Trắng', 18, 180000.00),
(60, 21, '36', 'Nude', 10, 450000.00),
(61, 21, '37', 'Đen', 15, 450000.00),
(62, 22, '41', 'Đen', 5, 850000.00),
(63, 22, '42', 'Đen', 7, 850000.00),
(64, 23, 'Free', 'Kem', 40, 140000.00),
(65, 23, 'Free', 'Đen', 30, 140000.00),
(66, 24, 'Free', 'Xanh navy', 20, 490000.00),
(67, 24, 'Free', 'Đen', 25, 490000.00),
(68, 25, 'Free', 'Đen', 15, 250000.00),
(69, 25, 'Free', 'Nâu', 15, 250000.00),
(70, 26, 'Free', 'Carbon', 25, 190000.00),
(71, 26, 'Free', 'Bạc', 25, 190000.00),
(72, 27, 'Free', 'Đen', 30, 210000.00),
(73, 27, 'Free', 'Nâu', 15, 210000.00),
(74, 28, 'Free', 'Trắng', 30, 95000.00),
(75, 28, 'Free', 'Đen', 30, 95000.00),
(76, 29, 'Free', 'Đỏ', 12, 160000.00),
(77, 29, 'Free', 'Xám', 13, 160000.00),
(78, 30, 'Free', 'Trắng', 50, 35000.00),
(79, 30, 'Free', 'Đen', 50, 35000.00),
(80, 31, 'M', 'Nâu đậm', 10, 270000.00),
(81, 31, 'L', 'Đen', 12, 270000.00),
(82, 32, 'M', 'Xanh bạc', 8, 550000.00),
(83, 32, 'L', 'Xanh đậm', 10, 550000.00),
(84, 33, 'M', 'Đen', 12, 450000.00),
(85, 33, 'L', 'Xám', 13, 450000.00),
(86, 34, 'S', 'Vàng nhạt', 15, 290000.00),
(87, 34, 'M', 'Hồng nhạt', 15, 290000.00),
(88, 35, 'S', 'Đỏ rượu', 7, 480000.00),
(89, 35, 'M', 'Đen', 8, 480000.00),
(90, 36, '28', 'Xanh nhạt', 15, 320000.00),
(91, 36, '29', 'Xanh đậm', 20, 320000.00),
(92, 37, 'S', 'Be sáng', 20, 330000.00),
(93, 37, 'M', 'Đen', 20, 330000.00),
(94, 38, '39', 'Xám cam', 10, 650000.00),
(95, 38, '40', 'Xám cam', 10, 650000.00),
(96, 39, '36', 'Hồng', 15, 280000.00),
(97, 39, '37', 'Kem', 15, 280000.00),
(98, 40, 'Free', 'Đen', 25, 170000.00),
(99, 40, 'Free', 'Xám', 20, 170000.00),
(100, 41, 'M', 'Xám tiêu', 25, 180000.00),
(101, 41, 'L', 'Trắng', 30, 180000.00),
(102, 42, 'L', 'Xanh rêu', 12, 430000.00),
(103, 42, 'XL', 'Đen', 13, 430000.00),
(104, 43, 'S', 'Đen', 20, 210000.00),
(105, 43, 'M', 'Trắng', 20, 210000.00),
(106, 44, 'S', 'Đen', 30, 190000.00),
(107, 44, 'M', 'Đen', 30, 190000.00),
(108, 45, '40', 'Trắng kem', 15, 350000.00),
(109, 45, '41', 'Đen', 15, 350000.00),
(110, 46, 'Free', 'Hồng phấn', 10, 310000.00),
(111, 46, 'Free', 'Đen', 10, 310000.00),
(112, 47, 'Free', 'Đen', 25, 90000.00),
(113, 47, 'Free', 'Be', 25, 90000.00),
(114, 48, 'Free', 'Vàng kim', 18, 110000.00),
(115, 48, 'Free', 'Đen bạc', 17, 110000.00),
(116, 49, 'M', 'Xám', 20, 120000.00),
(117, 49, 'L', 'Đen', 20, 120000.00),
(118, 50, 'M', 'Xanh lụa', 12, 380000.00),
(119, 50, 'L', 'Hồng lụa', 13, 380000.00);

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