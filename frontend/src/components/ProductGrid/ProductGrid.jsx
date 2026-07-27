import "./ProductGrid.css";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

import product1 from "../../assets/products/product1.jpg";
import product2 from "../../assets/products/product2.jpg";
import product3 from "../../assets/products/product3.jpg";
import product4 from "../../assets/products/product4.jpg";
import product5 from "../../assets/products/product5.jpg";
import product6 from "../../assets/products/product6.jpg";
import product7 from "../../assets/products/product7.jpg";
import product8 from "../../assets/products/product8.jpg";

const products = [
  {
    id: 1,
    image: product1,
    brand: "LUXEWEAR",
    name: "Áo Vest Nam Premium",
    price: "1.250.000đ",
    badge: "Mới"
  },
  {
    id: 2,
    image: product2,
    brand: "LUXEWEAR",
    name: "Đầm Dạ Hội Cao Cấp",
    price: "1.890.000đ",
    badge: "Hot"
  },
  {
    id: 3,
    image: product3,
    brand: "LUXEWEAR",
    name: "Áo Polo Cotton",
    price: "690.000đ",
    badge: "Sale"
  },
  {
    id: 4,
    image: product4,
    brand: "LUXEWEAR",
    name: "Quần Tây Slim Fit",
    price: "820.000đ",
    badge: "Mới"
  },
  {
    id: 5,
    image: product5,
    brand: "LUXEWEAR",
    name: "Áo Hoodie Basic",
    price: "750.000đ",
    badge: "Hot"
  },
  {
    id: 6,
    image: product6,
    brand: "LUXEWEAR",
    name: "Áo Khoác Bomber",
    price: "1.390.000đ",
    badge: "Sale"
  },
  {
    id: 7,
    image: product7,
    brand: "LUXEWEAR",
    name: "Túi Da Cao Cấp",
    price: "2.190.000đ",
    badge: "New"
  },
  {
    id: 8,
    image: product8,
    brand: "LUXEWEAR",
    name: "Giày Sneaker Premium",
    price: "1.650.000đ",
    badge: "Hot"
  }
];

function ProductGrid() {
  return (
    <div className="product-area">

      {/* Toolbar */}

      <div className="toolbar">

        <div className="toolbar-left">

          <h2>24 Sản phẩm</h2>

          <p>Khám phá bộ sưu tập mới nhất</p>

        </div>

        <div className="toolbar-right">

          <button className="active">
            Mới nhất
          </button>

          <button>
            Bán chạy
          </button>

          <button>
            Giá ↑
          </button>

          <button>
            Giá ↓
          </button>

        </div>

      </div>

      {/* Grid */}

      <div className="product-grid">

        {products.map((item) => (

          <div
            className="product-card"
            key={item.id}
          >

            <div className="product-image">

              <img
                src={item.image}
                alt={item.name}
              />

              <span className="badge">
                {item.badge}
              </span>

              <button className="wishlist">

                <FiHeart />

              </button>

            </div>

            <div className="product-info">

              <span className="brand">

                {item.brand}

              </span>

              <h3>

                {item.name}

              </h3>

              <h4>

                {item.price}

              </h4>

              <button className="cart-btn">

                <FiShoppingCart />

                Thêm vào giỏ

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProductGrid;