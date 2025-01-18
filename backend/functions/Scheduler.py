import schedule
import time

from models.Activity import Activity
from db import db

def run_scheduler():
    schedule.every(1).minutes.do(check_activities)

def check_activities():
    activities = Activity.query().filter(Activity.start_time <= time.now() and Activity.end_time >= time.now()).all()
    for activity in activities:
        for room in activity.get_capacities():
            if room['ingress'] - room['egress'] >= room['capacity']:
                print(f'{activity.name} is full')
            else:
                print(f'{activity.name} has space')