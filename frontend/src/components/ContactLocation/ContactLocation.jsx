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

           <a
  href="https://www.google.com/maps/place/123+Nguy%C3%AA%CC%83n+Hu%C3%AA%CC%A3,+S%C3%A0i+G%C3%B2n,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7743448,106.702848,17z/data=!4m15!1m8!3m7!1s0x31752f471fae0893:0x4a0c6395cc27f990!2zMTIzIE5ndXnDqsyDbiBIdcOqzKMsIFPDoGkgR8OybiwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!3b1!8m2!3d10.7743448!4d106.702848!16s%2Fg%2F11b8vfc96t!3m5!1s0x31752f471fae0893:0x4a0c6395cc27f990!8m2!3d10.7743448!4d106.702848!16s%2Fg%2F11b8vfc96t?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D"
  target="_blank"
  rel="noopener noreferrer"
  className="contact-map-button"
>
  <span>
    Xem trên Google Maps
  </span>

  <span>↗</span>
</a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactLocation;