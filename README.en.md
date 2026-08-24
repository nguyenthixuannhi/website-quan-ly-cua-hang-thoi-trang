# Fashion Store Management (Website Quan Ly Cua Hang Thoi Trang)

Short description
-----------------

<div style="display: flex; align-items: center; gap: 20px;">
  <div style="flex: 1;">
    A full-stack store management system for managing products, categories, orders, inventory, promotions and basic UI assets. The repository contains a Node.js/Express backend, a React + Vite frontend, and Docker support for local development.
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

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Settings (.env) explanation](#settings-env-explanation)
- [Project structure (overview)](#project-structure-overview)
- [API documentation (Swagger)](#api-documentation-swagger)

Features
--------

- User authentication (register, login, JWT)
- Product and category management
- Orders, order details and returns
- Inventory history and purchase orders
- Promotions and discounts
- Payments and delivery note management
- Admin panel (AdminJS)
- File upload endpoints (images/assets)

Prerequisites
-------------

- Node.js (>= 16) and npm
- Docker & Docker Compose (optional, recommended for quick setup)
- MySQL (if not using Docker)

Installation
------------

### Option A — Docker Compose (recommended)

```bash
docker compose up --build
```

This will start the backend, database, and frontend (if configured in docker-compose.yml).

### Option B — Manual (run backend and frontend separately)

Backend

```bash
cd backend
npm install
npm run dev    # or `npm start` for production
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Usage
-----

- Backend default port: `3000` (see `backend/package.json` and `backend/index.js`).
- API base paths are prefixed with `/api` (for example `/api/sanpham`, `/api/danhmuc`).
- Swagger UI (API docs) is available at: `http://<BACKEND_HOST>:<PORT>/api-docs` (see details below).

Settings (.env) explanation
---------------------------

The project uses an `.env` file at the repository root. Important variables:

- `MYSQL_ROOT_PASSWORD` — root password for MySQL (used by local DB / Docker).
- `MYSQL_DATABASE` — default database name created on MySQL start.
- `DB_HOST` — database host (e.g. `localhost` or a Docker service name).
- `DB_PORT` — database port (default `3306`).
- `DB_USER` — database user (e.g. `root`).
- `DB_PASSWORD` — database user password.
- `DB_NAME` — database name used by the application.
- `BASE_URL` — base URL used by the backend and Swagger docs (e.g. `http://localhost:3000`).

The repository includes a sample `.env` with common values: [/.env](.env)

Project structure (overview)
----------------------------

- [backend](backend) — Node.js backend
  - [backend/index.js](backend/index.js) — server entrypoint and route mounting
  - [backend/src/config](backend/src/config) — configuration (AdminJS, JWT, Swagger)
  - [backend/src/controllers](backend/src/controllers) — express controllers
  - [backend/src/models](backend/src/models) — Sequelize models and DB index
  - [backend/src/routes](backend/src/routes) — express routes
  - [backend/uploads](backend/uploads) — uploaded assets
- [frontend](frontend) — React + Vite frontend
- [database](database) — database Dockerfile and SQL seed/migration scripts
- [nginx](nginx) — nginx configuration (reverse proxy) used by Docker setup
- [docker-compose.yml] — compose setup for multi-container local development

API documentation (Swagger)
--------------------------

The backend exposes Swagger/OpenAPI documentation and a UI at the route `/api-docs`.

- Swagger definition source: [backend/src/config/swagger-docs.js](backend/src/config/swagger-docs.js)
- Swagger UI is mounted in: [backend/index.js](backend/index.js) (see the `/api-docs` mounting)

Open the Swagger UI in your browser after starting the backend:

```
http://localhost:3000/api-docs
```

If `BASE_URL` is set in `.env`, Swagger will use that URL in the `servers` section of the docs.

## Screenshots / Preview