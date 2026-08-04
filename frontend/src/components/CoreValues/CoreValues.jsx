import "./CoreValues.css";

import {
  FiAward,
  FiFeather,
  FiUsers,
  FiTrendingUp
} from "react-icons/fi";

function CoreValues() {

  const values = [

    {
      icon: <FiAward />,
      title: "Chất lượng",
      desc:
        "Mỗi sản phẩm đều được tuyển chọn kỹ lưỡng, đảm bảo chất lượng, độ bền và sự hoàn thiện trong từng chi tiết."
    },

    {
      icon: <FiFeather />,
      title: "Sáng tạo",
      desc:
        "Không ngừng cập nhật xu hướng thời trang mới nhằm mang đến những thiết kế hiện đại và khác biệt."
    },

    {
      icon: <FiUsers />,
      title: "Khách hàng",
      desc:
        "Khách hàng luôn là trung tâm trong mọi quyết định. Chúng tôi lắng nghe và không ngừng cải thiện trải nghiệm mua sắm."
    },

    {
      icon: <FiTrendingUp />,
      title: "Phát triển bền vững",
      desc:
        "LUXEWEAR hướng đến sự phát triển lâu dài bằng việc xây dựng thương hiệu uy tín và tạo ra giá trị bền vững."
    }

  ];

  return (

    <section className="core-values">

      <div className="core-container">

        <span className="core-subtitle">
          GIÁ TRỊ CỐT LÕI
        </span>

        <h2>
          Những điều tạo nên
          <br />
          <span>LUXEWEAR</span>
        </h2>

        <div className="core-grid">

          {values.map((item, index) => (

            <div
              className="core-card"
              key={index}
            >

              <div className="core-icon">

                {item.icon}

              </div>

              <h3>

                {item.title}

              </h3>

              <p>

                {item.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default CoreValues;