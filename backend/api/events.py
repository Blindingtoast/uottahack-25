from models.ActivityEntry import ActivityEntry
from models.PersonActivityMessage import PersonActivityMessage
from models.Event import Event
from models.Activity import Activity
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from models.People import People
from models.EventEntry import EventEntry

events = Blueprint("events", __name__)


@events.route("/events/create", methods=["POST"])
@jwt_required()
def create_event():
    data = request.get_json()
    name = data.get("name")
    start_time = data.get("start_date")
    end_time = data.get("end_date")
    description = data.get("description")
    location = data.get("location")
    event = Event(name, description, start_time, end_time, location, get_jwt_identity())
    db.session.add(event)
    db.session.commit()

    return jsonify({"msg": "Event created successfully", "id": event.id})


@events.route("/events/all", methods=["GET"])
@jwt_required()
def get_events():
    joined_event_ids = (
        db.session.query(EventEntry.event_id)
        .filter(EventEntry.person_id == get_jwt_identity())
        .subquery()
    )
    events = Event.query.filter(Event.id.notin_(joined_event_ids)).all()
    return jsonify([event.to_json() for event in events])


@events.route("/events/joined", methods=["GET"])
@jwt_required()
def get_joined_events():
    events = (
        Event.query.join(EventEntry)
        .filter(EventEntry.person_id == get_jwt_identity())
        .all()
    )
    return jsonify([event.to_json() for event in events])


@events.route("/events/<int:event_id>", methods=["GET"])
@jwt_required()
def get_event(event_id):
    event = Event.query.filter_by(id=event_id).first()
    person = People.query.filter_by(id=get_jwt_identity()).first()
    if event:
        return_dict = event.to_json()
        return_dict["registered"] = person.check_if_registered(event_id)
        return jsonify(return_dict)
    else:
        return jsonify({"error": "Event not found"}), 404


@events.route("/events/<int:event_id>/activities", methods=["GET"])
@jwt_required()
def get_activities(event_id):
    event = Event.query.filter_by(id=event_id).first()
    if event:
        activities = [activity.to_json() for activity in event.activities]
        for activity in activities:
            activity["registered"] = Activity.is_registered(
                activity["id"], get_jwt_identity()
            )
        return jsonify(activities)
    else:
        return jsonify({"error": "Event not found"}), 404


# endpoint for registering for an activity
@events.route("/activities/<int:activity_id>/register", methods=["PUT", "DELETE"])
@jwt_required()
def register_activity(activity_id):
    if request.method == "PUT":
        activity = Activity.query.filter_by(id=activity_id).first()
        person = People.query.filter_by(id=get_jwt_identity()).first()
        ActivityEntry.register(activity.id, person.id)
        return jsonify({"msg": "Registered successfully"})
    elif request.method == "DELETE":
        activity = Activity.query.filter_by(id=activity_id).first()
        person = People.query.filter_by(id=get_jwt_identity()).first()
        ActivityEntry.unregister(activity.id, person.id)
        return jsonify({"msg": "Unregistered successfully"})


@events.route("/events/<int:event_id>/create", methods=["POST"])
@jwt_required()
def create_activity(event_id):
    data = request.get_json()
    name = data.get("name")
    start_time = data.get("start_date")
    end_time = data.get("end_date")
    description = data.get("description")
    rooms = data.get("rooms")
    activity = Activity(name, description, start_time, end_time, event_id, rooms)
    db.session.add(activity)
    db.session.commit()

    return jsonify({"msg": "Activity created successfully", "name": name})


@events.route("/events/<int:event_id>/register", methods=["PUT", "DELETE"])
@jwt_required()
def register_event(event_id):
    if request.method == "PUT":
        event = Event.query.filter_by(id=event_id).first()
        person = People.query.filter_by(id=get_jwt_identity()).first()
        EventEntry.register(event.id, person.id)
        return jsonify({"msg": "Registered successfully"})
    elif request.method == "DELETE":
        event = Event.query.filter_by(id=event_id).first()
        person = People.query.filter_by(id=get_jwt_identity()).first()
        EventEntry.unregister(event.id, person.id)
        return jsonify({"msg": "Unregistered successfully"})


@events.route("/activities/<int:activity_id>/updates")
@jwt_required()
def activity_updates(activity_id):
    messages = (
        PersonActivityMessage.query.filter_by(activity_id=activity_id)
        .order_by(PersonActivityMessage.id.desc())  # Fetch the latest updates first
        .all()
    )
    if messages is not None:
        current_app.logger.info(f"sending updates for messages: {messages}")
    updates = [
        {
            "id": message.id,
            "message": message.message,
            "timestamp": message.timestamp,
        }
        for message in messages
    ]
    return updates


@events.route("/events/owned", methods=["GET"])
@jwt_required()
def get_owned_events():
    events = Event.query.filter_by(owner=get_jwt_identity()).all()
    return jsonify([event.to_json() for event in events])
