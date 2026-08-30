# <p align="center"> Website Quản Lý Cửa Hàng Thời Trang</p>

### Language

[![english](https://img.shields.io/badge/lang-en-blue.svg)](README.en.md)

## 🎯 Đề tài: XÂY DỰNG HỆ THỐNG WEBSITE QUẢN LÝ CỬA HÀNG THỜI TRANG

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.Js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

</div>

---

## 📑 Mục lục (Table of Contents)

- [👤 1. Thông tin dự án](#-1-thông-tin-dự-án)
- [📖 2. Giới thiệu đồ án & Chức năng chính](#-2-giới-thiệu-đồ-án--chức-năng-chính)
- [🧰 3. Công nghệ sử dụng & Cấu trúc thư mục](#-3-công-nghệ-sử-dụng--cấu-trúc-thư-mục)
- [💻 4. Yêu cầu hệ thống](#-4-yêu-cầu-hệ-thống)
- [⚙️ 5. Hướng dẫn cài đặt (Installation Guide)](#️-5-hướng-dẫn-cài-đặt-installation-guide)
- [🔐 6. Cấu hình biến môi trường (.env)](#-6-cấu-hình-biến-môi-trường-env)
- [🔁 7. Hướng dẫn khởi động & Chạy thử](#-7-hướng-dẫn-khởi-động--chạy-thử)
- [📚 8. Tài liệu API (Swagger)](#-8-tài-liệu-api-swagger)
- [🐳 9. Docker & Nginx](#-9-docker--nginx)
- [🖼️ 10. Screenshots / Preview](#️-10-screenshots--preview)

---

## 👤 1. THÔNG TIN DỰ ÁN

### 👨‍🏫 Thông tin tác giả
- **Giảng viên hướng dẫn:** TS.Nguyễn Bảo Ân
- **Sinh viên thực hiện:** Lê Trung Hiếu
  + Mã số sinh viên: `110123011`
  + Mã lớp: `DA23TTA`
- **Sinh viên thực hiện:** Nguyễn Thị Xuân Nhi
  + Mã số sinh viên: `110123131`
  + Mã lớp: `DA22TTB`

### ⚙️ Thông tin kỹ thuật
- **🏷️ Tên dự án:** Website Quản Lý Cửa Hàng Thời Trang
- **⚙️ Backend:** Node.js, Express.js
- **🎨 Frontend:** React + Vite
- **🗄️ Cơ sở dữ liệu:** MySQL
- **🔗 ORM:** Sequelize
- **🛠️ Trang quản trị:** AdminJS
- **🐳 DevOps:** Docker, Docker Compose, Nginx

---

## 📖 2. GIỚI THIỆU ĐỒ ÁN & CHỨC NĂNG CHÍNH

### **📝 Mô tả ngắn:**
Fashion Store Management là hệ thống quản lý cửa hàng thời trang được xây dựng theo mô hình Full-Stack, cung cấp các chức năng phục vụ việc quản lý sản phẩm, danh mục, đơn hàng, kho hàng, khuyến mãi, thanh toán và các tài nguyên của cửa hàng.

Dự án bao gồm Backend sử dụng Node.js/Express kết hợp Sequelize ORM và MySQL, Frontend sử dụng React + Vite. Hệ thống hỗ trợ Docker Compose và Nginx nhằm đơn giản hóa quá trình triển khai.

### **✨ Các chức năng chính:**
- **🔐 Xác thực người dùng:** Đăng ký, đăng nhập và xác thực bằng JWT.
- **👕 Quản lý sản phẩm:** Thêm, cập nhật, xóa và quản lý thông tin sản phẩm chi tiết.
- **📂 Quản lý danh mục:** Tổ chức và phân loại các danh mục sản phẩm.
- **📦 Quản lý đơn hàng:** Theo dõi đơn hàng, chi tiết đơn hàng và trạng thái cập nhật đơn.
- **🔄 Quản lý trả hàng:** Hỗ trợ xử lý và theo dõi thông tin đổi trả sản phẩm.
- **📊 Quản lý kho:** Theo dõi lịch sử tồn kho và biến động số lượng hàng hóa.
- **📥 Quản lý nhập hàng:** Quản lý các đơn đặt hàng nhập kho từ nhà cung cấp.
- **🎟️ Quản lý khuyến mãi:** Tạo và áp dụng các chương trình giảm giá, mã voucher.
- **💳 Quản lý thanh toán:** Lưu trữ và quản lý phương thức, thông tin thanh toán.
- **🚚 Quản lý phiếu giao hàng:** Theo dõi thông tin vận chuyển và giao nhận đơn hàng.
- **🛠️ Trang quản trị (AdminJS):** Giao diện quản trị trực quan để quản lý toàn bộ cơ sở dữ liệu.
- **📁 Upload tài nguyên:** Hỗ trợ API tải lên hình ảnh sản phẩm và tài nguyên hệ thống.
- **📚 API Documentation:** Tài liệu API trực tuyến theo chuẩn Swagger/OpenAPI.

---

## 🧰 3. CÔNG NGHỆ SỬ DỤNG & CẤU TRÚC THƯ MỤC

### **Tech Stack:**
- **Frontend:** React, Vite, CSS/UI Libraries
- **Backend:** Node.js, Express.js, Sequelize ORM, AdminJS, JWT
- **Database:** MySQL
- **Tools & DevOps:** Docker, Docker Compose, Nginx, Swagger/OpenAPI, npm

### **📁 Cấu trúc thư mục chính:**
```text
.
├── backend/                    # Backend Node.js/Express
│   ├── src/
│   │   ├── config/             # Cấu hình AdminJS, JWT, Swagger...
│   │   ├── controllers/        # Xử lý logic nghiệp vụ
│   │   ├── models/             # Sequelize models và DB index
│   │   └── routes/             # Các API routes
│   ├── uploads/                # Tài nguyên được upload (Hình ảnh, v.v.)
│   └── index.js                # Entry point của backend
│
├── frontend/                   # Frontend React + Vite
│
├── database/                   # Cấu hình database
│   ├── Dockerfile
│   └── sql/                    # SQL seed/migration scripts
│
├── nginx/                      # Cấu hình Nginx reverse proxy
│
├── .env                        # Biến môi trường
├── docker-compose.yml          # Cấu hình Docker Compose
└── thesis                      # Tài liệu đồ án / Báo cáo
```

## 💻 4. YÊU CẦU HỆ THỐNG

### **Yêu cầu phần mềm:**
- Node.js >= 16
- npm
- MySQL (nếu chạy trực tiếp không dùng Docker)
- Docker và Docker Compose (khuyên dùng để chạy container hóa)

---

## ⚙️ 5. HƯỚNG DẪN CÀI ĐẶT (Installation Guide)

### **Tùy chọn A — Docker Compose (Khuyên dùng)**

Phương án này giúp thiết lập toàn bộ môi trường (Backend, Frontend, Database) nhanh chóng mà không cần cài đặt thủ công.

1. **Clone repository:**
   ```bash
   git clone [https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang](https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang)
   cd website-quan-ly-cua-hang-thoi-trang
   ```

2. **Tạo file cấu hình môi trường từ bản mẫu:**
  ```bash
  cp .env.example .env
  ```

  *(Mở file .env và tùy chỉnh lại mật khẩu hoặc thông số nếu cần).*

3. **Cấp quyền cho thư mục dữ liệu (nếu cần trên Linux/macOS):**
  ```bash
  sudo chown -R $USER:$USER backend/uploads
  chmod -R 775 backend/uploads
  ```

  Đối với Windows (PowerShell):

  ```bash
  icacls .\backend\uploads /grant Users:(OI)(CI)M /T
  ```
4. **Khởi động hệ thống:**
  ```bash
  docker compose up --build -d
  ```

5. **Truy cập ứng dụng:**

Mở trình duyệt theo các port được cấu hình trong `docker-compose.yml`.

## Tùy chọn B — Cài đặt thủ công (Manual Setup)
### 1. Cài đặt và cấu hình Database
- Cài đặt MySQL và tạo database mới (ví dụ: fashion_store).
- Cấu hình thông tin kết nối trong file .env.

### 2. Cài đặt Backend
```Bash
cd backend
npm install
```
Chạy môi trường development:
```Bash
npm run dev
```
Hoặc chạy production:
```Bash
npm start
```
### 3. Cài đặt Frontend

Mở một cửa sổ terminal mới:
```Bash
cd frontend
npm install
npm run dev
```
## 🔐 6. CẤU HÌNH BIẾN MÔI TRƯỜNG (.env)

Dự án sử dụng file .env tại thư mục gốc để cấu hình hệ thống.
Code snippet
```python
MYSQL_ROOT_PASSWORD=your_secure_password
MYSQL_DATABASE=fashion_store

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_secure_password
DB_NAME=fashion_store

BASE_URL=http://localhost:3000
```
>  ⚠️ Lưu ý: Không commit thông tin mật khẩu thực tế lên Git công khai. Hãy sử dụng file .env.example làm khung tham khảo.


## 🔁 7. HƯỚNG DẪN KHỞI ĐỘNG & CHẠY THỬ

1. Khởi động Database: `docker compose up database` (hoặc bật MySQL service cục bộ).

2. Khởi động Backend: `cd backend && npm run dev` (mặc định chạy ở port 3000).

3. Khởi động Frontend: `cd frontend && npm run dev` (chạy qua Vite development server).

4. Kiểm tra API: Các đường dẫn API Backend đều có tiền tố `/api` (Ví dụ: `/api/sanpham`, `/api/danhmuc`).


## 📚 8. TÀI LIỆU API (SWAGGER)

Backend hỗ trợ tài liệu mô tả API trực quan thông qua Swagger/OpenAPI.
- Swagger UI URL: `http://localhost:3000/api-docs`
- Nguồn cấu hình: `backend/src/config/swagger-docs.js`

## 🐳 9. DOCKER & NGINX

Hệ thống tích hợp sẵn cấu hình Docker nhiều container:

- Backend Node.js/Express
- Frontend React + Vite
- Database MySQL
- Nginx Reverse Proxy

Các thư mục liên quan:
- `docker-compose.yml` (File cấu hình chính)
- `nginx/` (Cấu hình proxy)
- `database/` (Cấu hình khởi tạo database)


## 🖼️ 10. SCREENSHOTS / PREVIEW

<p align="center">
  <img src="https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang/blob/main/docs/register.png" width="400" alt="register">
  <img src="https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang/blob/main/docs/login.png" width="400" alt="login">
  <img src="https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang/blob/main/docs/homepage.png" width="400" alt="homepage">
  <img src="https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang/blob/main/docs/productdedtails.png" width="400" alt="product detail">
</p>
