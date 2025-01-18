from flask import Blueprint
from .accounts import accounts
from .qr_handler import QRHandler
from .events import events

# All api calls are redirected to this module
api_bp = Blueprint("api", __name__, url_prefix="/api")

api_bp.register_blueprint(accounts)
api_bp.register_blueprint(QRHandler)
api_bp.register_blueprint(events)
