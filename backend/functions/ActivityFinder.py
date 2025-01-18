from models.Activity import Activity
from models.People import People

def find_activities(person_id):
    person = People.query.filter_by(id=person_id).first()
    activities = person.activities
    print(activities)
    return activities