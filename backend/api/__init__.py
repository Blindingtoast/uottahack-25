from flask import Blueprint
from .data import bp as data_bp
from .uploads import bp as uploads_bp
from .accounts import accounts
from .qr_handler import QRHandler

# All api calls are redirected to this module
api_bp = Blueprint("api", __name__, url_prefix="/api")

api_bp.register_blueprint(data_bp)
api_bp.register_blueprint(uploads_bp)
api_bp.register_blueprint(accounts)
api_bp.register_blueprint(QRHandler)

