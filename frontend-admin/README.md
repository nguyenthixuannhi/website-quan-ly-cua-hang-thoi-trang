# Admin Dashboard (Refine)

This directory contains a minimal Refine-based admin dashboard that connects to the backend admin API at `http://localhost:3000` by default.

Run locally:

```bash
cd frontend-admin
npm install
npm run dev
```

Login via the app using an admin account (seeded in the backend). The app stores the JWT in `localStorage` and uses it for admin requests.
