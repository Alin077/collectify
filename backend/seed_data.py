DEFAULT_LISTINGS = [
    {
        "name": "Vintage Thangka Painting (Hand-Painted, 1960s)",
        "category": "Religious Art",
        "rarity": "Extremely Rare",
        "price": 85000,
        "seller": "Buddha Art Gallery",
        "rating": 4.9,
        "time_left": 180,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Contemporary%20Thangka%20Painting%2C%20c%201980%2C%20Nepal%2C%20V%26A%20Museum%2C%20London.jpg"
    },
    {
        "name": "King Tribhuvan Silver Mohar Coin (1950)",
        "category": "Coins",
        "rarity": "Very Rare",
        "price": 25000,
        "seller": "Himalayan Collectibles",
        "rating": 4.8,
        "time_left": 120,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/5%20Paise%20coin%20of%20the%20Nepal%201943%20featuring%20the%20Buddhist%20Treasure%20Vase%2C%20from%20the%20reign%20of%20Tribhuvana%20Bir%20Bikram.jpg"
    },
    {
        "name": "Old Kathmandu Postcard Collection (1920-1940)",
        "category": "Photographs",
        "rarity": "Very Rare",
        "price": 18000,
        "seller": "Retro Nepal Collectibles",
        "rating": 4.6,
        "time_left": 240,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Kathmandu%20Market%201920.jpg"
    },
    {
        "name": "Gurkha Regiment Service Medal (WWII Era)",
        "category": "Memorabilia",
        "rarity": "Extremely Rare",
        "price": 95000,
        "seller": "Gurkha Heritage House",
        "rating": 4.9,
        "time_left": 90,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Nepal%20Medal%2C%201814-1816.jpg"
    },
    {
        "name": "First Edition Muna Madan (1936 Print)",
        "category": "Books",
        "rarity": "Very Rare",
        "price": 40000,
        "seller": "Nepal Book Collectors",
        "rating": 4.7,
        "time_left": 300,
        "image": "https://covers.openlibrary.org/b/olid/OL25422917M-L.jpg"
    }
]


def seed_default_listings(connection):
    listing_count = connection.execute("SELECT COUNT(*) FROM listings").fetchone()[0]

    if listing_count:
        return

    connection.executemany(
        """
        INSERT INTO listings (name, category, rarity, price, seller, rating, time_left, image)
        VALUES (:name, :category, :rarity, :price, :seller, :rating, :time_left, :image)
        """,
        DEFAULT_LISTINGS
    )
