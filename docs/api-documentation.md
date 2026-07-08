# Collectify API Documentation

Base URL:

```text
http://127.0.0.1:5000/api
```

## Authentication

### Register

```text
POST /auth/register
```

Body:

```json
{
  "name": "Student User",
  "email": "student@example.com",
  "password": "Password123"
}
```

Creates a user account and starts a session.

### Login

```text
POST /auth/login
```

Body:

```json
{
  "email": "student@example.com",
  "password": "Password123"
}
```

Returns the logged-in user without the password hash.

### Current User

```text
GET /auth/me
```

Returns the current logged-in user or `null`.

### Logout

```text
POST /auth/logout
```

Clears the current session.

## Listings

### Get Listings

```text
GET /listings
```

Returns all collectible listings.

### Create Listing

```text
POST /listings
```

Body:

```json
{
  "name": "Rare Collectible",
  "category": "Books",
  "rarity": "Very Rare",
  "price": 40000,
  "seller": "Nepal Book Collectors"
}
```

Creates a new listing.

### Update Listing

```text
PUT /listings/<listing_id>
```

Admin-only route for updating listing fields such as price, name, category, rarity or image.

### Delete Listing

```text
DELETE /listings/<listing_id>
```

Admin-only route for removing fake or invalid listings.

### Get Bid History

```text
GET /listings/<listing_id>/bids
```

Returns bid records for a listing ordered by highest bid.

### Place Bid

```text
POST /listings/<listing_id>/bids
```

Body:

```json
{
  "amount": 96000,
  "bidder_name": "Student User"
}
```

Creates a bid record and updates the listing current price.

## Wishlist

### Get Wishlist

```text
GET /wishlist
```

Returns wishlist items for the logged-in user.

### Add Wishlist Item

```text
POST /wishlist
```

Body:

```json
{
  "listing_id": 1
}
```

Adds a listing to the logged-in user's wishlist.

### Remove Wishlist Item

```text
DELETE /wishlist/<listing_id>
```

Removes a listing from the logged-in user's wishlist.

## Admin

### Dashboard Stats

```text
GET /admin/stats
```

Admin-only route that returns total users, total listings and total wishlist saves.
