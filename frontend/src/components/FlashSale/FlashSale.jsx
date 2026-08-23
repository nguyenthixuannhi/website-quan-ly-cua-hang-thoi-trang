import "./FlashSale.css";

import {
  FiShoppingCart
} from "react-icons/fi";

import sale1 from "../../assets/home/flash1.jpg";
import sale2 from "../../assets/home/flash2.jpg";
import sale3 from "../../assets/home/flash3.jpg";
import sale4 from "../../assets/home/flash4.jpg";

function FlashSale() {

  const products = [

    {
      id:1,
      image:sale1,
      name:"Áo Blazer Premium",
      price:"1.250.000₫",
      old:"1.650.000₫",
      discount:"-25%"
    },

    {
      id:2,
      image:sale2,
      name:"Váy Elegant",
      price:"890.000₫",
      old:"1.200.000₫",
      discount:"-30%"
    },

    {
      id:3,
      image:sale3,
      name:"Áo Khoác Denim",
      price:"780.000₫",
      old:"990.000₫",
      discount:"-20%"
    },

    {
      id:4,
      image:sale4,
      name:"Túi Xách Luxury",
      price:"1.490.000₫",
      old:"2.100.000₫",
      discount:"-35%"
    }

  ];

  return (

    <section className="flash-sale">

      <div className="container">

        <div className="flash-header">

          <div>

            <span>FLASH SALE</span>

            <h2>Khuyến mãi hôm nay</h2>

          </div>

          <div className="countdown">

            <div>

              <h3>12</h3>

              <small>Giờ</small>

            </div>

            <div>

              <h3>45</h3>

              <small>Phút</small>

            </div>

            <div>

              <h3>18</h3>

              <small>Giây</small>

            </div>

          </div>

        </div>

        <div className="flash-grid">

          {

            products.map(item=>(

              <div
                className="flash-card"
                key={item.id}
              >

                <div className="flash-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span className="discount">

                    {item.discount}

                  </span>

                </div>

                <h3>

                  {item.name}

                </h3>

                <div className="price">

                  <strong>

                    {item.price}

                  </strong>

                  <del>
                    {item.old}

                  </del>

                </div>

                <button>

                  <FiShoppingCart/>

                  Thêm vào giỏ

                </button>

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default FlashSale;