import "./Contact.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import ContactHero from "../../components/ContactHero/ContactHero";
import ContactInfoCards from "../../components/ContactInfoCards/ContactInfoCards";
import ContactMessage from "../../components/ContactMessage/ContactMessage";
import ContactLocation from "../../components/ContactLocation/ContactLocation";

import CtaBanner from "../../components/CtaBanner/CtaBanner";

function Contact() {
  return (
    <>
      <Header />

      <main className="contact-page">

        {/* Hero */}
        <ContactHero />

        {/* Thông tin liên hệ */}
        <ContactInfoCards />

        {/* Form liên hệ + hỗ trợ */}
        <ContactMessage />

        {/* Địa điểm + bản đồ */}
        <ContactLocation />

        {/* Dùng lại CTA Banner của trang About */}
        <CtaBanner />

      </main>

      <Footer />
    </>
  );
}

export default Contact;