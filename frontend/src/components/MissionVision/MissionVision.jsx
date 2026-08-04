import "./MissionVision.css";

import { FiTarget, FiEye } from "react-icons/fi";

function MissionVision() {
  return (
    <section className="mission">

      <div className="mission-container">

        {/* Sứ mệnh */}
        <div className="mission-card">

          <div className="mission-icon">
            <FiTarget />
          </div>

          <h3>Sứ mệnh</h3>

          <p>
            Mang đến những sản phẩm thời trang chất lượng cao,
            thiết kế hiện đại và mức giá hợp lý để mọi khách hàng
            đều có thể tự tin thể hiện phong cách của mình.
          </p>

        </div>

        {/* Tầm nhìn */}
        <div className="mission-card">

          <div className="mission-icon">
            <FiEye />
          </div>

          <h3>Tầm nhìn</h3>

          <p>
            Trở thành thương hiệu thời trang được khách hàng tin
            tưởng hàng đầu tại Việt Nam, không ngừng đổi mới để
            mang lại trải nghiệm mua sắm hiện đại và tiện lợi.
          </p>

        </div>

      </div>

    </section>
  );
}

export default MissionVision;