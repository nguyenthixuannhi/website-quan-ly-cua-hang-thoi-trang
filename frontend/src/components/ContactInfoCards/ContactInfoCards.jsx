import "./ContactInfoCards.css";

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
} from "react-icons/fi";

function ContactInfoCards() {
  const contactItems = [
    {
      id: 1,
      icon: <FiMapPin />,
      title: "ĐỊA CHỈ",
      content: (
        <>
          123 Nguyễn Huệ, Quận 1
          <br />
          TP. Hồ Chí Minh
        </>
      ),
    },
    {
      id: 2,
      icon: <FiPhone />,
      title: "ĐIỆN THOẠI",
      content: "0123 456 789",
    },
    {
      id: 3,
      icon: <FiMail />,
      title: "EMAIL",
      content: "support@luxewear.vn",
    },
    {
      id: 4,
      icon: <FiClock />,
      title: "THỜI GIAN LÀM VIỆC",
      content: (
        <>
          Thứ 2 – Chủ nhật
          <br />
          08:00 – 22:00
        </>
      ),
    },
  ];

  return (
    <section className="contact-info">
      <div className="contact-info-container">

        {contactItems.map((item) => (
          <div className="contact-info-card" key={item.id}>

            <div className="contact-info-icon">
              {item.icon}
            </div>

            <h3 className="contact-info-title">
              {item.title}
            </h3>

            <div className="contact-info-content">
              {item.content}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

export default ContactInfoCards;