import "./RelatedProducts.css";

import { FiHeart } from "react-icons/fi";

import product1 from "../../assets/products/product2.jpg";
import product2 from "../../assets/products/product3.jpg";
import product3 from "../../assets/products/product4.jpg";
import product4 from "../../assets/products/product5.jpg";

function RelatedProducts() {
  const products = [
    {
      image: product1,
      brand: "CK",
      name: "Đồng Hồ Bạc Mesh Band",
      price: "3.500.000đ",
      oldPrice: "4.200.000đ",
      sale: "-17%",
    },
    {
      image: product2,
      brand: "CHANEL",
      name: "Nước Hoa Nữ Nhẹ Nhàng",
      price: "2.800.000đ",
      oldPrice: "3.200.000đ",
      sale: "-13%",
    },
    {
      image: product3,
      brand: "LUXEWEAR",
      name: "Kính Mát & Đồng Hồ Set",
      price: "1.600.000đ",
      oldPrice: "",
      sale: "",
    },
    {
      image: product4,
      brand: "CK",
      name: "Kính Mát Đen Trong UV400",
      price: "780.000đ",
      oldPrice: "1.000.000đ",
      sale: "-22%",
    },
  ];

  return (
    <section className="related-products">

      <div className="related-products-container">

        <div className="related-products-heading">

          <div>
            <span>GỢI Ý CHO BẠN</span>

            <h2>
              Có thể bạn sẽ thích
            </h2>
          </div>

          <button type="button">
            Xem tất cả →
          </button>

        </div>

        <div className="related-products-grid">

          {products.map((product, index) => (
            <article
              className="related-product-card"
              key={index}
            >

              <div className="related-product-image">

                <span className="related-hot">
                  HOT
                </span>

                <button
                  type="button"
                  className="related-heart"
                  aria-label="Yêu thích"
                >
                  <FiHeart />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="related-product-info">

                <span className="related-brand">
                  {product.brand}
                </span>

                <h3>
                  {product.name}
                </h3>

                <div className="related-rating">
                  <span>★★★★★</span>
                  <small>(176)</small>
                </div>

                <div className="related-price">
                  {product.price}

                  {product.oldPrice && (
                    <del>
                      {product.oldPrice}
                    </del>
                  )}
                </div>

                {product.sale && (
                  <span className="related-sale">
                    {product.sale}
                  </span>
                )}

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}

export default RelatedProducts;