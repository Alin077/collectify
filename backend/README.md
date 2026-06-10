# Collectify Backend

This folder contains the Flask backend for the Collectify coursework project.

## Responsibilities

- Serve API routes for authentication
- Store collectible listings in SQLite
- Manage wishlist records
- Support basic admin actions

## Local Run

```powershell
pip install -r requirements.txt
python backend/app.py
```

The app creates `backend/collectify.db` automatically and seeds demo listings when the listings table is empty.

## API Routes

- `GET /api/listings` returns auction listings.
- `POST /api/listings` creates a listing with `name`, `category`, `rarity`, `price` and `seller`.
- `POST /api/auth/register` creates an account and starts a session.
- `POST /api/auth/login` starts a session for an existing account.
- `GET /api/auth/me` returns the current session user.
- `POST /api/auth/logout` clears the current session.
- `GET /api/wishlist` returns the current user's watched listings.
- `POST /api/wishlist` adds a listing with `listing_id`.
- `DELETE /api/wishlist/<listing_id>` removes a watched listing.
