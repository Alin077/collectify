from flask import jsonify, request

from database import get_connection, row_to_dict


DEFAULT_IMAGES_BY_CATEGORY = {
    "Religious Art": "https://commons.wikimedia.org/wiki/Special:FilePath/Swayambhunath%20prayer%20wheels.jpg",
    "Coins": "https://commons.wikimedia.org/wiki/Special:FilePath:Nepalese%20coins.jpg",
    "Photographs": "https://commons.wikimedia.org/wiki/Special:FilePath:Kathmandu%20Durbar%20Square%20old%20photo.jpg",
    "Memorabilia": "https://commons.wikimedia.org/wiki/Special:FilePath:Prayer%20flags%20Nepal.jpg",
    "Books": "https://commons.wikimedia.org/wiki/Special:FilePath:Bookshelf.jpg"
}


def get_default_image(category):
    return DEFAULT_IMAGES_BY_CATEGORY.get(category, DEFAULT_IMAGES_BY_CATEGORY["Memorabilia"])


def get_listings():
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT id, name, category, rarity, price, seller, rating, time_left, image
            FROM listings
            ORDER BY created_at DESC
            """
        ).fetchall()

    return jsonify([row_to_dict(row) for row in rows])


def create_listing():
    data = request.get_json(silent=True) or {}
    required_fields = ["name", "category", "rarity", "price", "seller"]
    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        return jsonify({
            "error": "Missing required listing fields.",
            "fields": missing_fields
        }), 400

    try:
        price = int(data["price"])
    except (TypeError, ValueError):
        return jsonify({
            "error": "Price must be a whole number."
        }), 400

    if price <= 0:
        return jsonify({
            "error": "Price must be greater than zero."
        }), 400

    image = data.get("image") or get_default_image(data["category"])

    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO listings (name, category, rarity, price, seller, rating, time_left, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                data["name"],
                data["category"],
                data["rarity"],
                price,
                data["seller"],
                float(data.get("rating", 5)),
                int(data.get("time_left", 300)),
                image
            )
        )
        connection.commit()
        listing = connection.execute(
            """
            SELECT id, name, category, rarity, price, seller, rating, time_left, image
            FROM listings
            WHERE id = ?
            """,
            (cursor.lastrowid,)
        ).fetchone()

    return jsonify({
        "listing": row_to_dict(listing),
        "message": "Listing created successfully."
    }), 201


def delete_listing(listing_id):
    with get_connection() as connection:
        listing = connection.execute(
            """
            SELECT id, name
            FROM listings
            WHERE id = ?
            """,
            (listing_id,)
        ).fetchone()

        if not listing:
            return jsonify({
                "error": "Listing was not found."
            }), 404

        connection.execute(
            """
            DELETE FROM wishlist
            WHERE listing_id = ?
            """,
            (listing_id,)
        )
        connection.execute(
            """
            DELETE FROM listings
            WHERE id = ?
            """,
            (listing_id,)
        )
        connection.commit()

    return jsonify({
        "message": "Listing removed successfully.",
        "listing": row_to_dict(listing)
    })
