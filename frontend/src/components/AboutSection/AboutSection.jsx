import "./AboutSection.css";

import aboutImage from "../../assets/home/about.jpg";

function AboutSection() {

    return (

        <section className="about">

            <div className="about-container">

                <div className="about-image">

                    <img
                        src={aboutImage}
                        alt="About"
                    />

                    <div className="experience">

                        <h2>10+</h2>

                        <span>Năm kinh nghiệm</span>

                    </div>

                </div>

                <div className="about-content">

                    <span className="about-title">

                        VỀ CHÚNG TÔI

                    </span>

                    <h2>

                        Thời trang là nghệ thuật —
                        <br />
                        chúng tôi là người kể chuyện

                    </h2>

                    <p>

                        LUXEWEAR ra đời từ niềm đam mê với thời trang cao cấp
                        và mong muốn mang đến những thiết kế đẳng cấp cho
                        người Việt.

                        Mỗi sản phẩm được tuyển chọn kỹ lưỡng từ các thương
                        hiệu uy tín trong và ngoài nước.

                    </p>

                    <div className="about-stats">

                        <div>

                            <h3>50+</h3>

                            <span>Thương hiệu đối tác</span>

                        </div>

                        <div>

                            <h3>2,400+</h3>

                            <span>Sản phẩm đang bán</span>

                        </div>

                        <div>

                            <h3>18K+</h3>

                            <span>Khách hàng tin dùng</span>

                        </div>

                        <div>

                            <h3>98%</h3>

                            <span>Tỉ lệ hài lòng</span>

                        </div>

                    </div>

                    <button>

                        Tìm hiểu thêm →

                    </button>

                </div>

            </div>

        </section>

    );

}

export default AboutSection;