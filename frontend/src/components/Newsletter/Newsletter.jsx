import "./Newsletter.css";

import { FiSend } from "react-icons/fi";

function Newsletter() {
  return (
    <section className="newsletter">

      <div className="newsletter-container">

        <div className="newsletter-left">

          <span className="newsletter-tag">
            ƯU ĐÃI ĐẶC BIỆT
          </span>

          <h2>
            Đăng ký nhận bản tin
          </h2>

          <p>
            Cập nhật xu hướng thời trang mới nhất và nhận ngay
            mã giảm giá <strong>10%</strong> cho đơn hàng đầu tiên.
          </p>

        </div>

        <div className="newsletter-right">

          <form>

            <input
              type="email"
              placeholder="Nhập địa chỉ Email của bạn..."
            />

            <button type="submit">

              <FiSend />

              Đăng ký

            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;