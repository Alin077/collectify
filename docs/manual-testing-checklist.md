# Manual Testing Checklist

Use this table while preparing the final coursework submission and video demo.

| Test ID | Feature | Test Steps | Expected Result | Status |
| ------- | ------- | ---------- | --------------- | ------ |
| T01 | Homepage load | Open `index.html` | Collectify homepage loads with auction cards | Pending |
| T02 | Search | Search for `coin` | Coin-related listings are shown | Pending |
| T03 | Category filter | Select `Books` | Only book listings are shown | Pending |
| T04 | Rarity filter | Select `Extremely Rare` | Only extremely rare listings are shown | Pending |
| T05 | Sorting | Select `Highest Bid` | Highest-priced listing appears first | Pending |
| T06 | Wishlist add | Click `Watch` on a listing | Listing appears in wishlist | Pending |
| T07 | Wishlist remove | Click `Remove` in wishlist | Listing is removed from wishlist | Pending |
| T08 | Product details | Click a listing card | Detail modal opens with listing data | Pending |
| T09 | Create listing | Add name, price, category and rarity | Listing appears in live auctions | Pending |
| T10 | Place bid | Click `Place Bid` and enter a higher price | Listing price updates and bid history records it | Pending |
| T11 | Remove listing | Click remove and confirm | Listing disappears from auction grid | Pending |
| T12 | Register validation | Register with short password | Validation message appears | Pending |
| T13 | Register success | Register with valid details | Account is created or backend message appears | Pending |
| T14 | Login validation | Login with invalid email | Validation message appears | Pending |
| T15 | Login success | Login with valid account | User name is saved and shown in profile | Pending |
| T16 | Logout | Click logout | Profile returns to guest state | Pending |
| T17 | Backend listings | Run Flask and open homepage | Listings load from `/api/listings` | Pending |
| T18 | Backend wishlist | Log in and watch item | Wishlist is saved through backend route | Pending |
| T19 | Admin stats | Log in as admin and load homepage | Admin stats show real backend totals | Pending |
| T20 | Mobile layout | Resize browser to mobile width | Layout stacks without overlapping | Pending |

## Admin Test Account

```text
Email: admin@collectify.local
Password: Admin12345
```

## Notes

- Mark each status as Passed or Failed after testing.
- Add screenshots of important passed tests to the final report if required.
- If Flask is not running, frontend fallback data should still allow the homepage demo.
