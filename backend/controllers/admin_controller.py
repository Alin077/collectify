from flask import jsonify, session

from database import get_connection


def require_admin():
    user_id = session.get("user_id")

    if not user_id:
        return None

    with get_connection() as connection:
        user = connection.execute(
            """
            SELECT id, role
            FROM users
            WHERE id = ?
            """,
            (user_id,)
        ).fetchone()

    if user and user["role"] == "admin":
        return user

    return None


def get_dashboard_stats():
    if not require_admin():
        return jsonify({
            "error": "Admin access is required."
        }), 403

    with get_connection() as connection:
        users_count = connection.execute("SELECT COUNT(*) FROM users").fetchone()[0]
        listings_count = connection.execute("SELECT COUNT(*) FROM listings").fetchone()[0]
        wishlist_count = connection.execute("SELECT COUNT(*) FROM wishlist").fetchone()[0]

    return jsonify({
        "users": users_count,
        "listings": listings_count,
        "wishlist_items": wishlist_count
    })


def get_admin_listings():
    if not require_admin():
        return jsonify({
            "error": "Admin access is required."
        }), 403

    with get_connection() as connection:
        listings = connection.execute(
            """
            SELECT id, name, category, rarity, price, seller, created_at
            FROM listings
            ORDER BY created_at DESC
            """
        ).fetchall()

    return jsonify([dict(listing) for listing in listings])


def get_admin_users():
    if not require_admin():
        return jsonify({
            "error": "Admin access is required."
        }), 403

    with get_connection() as connection:
        users = connection.execute(
            """
            SELECT id, name, email, role, created_at
            FROM users
            ORDER BY created_at DESC
            """
        ).fetchall()

    return jsonify([dict(user) for user in users])
