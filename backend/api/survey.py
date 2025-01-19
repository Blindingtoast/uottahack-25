from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from db import db
from models.People import People

survey = Blueprint("survey", __name__)

request_count = 0


@survey.route("/surveycompletion", methods=["GET"])
def check_request_status():
    global request_count
    activity_id = request.args.get("activity_id")
    person_id = request.args.get("person_id")

    if not activity_id or not person_id:
        return jsonify({"error": "Missing activity_id or person_id"}), 400

    # Increment the count for this key
    request_count += 1

    # Check if the count is 10
    if request_count >= 4:
        return {"completed": "complete"}
    else:
        return {"completed": "incomplete"}
