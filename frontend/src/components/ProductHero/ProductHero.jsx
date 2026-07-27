import "./ProductHero.css";

import heroBg from "../../assets/product/hero-bg.jpg";
import heroModel from "../../assets/product/hero-model.jpg";

function ProductHero() {
  return (
    <section className="product-hero">

      <img
        src={heroBg}
        alt="Fashion Collection"
        className="product-hero-bg"
      />

      <div className="product-overlay"></div>

      <div className="product-hero-container">

        <div className="product-hero-left">

          <span className="hero-tag">
            BỘ SƯU TẬP 2026
          </span>

          <h1>
            Bộ sưu tập
            <br />
            <span>thời trang</span>
          </h1>

          <p>
            Khám phá hơn 2.400 sản phẩm từ các thương hiệu
            hàng đầu — phong cách của bạn, lựa chọn của bạn.
          </p>

        </div>

        <div className="product-hero-right">

          <img
            src={heroModel}
            alt="Fashion Model"
          />

        </div>

      </div>

    </section>
  );
}

export default ProductHero;