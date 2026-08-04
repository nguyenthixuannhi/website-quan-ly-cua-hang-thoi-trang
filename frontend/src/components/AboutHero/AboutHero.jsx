import "./AboutHero.css";
import { FiArrowRight } from "react-icons/fi";

import heroImage from "../../assets/about/about-hero.jpg";

function AboutHero() {
  return (
    <section
      className="about-hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="about-overlay"></div>

      <div className="about-hero-container">

        <span className="hero-tag">
          VỀ CHÚNG TÔI
        </span>

        <h1>
          Về <br />
          <span>LUXEWEAR</span>
        </h1>

        <p>
          Chúng tôi mang đến những sản phẩm thời trang hiện đại,
          tinh tế và chất lượng dành cho mọi phong cách sống.
        </p>

        <button>
          Khám phá sản phẩm
          <FiArrowRight />
        </button>

      </div>
    </section>
  );
}

export default AboutHero;