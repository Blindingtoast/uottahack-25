from flask import Blueprint
from .scanned import bp as scanned_bp
# All api calls are redirected to this module
api_bp = Blueprint("api", __name__, url_prefix="/api")

api_bp.register_blueprint(scanned_bp)
