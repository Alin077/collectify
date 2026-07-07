# Project Architecture Notes

Collectify is organized as a small full-stack coursework web application.

## Frontend Layer

Files:

```text
index.html
auth.html
style.css
app.js
```

Responsibilities:

- Display auction listings.
- Provide search, filter and sorting controls.
- Manage wishlist interactions.
- Show login/register screens.
- Send API requests to the backend.
- Show fallback demo data if the backend is offline.

## Backend Layer

Files:

```text
backend/app.py
backend/controllers/
backend/routes/
backend/database.py
backend/seed_data.py
```

Responsibilities:

- Start the Flask application.
- Register API route groups.
- Validate request data.
- Create, read, update and delete listings.
- Register, log in and log out users.
- Store wishlist records.
- Provide protected admin statistics.

## Database Layer

SQLite stores:

- Users
- Listings
- Wishlist records

The database is initialized automatically when Flask starts. Seed data creates default collectible listings and an admin demo account.

## Request Flow

```text
Browser page
  -> JavaScript fetch request
  -> Flask route
  -> Controller function
  -> SQLite database
  -> JSON response
  -> UI update
```

## Offline Demo Safety

The frontend contains fallback listing data. If Flask is not running, the homepage still displays collectible cards so the visual demo does not fail.

## Admin Protection

Admin-only backend actions check the logged-in session role before returning dashboard stats or modifying protected listings.

## Coursework Value

This structure demonstrates:

- Frontend UI design
- API integration
- Backend routing
- Database persistence
- Authentication flow
- Admin access control
- Documentation and testing preparation
