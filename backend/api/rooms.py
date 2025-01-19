from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from db import db
from models.Room import Room

rooms = Blueprint("rooms", __name__)


@rooms.route("/rooms/create", methods=["POST"])
@jwt_required()
def create_room():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    capacity = data.get("capacity")
    room = Room(name, description, capacity, get_jwt_identity())
    db.session.add(room)
    db.session.commit()

    return jsonify({"msg": "Room created successfully", "id": room.id})


@rooms.route("/rooms/all", methods=["GET"])
@jwt_required()
def get_rooms():
    rooms = Room.query.filter_by(owner=get_jwt_identity()).all()
    return jsonify([room.to_json() for room in rooms])


@rooms.route("/rooms/<int:room_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def edit_room(room_id):
    room = Room.query.filter_by(id=room_id).first()
    if room:
        if request.method == "PUT":
            data = request.get_json()
            for key, value in data.items():
                setattr(room, key, value)
            db.session.commit()
            return jsonify({"msg": "Room updated successfully"})
        elif request.method == "DELETE":
            db.session.delete(room)
            db.session.commit()
            return jsonify({"msg": "Room deleted successfully"})
        elif request.method == "GET":
            return jsonify(room.to_json())
    else:
        return jsonify({"error": "Room not found"}), 404
