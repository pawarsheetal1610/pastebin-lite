# Pastebin Lite

Pastebin Lite is a simple Pastebin-like web application built as a take-home assignment.
It allows users to create text pastes and share them via a unique URL, with optional
expiry time (TTL) and maximum view limits.

## Features
- Create a text paste
- Generate a shareable URL for each paste
- Optional time-based expiry (TTL)
- Optional maximum view count
- Paste becomes unavailable after expiry or view limit
- Health check endpoint for service verification

## Tech Stack
- Next.js (App Router)
- Prisma ORM
- PostgreSQL
- Node.js

## Project Setup (Run Locally)

1. Clone the repository
git clone <your-repository-url>
cd pastebin-lite

2. Install dependencies
npm install

3. Environment configuration
Create a .env file in the root directory using the following format:

DATABASE_URL=your_postgres_connection_string

4. Setup database schema
npx prisma generate
npx prisma db push

5. Run the application
npm run dev

The application will be available at:
http://localhost:3000

## API Endpoints

Create a paste
POST /api/pastes

Request body (JSON):
{
  "content": "Hello World",
  "ttl_seconds": 60,
  "max_views": 3
}

Response:
{
  "id": "<paste_id>",
  "url": "/p/<paste_id>"
}

Health check
GET /api/healthz

Response:
{
  "ok": true
}

## Paste Access
GET /p/{pasteId}

The paste will return a 404 response if:
- The paste ID does not exist
- The paste has expired
- The maximum view count has been exceeded

## Notes
- Prisma with PostgreSQL is used for persistence
- The application follows the requirements specified in the take-home assignment
- UI styling is kept minimal as functionality is the primary focus
