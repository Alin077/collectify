from flask import Flask, jsonify
from flask_cors import CORS

from config import SECRET_KEY
from database import init_db
from routes.auth_routes import auth_routes
from routes.listing_routes import listing_routes


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = SECRET_KEY
    CORS(app, supports_credentials=True)
    init_db()
    app.register_blueprint(auth_routes)
    app.register_blueprint(listing_routes)

    @app.get("/")
    def health_check():
        return jsonify({
            "app": "Collectify",
            "status": "running"
        })

    return app


if __name__ == "__main__":
    create_app().run(debug=True)
