from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from models.People import People
from models.Event import Event
from models.Activity import Activity
from models.ActivityRoom import ActivityRoom
from models.Room import Room
from models.ActivityEntry import ActivityEntry

import json

QRHandler = Blueprint("qrhandler", __name__)

@QRHandler.route("/scanned", methods=["POST"])
@jwt_required()
def qr_scan():
    data = request.get_json()
    event = data.get("event")
    activity = data.get("activity")
    room = data.get("room")
    entered = data.get("entered")
    person = json.loads(data.get("qrData")[0].get("rawValue"))
    person = People.query.filter_by(id=person.get("people_id")).first()
    activity_entry = ActivityEntry.query.filter_by(activity_id=activity, person_id=person.id).first()
    if activity_entry:
        if entered:
            ActivityEntry.enter(activity, get_jwt_identity(), room)
            return jsonify({"msg": "Entered successfully"})
        else:
            ActivityEntry.exit(activity, get_jwt_identity())
            return jsonify({"msg": "Exited successfully"})
    return jsonify({"msg": "Activity not found"})

@QRHandler.route("/scanner/dropdowns", methods=["GET"])
@jwt_required()
def get_scanner_dropdowns():
    user = People.query.filter_by(id=get_jwt_identity()).first()
    events = Event.query.filter_by(owner=user.id).all()
    
    combinations = []
    for event in events:
        activities = Activity.query.filter_by(event=event.id).all()
        for activity in activities:
            rooms = Room.query.join(ActivityRoom).filter(ActivityRoom.activity_id == activity.id).all()
            for room in rooms:
                combinations.append({
                    "event": event.id,
                    "event_name": event.name,
                    "activity": activity.id,
                    "activity_name": activity.name,
                    "room": room.id,
                    "room_name": room.name
                })
    
    return jsonify(combinations)
