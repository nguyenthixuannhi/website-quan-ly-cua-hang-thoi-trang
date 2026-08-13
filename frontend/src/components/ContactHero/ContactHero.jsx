import "./ContactHero.css";

function ContactHero() {
  return (
    <section className="contact-hero">
      <div className="contact-hero-container">

        <div className="contact-hero-content">
          <span className="contact-hero-label">
            LIÊN HỆ
          </span>

          <h1 className="contact-hero-title">
            Liên hệ với
            <span> chúng tôi</span>
          </h1>

          <p className="contact-hero-description">
            Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc
            mắc của bạn. Hãy liên hệ với LUXEWEAR để được tư vấn
            về sản phẩm, đơn hàng và dịch vụ.
          </p>
        </div>

        <div className="contact-hero-image-wrapper">
          <img
            src="/assets/contact/contact-store.jpg"
            alt="LUXEWEAR Store"
            className="contact-hero-image"
          />
        </div>

      </div>
    </section>
  );
}

export default ContactHero;