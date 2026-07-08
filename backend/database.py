import sqlite3
from contextlib import closing
from werkzeug.security import generate_password_hash

from config import DATABASE_PATH
from seed_data import DEFAULT_ADMIN, seed_default_admin, seed_default_listings


SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    rarity TEXT NOT NULL,
    price INTEGER NOT NULL,
    seller TEXT NOT NULL,
    rating REAL NOT NULL DEFAULT 5,
    time_left INTEGER NOT NULL DEFAULT 300,
    image TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    listing_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    UNIQUE(user_id, listing_id)
);

CREATE TABLE IF NOT EXISTS bids (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    listing_id INTEGER NOT NULL,
    bidder_name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);
"""


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    with closing(get_connection()) as connection:
        connection.executescript(SCHEMA)
        seed_default_listings(connection)
        seed_default_admin(connection, generate_password_hash(DEFAULT_ADMIN["password"]))
        connection.commit()


def row_to_dict(row):
    return dict(row) if row else None
