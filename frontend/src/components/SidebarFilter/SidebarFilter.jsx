// SidebarFilter.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import "./SidebarFilter.css";

function SidebarFilter() {
  const [categories, setCategories] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("id_danh_muc") || "";

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:3000/api/danhmuc");
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

  // Xử lý khi chọn Danh mục (Cập nhật URL)
  const handleCategoryClick = (id) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Nếu bấm vào danh mục đang chọn -> Bỏ chọn (xóa id_danh_muc khỏi URL)
    if (selectedCategory === String(id)) {
      newParams.delete("id_danh_muc");
    } else {
      newParams.set("id_danh_muc", id);
    }
    
    // Reset về trang 1 khi thay đổi bộ lọc
    newParams.set("page", "1"); 
    setSearchParams(newParams);
  };

  // Xử lý nút Đặt lại (Reset filters)
  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <aside className="sidebar">
      <div className="filter-header">
        <h2>Bộ lọc</h2>
        <FiFilter className="filter-icon" />
      </div>

      {/* DANH MỤC DỘNG TỪ DATABASE */}
      <div className="filter-group">
        <h3>Danh mục</h3>
        {loadingCategory ? (
          <p style={{ fontSize: "14px", color: "#666" }}>Đang tải danh mục...</p>
        ) : (
          <ul className="category-list">
            {/* Tùy chọn "Tất cả" */}
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

            {/* Render các danh mục từ DB */}
            {categories.map((item) => (
              <li
                key={item.id_danh_muc}
                className={selectedCategory === String(item.id_danh_muc) ? "active" : ""}
                onClick={() => handleCategoryClick(item.id_danh_muc)}
                style={{ cursor: "pointer" }}
              >
                {item.ten_danh_muc}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* KHOẢNG GIÁ */}
      <div className="filter-group">
        <h3>Khoảng giá</h3>
        <input
          type="range"
          min="0"
          max="5000000"
          defaultValue="5000000"
          className="price-slider"
        />
        <div className="price-range">
          <span>0đ</span>
          <span>5.000.000đ</span>
        </div>
      </div>

      {/* KÍCH CỠ */}
      <div className="filter-group">
        <h3>Kích cỡ</h3>
        <div className="size-list">
          <button>S</button>
          <button>M</button>
          <button>L</button>

          <button>XL</button>
        </div>
      </div>

      {/* MÀU SẮC */}
      <div className="filter-group">
        <h3>Màu sắc</h3>
        <div className="color-list">
          <span className="color black" title="Đen"></span>
          <span className="color white" title="Trắng"></span>
          <span className="color brown" title="Nâu"></span>
          <span className="color red" title="Đỏ"></span>
          <span className="color blue" title="Xanh"></span>
          <span className="color gray" title="Xám"></span>
          <span className="color orange" title="Cam"></span>
        </div>
      </div>

      <button className="apply-btn">Áp dụng bộ lọc</button>
      <button className="reset-btn" onClick={handleReset}>
        Đặt lại
      </button>
    </aside>
  );
}

export default SidebarFilter;