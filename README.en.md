# <p align="center"> Fashion Store Management Website</p>

### Language

[![vietnamese](https://img.shields.io/badge/lang-vi-red.svg)](README.md)
# <p align="center">Fashion Store Management Website</p>

## 🎯 Project: BUILDING A FASHION STORE MANAGEMENT WEBSITE

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.Js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

</div>

---

## 📑 Table of Contents

- [👤 1. Project Information](#-1-project-information)
- [📖 2. Project Introduction & Main Features](#-2-project-introduction--main-features)
- [🧰 3. Technologies Used & Project Structure](#-3-technologies-used--project-structure)
- [💻 4. System Requirements](#-4-system-requirements)
- [⚙️ 5. Installation Guide](#️-5-installation-guide)
- [🔐 6. Environment Variables Configuration (.env)](#-6-environment-variables-configuration-env)
- [🔁 7. Startup & Testing Guide](#-7-startup--testing-guide)
- [📚 8. API Documentation (Swagger)](#-8-api-documentation-swagger)
- [🐳 9. Docker & Nginx](#-9-docker--nginx)
- [🖼️ 10. Screenshots / Preview](#️-10-screenshots--preview)

---

## 👤 1. PROJECT INFORMATION

### 👨‍🏫 Author Information

- **Supervisor:** Dr. Nguyễn Bảo Ân
- **Student:** Lê Trung Hiếu
  + Student ID: `110123011`
  + Class: `DA23TTA`
- **Student:** Nguyễn Thị Xuân Nhi
  + Student ID: `110123131`
  + Class: `DA23TTB`

### ⚙️ Technical Information

- **🏷️ Project Name:** Fashion Store Management Website
- **⚙️ Backend:** Node.js, Express.js
- **🎨 Frontend:** React + Vite
- **🗄️ Database:** MySQL
- **🔗 ORM:** Sequelize
- **🛠️ Admin Panel:** AdminJS
- **🐳 DevOps:** Docker, Docker Compose, Nginx

---

## 📖 2. PROJECT INTRODUCTION & MAIN FEATURES

### **📝 Brief Description:**

Fashion Store Management is a full-stack fashion store management system that provides features for managing products, categories, orders, inventory, promotions, payments, and other store resources.

The project consists of a backend built with Node.js/Express, Sequelize ORM, and MySQL, and a frontend built with React + Vite. The system supports Docker Compose and Nginx to simplify the deployment process.

### **✨ Main Features:**

- **🔐 User Authentication:** User registration, login, and JWT-based authentication.
- **👕 Product Management:** Add, update, delete, and manage detailed product information.
- **📂 Category Management:** Organize and classify product categories.
- **📦 Order Management:** Track orders, order details, and order status updates.
- **🔄 Return Management:** Process and track product returns and exchanges.
- **📊 Inventory Management:** Track inventory history and changes in product quantities.
- **📥 Purchase Management:** Manage purchase orders and inventory imports from suppliers.
- **🎟️ Promotion Management:** Create and apply discount programs and voucher codes.
- **💳 Payment Management:** Store and manage payment methods and payment information.
- **🚚 Delivery Management:** Track shipping and order delivery information.
- **🛠️ Admin Panel (AdminJS):** An intuitive administration interface for managing the entire database.
- **📁 Resource Upload:** Provides APIs for uploading product images and system resources.
- **📚 API Documentation:** Online API documentation based on the Swagger/OpenAPI standard.

---

## 🧰 3. TECHNOLOGIES USED & PROJECT STRUCTURE

### **Tech Stack:**

- **Frontend:** React, Vite, CSS/UI Libraries
- **Backend:** Node.js, Express.js, Sequelize ORM, AdminJS, JWT
- **Database:** MySQL
- **Tools & DevOps:** Docker, Docker Compose, Nginx, Swagger/OpenAPI, npm

### **📁 Main Project Structure:**

```text
.
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── config/             # AdminJS, JWT, Swagger configuration...
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # Sequelize models and DB index
│   │   └── routes/             # API routes
│   ├── uploads/                # Uploaded resources (images, etc.)
│   └── index.js                # Backend entry point
│
├── frontend/                   # React + Vite frontend
│
├── database/                   # Database configuration
│   ├── Dockerfile
│   └── sql/                    # SQL seed/migration scripts
│
├── nginx/                      # Nginx reverse proxy configuration
│
├── .env                        # Environment variables
├── docker-compose.yml          # Docker Compose configuration
└── thesis                      # Project thesis / report
```

## 💻 4. SYSTEM REQUIREMENTS

### **Software Requirements:**
- Node.js >= 16
- npm
- MySQL (if running directly without Docker)
- Docker and Docker Compose (recommended for containerized deployment)

---

## ⚙️ 5. INSTALLATION GUIDE

### **Option A — Docker Compose (Recommended)**

This option quickly sets up the entire environment (Backend, Frontend, and Database) without requiring manual installation.

1. **Clone repository:**

   ```bash
   git clone [https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang](https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang)

   cd website-quan-ly-cua-hang-thoi-trang
   ```

2. **Create the environment configuration file from the template:**

  ```bash
  cp .env.example .env
  ```

  *(Open the .env file and customize the password or other settings if necessary.)*

3. **Grant permissions to the data directory (if necessary on Linux/macOS):**
  ```bash
  sudo chown -R $USER:$USER backend/uploads
  chmod -R 775 backend/uploads
  ```

  For Windows (PowerShell):

  ```bash
  icacls .\backend\uploads /grant Users:(OI)(CI)M /T
  ```
4. **Start the system:**
  ```bash
  docker compose up --build -d
  ```

5. **Access the application:**

Open a browser using the ports configured in `docker-compose.yml`.

## Option B — Manual Setup
### 1. Install and Configure the Database
- Install MySQL and create a new database (for example: fashion_store).
- Configure the connection information in the .env file.

### 2. Install the Backend
```Bash
cd backend
npm install
```
Run the development environment:
```Bash
npm run dev
```
Or run in production:
```Bash
npm start
```
### 3. Install the Frontend

Open a new terminal window:
```Bash
cd frontend
npm install
npm run dev
```
## 🔐 6. ENVIRONMENT VARIABLES CONFIGURATION (.env)

The project uses a .env file in the root directory to configure the system.

Code snippet:
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
>  ⚠️ Note: Do not commit actual passwords or sensitive credentials to a public Git repository. Use the .env.example file as a reference template.


## 🔁 7. STARTUP & TESTING GUIDE

1. Start the Database: `docker compose up database` (or start the local MySQL service).
2. Start the Backend: `cd backend && npm run dev` (runs on port 3000 by default).
3. Start the Frontend: `cd frontend && npm run dev` (runs through the Vite development server).
4. Test the API: All Backend API routes use the `/api` prefix (for example: `/api/sanpham`, `/api/danhmuc`).


## 📚 8. API DOCUMENTATION (SWAGGER)

The backend provides interactive API documentation through Swagger/OpenAPI.
- Swagger UI URL: `http://localhost:3000/api-docs`
- Configuration source: `backend/src/config/swagger-docs.js`

## 🐳 9. DOCKER & NGINX

The system includes a multi-container Docker configuration:

- Backend Node.js/Express
- Frontend React + Vite
- Database MySQL
- Nginx Reverse Proxy

Related directories and files:
- `docker-compose.yml` (Main configuration file)
- `nginx/` (Proxy configuration)
- `database/` (Database initialization configuration)

## 🖼️ 10. SCREENSHOTS / PREVIEW

<p align="center">
  <img src="https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang/blob/main/docs/register.png" width="400" alt="register">
  <img src="https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang/blob/main/docs/login.png" width="400" alt="login">
  <img src="https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang/blob/main/docs/homepage.png" width="400" alt="homepage">
  <img src="https://github.com/nguyenthixuannhi/website-quan-ly-cua-hang-thoi-trang/blob/main/docs/productdedtails.png" width="400" alt="product detail">
</p>