from flask import Blueprint

from controllers import admin_controller


admin_routes = Blueprint("admin_routes", __name__, url_prefix="/api/admin")


@admin_routes.get("/stats")
def get_dashboard_stats():
    return admin_controller.get_dashboard_stats()


@admin_routes.get("/listings")
def get_admin_listings():
    return admin_controller.get_admin_listings()


@admin_routes.get("/users")
def get_admin_users():
    return admin_controller.get_admin_users()
