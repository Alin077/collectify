from flask import Blueprint

from controllers import wishlist_controller


wishlist_routes = Blueprint("wishlist_routes", __name__, url_prefix="/api/wishlist")


@wishlist_routes.get("")
def get_wishlist():
    return wishlist_controller.get_wishlist()


@wishlist_routes.post("")
def add_to_wishlist():
    return wishlist_controller.add_to_wishlist()


@wishlist_routes.delete("/<int:listing_id>")
def remove_from_wishlist(listing_id):
    return wishlist_controller.remove_from_wishlist(listing_id)
