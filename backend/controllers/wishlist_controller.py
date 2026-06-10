import sqlite3

from flask import jsonify, request, session

from database import get_connection, row_to_dict


def get_wishlist():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "error": "Log in to view your wishlist."
        }), 401

    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT listings.id, listings.name, listings.category, listings.rarity,
                   listings.price, listings.seller, listings.rating, listings.time_left,
                   listings.image, wishlist.created_at AS watched_at
            FROM wishlist
            JOIN listings ON listings.id = wishlist.listing_id
            WHERE wishlist.user_id = ?
            ORDER BY wishlist.created_at DESC
            """,
            (user_id,)
        ).fetchall()

    return jsonify([row_to_dict(row) for row in rows])


def add_to_wishlist():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "error": "Log in to add wishlist items."
        }), 401

    data = request.get_json(silent=True) or {}
    listing_id = data.get("listing_id")

    if not listing_id:
        return jsonify({
            "error": "Listing id is required."
        }), 400

    try:
        listing_id = int(listing_id)
    except (TypeError, ValueError):
        return jsonify({
            "error": "Listing id must be a number."
        }), 400

    try:
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
                INSERT INTO wishlist (user_id, listing_id)
                VALUES (?, ?)
                """,
                (user_id, listing_id)
            )
            connection.commit()
    except sqlite3.IntegrityError:
        return jsonify({
            "message": "Listing is already in your wishlist."
        })

    return jsonify({
        "message": "Listing added to wishlist.",
        "listing": row_to_dict(listing)
    }), 201


def remove_from_wishlist(listing_id):
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "error": "Log in to update your wishlist."
        }), 401

    with get_connection() as connection:
        cursor = connection.execute(
            """
            DELETE FROM wishlist
            WHERE user_id = ? AND listing_id = ?
            """,
            (user_id, listing_id)
        )
        connection.commit()

    if cursor.rowcount == 0:
        return jsonify({
            "error": "Wishlist item was not found."
        }), 404

    return jsonify({
        "message": "Listing removed from wishlist."
    })
