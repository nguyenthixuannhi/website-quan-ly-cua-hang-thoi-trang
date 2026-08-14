import "./ContactLocation.css";

import {
  FiMapPin,
  FiNavigation,
} from "react-icons/fi";

function ContactLocation() {
  return (
    <section className="contact-location">
      <div className="contact-location-container">

        {/* =========================================
            HEADING
            ========================================= */}
        <div className="contact-location-heading">

          <span className="contact-location-label">
            ĐỊA ĐIỂM
          </span>

          <h2>
            Tìm chúng tôi
          </h2>

          <p>
            Ghé thăm cửa hàng LUXEWEAR để trải nghiệm
            không gian thời trang và khám phá những sản phẩm
            mới nhất của chúng tôi.
          </p>

        </div>


        {/* =========================================
            LOCATION CONTENT
            ========================================= */}
        <div className="contact-location-content">

          {/* Thông tin cửa hàng */}
          <div className="contact-location-info">

            <div className="contact-location-info-icon">
              <FiMapPin />
            </div>

            <div>
              <span className="contact-location-info-label">
                LUXEWEAR STORE
              </span>

              <h3>
                123 Nguyễn Huệ, Quận 1
              </h3>

              <p>
                Thành phố Hồ Chí Minh, Việt Nam
              </p>
            </div>

          </div>


          {/* =========================================
              MAP
              ========================================= */}
          <div className="contact-map">

            <div className="contact-map-placeholder">

              <div className="contact-map-marker">
                <FiMapPin />
              </div>

              <div className="contact-map-text">
                <strong>LUXEWEAR</strong>

                <span>
                  123 Nguyễn Huệ, Quận 1
                </span>

                <small>
                  TP. Hồ Chí Minh
                </small>
              </div>

            </div>

            <button
              type="button"
              className="contact-map-button"
            >
              <FiNavigation />

              <span>
                Xem chỉ đường
              </span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactLocation;