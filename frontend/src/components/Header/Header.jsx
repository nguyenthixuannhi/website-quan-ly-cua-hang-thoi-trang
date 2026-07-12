import "./Header.css";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingBag } from "react-icons/fi";

function Header() {
  return (
    <header className="header">

      <div className="logo">

        <div className="logo-icon"></div>

        <h2>
          LUXE<span>WEAR</span>
        </h2>

      </div>

      <nav>

        <ul>

          <li>
            <Link to="/" className="active">
              Trang chủ
            </Link>
          </li>

          <li>
            <Link to="/products">
              Sản phẩm
            </Link>
          </li>

          <li>
            <Link to="/about">
              Giới thiệu
            </Link>
          </li>

          <li>
            <Link to="/contact">
              Liên hệ
            </Link>
          </li>

        </ul>

      </nav>

      <div className="header-right">

        <button className="icon-btn">
          <FiSearch />
        </button>

        <button className="icon-btn cart">

          <FiShoppingBag />

          <span className="cart-count">
            3
          </span>

        </button>

        <Link to="/login" className="login-btn">
          Đăng nhập
        </Link>

        <Link to="/register" className="register-btn">
          Đăng ký
        </Link>

      </div>

    </header>
  );
}

export default Header;