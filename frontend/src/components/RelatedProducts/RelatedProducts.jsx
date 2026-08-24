import "./RelatedProducts.css";

import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:81";

function RelatedProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (image) => {
    if (!image) return "/placeholder-product.jpg";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;

    const normalized = image.startsWith("/") ? image.slice(1) : image;
    const path = normalized.startsWith("uploads/") ? normalized : `uploads/${normalized}`;

    return `${API_URL}/${path}`;
  };

  useEffect(() => {
    if (!productId) return setProducts([]);

    const fetchRelated = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/sanpham/related/${productId}`);
        if (!res.ok) throw new Error("Không thể tải sản phẩm liên quan");
        const json = await res.json();
        setProducts(json.data || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [productId]);

  if (loading) return null;
  if (!products || products.length === 0) return null;

  return (
    <section className="related-products">
      <div className="related-products-container">
        <div className="related-products-heading">
          <div>
            <span>GỢI Ý CHO BẠN</span>
            <h2>Có thể bạn sẽ thích</h2>
          </div>

          <button type="button">Xem tất cả →</button>
        </div>

        <div className="related-products-grid">
          {products.map((product) => {
            const minPrice =
              product.bien_the && product.bien_the.length > 0
                ? Math.min(...product.bien_the.map((v) => Number(v.gia_ban) || Infinity))
                : null;

            return (
              <article className="related-product-card" key={product.id_san_pham}>
                <div className="related-product-image">
                  <span className="related-hot">HOT</span>
                  <button type="button" className="related-heart" aria-label="Yêu thích">
                    <FiHeart />
                  </button>
                  <Link to={`/product/${product.id_san_pham}`}>
                    <img src={getImageUrl(product.anh_san_pham)} alt={product.ten_san_pham} />
                  </Link>
                </div>

                <div className="related-product-info">
                  <span className="related-brand">{product.danh_muc?.ten_danh_muc || ""}</span>
                  <h3>
                    <Link to={`/product/${product.id_san_pham}`}>{product.ten_san_pham}</Link>
                  </h3>

                  <div className="related-rating">
                    <span>★★★★★</span>
                    <small>(--)</small>
                  </div>

                  <div className="related-price">
                    {minPrice ? `${minPrice.toLocaleString("vi-VN")}đ` : "Liên hệ"}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;
