from models.Event import Event
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

events = Blueprint("events", __name__)

@events.route("/events/create", methods=["POST"])
@jwt_required()
def create_event():
    data = request.get_json()
    name = data.get("name")
    start_time = data.get("start_time")
    end_time = data.get("end_time")
    description = data.get("description")
    location = data.get("location")
    Event(name, description, start_time, end_time, location)

    return jsonify({"msg": "Event created successfully"})

