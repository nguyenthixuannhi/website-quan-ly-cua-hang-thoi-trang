import "./Cart.css";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiCheck,
  FiShoppingBag,
  FiTag,
} from "react-icons/fi";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import product1 from "../../assets/home/product4.jpg";
import product2 from "../../assets/products/product4.jpg";
import product3 from "../../assets/products/product2.jpg";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      brand: "LUXEWEAR",
      name: "Áo Blazer Nữ Oversize",
      color: "Đen",
      size: "M",
      price: 890000,
      oldPrice: 1200000,
      quantity: 1,
      image: product1,
    },
    {
      id: 2,
      brand: "LUXEWEAR",
      name: "Áo Vest Nam Cổ Điển",
      color: "Đen",
      size: "M",
      price: 1200000,
      oldPrice: 1600000,
      quantity: 1,
      image: product2,
    },
    {
      id: 3,
      brand: "CK",
      name: "Đồng Hồ Bạc Mesh Band",
      color: "Bạc",
      size: "M",
      price: 3500000,
      oldPrice: 4200000,
      quantity: 1,
      image: product3,
    },
  ]);

  const [coupon, setCoupon] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shipping = subtotal >= 500000 ? 0 : 30000;

  const discount = coupon.trim()
    ? 0
    : 0;

  const total = subtotal - discount + shipping;

  const updateQuantity = (id, type) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const nextQuantity =
          type === "increase"
            ? item.quantity + 1
            : item.quantity - 1;

        return {
          ...item,
          quantity: Math.max(1, nextQuantity),
        };
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      return;
    }

    /*
      Hiện tại chỉ mô phỏng đặt hàng.
      Khi Backend có API đặt hàng,
      chỗ này sẽ gọi POST /orders.
    */

    setSuccessMessage(
      "Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại LUXEWEAR."
    );

    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />

        <main className="cart-page">
          <div className="cart-empty">

            <div className="cart-empty-icon">
              <FiShoppingBag />
            </div>

            <h1>
              Giỏ hàng của bạn đang trống
            </h1>

            <p>
              Hãy khám phá các sản phẩm mới nhất của
              LUXEWEAR và chọn món đồ phù hợp với phong
              cách của bạn.
            </p>

            {successMessage && (
              <div className="cart-success-message">
                <FiCheck />
                <span>{successMessage}</span>
              </div>
            )}

            <Link
              to="/product"
              className="cart-empty-button"
            >
              Mua sắm ngay
            </Link>

          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="cart-page">

        {/* =====================================
            HEADER
        ===================================== */}

        <section className="cart-header">
          <div className="cart-container">

            <div className="cart-breadcrumb">
              <Link to="/">
                Trang chủ
              </Link>

              <span>/</span>

              <strong>
                Giỏ hàng
              </strong>
            </div>

            <h1>
              Giỏ hàng của bạn
            </h1>

            <p>
              Bạn đang có {cartItems.length} sản phẩm trong giỏ hàng.
            </p>

          </div>
        </section>


        {/* =====================================
            MAIN
        ===================================== */}

        <section className="cart-content">
          <div className="cart-container">

            <div className="cart-layout">

              {/* =================================
                  LEFT - PRODUCTS
              ================================= */}

              <div className="cart-products">

                {cartItems.map((item) => (
                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    <div className="cart-item-main">

                      <div className="cart-item-top">

                        <div>

                          <span className="cart-item-brand">
                            {item.brand}
                          </span>

                          <h2>
                            {item.name}
                          </h2>

                          <div className="cart-item-options">
                            <span>
                              ● Màu: {item.color}
                            </span>

                            <span>
                              Size: {item.size}
                            </span>
                          </div>

                        </div>

                        <button
                          type="button"
                          className="cart-delete"
                          onClick={() => removeItem(item.id)}
                          aria-label="Xóa sản phẩm"
                        >
                          <FiTrash2 />
                        </button>

                      </div>

                      <div className="cart-item-bottom">

                        <div className="cart-price">
                          <strong>
                            {item.price.toLocaleString("vi-VN")}đ
                          </strong>

                          <del>
                            {item.oldPrice.toLocaleString("vi-VN")}đ
                          </del>
                        </div>

                        <div className="cart-quantity">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                "decrease"
                              )
                            }
                          >
                            <FiMinus />
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                "increase"
                              )
                            }
                          >
                            <FiPlus />
                          </button>

                        </div>

                      </div>

                      <div className="cart-item-total">

                        <span>
                          Thành tiền
                        </span>

                        <strong>
                          {(
                            item.price * item.quantity
                          ).toLocaleString("vi-VN")}đ
                        </strong>

                      </div>

                    </div>

                  </div>
                ))}

                <Link
                  to="/product"
                  className="continue-shopping"
                >
                  ← Tiếp tục mua sắm
                </Link>

              </div>


              {/* =================================
                  RIGHT - SUMMARY
              ================================= */}

              <aside className="cart-summary-column">

                {/* COUPON */}

                <div className="cart-coupon">

                  <h3>
                    <FiTag />
                    Bạn có mã giảm giá?
                  </h3>

                  <div className="coupon-row">

                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá..."
                      value={coupon}
                      onChange={(e) =>
                        setCoupon(e.target.value)
                      }
                    />

                    <button
                      type="button"
                    >
                      Áp dụng
                    </button>

                  </div>

                  <small>
                    Thử: LUXE10, SUMMER20, SALE50K
                  </small>

                </div>


                {/* SUMMARY */}

                <div className="cart-summary">

                  <h2>
                    Tóm tắt đơn hàng
                  </h2>

                  <div className="summary-row">
                    <span>
                      Tạm tính
                    </span>

                    <strong>
                      {subtotal.toLocaleString("vi-VN")}đ
                    </strong>
                  </div>

                  {discount > 0 && (
                    <div className="summary-row discount">
                      <span>
                        Giảm giá
                      </span>

                      <strong>
                        -{discount.toLocaleString("vi-VN")}đ
                      </strong>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>
                      Phí vận chuyển
                    </span>

                    <strong className="free">
                      {shipping === 0
                        ? "Miễn phí"
                        : `${shipping.toLocaleString("vi-VN")}đ`}
                    </strong>
                  </div>

                  <div className="summary-divider" />

                  {/* COD */}

                  <div className="payment-method">
                    <span>
                      Phương thức thanh toán
                    </span>

                    <strong>
                      Thanh toán khi nhận hàng (COD)
                    </strong>
                  </div>

                  <div className="summary-total">

                    <span>
                      Tổng cộng
                    </span>

                    <strong>
                      {total.toLocaleString("vi-VN")}đ
                    </strong>

                  </div>

                  <button
                    type="button"
                    className="place-order-button"
                    onClick={handlePlaceOrder}
                  >
                    Đặt hàng →
                  </button>

                  <div className="cart-benefits">

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
                      Thanh toán an toàn
                    </div>

                  </div>

                  <div className="payment-icons">
                    <span>VISA</span>
                    <span>MC</span>
                    <span>JCB</span>
                    <span>COD</span>
                    <span>VNPAY</span>
                  </div>

                </div>

              </aside>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Cart;