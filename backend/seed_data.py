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
    },
    {
        "name": "Handmade Paubha Painting of Tara",
        "category": "Religious Art",
        "rarity": "Very Rare",
        "price": 62000,
        "seller": "Patan Heritage Arts",
        "rating": 4.8,
        "time_left": 210,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Paubha%20of%20Vasudhara.jpg"
    },
    {
        "name": "Panchaloha Offering Bowl Set",
        "category": "Memorabilia",
        "rarity": "Very Rare",
        "price": 32000,
        "seller": "Bhaktapur Antique House",
        "rating": 4.5,
        "time_left": 260,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Bronze%20ritual%20vessels%20Nepal.jpg"
    },
    {
        "name": "Rana Era Family Photograph Album",
        "category": "Photographs",
        "rarity": "Extremely Rare",
        "price": 78000,
        "seller": "Archive Nepal Studio",
        "rating": 4.9,
        "time_left": 75,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Chandra%20Shumsher%20Jang%20Bahadur%20Rana.jpg"
    },
    {
        "name": "Early Nepal Postal Stamp Set",
        "category": "Memorabilia",
        "rarity": "Very Rare",
        "price": 15500,
        "seller": "Kathmandu Philately Club",
        "rating": 4.6,
        "time_left": 360,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Nepal%20stamp%201907.jpg"
    },
    {
        "name": "Palm Leaf Buddhist Manuscript Pages",
        "category": "Books",
        "rarity": "Extremely Rare",
        "price": 120000,
        "seller": "Himalayan Manuscript Trust",
        "rating": 5,
        "time_left": 45,
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Palm-leaf%20manuscript.jpg"
    }
]


def seed_default_listings(connection):
    existing_names = {
        row["name"]
        for row in connection.execute("SELECT name FROM listings").fetchall()
    }
    new_listings = [
        listing
        for listing in DEFAULT_LISTINGS
        if listing["name"] not in existing_names
    ]

    if not new_listings:
        return

    connection.executemany(
        """
        INSERT INTO listings (name, category, rarity, price, seller, rating, time_left, image)
        VALUES (:name, :category, :rarity, :price, :seller, :rating, :time_left, :image)
        """,
        new_listings
    )
