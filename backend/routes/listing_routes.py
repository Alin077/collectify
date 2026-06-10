from flask import Blueprint

from controllers import listing_controller


listing_routes = Blueprint("listing_routes", __name__, url_prefix="/api/listings")


@listing_routes.get("")
def get_listings():
    return listing_controller.get_listings()


@listing_routes.post("")
def create_listing():
    return listing_controller.create_listing()


@listing_routes.delete("/<int:listing_id>")
def delete_listing(listing_id):
    return listing_controller.delete_listing(listing_id)
