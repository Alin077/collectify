# Collectify Project Report

## 1. Introduction

Collectify is a web application for browsing, listing and managing rare Nepali collectible auction items. The project focuses on cultural collectibles such as Thangka paintings, historic coins, postcards, medals, books and heritage memorabilia.

## 2. Problem Statement

Collectors often need a focused place to discover rare items, compare prices and save items of interest. General marketplaces do not clearly separate collectible categories, rarity levels, wishlist activity or admin review features.

## 3. Objectives

- Build a responsive frontend for rare collectible auctions.
- Provide search, category filtering, rarity filtering and sorting.
- Allow users to register, log in and maintain profile state.
- Store listings and wishlist data through a backend database.
- Provide admin summary data for coursework demonstration.

## 4. Scope

The current system covers a coursework-level prototype with frontend pages, Flask API routes and SQLite storage. Payment processing, real email password reset and production deployment are outside the current scope.

## 5. Technologies Used

- HTML for page structure
- CSS for responsive interface styling
- JavaScript for frontend interaction and API calls
- Flask for backend API routes
- SQLite for local database storage
- Git and GitHub for version control

## 6. Main Features

- Auction listing cards with product images
- Search, filter and sort controls
- Wishlist add/remove behavior
- Login and register page with tabs
- Listing creation form
- Listing edit and remove actions
- Backend routes for authentication, listings, wishlist and admin stats

## 7. Database Design

The SQLite database contains three main tables:

- `users`: stores user account details and roles.
- `listings`: stores collectible auction item data.
- `wishlist`: stores saved listing relationships for logged-in users.

## 8. Screenshots To Include

Add screenshots for the final submitted report:

| Screenshot | Purpose |
| ---------- | ------- |
| Homepage | Shows auction cards, filters and hero section |
| Product Detail Modal | Shows detailed collectible information |
| Wishlist | Shows saved collectible listings |
| Login/Register Page | Shows authentication UI with tabs |
| Admin Panel | Shows protected dashboard totals |
| Create Listing Form | Shows how users add new listings |
| Mobile View | Shows responsive layout |

## 9. Testing Summary

Manual testing should cover:

- Homepage loading
- Search, filter and sorting
- Wishlist add/remove
- Login/register validation
- Logout behavior
- Listing creation
- Bid editing
- Listing removal
- Admin-only protected routes
- Mobile responsiveness

The full testing table is maintained in `docs/manual-testing-checklist.md`.

## 10. Limitations

- Password reset is currently a placeholder.
- Image uploads are represented by URLs/default category images.
- Payment and bidding history are not included yet.
- Admin actions are role-protected, but a complete production admin dashboard is not included yet.
- Automated tests are not included yet.

## 11. Future Enhancements

- Add bidding history table.
- Add real image upload support.
- Add email-based password reset.
- Add automated backend route tests.
- Deploy frontend and backend online.

## 12. Conclusion

Collectify demonstrates a complete coursework direction with frontend UI, backend APIs, database storage, authentication flow and admin summary features. The project can be further extended into a production-ready collectible marketplace.
