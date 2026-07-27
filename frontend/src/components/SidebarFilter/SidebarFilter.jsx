import "./SidebarFilter.css";

import { FiFilter } from "react-icons/fi";

function SidebarFilter() {
  return (
    <aside className="sidebar">

      <div className="filter-header">

        <h2>Bộ lọc</h2>

        <FiFilter className="filter-icon" />

      </div>

      {/* ===========================
            DANH MỤC
      =========================== */}

      <div className="filter-group">

        <h3>Danh mục</h3>

        <ul className="category-list">

          <li className="active">Áo</li>

          <li>Váy & Đầm</li>

          <li>Quần</li>

          <li>Giày</li>

          <li>Túi xách</li>

          <li>Phụ kiện</li>

        </ul>

      </div>

      {/* ===========================
            KHOẢNG GIÁ
      =========================== */}

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

      {/* ===========================
            KÍCH CỠ
      =========================== */}

      <div className="filter-group">

        <h3>Kích cỡ</h3>

        <div className="size-list">

          <button>S</button>

          <button>M</button>

          <button>L</button>

          <button>XL</button>

        </div>

      </div>

      {/* ===========================
            MÀU SẮC
      =========================== */}

      <div className="filter-group">

        <h3>Màu sắc</h3>

        <div className="color-list">

          <span
            className="color black"
            title="Đen"
          ></span>

          <span
            className="color white"
            title="Trắng"
          ></span>

          <span
            className="color brown"
            title="Nâu"
          ></span>

          <span
            className="color red"
            title="Đỏ"
          ></span>

          <span
            className="color blue"
            title="Xanh"
          ></span>

          <span
            className="color gray"
            title="Xám"
          ></span>

          <span
            className="color orange"
            title="Cam"
          ></span>

        </div>

      </div>

      {/* ===========================
            THƯƠNG HIỆU
      =========================== */}

      <div className="filter-group">

        <h3>Thương hiệu</h3>

        <div className="brand-list">

          <label>
            <input type="checkbox" />
            LUXEWEAR
          </label>

          <label>
            <input type="checkbox" />
            ZARA
          </label>

          <label>
            <input type="checkbox" />
            H&M
          </label>

          <label>
            <input type="checkbox" />
            COACH
          </label>

          <label>
            <input type="checkbox" />
            CK
          </label>

          <label>
            <input type="checkbox" />
            CHANEL
          </label>

        </div>

      </div>

      <button className="apply-btn">
        Áp dụng bộ lọc
      </button>

      <button className="reset-btn">
        Đặt lại
      </button>

    </aside>
  );
}

export default SidebarFilter;