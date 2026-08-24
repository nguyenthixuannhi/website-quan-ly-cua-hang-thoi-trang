import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./ProductGrid.css";

import { ProductPaginationContext } from "../../pages/Product/Product";

const API_URL = "http://localhost:81";

function ProductGrid() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    totalProducts,
    setTotalProducts,
    setTotalPages,
  } = useContext(ProductPaginationContext);

  const page = Number(searchParams.get("page")) || 1;

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder-product.jpg";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_URL}${image}`;
    }

    return `${API_URL}/${image}`;
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "Liên hệ";
    }

    return `${Number(price).toLocaleString("vi-VN")}đ`;
  };


  const getProductPrice = (product) => {
    if (
      !product.bien_the ||
      product.bien_the.length === 0
    ) {
      return null;
    }

    const prices = product.bien_the
      .map((variant) => Number(variant.gia_ban))
      .filter((price) => !Number.isNaN(price));

    if (prices.length === 0) {
      return null;
    }

    return Math.min(...prices);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        const keyword =
          searchParams.get("keyword") ||
          searchParams.get("search");

        if (keyword) {
          params.set("keyword", keyword);
        }

        const category =
          searchParams.get("id_danh_muc");

        if (category) {
          params.set("id_danh_muc", category);
        }

        const minPrice =
          searchParams.get("min_price");

        const maxPrice =
          searchParams.get("max_price");

        if (minPrice) {
          params.set("min_price", minPrice);
        }

        if (maxPrice) {
          params.set("max_price", maxPrice);
        }

        const size = searchParams.get("size");

        if (size) {
          params.set("size", size);
        }

        const color =
          searchParams.get("mau_sac");

        if (color) {
          params.set("mau_sac", color);
        }

        params.set("page", String(page));
        params.set("limit", "12");

        const sortBy =
          searchParams.get("sortBy");

        const order =
          searchParams.get("order");

        if (sortBy) {
          params.set("sortBy", sortBy);
        }

        if (order) {
          params.set("order", order);
        }

        const response = await fetch(
          `${API_URL}/api/sanpham/search?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(
            "Không thể tải danh sách sản phẩm"
          );
        }

        const result = await response.json();


        setProducts(result.data || []);

        setTotalProducts(result.total || 0);
        setTotalPages(result.totalPages || 0);

      } catch (err) {
        console.error(
          "Lỗi khi tải sản phẩm:",
          err
        );

        setError(
          err.message ||
            "Có lỗi xảy ra khi tải sản phẩm"
        );

        setProducts([]);

        // Reset pagination if request fails
        setTotalProducts(0);
        setTotalPages(0);

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    searchParams,
    page,
    setTotalProducts,
    setTotalPages,
  ]);

  const handleSort = (sortBy, order) => {
    const newParams =
      new URLSearchParams(searchParams);

    newParams.set("sortBy", sortBy);
    newParams.set("order", order);

    // Always return to page 1
    // when changing sorting.
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const activeKeyword =
    searchParams.get("keyword") ||
    searchParams.get("search");

  if (loading) {
    return (
      <div className="product-area">

        <div className="toolbar">
          <div className="toolbar-left">
            <h2>
              Đang tải sản phẩm...
            </h2>
          </div>
        </div>

        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                className="product-card"
                key={item}
              >
                <div className="product-image">
                  <div className="product-loading">
                    Đang tải...
                  </div>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="product-area">

        <div className="toolbar">
          <div className="toolbar-left">

            <h2>
              Có lỗi xảy ra
            </h2>
            <p>{error}</p>

          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="product-area">

      <div className="toolbar">

        <div className="toolbar-left">

          <h2>
            {totalProducts} Sản phẩm
          </h2>

          <p>
            {activeKeyword
              ? `Kết quả tìm kiếm cho "${activeKeyword}"`
              : "Khám phá bộ sưu tập mới nhất"}
          </p>

        </div>


        <div className="toolbar-right">

          {/* MỚI NHẤT */}

          <button
            className={
              searchParams.get("sortBy") ==="id_san_pham" &&
              searchParams.get("order") === "DESC" ? "active" : ""
            }
            onClick={() =>
              handleSort( "id_san_pham", "DESC")
            }
          >
            Mới nhất
          </button>

          {/* CŨ NHẤT */}

          <button
            className={ searchParams.get("sortBy") === "id_san_pham" &&
              searchParams.get("order") === "ASC"  ? "active"  : ""
            }
            onClick={() =>
              handleSort( "id_san_pham", "ASC" )
            }
          >
            Cũ nhất
          </button>


          <button
            className={
              searchParams.get("sortBy") === "gia_ban" &&
              searchParams.get("order") === "ASC" ? "active":  ""
            }
            onClick={() =>
              handleSort("gia_ban","ASC")
            }>
            Giá ↑
          </button>

          <button
            className={
              searchParams.get("sortBy") === "gia_ban" &&
              searchParams.get("order") === "DESC" ? "active" : ""
            }
            onClick={() => handleSort( "gia_ban","DESC")
            }>
            Giá ↓
          </button>
        </div>
      </div>
      {products.length === 0 ? (
        <div className="empty-products">
          <h3>
            Không tìm thấy sản phẩm
          </h3>
          <p>
            Thử thay đổi bộ lọc hoặc
            từ khóa tìm kiếm.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((item) => {
            const price =
              getProductPrice(item);
            return (
              <div
                className="product-card"
                key={item.id_san_pham}
              >
                {/* PRODUCT IMAGE */}
                <div className="product-image">
                  <Link to={`/product/${item.id_san_pham}`} className="product-image-link">
                    <img
                      src={getImageUrl(
                        item.anh_san_pham
                      )}
                      alt={
                        item.ten_san_pham
                      }
                    />
                  </Link>
                  <span className="badge">
                    Mới
                  </span>

                  {/* WISHLIST BUTTON  NO IDEA HOW TO CODE IT YET*/}
                  <button
                    className="wishlist"
                    onClick={() =>
                      console.log( "Wishlist:", item )
                    }
                  >
                    <FiHeart />
                  </button>
                </div>


                <div className="product-info">

                  <span className="brand">
                    LUXEWEAR
                  </span>

                  <h3>
                    <Link to={`/product/${item.id_san_pham}`} className="product-title-link">
                      {item.ten_san_pham}
                    </Link>
                  </h3>

                  <h4>
                    {formatPrice(price)}
                  </h4>
                  {/* ADD TO CART BUTTON  NO IDEA */}
                  <button
                    className="cart-btn"
                    onClick={() =>
                      console.log( "Add to cart:", item )
                    }
                  >
                    <FiShoppingCart />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;