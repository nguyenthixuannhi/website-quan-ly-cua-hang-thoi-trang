import "./CtaBanner.css";

import { Link } from "react-router-dom";

function CtaBanner() {

    return (

        <section className="cta">

            <div className="cta-container">

                <span className="cta-subtitle">

                    BỘ SƯU TẬP MỚI

                </span>

                <h2>

                    Nâng tầm phong cách của bạn
                    <br />
                    cùng <span>LUXEWEAR</span>

                </h2>

                <p>

                    Khám phá hàng nghìn sản phẩm thời trang cao cấp,
                    được tuyển chọn từ những thương hiệu uy tín
                    trong và ngoài nước.

                </p>

                <Link
                    to="/product"
                    className="cta-button"
                >

                    Mua sắm ngay

                </Link>

            </div>

        </section>

    );

}

export default CtaBanner;