import "./ProductDetailMain.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiChevronRight,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";

import RelatedProducts from "../RelatedProducts/RelatedProducts";

const API_URL = "http://localhost:81";

function ProductDetailMain() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getImageUrl = (image) => {
    if (!image) return "/placeholder-product.jpg";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    if (image.startsWith("/")) return `${API_URL}${image}`;
    return `${API_URL}/${image}`;
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) return "Liên hệ";
    return `${Number(price).toLocaleString("vi-VN")}đ`;
  };

  const getProductPrice = (p) => {
    if (!p || !p.bien_the || p.bien_the.length === 0) return null;
    const prices = p.bien_the.map((v) => Number(v.gia_ban)).filter((n) => !Number.isNaN(n));
    if (prices.length === 0) return null;
    return Math.min(...prices);
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_URL}/api/sanpham/${id}`);
        if (!res.ok) throw new Error("Không thể tải thông tin sản phẩm");
        const data = await res.json();
        setProduct(data || null);

        const variants = Array.isArray(data?.bien_the) ? data.bien_the : [];
        const firstAvailable = variants.filter((v) => Number(v.so_luong_ton) > 0)[0] || variants[0];
        setSelectedVariantId(firstAvailable ? firstAvailable.id_bien_the : null);
        setQuantity(1);
      } catch (err) {
        console.error(err);
        setError(err.message || "Có lỗi khi tải sản phẩm");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!selectedVariantId) {
      alert("Sản phẩm hiện chưa có biến thể phù hợp để thêm vào giỏ hàng.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const cartResponse = await fetch(`${API_URL}/api/giohang`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const cartData = await cartResponse.json().catch(() => ({}));

      if (!cartResponse.ok) {
        throw new Error(cartData.message || "Không thể lấy giỏ hàng của bạn");
      }

      const response = await fetch(`${API_URL}/api/chitietgiohang`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_bien_the: Number(selectedVariantId),
          so_luong: Number(quantity),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Thêm sản phẩm vào giỏ hàng thất bại");
      }

      window.dispatchEvent(new CustomEvent("cart-updated"));
      alert("Đã thêm sản phẩm vào giỏ hàng");
    } catch (err) {
      alert(err.message || "Không thể thêm sản phẩm vào giỏ hàng");
    }
  };

  if (loading) {
    return (
      <section className="product-detail-main">
        <div className="product-detail-container">
          <div>Đang tải sản phẩm...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-detail-main">
        <div className="product-detail-container">
          <div className="error">{error}</div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="product-detail-main">
        <div className="product-detail-container">
          <div>Không tìm thấy sản phẩm</div>
        </div>
      </section>
    );
  }

  const price = getProductPrice(product);

  return (
    <>
      <section className="product-detail-main">
        <div className="product-detail-container">

          <div className="product-detail-breadcrumb">
            <span>Trang chủ</span>
            <FiChevronRight />
            <span>Sản phẩm</span>
            <FiChevronRight />
            <strong>{product.ten_san_pham}</strong>
          </div>

          <div className="product-detail-grid">

            <div className="product-detail-gallery">
              <div className="product-detail-image-wrapper">
                {product.bien_the && product.bien_the.some(v => v.so_luong_ton > 0) && (
                  <span className="product-detail-badge">HOT</span>
                )}

                <img
                  src={getImageUrl(product.anh_san_pham)}
                  alt={product.ten_san_pham}
                  className="product-detail-product-image"
                />

              </div>
            </div>

            <div className="product-detail-info">

              <div className="product-detail-category">
                {product.danh_muc?.ten_danh_muc || ""}
              </div>

              <div className="product-detail-title-row">
                <h1>{product.ten_san_pham}</h1>
              </div>

              <div className="product-detail-price">{formatPrice(price)}</div>

              <div className="product-detail-divider" />

              <p className="product-detail-description">{product.mo_ta || "Không có mô tả"}</p>

              {product.bien_the && product.bien_the.length > 0 && (
                <div className="product-option">
                  <div className="product-option-title">
                    Kích thước / Màu sắc:
                  </div>

                  <div className="size-row">
                    {product.bien_the.map((v) => (
                      <button
                        key={v.id_bien_the}
                        type="button"
                        className={`size-item ${selectedVariantId === v.id_bien_the ? "selected" : ""}`}
                        onClick={() => setSelectedVariantId(v.id_bien_the)}
                      >
                        {v.size} {v.mau_sac ? `- ${v.mau_sac}` : ""}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="quantity-row">
                <span className="quantity-label">Số lượng:</span>
                <div className="quantity-control">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><FiMinus /></button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => value + 1)}><FiPlus /></button>
                </div>
                <span className="stock-text">Còn {product.bien_the?.reduce((s, v) => s + (v.so_luong_ton || 0), 0) || 0} sản phẩm</span>
              </div>

              <div className="product-action-row">
                <button type="button" className="add-cart-button" onClick={addToCart}>
                  <FiShoppingBag />
                  Thêm vào giỏ hàng
                </button>

                <button type="button" className="buy-now-button">Mua ngay</button>
              </div>

              <div className="product-benefits">
                <div><FiCheck />Miễn phí giao hàng cho đơn từ 500.000đ</div>
                <div><FiCheck />Đổi trả trong 30 ngày</div>
                <div><FiCheck />Sản phẩm chính hãng 100%</div>
                <div><FiCheck />Thanh toán an toàn, mã hóa SSL</div>
              </div>

              <div className="product-brand">Thương hiệu: <strong>{product.thuong_hieu || "--"}</strong></div>

            </div>
          </div>

          <div className="product-extra">
            <div className="product-description-block">
              <h2>Mô tả sản phẩm</h2>
              <p>{product.mo_ta || "Không có mô tả chi tiết"}</p>
            </div>

            <div className="product-specifications">
              <h2>Thông tin sản phẩm</h2>
              <div className="spec-table">
                <div>
                  <strong>Danh mục</strong>
                  <span>{product.danh_muc?.ten_danh_muc || "--"}</span>
                </div>
                <div>
                  <strong>Giá thấp nhất</strong>
                  <span>{formatPrice(price)}</span>
                </div>
                <div>
                  <strong>Tồn kho</strong>
                  <span>{product.bien_the?.reduce((s, v) => s + (v.so_luong_ton || 0), 0) || 0}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <RelatedProducts productId={id} />
    </>
  );
}

export default ProductDetailMain;