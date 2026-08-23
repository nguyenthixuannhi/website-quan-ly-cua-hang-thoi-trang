import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiUser, FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAndFetchCart() {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setCartCount(0);
        setLoading(false);
        return;
      }

      try {
        // 1. Verify User Session
        const authResp = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (authResp.ok) {
          const authData = await authResp.json();
          setUser(authData.user);

          // 2. Fetch Cart Count for logged-in user
          const cartResp = await fetch("http://localhost:3000/api/giohang/count", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (cartResp.ok) {
            const cartData = await cartResp.json();
            setCartCount(cartData.count || 0);
          }
        } else {
          // Token is invalid or expired
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setCartCount(0);
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        setUser(null);
        setCartCount(0);
      } finally {
        setLoading(false);
      }
    }

    verifyAndFetchCart();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
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
          {user && <span className="cart-count">{cartCount}</span>}
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