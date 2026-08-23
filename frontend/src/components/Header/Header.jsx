import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiUser, FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const resp = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (resp.ok) {
          const data = await resp.json();
          setUser(data.user);
        } else {
          // Token is invalid or expired
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

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
            <Link to="/product">Sản phẩm</Link>
          </li>
          <li>
            <Link to="/about">Giới thiệu</Link>
          </li>
          <li>
            <Link to="/contact">Liên hệ</Link>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <button className="icon-btn">
          <FiSearch />
        </button>

        <button className="icon-btn cart">
          <FiShoppingBag />  
          <span className="cart-count">3</span>
        </button>

        {!loading && (
          <>
            {user ? (
              <div className="user-profile-menu">
                <span className="user-email">
                  <FiUser className="user-icon" />
                  {user.email}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  <FiLogOut /> Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="login-btn">
                  Đăng nhập
                </Link>
                <Link to="/register" className="register-btn">
                  Đăng ký
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;