import "./Login.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import loginBanner from "../../assets/login-banner.png";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch("http://localhost:81/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mat_khau: password }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        setError(data.message || "Đăng nhập thất bại.");
        setLoading(false);
        return;
      }

      // store token and user
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Set cookie with explicit path and secure settings if needed
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      }
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      // also set a cookie so full-page navigation to /admin can carry the token
      try {
        document.cookie = `token=${data.token}; path=/`;
      } catch (e) {
        // ignore if cookies not available
      }
      // notify other components (Header) about auth change
      try {
        window.dispatchEvent(new CustomEvent('auth-changed', { detail: { token: data.token, user: data.user } }));
      } catch (e) {
        // ignore in environments without window
      }

      setSuccess("Đăng nhập thành công.");
      setLoading(false);
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(err.message || "Lỗi kết nối");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main className="login-page">

        <div className="login-card">

          <div className="login-image">
            <img src={loginBanner} alt="Fashion" />
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

          <div className="login-form">

            <span className="welcome">CHÀO MỪNG TRỞ LẠI</span>

            <h1>Đăng nhập</h1>

            <p className="sub-title">Nhập thông tin tài khoản của bạn để tiếp tục</p>

            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                placeholder="ban@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="password-header">
                <label>Mật khẩu</label>
                <a href="#">Quên mật khẩu?</a>
              </div>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              {error && <div className="form-error">{error}</div>}
              {success && <div className="form-success">{success}</div>}

              <button className="login-btn-main" type="submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>
            <div className="divider">
              <span>hoặc</span>
            </div>
            <p className="register-link">
              Chưa có tài khoản?
              <Link to="/register">Đăng ký ngay</Link>
            </p>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

export default Login;