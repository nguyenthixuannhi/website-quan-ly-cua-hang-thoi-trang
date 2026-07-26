import "./Categories.css";

const categories = [
  {
    name: "Áo",
    image: "/src/assets/categories/ao.jpg",
  },
  {
    name: "Váy & Đầm",
    image: "/src/assets/categories/vay.jpg",
  },
  {
    name: "Quần",
    image: "/src/assets/categories/quan.jpg",
  },
  {
    name: "Giày",
    image: "/src/assets/categories/giay.jpg",
  },
  {
    name: "Túi xách",
    image: "/src/assets/categories/tui.jpg",
  },
  {
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

          <a href="#">
            Xem tất cả →
          </a>

        </div>

        <div className="category-grid">

          {categories.map((item, index) => (

            <div
              className="category-card"
              key={index}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="overlay">

                <h3>{item.name}</h3>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;