import "./Header.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiUser, FiLogOut, FiX } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

function Header() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState(null);
  
  // Get search query from URL params
  const queryParam = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);

  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Search state - auto expand if there's already a search query in the URL
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(queryParam));
  const searchInputRef = useRef(null);

  // Sync search input state when URL search params change (e.g. navigation)
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearchQuery(currentSearch);
    if (currentSearch) {
      setIsSearchOpen(true);
    }
  }, [searchParams]);

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

  // focus search input when opened
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
    const trimmedQuery = searchQuery.trim();
    const newParams = new URLSearchParams(searchParams);

    if (trimmedQuery) {
      newParams.set("search", trimmedQuery);
    } else {
      newParams.delete("search");
    }
    
    // Reset page to 1 when new search... become i am retarded
    newParams.set("page", "1");
    setSearchParams(newParams);
    
    // Navigate to product page with the search query if not already there
    navigate(`/product?${newParams.toString()}`);
  };

  const toggleSearch = () => {
    // if it has text, don't close it when clicking toggle unless the text is cleared
    if (isSearchOpen && searchQuery.trim()) {
      return;
    }

    if (isSearchOpen) {
      setSearchQuery("");
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("search");
      setSearchParams(newParams);
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
    setIsSearchOpen(false);
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
        <div className={`search-wrapper ${isSearchOpen || searchQuery ? "expanded" : ""}`}>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <button
              type="submit"
              className="icon-btn search-toggle"
              onClick={!isSearchOpen ? toggleSearch : undefined}
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
            {(isSearchOpen || searchQuery) && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={handleClearSearch}
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