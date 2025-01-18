from flask import Blueprint

bp = Blueprint("data", __name__)


@bp.route('/data')
def get_data():
    return {"message": "I'm living in your walls"}
