import sqlite3

from flask import jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from database import get_connection, row_to_dict


def register():
    data = request.get_json(silent=True) or {}
    required_fields = ["name", "email", "password"]
    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        return jsonify({
            "error": "Missing required registration fields.",
            "fields": missing_fields
        }), 400

    password_hash = generate_password_hash(data["password"])

    try:
        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO users (name, email, password_hash)
                VALUES (?, ?, ?)
                """,
                (data["name"], data["email"].lower(), password_hash)
            )
            connection.commit()
    except sqlite3.IntegrityError:
        return jsonify({
            "error": "A user with this email already exists."
        }), 409

    session["user_id"] = cursor.lastrowid
    return jsonify({
        "id": cursor.lastrowid,
        "name": data["name"],
        "email": data["email"].lower()
    }), 201


def login():
    data = request.get_json(silent=True) or {}

    with get_connection() as connection:
        user = connection.execute(
            """
            SELECT id, name, email, password_hash, role
            FROM users
            WHERE email = ?
            """,
            (data.get("email", "").lower(),)
        ).fetchone()

    if not user or not check_password_hash(user["password_hash"], data.get("password", "")):
        return jsonify({
            "error": "Invalid email or password."
        }), 401

    session["user_id"] = user["id"]
    safe_user = row_to_dict(user)
    safe_user.pop("password_hash", None)
    return jsonify(safe_user)


def logout():
    session.clear()
    return jsonify({
        "message": "Logged out successfully."
    })


def current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "user": None
        })

    with get_connection() as connection:
        user = connection.execute(
            """
            SELECT id, name, email, role
            FROM users
            WHERE id = ?
            """,
            (user_id,)
        ).fetchone()

    return jsonify({
        "user": row_to_dict(user)
    })
