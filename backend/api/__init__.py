from flask import Blueprint
from .scanned import bp as scanned_bp
from .accounts import accounts
from .qr_handler import QRHandler

# All api calls are redirected to this module
api_bp = Blueprint("api", __name__, url_prefix="/api")

api_bp.register_blueprint(scanned_bp)
api_bp.register_blueprint(accounts)
api_bp.register_blueprint(QRHandler)
