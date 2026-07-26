import "./WhyChooseUs.css";

import {
    FiTruck,
    FiRefreshCcw,
    FiCreditCard,
    FiShield
} from "react-icons/fi";

function WhyChooseUs() {

    return (

        <section className="why">

            <div className="container">

                <span className="section-tag">
                    DỊCH VỤ
                </span>

                <h2>
                    Vì sao khách hàng chọn
                    <br />
                    LUXEWEAR?
                </h2>

                <div className="why-grid">

                    <div className="why-card">

                        <div className="why-icon">
                            <FiTruck />
                        </div>

                        <h3>Giao hàng nhanh</h3>

                        <p>
                            Giao hàng toàn quốc từ 1–3 ngày.
                            Đóng gói cẩn thận, đảm bảo sản phẩm
                            nguyên vẹn khi đến tay khách hàng.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            <FiRefreshCcw />
                        </div>

                        <h3>Đổi trả 30 ngày</h3>

                        <p>
                            Hỗ trợ đổi trả nhanh chóng trong vòng
                            30 ngày nếu sản phẩm có lỗi hoặc không
                            đúng kích thước.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            <FiCreditCard />
                        </div>

                        <h3>Thanh toán an toàn</h3>

                        <p>
                            Hỗ trợ thanh toán COD, Chuyển khoản,
                            Ví điện tử và các phương thức thanh toán
                            trực tuyến an toàn.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            <FiShield />
                        </div>

                        <h3>Hàng chính hãng</h3>

                        <p>
                            Cam kết 100% sản phẩm chính hãng,
                            được tuyển chọn từ các thương hiệu
                            thời trang uy tín.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default WhyChooseUs;