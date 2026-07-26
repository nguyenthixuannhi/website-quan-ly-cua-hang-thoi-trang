import "./Home.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import FlashSale from "../../components/FlashSale/FlashSale";

import AboutSection from "../../components/AboutSection/AboutSection";
import Newsletter from "../../components/Newsletter/Newsletter";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import heroImage from "../../assets/home/hero.jpg";

function Home() {
  return (
    <>
      <Header />

      <main className="home">

        {/* HERO */}

        <section className="hero">

          <div className="hero-overlay">

            <div className="hero-content">

              <span className="hero-badge">
                Bộ sưu tập mới — Thu Đông 2026
              </span>

              <h1>
                Phong cách
                <br />
                <span>định nghĩa bạn</span>
              </h1>

              <p>
                Khám phá những thiết kế độc đáo, tinh tế dành riêng
                cho những người yêu thời trang.
              </p>

              <div className="hero-buttons">

                <button className="btn-dark">
                  Mua ngay
                </button>

                <button className="btn-light">
                  Xem bộ sưu tập
                </button>

              </div>

              <div className="hero-stat">

                <div>
                  <h2>2,400+</h2>
                  <span>Sản phẩm</span>
                </div>

                <div>
                  <h2>50+</h2>
                  <span>Thương hiệu</span>
                </div>

                <div>
                  <h2>98%</h2>
                  <span>Khách hài lòng</span>
                </div>

              </div>

            </div>

          </div>

          <img
            src={heroImage}
            alt=""
          />

        </section>
        <Categories />
         <FeaturedProducts />
         <FlashSale />
         <AboutSection />
         <WhyChooseUs />
         <Newsletter />


      </main>

      <Footer />
    </>
  );
}

export default Home;