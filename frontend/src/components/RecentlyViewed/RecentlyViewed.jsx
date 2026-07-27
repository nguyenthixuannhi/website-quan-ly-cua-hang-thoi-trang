import "./RecentlyViewed.css";

import { FiShoppingCart } from "react-icons/fi";

import viewed1 from "../../assets/products/viewed1.jpg";
import viewed2 from "../../assets/products/viewed2.jpg";
import viewed3 from "../../assets/products/viewed3.jpg";
import viewed4 from "../../assets/products/viewed4.jpg";

const products = [
  {
    id: 1,
    image: viewed1,
    brand: "LUXEWEAR",
    name: "Áo sơ mi trắng Premium",
    price: "790.000đ"
  },
  {
    id: 2,
    image: viewed2,
    brand: "LUXEWEAR",
    name: "Áo Vest Slim Fit",
    price: "1.690.000đ"
  },
  {
    id: 3,
    image: viewed3,
    brand: "LUXEWEAR",
    name: "Quần Tây Classic",
    price: "920.000đ"
  },
  {
    id: 4,
    image: viewed4,
    brand: "LUXEWEAR",
    name: "Giày Da Oxford",
    price: "2.150.000đ"
  }
];

function RecentlyViewed() {

  return (

    <section className="recently">

      <div className="recently-header">

        <span>
          GỢI Ý CHO BẠN
        </span>

        <h2>
          Sản phẩm đã xem gần đây
        </h2>

      </div>

      <div className="recent-grid">

        {products.map(product => (

          <div
            key={product.id}
            className="recent-card"
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <div className="recent-info">

              <small>
                {product.brand}
              </small>

              <h3>
                {product.name}
              </h3>

              <h4>
                {product.price}
              </h4>

              <button>

                <FiShoppingCart />

                Thêm vào giỏ

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default RecentlyViewed;