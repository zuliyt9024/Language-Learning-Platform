# Language Learning Platform — Backend

Node.js + Express API with Supabase. Follows MVC structure.

## Tech Stack

- **Node.js**
- **Express.js**
- **Supabase** (database & auth)
- **dotenv** for environment variables
- **cors** for cross-origin requests

## Folder Structure

```
backend/
├── controllers/   # Request handlers
├── models/        # Data / Supabase queries
├── routes/        # API routes
├── middleware/    # Auth, validation, etc.
├── config/        # Supabase and other config
├── utils/         # Helpers
└── server.js
```

## Installation

```bash
npm install
```

## Environment

Copy `.env.example` to `.env` and set:

- `PORT` – server port (default 3000)
- `SUPABASE_URL` – your Supabase project URL
- `SUPABASE_ANON_KEY` – your Supabase anon/public key

## Run

```bash
# Development (with watch)
npm run dev

# Production
npm start
```

API base: `http://localhost:3000`. Health check: `GET /health`.

## Database (Supabase)

Design your schema in Supabase (users, lessons, progress, streaks, etc.) and use the client in `config/supabase.js` from controllers and models.
