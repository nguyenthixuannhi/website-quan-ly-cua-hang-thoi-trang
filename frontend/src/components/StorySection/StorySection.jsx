import "./StorySection.css";

import storyImage from "../../assets/about/story.jpg";

function StorySection() {
  return (
    <section className="story">

      <div className="story-container">

        {/* Ảnh */}
        <div className="story-image">

          <img
            src={storyImage}
            alt="Câu chuyện LUXEWEAR"
          />

          <div className="experience-box">
            <h2>5+</h2>
            <span>NĂM KINH NGHIỆM</span>
          </div>

        </div>

        {/* Nội dung */}
        <div className="story-content">

          <span className="story-subtitle">
            LỊCH SỬ HÌNH THÀNH
          </span>

          <h2>
            Câu chuyện của chúng tôi
          </h2>

          <p>
            <strong>LUXEWEAR</strong> được thành lập từ niềm đam mê thời
            trang mãnh liệt và khát vọng mang đến những sản phẩm không
            chỉ đẹp về hình thức mà còn thể hiện phong cách, cá tính
            của người mặc.
          </p>

          <p>
            Chúng tôi tin rằng mọi khách hàng đều xứng đáng sở hữu
            những sản phẩm thời trang chất lượng với mức giá hợp lý.
            Vì vậy, LUXEWEAR luôn lựa chọn kỹ lưỡng chất liệu, chú
            trọng từng đường may và hoàn thiện từng chi tiết trước khi
            đưa đến tay khách hàng.
          </p>

          <p>
            Đội ngũ của chúng tôi không ngừng nghiên cứu xu hướng thời
            trang mới, cập nhật các thiết kế hiện đại và sáng tạo nhằm
            mang đến những bộ sưu tập phù hợp với nhiều phong cách khác
            nhau.
          </p>

          <p>
            Hơn hết, LUXEWEAR luôn đặt trải nghiệm khách hàng lên hàng
            đầu với dịch vụ tận tâm, giao hàng nhanh chóng, chính sách
            đổi trả linh hoạt và cam kết mang đến giá trị bền vững cho
            từng sản phẩm.
          </p>

        </div>

      </div>

    </section>
  );
}

export default StorySection;