from flask import Blueprint
from .accounts import accounts
from .qr_handler import QRHandler
from .events import events
from .rooms import rooms
from .survey import survey
from .dev import dev

# All api calls are redirected to this module
api_bp = Blueprint("api", __name__, url_prefix="/api")

api_bp.register_blueprint(accounts)
api_bp.register_blueprint(QRHandler)
api_bp.register_blueprint(events)
api_bp.register_blueprint(rooms)
api_bp.register_blueprint(survey)
api_bp.register_blueprint(dev)
