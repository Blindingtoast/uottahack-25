import atexit
import threading
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from datetime import datetime
from models.Activity import Activity
from models.ActivityEntry import ActivityEntry
from models.PersonActivityMessage import PersonActivityMessage
from db import db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_current_activities():
    return Activity.query.filter(Activity.start_time <= datetime.now(), Activity.end_time >= datetime.now()).all()

def check_activities(app):
    logger.info("Checking activities")
    try:
        with app.app_context():
            print("ALL CURRENT:", get_current_activities())
            for activity in get_current_activities():
                capacities = activity.room_capacities_remaining()
                for key, value in capacities.items():
                    if value > 0:
                        people = ActivityEntry.choose_people(activity.id, value)
                        logger.info(people)
                        for person in people:
                            db.session.add(PersonActivityMessage(activity_id=activity.id, person_id=person.id, room_id=key.id, message=f"You have been assigned to {activity.name} in {key.name}"))
            db.session.commit()
    except Exception as e:
        logger.error(f"Error checking activities: {e}")

def start_scheduler(app):
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        func=check_activities,
        trigger=IntervalTrigger(seconds=5),
        id='check_activities_job',
        name='Check activities every 1 minute',
        replace_existing=True,
        args=[app]
    )
    scheduler.start()
    logger.info("Scheduler started")

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
    logger.info("Scheduler shutdown registered")