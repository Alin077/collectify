# Collectify

Collectify is a coursework web app for browsing and managing rare collectible auctions. The current version combines a HTML, CSS and JavaScript frontend with a Flask API for listings and account access.

## Current Features

- Live auction item cards loaded from the backend API
- Search by collectible name
- Filter by category and rarity
- Wishlist actions
- Profile state from login/register data
- Listing creation form with backend save support
- Admin summary panel
- SQLite seed data for demo collectible auctions

## Local Setup

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start the Flask backend:

```powershell
python backend/app.py
```

Open `index.html` in the browser for the auction page, or open `auth.html` to register and log in. The frontend expects the API at `http://127.0.0.1:5000/api`.

If the backend is not running, the auction page falls back to demo listings so the interface can still be previewed.

## Suggested Structure

```text
web-app/
  index.html
  style.css
  app.js

backend/
  app.py
  config.py
  database.py
  controllers/
  routes/
  models/
```

## Next Steps

- Add persistent wishlist routes
- Add admin controls for listings and users
- Show signed-in-only actions for listing creation
- Add automated backend route tests

## Image Sources

- Thangka, coin, Kathmandu market and medal images use public Wikimedia Commons file links.
- Muna Madan cover image uses Open Library cover data.
