from flask import Blueprint, request, jsonify, current_app
import requests
import time

survey = Blueprint("survey", __name__)

last_update_time = time.time()


@survey.route("/surveycompletion", methods=["GET"])
def check_request_status():
    activity_id = request.args.get("activity_id")
    person_id = request.args.get("person_id")

    if not activity_id or not person_id:
        return jsonify({"error": "Missing activity_id or person_id"}), 400

    current_time = time.time()
    if current_time - last_action_time >= 10:
        last_action_time = current_time
        get_updates(current_app["COLLECTOR_ID"], current_app["ACCESS_TOKEN"])

    return get_completion_status(activity_id, person_id)


def get_completion_status(activity_id, person_id):
    return {"completed": "incomplete"}


def get_updates(collector_id, access_token, query_params=None):
    base_url = f"https://api.surveymonkey.com/v3/collectors/{collector_id}/responses"
    headers = {"Accept": "application/json", "Authorization": f"Bearer {access_token}"}
    try:
        response = requests.get(base_url, headers=headers, params=query_params)
        response.raise_for_status()  # Raise an error for bad status codes
        return response.json()  # Return the JSON response
    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        return None
