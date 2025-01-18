from flask import Blueprint, request, jsonify
from db import db
from models.People import People

QRHandler = Blueprint("qrhandler", __name__)

@QRHandler.route("/qr_scan", methods=["POST"])
def qr_scan():
    data = request.get_json()
    qr_code = data.get("qr_code")
    person_id = data.get("person_id")
    person = People.query.filter_by(id=person_id).first()
    if person:
        person.qr_scan(qr_code)
        return jsonify(person.to_json())
    else:
        return jsonify({"error": "Person not found"}), 404