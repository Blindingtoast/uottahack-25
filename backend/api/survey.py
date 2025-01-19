from flask import Blueprint, request, jsonify, current_app
import requests
import time
from models.PersonActivitySurvey import PersonActivitySurvey
from db import db

survey = Blueprint("survey", __name__)

last_update_time = time.time()


@survey.route("/surveycompletion", methods=["GET"])
def check_request_status():
    global last_update_time
    activity_id = request.args.get("activity_id")
    person_id = request.args.get("person_id")

    if not activity_id or not person_id:
        return jsonify({"error": "Missing activity_id or person_id"}), 400

    current_time = time.time()
    if current_time - last_update_time >= 10:
        last_update_time = current_time
        response = get_updates(
            current_app.config["COLLECTOR_ID"], current_app.config["ACCESS_TOKEN"]
        )
        current_app.logger.info(f"got back from surveymonkey: {response}")

    return get_completion_status(activity_id, person_id)


def get_completion_status(activity_id, person_id):
    if (
        PersonActivitySurvey.query.filter_by(
            person_id=person_id, activity_id=activity_id
        )
        is not None
    ):
        return {"completed": "complete"}
    else:
        return {"completed": "incomplete"}


def get_updates(collector_id, access_token, query_params=None):
    base_url = (
        f"https://api.surveymonkey.com/v3/collectors/{collector_id}/responses/bulk"
    )
    headers = {"Accept": "application/json", "Authorization": f"Bearer {access_token}"}
    try:
        response = requests.get(base_url, headers=headers, params=query_params)
        response.raise_for_status()
        for entry in response.json()["data"]:
            person_id = entry["custom_variables"]["person_id"]
            activity_id = entry["custom_variables"]["person_id"]
            db.session.merge(PersonActivitySurvey(person_id, activity_id, "completed"))
        db.session.commit()
        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        return None
