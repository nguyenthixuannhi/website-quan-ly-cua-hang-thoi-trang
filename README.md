# Fashion Store Management - Website Quản Lý Cửa Hàng Thời Trang

## 🎯Đề tài: Thiết kế và phát triển hệ thống quản lý cửa hàng thời trang Full-Stack

![React](https://img.shields.io/badge/React-20232A?style=flat\&logo=react\&logoColor=61DAFB) ![Node.Js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=node.js\&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat\&logo=mysql\&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat\&logo=docker\&logoColor=white)

## 1. THÔNG TIN DỰ ÁN👤

### Thông tin tác giả

- **Giảng viên hướng dẫn:** Phan Thị Phương Nam

- **Sinh viên thực hiện:** Lê Trung Hiếu
  + Mã số sinh viên: 110123011
  + Mã lớp: DA23TTA
- **Sinh viên thực hiện:** Nguyễn Xuân Nhi
  + Mã số sinh viên: 110......
  + Mã lớp: DA23TTB



### Thông tin kỹ thuật

- **🏷️Tên dự án:** Website Quản Lý Cửa Hàng Thời Trang
- **⚙️Backend:** Node.js, Express.js
- **🎨Frontend:** React + Vite
- **🗄️Cơ sở dữ liệu:** MySQL
- **🔗ORM:** Sequelize
- **🛠️Trang quản trị:** AdminJS
- **🐳DevOps:** Docker, Docker Compose, Nginx

---

## 2. GIỚI THIỆU ĐỒ ÁN & CHỨC NĂNG CHÍNH📖

### **📝Mô tả ngắn:**

Fashion Store Management là hệ thống quản lý cửa hàng thời trang được xây dựng theo mô hình Full-Stack, cung cấp các chức năng phục vụ việc quản lý sản phẩm, danh mục, đơn hàng, kho hàng, khuyến mãi, thanh toán và các tài nguyên của cửa hàng.

Dự án bao gồm Backend sử dụng Node.js/Express kết hợp Sequelize ORM và MySQL, Frontend sử dụng React + Vite. Ngoài ra, hệ thống hỗ trợ Docker Compose và Nginx nhằm đơn giản hóa quá trình triển khai môi trường phát triển cục bộ.

### **✨Các chức năng chính:**

- **Xác thực người dùng:** đăng ký, đăng nhập và xác thực bằng JWT.
- **Quản lý sản phẩm:** thêm, cập nhật, xóa và quản lý thông tin sản phẩm.
- **Quản lý danh mục:** tổ chức và quản lý các danh mục sản phẩm.
- **Quản lý đơn hàng:** quản lý đơn hàng, chi tiết đơn hàng và trạng thái đơn.
- **Quản lý trả hàng:** hỗ trợ xử lý và theo dõi thông tin trả hàng.
- **Quản lý kho:** theo dõi lịch sử tồn kho và biến động số lượng sản phẩm.
- **Quản lý nhập hàng:** quản lý các đơn đặt hàng nhập hàng.
- **Quản lý khuyến mãi:** tạo và quản lý chương trình giảm giá.
- **Quản lý thanh toán:** lưu trữ và quản lý thông tin thanh toán.
- **Quản lý phiếu giao hàng:** theo dõi thông tin giao nhận đơn hàng.
- **Trang quản trị:** sử dụng AdminJS để quản lý dữ liệu hệ thống.
- **Upload tài nguyên:** hỗ trợ API tải lên hình ảnh và các tài nguyên cần thiết.
- **API Documentation:** cung cấp tài liệu API theo chuẩn Swagger/OpenAPI.

---

## 3. CÔNG NGHỆ SỬ DỤNG🧰

- React
- Vite
- Node.js
- Express.js
- Sequelize ORM
- AdminJS
- MySQL
- JWT
- Swagger/OpenAPI
- Docker
- Docker Compose
- Nginx
- npm

### **📁Cấu trúc thư mục chính:**

```text
.
├── backend/                    # Backend Node.js/Express
│   ├── src/
│   │   ├── config/             # Cấu hình AdminJS, JWT, Swagger...
│   │   ├── controllers/        # Xử lý logic nghiệp vụ
│   │   ├── models/             # Sequelize models và DB index
│   │   └── routes/             # Các API routes
│   ├── uploads/                # Tài nguyên được upload
│   └── index.js                # Entry point của backend
│
├── frontend/                   # Frontend React + Vite
│
├── database/                   # Cấu hình database
│   ├── Dockerfile
│   └── sql/                # SQL seed/migration
│
├── nginx/                      # Cấu hình Nginx reverse proxy
│
├── .env                        # Biến môi trường
├── docker-compose.yml          # Cấu hình Docker Compose
└── thesis                      # Tài liệu dự án
```

---

## 4. YÊU CẦU HỆ THỐNG💻

### **Yêu cầu phần mềm:**

- Node.js >= 16
- npm
- MySQL nếu chạy trực tiếp trên máy
- Docker và Docker Compose nếu sử dụng môi trường container

### **💡Khuyến nghị:**

Sử dụng Docker Compose để nhanh chóng khởi tạo Backend, Frontend và Database mà không cần cài đặt MySQL thủ công.

---

## 5. HƯỚNG DẪN CÀI ĐẶT (Installation Guide)⚙️

### **Tùy chọn A — Docker Compose**

Đây là phương án được khuyến nghị để thiết lập môi trường phát triển.

1. Clone repository:

```bash
git clone https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang
cd website-quan-ly-cua-hang-thoi-trangk
```

2. Khởi động toàn bộ hệ thống:

```bash
docker compose up --build
```

Docker Compose sẽ khởi động các service được cấu hình trong `docker-compose.yml`, bao gồm Backend, Database, Frontend và các thành phần liên quan nếu có.

3. Sau khi các container khởi động thành công, truy cập ứng dụng theo cấu hình port trong `docker-compose.yml`.

---

### **Tùy chọn B — Cài đặt thủ công**

#### **1. Cài đặt Backend**

```bash
cd backend
npm install
```

Chạy môi trường development:

```bash
npm run dev
```

Hoặc chạy production:

```bash
npm start
```

#### **2. Cài đặt Frontend**

Mở terminal mới:

```bash
cd frontend
npm install
npm run dev
```

---

## 6. CẤU HÌNH BIẾN MÔI TRƯỜNG (.env)🔐

Dự án sử dụng file `.env` tại thư mục gốc để cấu hình database và các thông tin cần thiết cho Backend.

Ví dụ:

```env
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=fashion_store

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fashion_store

BASE_URL=http://localhost:3000
```

### **🔑Các biến môi trường chính:**

- `MYSQL_ROOT_PASSWORD`: mật khẩu tài khoản root của MySQL.
- `MYSQL_DATABASE`: tên database được tạo mặc định khi MySQL khởi động.
- `DB_HOST`: địa chỉ máy chủ database.
- `DB_PORT`: port MySQL, mặc định là `3306`.
- `DB_USER`: tài khoản sử dụng để kết nối database.
- `DB_PASSWORD`: mật khẩu tài khoản database.
- `DB_NAME`: tên database mà ứng dụng sử dụng.
- `BASE_URL`: URL cơ sở của Backend và Swagger.

> **⚠️Lưu ý:** Không nên commit thông tin mật khẩu hoặc thông tin nhạy cảm thực tế lên repository. Nên sử dụng `.env.example` để cung cấp cấu trúc biến môi trường cho người dùng khác.

---

## 7. HƯỚNG DẪN KHỞI ĐỘNG & CHẠY THỬ 🔁

### **1) Khởi động Database**

Nếu sử dụng Docker:

```bash
docker compose up database
```

Hoặc khởi động toàn bộ hệ thống:

```bash
docker compose up --build
```

Nếu sử dụng MySQL cài đặt trực tiếp, cần đảm bảo MySQL đang chạy và các thông tin kết nối trong `.env` chính xác.

### **2) Khởi động Backend**

```bash
cd backend
npm install
npm run dev
```

Backend mặc định sử dụng port:

```text
3000
```

### **3) Khởi động Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy theo port được Vite cung cấp trong terminal.

### **4) Kiểm tra API**

Các API của Backend sử dụng tiền tố:

```text
/api
```

Ví dụ:

```text
/api/sanpham
/api/danhmuc
```

---

## 8. TÀI LIỆU API (SWAGGER) 📚

Backend cung cấp tài liệu API theo chuẩn Swagger/OpenAPI.

### **Swagger UI:**

```text
http://localhost:3000/api-docs
```

Sau khi Backend khởi động, mở địa chỉ trên bằng trình duyệt để xem danh sách API, request parameters, request body và response mẫu.

### **Nguồn cấu hình Swagger:**

```text
backend/src/config/swagger-docs.js
```

### **Mount Swagger UI:**

Swagger UI được cấu hình trong:

```text
backend/index.js
```

với endpoint:

```text
/api-docs
```

Nếu biến `BASE_URL` được thiết lập trong `.env`, Swagger sẽ sử dụng giá trị này trong phần `servers` của OpenAPI documentation.

---

## 9. CẤU TRÚC BACKEND

### **Controllers**

Thư mục:

```text
backend/src/controllers/
```

Chứa các controller chịu trách nhiệm xử lý logic nghiệp vụ và điều phối request/response của API.

### **Models**

Thư mục:

```text
backend/src/models/
```

Chứa các Sequelize model dùng để ánh xạ dữ liệu giữa ứng dụng Node.js và MySQL.

### **Routes**

Thư mục:

```text
backend/src/routes/
```

Định nghĩa các endpoint API và kết nối chúng với controller tương ứng.

### **Config**

Thư mục:

```text
backend/src/config/
```

Chứa các cấu hình liên quan đến:

- Database
- JWT
- AdminJS
- Swagger/OpenAPI
- Các thành phần cấu hình khác của hệ thống

---

## 10. QUẢN TRỊ HỆ THỐNG

Dự án tích hợp **AdminJS** để cung cấp giao diện quản trị dữ liệu.

Thông qua trang quản trị, người có quyền có thể quản lý các tài nguyên được cấu hình như:

- Người dùng
- Sản phẩm
- Danh mục
- Đơn hàng
- Kho hàng
- Khuyến mãi
- Thanh toán
- Các dữ liệu nghiệp vụ khác

Đường dẫn AdminJS phụ thuộc vào cấu hình trong Backend.

---

## 11. DOCKER & NGINX 🐳

Dự án hỗ trợ Docker Compose nhằm tạo môi trường phát triển nhiều container.

Các thành phần chính gồm:

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Database:** MySQL
- **Nginx:** Reverse proxy

File cấu hình chính:

```text
docker-compose.yml
```

Cấu hình Nginx:

```text
nginx/
```

Database Docker:

```text
database/
```

---

## 12. UPLOAD TÀI NGUYÊN

Backend cung cấp các endpoint phục vụ việc upload hình ảnh và tài nguyên.

Các file được upload được lưu tại:

```text
backend/uploads/
```

Thư mục này có thể được sử dụng để lưu trữ hình ảnh sản phẩm hoặc các tài nguyên giao diện tùy theo cấu hình của hệ thống.

---

## 13. SCREENSHOTS / PREVIEW

### **Fashion Store Management**

<div align="center">
</div>

---
