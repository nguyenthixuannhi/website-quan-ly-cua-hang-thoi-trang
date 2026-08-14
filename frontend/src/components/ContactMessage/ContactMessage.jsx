import "./ContactMessage.css";

import {
  FiLock,
  FiPackage,
  FiRefreshCw,
  FiCreditCard,
  FiSend,
} from "react-icons/fi";

import storeImage from "../../assets/contact-store.jpg";

function ContactMessage() {
  const supportItems = [
    {
      id: 1,
      icon: <FiLock />,
      title: "Tư vấn sản phẩm",
      description:
        "Giúp bạn chọn sản phẩm phù hợp nhất với phong cách và nhu cầu.",
    },
    {
      id: 2,
      icon: <FiPackage />,
      title: "Hỗ trợ đơn hàng",
      description:
        "Theo dõi, cập nhật trạng thái và xử lý vấn đề liên quan đến đơn hàng.",
    },
    {
      id: 3,
      icon: <FiRefreshCw />,
      title: "Chính sách đổi trả",
      description:
        "Đổi trả dễ dàng trong vòng 30 ngày, không cần lý do.",
    },
    {
      id: 4,
      icon: <FiCreditCard />,
      title: "Hỗ trợ thanh toán",
      description:
        "Giải đáp mọi vấn đề về thanh toán và bảo mật giao dịch.",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // Chưa kết nối API Backend.
    // Sẽ xử lý khi Backend xây dựng API gửi liên hệ.
  };

  return (
    <section className="contact-message">
      <div className="contact-message-container">

        {/* =========================================
            FORM
            ========================================= */}
        <div className="contact-message-form-card">

          <div className="contact-message-heading">
            <h2>Gửi tin nhắn cho chúng tôi</h2>

            <p>
              Bạn có câu hỏi hoặc cần hỗ trợ? Hãy điền thông tin bên dưới,
              đội ngũ LUXEWEAR sẽ phản hồi bạn sớm nhất.
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            {/* Họ tên + Email */}
            <div className="contact-form-row">

              <div className="contact-form-group">
                <label htmlFor="contact-name">
                  HỌ VÀ TÊN <span>*</span>
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-email">
                  EMAIL <span>*</span>
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  required
                />
              </div>

            </div>

            {/* Số điện thoại + Chủ đề */}
            <div className="contact-form-row">

              <div className="contact-form-group">
                <label htmlFor="contact-phone">
                  SỐ ĐIỆN THOẠI
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="0123 456 789"
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-subject">
                  CHỦ ĐỀ
                </label>

                <select
                  id="contact-subject"
                  name="subject"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Chọn chủ đề...
                  </option>

                  <option value="product">
                    Tư vấn sản phẩm
                  </option>

                  <option value="order">
                    Hỗ trợ đơn hàng
                  </option>

                  <option value="return">
                    Chính sách đổi trả
                  </option>

                  <option value="payment">
                    Hỗ trợ thanh toán
                  </option>

                  <option value="other">
                    Khác
                  </option>
                </select>
              </div>

            </div>

            {/* Nội dung */}
            <div className="contact-form-group contact-message-field">

              <label htmlFor="contact-message">
                NỘI DUNG TIN NHẮN <span>*</span>
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="6"
                placeholder="Nhập nội dung bạn muốn gửi cho chúng tôi..."
                required
              />

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="contact-submit-button"
            >
              <span>Gửi tin nhắn</span>
              <FiSend />
            </button>

          </form>
        </div>


        {/* =========================================
            SUPPORT
            ========================================= */}
        <div className="contact-message-sidebar">

          <div className="contact-support-card">

            <h3>Bạn cần hỗ trợ?</h3>

            <p className="contact-support-intro">
              Đội ngũ LUXEWEAR sẵn sàng hỗ trợ bạn về mọi vấn đề.
            </p>

            <div className="contact-support-list">

              {supportItems.map((item) => (
                <div
                  className="contact-support-item"
                  key={item.id}
                >

                  <div className="contact-support-icon">
                    {item.icon}
                  </div>

                  <div className="contact-support-content">

                    <h4>{item.title}</h4>

                    <p>{item.description}</p>

                  </div>

                </div>
              ))}

            </div>

          </div>


          {/* =========================================
              STORE IMAGE
              ========================================= */}
          <div className="contact-store-card">

            <img
              src={storeImage}
              alt="LUXEWEAR Store"
            />

            <div className="contact-store-overlay">

              <h3>LUXEWEAR Store</h3>

              <p>
                123 Nguyễn Huệ, Quận 1, TP. HCM
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactMessage;