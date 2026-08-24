# Fashion Store Management (Website Quản Lý Cửa Hàng Thời Trang)

Mô tả ngắn
-----------------

<div style="display: flex; align-items: center; gap: 20px;">
  <div style="flex: 1;">
    Hệ thống quản lý cửa hàng thời trang full-stack, hỗ trợ quản lý sản phẩm, danh mục, đơn hàng, kho hàng, khuyến mãi và các tài nguyên giao diện cơ bản. Repository bao gồm backend Node.js/Express, frontend React + Vite và hỗ trợ Docker cho việc phát triển cục bộ.
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="https://i.pinimg.com/1200x/66/91/26/669126f00e39a19370e0eccc9835a6ad.jpg" alt="Fashion Store Preview" style="max-width: 80%; height: auto; border-radius: 8px;" />
  </div>
</div>

## Tech Stack

**Client:** React, Vite
**Server:** Node.js, Express, Sequelize ORM, AdminJS
**Database:** MySQL
**DevOps:** Docker, Docker Compose, Nginx

Mục lục
-----------------

* [Tính năng](#tính-năng)
* [Yêu cầu](#yêu-cầu)
* [Cài đặt](#cài-đặt)
* [Sử dụng](#sử-dụng)
* [Giải thích cấu hình (.env)](#giải-thích-cấu-hình-env)
* [Cấu trúc dự án (tổng quan)](#cấu-trúc-dự-án-tổng-quan)
* [Tài liệu API (Swagger)](#tài-liệu-api-swagger)

Tính năng
--------

* Xác thực người dùng (đăng ký, đăng nhập, JWT)
* Quản lý sản phẩm và danh mục
* Quản lý đơn hàng, chi tiết đơn hàng và trả hàng
* Lịch sử tồn kho và đơn đặt hàng nhập hàng
* Quản lý khuyến mãi và giảm giá
* Quản lý thanh toán và phiếu giao hàng
* Trang quản trị (AdminJS)
* Các endpoint tải tệp lên (hình ảnh/tài nguyên)

Yêu cầu
-------------

* Node.js (>= 16) và npm
* Docker & Docker Compose (tùy chọn, khuyến nghị để thiết lập nhanh)
* MySQL (nếu không sử dụng Docker)

Cài đặt
------------

### Tùy chọn A — Docker Compose (khuyến nghị)

```bash
docker compose up --build
```

Lệnh này sẽ khởi động backend, database và frontend (nếu đã được cấu hình trong `docker-compose.yml`).

### Tùy chọn B — Cài đặt thủ công (chạy backend và frontend riêng biệt)

Backend

```bash
cd backend
npm install
npm run dev    # hoặc `npm start` cho môi trường production
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Sử dụng
-----

* Port mặc định của backend: `3000` (xem `backend/package.json` và `backend/index.js`).
* Các đường dẫn API có tiền tố `/api` (ví dụ: `/api/sanpham`, `/api/danhmuc`).
* Swagger UI (tài liệu API) có tại: `http://<BACKEND_HOST>:<PORT>/api-docs` (xem chi tiết bên dưới).

Giải thích cấu hình (.env)
---------------------------
Dự án sử dụng tệp `.env` tại thư mục gốc của repository. Các biến quan trọng:

* `MYSQL_ROOT_PASSWORD` — mật khẩu root của MySQL (được sử dụng cho database cục bộ / Docker).
* `MYSQL_DATABASE` — tên database mặc định được tạo khi MySQL khởi động.
* `DB_HOST` — địa chỉ máy chủ database (ví dụ: `localhost` hoặc tên service Docker).
* `DB_PORT` — port của database (mặc định `3306`).
* `DB_USER` — tài khoản database (ví dụ: `root`).
* `DB_PASSWORD` — mật khẩu của tài khoản database.
* `DB_NAME` — tên database được ứng dụng sử dụng.
* `BASE_URL` — URL cơ sở được backend và Swagger sử dụng (ví dụ: `http://localhost:3000`).

Repository có sẵn một tệp `.env` mẫu với các giá trị thông dụng: `/.env`

Cấu trúc dự án (tổng quan)
----------------------------

* [backend](backend) — Backend Node.js
* [backend/index.js](backend/index.js) — entrypoint của server và nơi mount các route
* [backend/src/config](backend/src/config) — cấu hình (AdminJS, JWT, Swagger)
* [backend/src/controllers](backend/src/controllers) — các controller Express
* [backend/src/models](backend/src/models) — các model Sequelize và DB index
* [backend/src/routes](backend/src/routes) — các route Express
* [backend/uploads](backend/uploads) — các tài nguyên đã tải lên
* [frontend](frontend) — frontend React + Vite
* [database](database) — Dockerfile của database và các script SQL seed/migration
* [nginx](nginx) — cấu hình Nginx (reverse proxy) được sử dụng trong thiết lập Docker
* `docker-compose.yml` — cấu hình Compose cho môi trường phát triển cục bộ nhiều container

Tài liệu API (Swagger)
--------------------------
Backend cung cấp tài liệu Swagger/OpenAPI và giao diện UI tại route `/api-docs`.

* Nguồn định nghĩa Swagger: [backend/src/config/swagger-docs.js](backend/src/config/swagger-docs.js)
* Swagger UI được mount trong: [backend/index.js](backend/index.js) (xem phần mount `/api-docs`)

Mở Swagger UI trên trình duyệt sau khi khởi động backend:

```text
http://localhost:3000/api-docs
```

Nếu `BASE_URL` được thiết lập trong `.env`, Swagger sẽ sử dụng URL đó trong phần `servers` của tài liệu.

## Screenshots / Preview
