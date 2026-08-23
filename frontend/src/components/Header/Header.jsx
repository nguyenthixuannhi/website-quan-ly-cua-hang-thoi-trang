import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiUser, FiLogOut, FiX } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

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

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleSearch = () => {
    if (isSearchOpen) {
      setSearchQuery("");
    }
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon"></div>
        <h2>
          LUXE<span>WEAR</span>
        </h2>
      </div>

      <nav className={`nav-container ${isSearchOpen ? "search-active" : ""}`}>
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
        {/* Animated Search Container */}
        <div className={`search-wrapper ${isSearchOpen ? "expanded" : ""}`}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <button
              type="button"
              className="icon-btn search-toggle"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <FiSearch />
            </button>
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearchOpen && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={toggleSearch}
              >
                <FiX />
              </button>
            )}
          </form>
        </div>

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