from flask import Blueprint

from controllers import auth_controller


auth_routes = Blueprint("auth_routes", __name__, url_prefix="/api/auth")


@auth_routes.post("/register")
def register():
    return auth_controller.register()


@auth_routes.post("/login")
def login():
    return auth_controller.login()


@auth_routes.post("/logout")
def logout():
    return auth_controller.logout()


@auth_routes.get("/me")
def current_user():
    return auth_controller.current_user()
