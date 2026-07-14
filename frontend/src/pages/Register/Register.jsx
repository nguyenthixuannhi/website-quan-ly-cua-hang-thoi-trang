import "./Register.css";

import registerBanner from "../../assets/register-banner.png";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";

function Register() {

return(

<>

<Header/>

<main className="register-page">

<div className="register-card">

<div className="register-image">

<img
src={registerBanner}
alt="Fashion"
/>

<div className="image-overlay">

<div className="season">

BỘ SƯU TẬP

<br/>

<strong>Thu Đông 2026</strong>

</div>

<div className="quote">

<h2>

"Thời trang không phải thứ chỉ tồn tại trong chiếc áo."

</h2>

<p>

— Coco Chanel

</p>

</div>

</div>

</div>

<div className="register-form">

<span className="welcome">

THAM GIA CÙNG CHÚNG TÔI

</span>

<h1>Đăng ký</h1>

<p className="subtitle">

Tạo tài khoản để bắt đầu mua sắm cùng LUXEWEAR.

</p>

<form>

<label>Email</label>

<input
type="email"
placeholder="ban@example.com"
/>

<label>Mật khẩu</label>

<div className="password-box">

<input
type="password"
placeholder="••••••••"
/>

<FiEye/>

</div>

<label>

Xác nhận mật khẩu

</label>

<div className="password-box">

<input
type="password"
placeholder="••••••••"
/>

<FiEye/>

</div>

<button
type="submit"
className="register-button"
>

Đăng ký

</button>

</form>

<div className="divider">

<span>hoặc</span>

</div>

<p className="login-link">

Đã có tài khoản?

<Link to="/login">

Đăng nhập

</Link>

</p>

</div>

</div>

</main>

<Footer/>

</>

)

}

export default Register;