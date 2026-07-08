# Database Schema

Collectify uses SQLite for local coursework storage. The database is created automatically when the Flask backend starts.

## Tables

### users

Stores registered user accounts.

| Column | Type | Purpose |
| ------ | ---- | ------- |
| `id` | INTEGER | Primary key |
| `name` | TEXT | User display name |
| `email` | TEXT | Unique login email |
| `password_hash` | TEXT | Hashed password |
| `role` | TEXT | `customer` or `admin` |
| `created_at` | TEXT | Account creation timestamp |

### listings

Stores collectible auction listings.

| Column | Type | Purpose |
| ------ | ---- | ------- |
| `id` | INTEGER | Primary key |
| `name` | TEXT | Collectible item name |
| `category` | TEXT | Item category such as Books, Coins or Religious Art |
| `rarity` | TEXT | Rarity level |
| `price` | INTEGER | Current bid price in NPR |
| `seller` | TEXT | Seller or gallery name |
| `rating` | REAL | Seller rating |
| `time_left` | INTEGER | Auction time left in minutes |
| `image` | TEXT | Image URL |
| `created_at` | TEXT | Listing creation timestamp |

### wishlist

Stores saved listings for logged-in users.

| Column | Type | Purpose |
| ------ | ---- | ------- |
| `id` | INTEGER | Primary key |
| `user_id` | INTEGER | Linked user |
| `listing_id` | INTEGER | Linked listing |
| `created_at` | TEXT | Wishlist save timestamp |

### bids

Stores bid records for auction listings.

| Column | Type | Purpose |
| ------ | ---- | ------- |
| `id` | INTEGER | Primary key |
| `listing_id` | INTEGER | Linked listing |
| `bidder_name` | TEXT | Name of the bidder |
| `amount` | INTEGER | Bid amount in NPR |
| `created_at` | TEXT | Bid creation timestamp |

## Relationships

- One user can save many wishlist items.
- One listing can appear in many users' wishlists.
- One listing can have many bids.
- `wishlist.user_id` references `users.id`.
- `wishlist.listing_id` references `listings.id`.
- `bids.listing_id` references `listings.id`.

## Seed Data

The backend seeds:

- Nepali collectible listings for the auction demo.
- One admin account for protected dashboard and listing management tests.

Admin account:

```text
Email: admin@collectify.local
Password: Admin12345
```
