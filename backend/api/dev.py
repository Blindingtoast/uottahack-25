from flask import Blueprint, current_app
from models.PersonActivityMessage import PersonActivityMessage
from models.PersonActivitySurvey import PersonActivitySurvey
from db import db
from time import sleep

dev = Blueprint("dev", __name__)

DEMO_USER = 1
DEMO_ACTIVITIES = [1, 2, 3, 4]
DEMO_LIVE_ACTIVITY = 1
DEMO_ROOM = 1


@dev.route("/devapi/demo")
def setup_demo():
    current_app.logger.info("Doing demo")
    for activity_id in DEMO_ACTIVITIES:
        dev_remove_update(DEMO_USER, activity_id, current_app.logger)
    dev_demo_messages(DEMO_LIVE_ACTIVITY, DEMO_USER, DEMO_ROOM, current_app.logger)
    return {"status": "complete"}


def dev_remove_update(person_id, activity_id, logger):
    record = PersonActivitySurvey.query.filter_by(
        person_id=person_id, activity_id=activity_id
    ).first()

    if record:
        logger.info(
            f"Deleting record for person_id={person_id}, activity_id={activity_id}"
        )
        db.session.delete(record)
        db.session.commit()


def dev_demo_messages(activity_id, person_id, room_id, logger):
    sleep(4)
    dev_craft_message(
        activity_id,
        person_id,
        room_id,
        "We're setting up the activity, hold tight!",
        logger,
    )
    sleep(15)
    dev_craft_message(
        activity_id, person_id, room_id, "We're ready for you to come by!", logger
    )
    sleep(30)
    dev_craft_message(
        activity_id,
        person_id,
        room_id,
        "We're closing early, make sure to drop by",
        logger,
    )
    sleep(50)
    dev_craft_message(activity_id, person_id, room_id, "Thanks for coming by!", logger)


def dev_craft_message(activity_id, person_id, room_id, message, logger):
    try:
        record = PersonActivityMessage.query.filter_by(
            activity_id=activity_id, person_id=person_id
        ).first()

        if record:
            logger.info(
                f"Deleting record for activity_id={activity_id}, person_id={person_id}"
            )
            db.session.delete(record)
            db.session.commit()
        else:
            logger.info(
                f"No record found for activity_id={activity_id}, person_id={person_id}"
            )

        new_message = PersonActivityMessage(
            person_id=person_id,
            activity_id=activity_id,
            room_id=room_id,
            message=message,
        )
        db.session.add(new_message)
        db.session.commit()

        logger.info(
            f"Message created for activity_id={activity_id}, person_id={person_id}"
        )
        return {"message": "Entry deleted and message created successfully."}, 200

    except Exception as e:
        # Handle and log errors
        logger.error(f"Error in delete_and_create_message: {e}")
        db.session.rollback()  # Rollback in case of error
        return {"error": "An error occurred while processing the request."}, 500
