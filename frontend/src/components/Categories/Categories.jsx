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
    image: "/src/assets/products/product2.jpg",
  },
  {
    id_danh_muc: 3,
    name: "Quần",
    image: "/src/assets/products/product4.jpg",
  },
  {
    id_danh_muc: 4,
    name: "Giày",
    image: "/src/assets/products/viewed1.jpg",
  },
  {
    id_danh_muc: 5,
    name: "Túi xách",
    image: "/src/assets/products/product5.jpg",
  },
  {
    id_danh_muc: 6,
    name: "Phụ kiện",
    image: "/src/assets/products/product6.jpg",
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

          <a href="/product">Xem tất cả →</a>
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <a
              href={`/product?page=1&id_danh_muc=${item.id_danh_muc}`}
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