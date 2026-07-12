import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo */}

        <div className="footer-col">

          <div className="footer-logo">

            <div className="footer-logo-icon"></div>

            <h2>
              LUXE<span>WEAR</span>
            </h2>

          </div>

          <p>
            Phong cách thời trang hiện đại, sang trọng
            và tinh tế dành cho mọi dịp.
          </p>

        </div>

        {/* Liên hệ */}

        <div className="footer-col">

          <h3>LIÊN HỆ</h3>

          <a
            href="https://maps.google.com/?q=123 Nguyễn Huệ Quận 1 Hồ Chí Minh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMapMarkerAlt />
            123 Nguyễn Huệ, Quận 1,
            TP. Hồ Chí Minh
          </a>

          <a href="tel:0901234567">
            <FaPhoneAlt />
            0901 234 567
          </a>

          <a href="mailto:hello@luxewear.vn">
            <FaEnvelope />
            hello@luxewear.vn
          </a>

        </div>

        {/* Social */}

        <div className="footer-col">

          <h3>MẠNG XÃ HỘI</h3>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
            Facebook
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
            Instagram
          </a>

        </div>

        {/* Chính sách */}

        <div className="footer-col">

          <h3>PHÁP LÝ</h3>

          <a href="#">Chính sách bảo mật</a>

          <a href="#">Điều khoản sử dụng</a>

          <a href="#">Chính sách hoàn trả</a>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Fashion Store — LUXEWEAR.
          Bảo lưu mọi quyền.
        </p>

      </div>

    </footer>
  );
}

export default Footer;