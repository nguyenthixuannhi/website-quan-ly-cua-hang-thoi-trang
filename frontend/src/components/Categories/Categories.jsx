import "./Categories.css";

const categories = [
  {
    id_danh_muc: 1,
    name: "Áo",
    image: "/src/assets/categories/ao.jpg",
  },
  {
    id_danh_muc: 2,
    name: "Váy & Đầm",
    image: "/src/assets/categories/vay.jpg",
  },
  {
    id_danh_muc: 3,
    name: "Quần",
    image: "/src/assets/categories/quan.jpg",
  },
  {
    id_danh_muc: 4,
    name: "Giày",
    image: "/src/assets/categories/giay.jpg",
  },
  {
    id_danh_muc: 5,
    name: "Túi xách",
    image: "/src/assets/categories/tui.jpg",
  },
  {
    id_danh_muc: 6,
    name: "Phụ kiện",
    image: "/src/assets/categories/phukien.jpg",
  },
];

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <div className="section-header">
          <div>
            <span>DANH MỤC</span>
            <h2>Khám phá theo danh mục</h2>
          </div>

          <a href="http://localhost:81/product">Xem tất cả →</a>
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <a
              href={`http://localhost:81/product?page=1&id_danh_muc=${item.id_danh_muc}`}
              className="category-card"
              key={item.id_danh_muc}
            >
              <img src={item.image} alt={item.name} />

              <div className="overlay">
                <h3>{item.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;