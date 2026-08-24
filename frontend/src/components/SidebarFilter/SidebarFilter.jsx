import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import "./SidebarFilter.css";

function SidebarFilter() {
  const [categories, setCategories] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("id_danh_muc") || "";
  const appliedMaxPrice = searchParams.get("max_price") || "5000000";
  const appliedSize = searchParams.get("size") || "";
  const appliedColor = searchParams.get("mau_sac") || "";

  const [tempMaxPrice, setTempMaxPrice] = useState(
    Number(appliedMaxPrice)
  );

  const [tempSize, setTempSize] = useState(appliedSize);

  const [tempColor, setTempColor] = useState(appliedColor);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/danhmuc"
        );

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      } finally {
        setLoadingCategory(false);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    setTempMaxPrice(Number(appliedMaxPrice));
    setTempSize(appliedSize);
    setTempColor(appliedColor);
  }, [
    appliedMaxPrice,
    appliedSize,
    appliedColor,
  ]);

  const handleCategoryClick = (id) => {
    const newParams = new URLSearchParams(searchParams);

    if (selectedCategory === String(id)) {
      newParams.delete("id_danh_muc");
    } else {
      newParams.set("id_danh_muc", String(id));
    }

    newParams.set("page", "1");

    setSearchParams(newParams);
  };

  const handlePriceChange = (e) => {
    setTempMaxPrice(Number(e.target.value));
  };


  const handleSizeClick = (size) => {
    if (tempSize === size) {
      setTempSize("");
    } else {
      setTempSize(size);
    }
  };


  const handleColorClick = (color) => {
    if (tempColor === color) {
      setTempColor("");
    } else {
      setTempColor(color);
    }
  };

  const handleApply = () => {
    const newParams = new URLSearchParams(searchParams);

    // Price
    if (tempMaxPrice < 5000000) {
      newParams.set("min_price", "0");
      newParams.set("max_price", String(tempMaxPrice));
    } else {
      newParams.delete("min_price");
      newParams.delete("max_price");
    }

    // Size
    if (tempSize) {
      newParams.set("size", tempSize);
    } else {
      newParams.delete("size");
    }

    // Color
    if (tempColor) {
      newParams.set("mau_sac", tempColor);
    } else {
      newParams.delete("mau_sac");
    }

    // Reset pagination
    newParams.set("page", "1");

    setSearchParams(newParams);
  };

  const handleReset = () => {
    setTempMaxPrice(5000000);
    setTempSize("");
    setTempColor("");

    setSearchParams({});
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN") + "đ";
  };

  return (
    <aside className="sidebar">

      <div className="filter-header">
        <h2>Bộ lọc</h2>
        <FiFilter className="filter-icon" />
      </div>

      <div className="filter-group">
        <h3>Danh mục</h3>

        {loadingCategory ? (
          <p style={{ fontSize: "14px", color: "#666" }}>
            Đang tải danh mục...
          </p>
        ) : (
          <ul className="category-list">

            {/* Tất cả */}
            <li
              className={!selectedCategory ? "active" : ""}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);

                newParams.delete("id_danh_muc");
                newParams.set("page", "1");

                setSearchParams(newParams);
              }}
              style={{ cursor: "pointer" }}
            >
              Tất cả
            </li>

            {/* Categories */}
            {categories.map((item) => (
              <li
                key={item.id_danh_muc}
                className={
                  selectedCategory ===
                  String(item.id_danh_muc)
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryClick(item.id_danh_muc)
                }
                style={{ cursor: "pointer" }}
              >
                {item.ten_danh_muc}
              </li>
            ))}

          </ul>
        )}
      </div>

      <div className="filter-group">
        <h3>Khoảng giá</h3>

        <input
          type="range"
          min="0"
          max="5000000"
          step="10000"
          value={tempMaxPrice}
          onChange={handlePriceChange}
          className="price-slider"
        />

        <div className="price-range">
          <span>0đ</span>
          <span>{formatPrice(tempMaxPrice)}</span>
        </div>
      </div>

      <div className="filter-group">
        <h3>Kích cỡ</h3>

        <div className="size-list">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={
                tempSize === size ? "active" : ""
              }
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Màu sắc</h3>

        <div className="color-list">

          <span
            className={`color black ${
              tempColor === "Đen" ? "active" : ""
            }`}
            title="Đen"
            onClick={() => handleColorClick("Đen")}
          />

          <span
            className={`color white ${
              tempColor === "Trắng" ? "active" : ""
            }`}
            title="Trắng"
            onClick={() => handleColorClick("Trắng")}
          />

          <span
            className={`color brown ${
              tempColor === "Nâu" ? "active" : ""
            }`}
            title="Nâu"
            onClick={() => handleColorClick("Nâu")}
          />

          <span
            className={`color red ${
              tempColor === "Đỏ" ? "active" : ""
            }`}
            title="Đỏ"
            onClick={() => handleColorClick("Đỏ")}
          />

          <span
            className={`color blue ${
              tempColor === "Xanh" ? "active" : ""
            }`}
            title="Xanh"
            onClick={() => handleColorClick("Xanh")}
          />

          <span
            className={`color gray ${
              tempColor === "Xám" ? "active" : ""
            }`}
            title="Xám"
            onClick={() => handleColorClick("Xám")}
          />

          <span
            className={`color orange ${
              tempColor === "Cam" ? "active" : ""
            }`}
            title="Cam"
            onClick={() => handleColorClick("Cam")}
          />

        </div>
      </div>

      {/* APPLY */}
      <button
        className="apply-btn"
        onClick={handleApply}
      >
        Áp dụng bộ lọc
      </button>

      {/* RESET */}
      <button
        className="reset-btn"
        onClick={handleReset}
      >
        Đặt lại
      </button>

    </aside>
  );
}

export default SidebarFilter;