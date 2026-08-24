import "./Cart.css";

import { useEffect, useMemo, useState } from "react";
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
import PurchaseModal from "../../components/PurchaseModal/PurchaseModal";

const API_URL = "http://localhost:81";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [coupon, setCoupon] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formatPrice = (value) => {
    const numericValue = Number(value || 0);
    return Number.isFinite(numericValue) ? numericValue.toLocaleString("vi-VN") : "0";
  };

  const resolveImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://placehold.co/800x1000/eeeeee/333333?text=LUXEWEAR";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    if (imagePath.startsWith("/")) {
      return `${API_URL}${imagePath}`;
    }

    return `${API_URL}/uploads/${imagePath}`;
  };

  const fetchCartData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const cartResponse = await fetch(`${API_URL}/api/chitietgiohang`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (cartResponse.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      if (!cartResponse.ok) {
        const cartData = await cartResponse.json().catch(() => ({}));
        throw new Error(cartData.message || "Không thể tải giỏ hàng");
      }

      const cartData = await cartResponse.json();
      const cartList = Array.isArray(cartData?.items) ? cartData.items : [];

      const productsResponse = await fetch(`${API_URL}/api/sanpham?page=1&limit=100`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!productsResponse.ok) {
        throw new Error("Không thể tải thông tin sản phẩm");
      }

      const productsData = await productsResponse.json();
      const productList = Array.isArray(productsData?.data) ? productsData.data : [];

      const mappedItems = cartList
        .map((item) => {
          const matchedProduct = productList.find((product) =>
            Array.isArray(product?.bien_the) &&
            product.bien_the.some((variant) => Number(variant.id_bien_the) === Number(item.id_bien_the))
          );

          if (!matchedProduct) {
            return null;
          }

          const variant = matchedProduct.bien_the.find(
            (variant) => Number(variant.id_bien_the) === Number(item.id_bien_the)
          );

          if (!variant) {
            return null;
          }

          const quantity = Number(item.so_luong || 0);
          const price = Number(variant.gia_ban || 0);

          return {
            id: Number(item.id_ct_gio),
            cartId: Number(item.id_ct_gio),
            variantId: Number(item.id_bien_the),
            brand: matchedProduct?.danh_muc?.ten_danh_muc || "LUXEWEAR",
            name: matchedProduct?.ten_san_pham || "Sản phẩm",
            color: variant.mau_sac || "Không xác định",
            size: variant.size || "Free",
            price,
            oldPrice: Math.max(price * 1.25, price),
            quantity: quantity > 0 ? quantity : 1,
            image: resolveImageUrl(matchedProduct.anh_san_pham),
            stock: Number(variant.so_luong_ton || 0),
          };
        })
        .filter(Boolean);

      setCartItems(mappedItems);
    } catch (err) {
      console.error("fetchCartData error:", err);
      setCartItems([]);
      setError(err.message || "Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const shipping = subtotal >= 500000 ? 0 : 30000;
  const discount = coupon.trim() ? 0 : 0;
  const total = subtotal - discount + shipping;

  const updateQuantity = async (id, type) => {
    const item = cartItems.find((entry) => entry.id === id);

    if (!item) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/chitietgiohang/${item.cartId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ change: type === "increase" ? 1 : -1 }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Không thể cập nhật số lượng");
      }

      await fetchCartData();
      window.dispatchEvent(new CustomEvent("cart-updated"));
    } catch (err) {
      setError(err.message || "Không thể cập nhật số lượng");
    }
  };

  const removeItem = async (id) => {
    const item = cartItems.find((entry) => entry.id === id);

    if (!item) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/chitietgiohang/${item.cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Không thể xóa sản phẩm khỏi giỏ hàng");
      }

      await fetchCartData();
      window.dispatchEvent(new CustomEvent("cart-updated"));
    } catch (err) {
      setError(err.message || "Không thể xóa sản phẩm khỏi giỏ hàng");
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    setShowPurchaseModal(true);
  };

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handlePurchaseSuccess = ({ orderId } = {}) => {
    setSuccessMessage("Đặt hàng thành công! Mã đơn: " + (orderId || ''));
    setCartItems([]);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="cart-page">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <FiShoppingBag />
            </div>
            <h1>Đang tải giỏ hàng...</h1>
            <p>Vui lòng chờ trong giây lát.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />

        <main className="cart-page">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <FiShoppingBag />
            </div>

            <h1>Giỏ hàng của bạn đang trống</h1>

            <p>
              Hãy khám phá các sản phẩm mới nhất của LUXEWEAR và chọn món đồ phù hợp với phong
              cách của bạn.
            </p>

            {error && <div className="cart-success-message"><FiCheck /><span>{error}</span></div>}
            {successMessage && (
              <div className="cart-success-message">
                <FiCheck />
                <span>{successMessage}</span>
              </div>
            )}

            <Link to="/product" className="cart-empty-button">
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
        <section className="cart-header">
          <div className="cart-container">
            <div className="cart-breadcrumb">
              <Link to="/">Trang chủ</Link>
              <span>/</span>
              <strong>Giỏ hàng</strong>
            </div>

            <h1>Giỏ hàng của bạn</h1>

            <p>Bạn đang có {cartItems.length} sản phẩm trong giỏ hàng.</p>
          </div>
        </section>

        <section className="cart-content">
          <div className="cart-container">
            <div className="cart-layout">
              <div className="cart-products">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} className="cart-item-image" />

                    <div className="cart-item-main">
                      <div className="cart-item-top">
                        <div>
                          <span className="cart-item-brand">{item.brand}</span>
                          <h2>{item.name}</h2>

                          <div className="cart-item-options">
                            <span>● Màu: {item.color}</span>
                            <span>Size: {item.size}</span>
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
                          <strong>{formatPrice(item.price)}đ</strong>
                          <del>{formatPrice(item.oldPrice)}đ</del>
                        </div>

                        <div className="cart-quantity">
                          <button type="button" onClick={() => updateQuantity(item.id, "decrease")}>
                            <FiMinus />
                          </button>

                          <span>{item.quantity}</span>

                          <button type="button" onClick={() => updateQuantity(item.id, "increase")}>
                            <FiPlus />
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-total">
                        <span>Thành tiền</span>
                        <strong>{formatPrice(item.price * item.quantity)}đ</strong>
                      </div>
                    </div>
                  </div>
                ))}

                <Link to="/product" className="continue-shopping">
                  ← Tiếp tục mua sắm
                </Link>
              </div>

              <aside className="cart-summary-column">
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
                      onChange={(e) => setCoupon(e.target.value)}
                    />

                    <button type="button">Áp dụng</button>
                  </div>

                  <small>Thử: LUXE10, SUMMER20, SALE50K</small>
                </div>

                <div className="cart-summary">
                  <h2>Tóm tắt đơn hàng</h2>

                  <div className="summary-row">
                    <span>Tạm tính</span>
                    <strong>{formatPrice(subtotal)}đ</strong>
                  </div>

                  {discount > 0 && (
                    <div className="summary-row discount">
                      <span>Giảm giá</span>
                      <strong>-{formatPrice(discount)}đ</strong>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <strong className="free">
                      {shipping === 0 ? "Miễn phí" : `${formatPrice(shipping)}đ`}
                    </strong>
                  </div>

                  <div className="summary-divider" />

                  <div className="payment-method">
                    <span>Phương thức thanh toán</span>
                    <strong>Thanh toán khi nhận hàng (COD)</strong>
                  </div>

                  <div className="summary-total">
                    <span>Tổng cộng</span>
                    <strong>{formatPrice(total)}đ</strong>
                  </div>

                  <button type="button" className="place-order-button" onClick={handlePlaceOrder}>
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
      {showPurchaseModal && (
        <PurchaseModal
          items={cartItems}
          onClose={() => setShowPurchaseModal(false)}
          onSuccess={handlePurchaseSuccess}
          clearCartAfter={true}
        />
      )}
    </>
  );
}

export default Cart;