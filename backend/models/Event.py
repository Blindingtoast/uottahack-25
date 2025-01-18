from Activity import Activity
from datetime import datetime

class Event():

    def __init__(self, id, name, description, start_date, end_date, location):
        self.id = id
        self.name = name
        self.description = description
        self.start_date = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
        self.end_date = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')
        self.location = location
        self.people = []
        self.activities = []

    def add_person(self, person):
        self.people.append(person)

    def remove_person(self, person):
        self.people.remove(person)

    def add_activity(self, activity):
        self.activities.append(Activity(activity['id'], activity['name'], activity['description'], activity['start_time'], activity['end_time'], activity['event_id'], activity['rooms']))

    def remove_activity(self, activity_id):
        self.activities = [activity for activity in self.activities if activity.id != activity_id]
        

    def change_time(self, start_date, end_date):
        self.start_date = start_date
        self.end_date = end_date

    def change_location(self, location):
        self.location = location


if __name__ == '__main__':
    event = Event(1, 'Event', 'An event', '2022-10-10 08:00:00', '2022-10-10 17:00:00', 'Location')
    print(event.start_date)
    print(event.end_date)
    event.change_time('2022-10-10 09:00:00', '2022-10-10 18:00:00')
    print(event.start_date)
    print(event.end_date)
    event.change_location('New Location')
    print(event.location)
    event.add_person('John')
    event.add_person('Jane')
    print(event.people)
    event.remove_person('Jane')
    print(event.people)
    event.add_activity({'id': 1, 'name': 'Workshop', 'description': 'A workshop', 'start_time': '2022-10-10 09:00:00', 'end_time': '2022-10-10 12:00:00', 'event_id': 1, 'rooms': [{'id': 1, 'name': 'Room 1', 'description': 'A room', 'capacity': 50}]})
    event.add_activity({'id': 2, 'name': 'Talk', 'description': 'A talk', 'start_time': '2022-10-10 13:00:00', 'end_time': '2022-10-10 15:00:00', 'event_id': 1, 'rooms': [{'id': 2, 'name': 'Room 2', 'description': 'A room', 'capacity': 100}]})
    print(event.activities)
    event.remove_activity(1)
    print(event.activities)
    event.remove_activity(2)
    print(event.activities)