import "./Register.css";

import registerBanner from "../../assets/register-banner.png";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { Link, useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { useState } from "react";

function Register() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (!email || !password || !confirm) {
			setError("Vui lòng điền đầy đủ thông tin.");
			return;
		}
		if (password !== confirm) {
			setError("Mật khẩu và xác nhận mật khẩu không khớp.");
			return;
		}

		setLoading(true);
		try {
			// generate a simple numeric id.
			const id_nguoi_dung = Math.floor(Date.now() / 1000);

			const resp = await fetch("http://localhost:3000/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id_nguoi_dung, email, mat_khau: password }),
			});

			const data = await resp.json();
			if (!resp.ok) {
				setError(data.message || "Đăng ký thất bại.");
				setLoading(false);
				return;
			}

			setSuccess("Đăng ký thành công. Chuyển tới trang đăng nhập...");
			setLoading(false);
			setTimeout(() => navigate("/login"), 1200);
		} catch (err) {
			setError(err.message || "Lỗi kết nối");
			setLoading(false);
		}
	}

	return (
		<>
			<Header />

			<main className="register-page">
				<div className="register-card">
					<div className="register-image">
						<img src={registerBanner} alt="Fashion" />

						<div className="image-overlay">
							<div className="season">
								BỘ SƯU TẬP
								<br />
								<strong>Thu Đông 2026</strong>
							</div>

							<div className="quote">
								<h2>"Thời trang không phải thứ chỉ tồn tại trong chiếc áo."</h2>
								<p>— Coco Chanel</p>
							</div>
						</div>
					</div>

					<div className="register-form">
						<span className="welcome">THAM GIA CÙNG CHÚNG TÔI</span>

						<h1>Đăng ký</h1>
						<p className="subtitle">Tạo tài khoản để bắt đầu mua sắm cùng LUXEWEAR.</p>

						<form onSubmit={handleSubmit}>
							<label>Email</label>
							<input type="email" placeholder="ban@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

							<label>Mật khẩu</label>
							<div className="password-box">
								<input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
								<FiEye />
							</div>

							<label>Xác nhận mật khẩu</label>
							<div className="password-box">
								<input type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
								<FiEye />
							</div>

							{error && <div className="form-error">{error}</div>}
							{success && <div className="form-success">{success}</div>}

							<button type="submit" className="register-button" disabled={loading}>
								{loading ? "Đang xử lý..." : "Đăng ký"}
							</button>
						</form>

						<div className="divider">
							<span>hoặc</span>
						</div>

						<p className="login-link">
							Đã có tài khoản?
							<Link to="/login">Đăng nhập</Link>
						</p>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}

export default Register;