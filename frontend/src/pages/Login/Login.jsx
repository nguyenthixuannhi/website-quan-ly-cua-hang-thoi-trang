import "./Login.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import loginBanner from "../../assets/login-banner.png";

function Login() {
  return (

    <>

<Header/>
    <main className="login-page">

      <div className="login-card">

        {/* Bên trái */}

        <div className="login-image">

          <img
             src={loginBanner}
             alt="Fashion"
         />

          <div className="image-overlay">

            <div className="badge">
              Bộ sưu tập <br />
              Mùa Hè 2026
            </div>

            <div className="quote">

              <h2>
                "Phong cách là cách nói
                <br />
                bạn là ai mà không cần lời."
              </h2>

              <p>Rachel Zoe</p>

            </div>

          </div>

        </div>

        {/* Bên phải */}

        <div className="login-form">

          <span className="welcome">
            CHÀO MỪNG TRỞ LẠI
          </span>

          <h1>Đăng nhập</h1>

          <p className="sub-title">
            Nhập thông tin tài khoản của bạn để tiếp tục
          </p>

          <label>Email</label>

          <input
            type="email"
            placeholder="ban@example.com"
          />

          <div className="password-header">

            <label>Mật khẩu</label>

            <a href="#">
              Quên mật khẩu?
            </a>

          </div>

          <div className="password-box">

            <input
              type="password"
              placeholder="••••••••"
            />

            <FiEye />

          </div>

          <button className="login-btn-main">
            Đăng nhập
          </button>

          <div className="divider">

            <span>hoặc</span>

          </div>

          <p className="register-link">

            Chưa có tài khoản?

            <Link to="/register">

              Đăng ký ngay

            </Link>

          </p>

        </div>

      </div>

    </main>
    <Footer/>

</>




  );
}

export default Login;