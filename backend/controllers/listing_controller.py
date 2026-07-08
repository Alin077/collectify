from flask import jsonify, request, session

from controllers.admin_controller import require_admin
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


def update_listing(listing_id):
    if not require_admin():
        return jsonify({
            "error": "Admin access is required to update listings."
        }), 403

    data = request.get_json(silent=True) or {}
    allowed_fields = ["name", "category", "rarity", "price", "seller", "rating", "time_left", "image"]
    updates = {field: data[field] for field in allowed_fields if field in data}

    if not updates:
        return jsonify({
            "error": "No listing fields were provided for update."
        }), 400

    if "price" in updates:
        try:
            updates["price"] = int(updates["price"])
        except (TypeError, ValueError):
            return jsonify({
                "error": "Price must be a whole number."
            }), 400

        if updates["price"] <= 0:
            return jsonify({
                "error": "Price must be greater than zero."
            }), 400

    if "rating" in updates:
        updates["rating"] = float(updates["rating"])

    if "time_left" in updates:
        updates["time_left"] = int(updates["time_left"])

    assignments = ", ".join([f"{field} = ?" for field in updates])
    values = list(updates.values())

    with get_connection() as connection:
        listing = connection.execute(
            """
            SELECT id
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
            f"""
            UPDATE listings
            SET {assignments}
            WHERE id = ?
            """,
            (*values, listing_id)
        )
        connection.commit()
        updated_listing = connection.execute(
            """
            SELECT id, name, category, rarity, price, seller, rating, time_left, image
            FROM listings
            WHERE id = ?
            """,
            (listing_id,)
        ).fetchone()

    return jsonify({
        "listing": row_to_dict(updated_listing),
        "message": "Listing updated successfully."
    })


def get_bid_history(listing_id):
    with get_connection() as connection:
        bids = connection.execute(
            """
            SELECT id, listing_id, bidder_name, amount, created_at
            FROM bids
            WHERE listing_id = ?
            ORDER BY amount DESC, created_at DESC
            """,
            (listing_id,)
        ).fetchall()

    return jsonify([row_to_dict(bid) for bid in bids])


def place_bid(listing_id):
    data = request.get_json(silent=True) or {}
    bidder_name = data.get("bidder_name") or "Guest Bidder"

    try:
        amount = int(data.get("amount", 0))
    except (TypeError, ValueError):
        return jsonify({
            "error": "Bid amount must be a whole number."
        }), 400

    with get_connection() as connection:
        listing = connection.execute(
            """
            SELECT id, price
            FROM listings
            WHERE id = ?
            """,
            (listing_id,)
        ).fetchone()

        if not listing:
            return jsonify({
                "error": "Listing was not found."
            }), 404

        if amount <= listing["price"]:
            return jsonify({
                "error": "Bid must be higher than the current price."
            }), 400

        user_id = session.get("user_id")

        if user_id:
            user = connection.execute(
                """
                SELECT name
                FROM users
                WHERE id = ?
                """,
                (user_id,)
            ).fetchone()
            bidder_name = user["name"] if user else bidder_name

        cursor = connection.execute(
            """
            INSERT INTO bids (listing_id, bidder_name, amount)
            VALUES (?, ?, ?)
            """,
            (listing_id, bidder_name, amount)
        )
        connection.execute(
            """
            UPDATE listings
            SET price = ?
            WHERE id = ?
            """,
            (amount, listing_id)
        )
        connection.commit()
        bid = connection.execute(
            """
            SELECT id, listing_id, bidder_name, amount, created_at
            FROM bids
            WHERE id = ?
            """,
            (cursor.lastrowid,)
        ).fetchone()
        updated_listing = connection.execute(
            """
            SELECT id, name, category, rarity, price, seller, rating, time_left, image
            FROM listings
            WHERE id = ?
            """,
            (listing_id,)
        ).fetchone()

    return jsonify({
        "bid": row_to_dict(bid),
        "listing": row_to_dict(updated_listing),
        "message": "Bid placed successfully."
    }), 201


def delete_listing(listing_id):
    if not require_admin():
        return jsonify({
            "error": "Admin access is required to remove listings."
        }), 403

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
