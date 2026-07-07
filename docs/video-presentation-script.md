# Collectify Video Presentation Script

## Target Length

5 to 8 minutes.

## Timed Demo Plan

| Time | Section | What To Show |
| ---- | ------- | ------------ |
| 0:00-0:45 | Introduction | Project name, problem and target users |
| 0:45-1:45 | Homepage | Auction cards, Nepali collectibles and image layout |
| 1:45-2:45 | Browsing | Search, category filter, rarity filter and sorting |
| 2:45-3:45 | User Features | Product detail modal, wishlist and create listing form |
| 3:45-4:45 | Authentication | Login/register tabs, validation and admin demo account |
| 4:45-5:45 | Backend | Flask folders, API routes and SQLite database tables |
| 5:45-6:45 | Admin | Protected stats, admin messages and listing management |
| 6:45-7:30 | Documentation | Report, API docs, testing checklist and GitHub commits |
| 7:30-8:00 | Closing | Limitations and future improvements |

## 1. Opening

Hello, my project is called Collectify. It is a rare collectible auction web application focused on Nepali cultural and historical collectible items.

## 2. Problem Explanation

Collectors need a simple platform where they can browse rare items, understand rarity, compare prices and save items they are interested in. Collectify solves this by providing a focused collectible marketplace interface.

## 3. Technologies

The frontend uses HTML, CSS and JavaScript. The backend uses Flask with SQLite for database storage. Git and GitHub are used to track project progress through regular commits.

## 4. Frontend Demo

Show the home page, product cards, search, category filter, rarity filter, sorting, product detail modal, wishlist and create listing form.

Suggested demo order:

1. Search for `coin`.
2. Filter by `Books`.
3. Sort by `Highest Bid`.
4. Open one product detail modal.
5. Add one item to the wishlist.
6. Create a listing with an optional image URL.

## 5. Authentication Demo

Open the login page. Show the Login and Register tabs, forgot password placeholder and account switch prompts.

Use the admin demo account:

```text
Email: admin@collectify.local
Password: Admin12345
```

## 6. Backend Explanation

Explain that Flask provides API routes for authentication, listings, wishlist and admin stats. SQLite stores users, listings and wishlist data.

## 7. Admin Demo

Show the admin panel with total users, total listings and wishlist saves. Explain that this supports coursework-level admin monitoring.

## 8. Testing Explanation

Mention that the app was manually tested for search, filters, sorting, wishlist, login/register UI, listing create, listing edit and delete flows.

## 9. Limitations

Password reset is a placeholder, image upload uses image URLs instead of uploaded files, and payment/bidding history is not included yet.

## 10. Closing

Collectify demonstrates a full-stack coursework project with frontend design, backend API routes, database storage, documentation and version control.

## Recording Checklist

- Show GitHub repository and commits.
- Show frontend homepage.
- Demonstrate search and filters.
- Demonstrate wishlist.
- Demonstrate login/register page.
- Explain backend folder.
- Explain database tables.
- End with future improvements.
