# Collectify

Collectify is a coursework web app for browsing and managing rare collectible auctions. The current version combines a HTML, CSS and JavaScript frontend with a Flask API for listings and account access.

## Current Features

- Live auction item cards loaded from the backend API
- Search by collectible name
- Filter by category and rarity
- Wishlist actions
- Profile state from login/register data
- Listing creation form with backend save support
- Optional image URL support for new listings
- In-app about section for coursework demo context
- Admin summary panel
- SQLite seed data for demo collectible auctions

## Local Setup And Run Guide

Open PowerShell in the project folder:

```powershell
cd F:\Collectify\web-app
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start the Flask backend:

```powershell
python backend/app.py
```

Open `index.html` in the browser for the auction page, or open `auth.html` to register and log in.

The frontend expects the API at:

```text
http://127.0.0.1:5000/api
```

If the backend is not running, the auction page falls back to demo listings so the interface can still be previewed.

## Demo Accounts

The backend seeds one admin account for coursework testing:

```text
Email: admin@collectify.local
Password: Admin12345
```

Use this account to test protected admin actions such as backend stats, bid updates and listing removal.

## Demo Flow

1. Start the Flask backend.
2. Open `index.html`.
3. Search, filter and sort auction listings.
4. Open `auth.html` and log in as the seeded admin.
5. Return to the auction page and check admin stats.
6. Add a listing, edit a bid, watch an item and remove a wishlist item.

## Coursework Submission Notes

- Source code should be pushed to GitHub.
- `docs/project-report.md` contains the report draft.
- `docs/api-documentation.md` explains backend routes.
- `docs/manual-testing-checklist.md` should be updated during final testing.
- `docs/video-presentation-script.md` can be used for the recorded walkthrough.

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

- Complete manual testing and update the testing checklist
- Add screenshots to the report
- Record the video presentation
- Push final commits to GitHub

## Image Sources

- Thangka, coin, Kathmandu market and medal images use public Wikimedia Commons file links.
- Muna Madan cover image uses Open Library cover data.
