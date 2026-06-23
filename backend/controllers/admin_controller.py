from flask import jsonify

from database import get_connection


def get_dashboard_stats():
    with get_connection() as connection:
        users_count = connection.execute("SELECT COUNT(*) FROM users").fetchone()[0]
        listings_count = connection.execute("SELECT COUNT(*) FROM listings").fetchone()[0]
        wishlist_count = connection.execute("SELECT COUNT(*) FROM wishlist").fetchone()[0]

    return jsonify({
        "users": users_count,
        "listings": listings_count,
        "wishlist_items": wishlist_count
    })
