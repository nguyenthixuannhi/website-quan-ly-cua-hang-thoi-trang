import "./Statistics.css";

import {
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiStar
} from "react-icons/fi";

function Statistics() {

  const statistics = [

    {
      icon: <FiBox />,
      number: "2,400+",
      title: "Sản phẩm"
    },

    {
      icon: <FiShoppingBag />,
      number: "50+",
      title: "Thương hiệu"
    },

    {
      icon: <FiUsers />,
      number: "18K+",
      title: "Khách hàng"
    },

    {
      icon: <FiStar />,
      number: "98%",
      title: "Tỷ lệ hài lòng"
    }

  ];

  return (

    <section className="statistics">

      <div className="statistics-container">

        {

          statistics.map((item,index)=>(

            <div
              className="statistics-card"
              key={index}
            >

              <div className="statistics-icon">

                {item.icon}

              </div>

              <h2>

                {item.number}

              </h2>

              <p>

                {item.title}

              </p>

            </div>

          ))

        }

      </div>

    </section>

  );

}

export default Statistics;