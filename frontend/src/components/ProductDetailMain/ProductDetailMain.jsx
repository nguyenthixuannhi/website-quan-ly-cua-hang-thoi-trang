import "./ProductDetailMain.css";

import {
  FiChevronRight,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";

import productImage from "../../assets/products/product2.jpg";

import RelatedProducts from "../RelatedProducts/RelatedProducts";

function ProductDetailMain() {
  return (
    <>
      <section className="product-detail-main">
        <div className="product-detail-container">

          {/* BREADCRUMB */}
          <div className="product-detail-breadcrumb">
            <span>Trang chủ</span>
            <FiChevronRight />
            <span>Sản phẩm</span>
            <FiChevronRight />
            <strong>Đồng Hồ Nam Lịch Lãm</strong>
          </div>

          {/* PRODUCT */}
          <div className="product-detail-grid">

            {/* IMAGE */}
            <div className="product-detail-gallery">
              <div className="product-detail-image-wrapper">

                <span className="product-detail-badge">
                  HOT
                </span>

                <img
                  src={productImage}
                  alt="Đồng Hồ Nam Lịch Lãm"
                  className="product-detail-product-image"
                />

              </div>
            </div>

            {/* INFO */}
            <div className="product-detail-info">

              <div className="product-detail-category">
                PHỤ KIỆN
              </div>

              <div className="product-detail-title-row">

                <h1>Đồng Hồ Nam Lịch Lãm</h1>

                <button
                  type="button"
                  className="product-detail-wishlist"
                  aria-label="Yêu thích"
                >
                  <FiHeart />
                </button>

              </div>

              {/* RATING */}
              <div className="product-detail-rating">
                <span className="stars">★★★★★</span>
                <strong>4.9</strong>
                <span>(134 đánh giá)</span>
              </div>

              {/* PRICE */}
              <div className="product-detail-price">
                4.200.000đ
              </div>

              <div className="product-detail-divider" />

              {/* SHORT DESCRIPTION */}
              <p className="product-detail-description">
                Đồng hồ nam dây da nâu - mặt bạc thanh lịch,
                thiết kế dress watch cổ điển phù hợp trang phục
                công sở và sự kiện.
              </p>

              {/* COLOR */}
              <div className="product-option">
                <div className="product-option-title">
                  Màu sắc:
                  <span>Bạc</span>
                </div>

                <div className="color-options">

                  <button
                    type="button"
                    className="color-item color-silver active"
                    aria-label="Màu bạc"
                  />

                  <button
                    type="button"
                    className="color-item color-black"
                    aria-label="Màu đen"
                  />

                </div>
              </div>

              {/* SIZE */}
              <div className="product-option">

                <div className="product-option-title">
                  Kích thước:
                </div>

                <div className="size-row">

                  <button
                    type="button"
                    className="size-item active"
                  >
                    M
                  </button>

                </div>

              </div>

              {/* QUANTITY */}
              <div className="quantity-row">

                <span className="quantity-label">
                  Số lượng:
                </span>

                <div className="quantity-control">

                  <button type="button">
                    <FiMinus />
                  </button>

                  <span>1</span>

                  <button type="button">
                    <FiPlus />
                  </button>

                </div>

                <span className="stock-text">
                  Còn 24 sản phẩm
                </span>

              </div>

              {/* BUTTONS */}
              <div className="product-action-row">

                <button
                  type="button"
                  className="add-cart-button"
                >
                  <FiShoppingBag />
                  Thêm vào giỏ hàng
                </button>

                <button
                  type="button"
                  className="buy-now-button"
                >
                  Mua ngay
                </button>

              </div>

              {/* BENEFITS */}
              <div className="product-benefits">

                <div>
                  <FiCheck />
                  Miễn phí giao hàng cho đơn từ 500.000đ
                </div>

                <div>
                  <FiCheck />
                  Đổi trả trong 30 ngày
                </div>

                <div>
                  <FiCheck />
                  Sản phẩm chính hãng 100%
                </div>

                <div>
                  <FiCheck />
                  Thanh toán an toàn, mã hóa SSL
                </div>

              </div>

              {/* BRAND */}
              <div className="product-brand">
                Thương hiệu:
                <strong> CK</strong>
              </div>

            </div>
          </div>

          {/* DESCRIPTION + PRODUCT INFO */}
          <div className="product-extra">

            <div className="product-description-block">

              <h2>Mô tả sản phẩm</h2>

              <p>
                CK Dress Watch Collection — đồng hồ dress watch
                chuẩn mực cho quý ông lịch lãm. Mặt số đơn giản
                với các chi tiết tinh tế, mang đến vẻ ngoài thanh lịch
                và hiện đại.
              </p>

              <ul>
                <li>Máy: Automatic Miyota 8215</li>
                <li>Kính: Sapphire chống xước</li>
                <li>Dây: Da bò Italy nâu</li>
                <li>Chống nước: 30m</li>
              </ul>

            </div>

            <div className="product-specifications">

              <h2>Thông tin sản phẩm</h2>

              <div className="spec-table">

                <div>
                  <strong>Chất liệu</strong>
                  <span>Vỏ inox / Dây da Italy</span>
                </div>

                <div>
                  <strong>Kiểu máy</strong>
                  <span>Automatic Miyota 8215</span>
                </div>

                <div>
                  <strong>Xuất xứ</strong>
                  <span>Nhật Bản</span>
                </div>

                <div>
                  <strong>Thương hiệu</strong>
                  <span>CK</span>
                </div>

                <div>
                  <strong>Chống nước</strong>
                  <span>30m (3ATM)</span>
                </div>

                <div>
                  <strong>Bảo hành</strong>
                  <span>24 tháng chính hãng</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      <RelatedProducts />
    </>
  );
}

export default ProductDetailMain;