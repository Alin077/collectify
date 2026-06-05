from flask import Blueprint, jsonify, request

from database import get_connection, row_to_dict


listing_routes = Blueprint("listing_routes", __name__, url_prefix="/api/listings")


@listing_routes.get("")
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


@listing_routes.post("")
def create_listing():
    data = request.get_json(silent=True) or {}
    required_fields = ["name", "category", "rarity", "price", "seller"]
    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        return jsonify({
            "error": "Missing required listing fields.",
            "fields": missing_fields
        }), 400

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
                int(data["price"]),
                data["seller"],
                float(data.get("rating", 5)),
                int(data.get("time_left", 300)),
                data.get("image", "")
            )
        )
        connection.commit()

    return jsonify({
        "id": cursor.lastrowid,
        "message": "Listing created successfully."
    }), 201
