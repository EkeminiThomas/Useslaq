# SLAQ

SLAQ is a cross-border payments platform landing page with a waitlist system powered by Flask and PostgreSQL.

## Features
- Static landing page (HTML/CSS/JS)
- Waitlist form with email validation
- Flask API (`/api/waitlist`)
- PostgreSQL storage for waitlist entries

## Project Structure
- `index.html`, `slaq.css`, `waitlist.js` — frontend
- `backend/app.py` — backend API
- `backend/requirements.txt` — backend dependencies
- `backend/.env.example` — sample environment variables

## API Endpoints
- `GET /api/health`
- `POST /api/waitlist`

## Database Table
```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);