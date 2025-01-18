from .Activity import Activity
from datetime import datetime
from db import db


class Event(db.Model):
    __tablename__ = 'Event'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    people = db.relationship('EventEntry', backref='Event', lazy=True)
    activities = db.relationship('Activity', backref='Event', lazy=True)

    def __init__(self, name, description, start_date, end_date, location):
        self.name = name
        self.description = description
        self.start_date = datetime.strptime(start_date.replace('Z', '+00:00'), '%Y-%m-%dT%H:%M:%S.%f%z')
        self.end_date = datetime.strptime(end_date.replace('Z', '+00:00'), '%Y-%m-%dT%H:%M:%S.%f%z')
        self.location = location

    @staticmethod
    def get_top_events():
        return Event.query.filter(Event.end_date > datetime.now()).all()
    
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'start_date': self.start_date.strftime('%Y-%m-%dT%H:%M:%S'),
            'end_date': self.end_date.strftime('%Y-%m-%dT%H:%M:%S'),
            'location': self.location
        }

    def add_person(self, person):
        self.people.append(person)

    def remove_person(self, person):
        self.people.remove(person)

    def add_activity(self, activity):
        self.activities.append(Activity(activity['name'], activity['description'],
                               activity['start_time'], activity['end_time'], activity['event_id'], activity['rooms']))

    def remove_activity(self, activity_id):
        self.activities = [
            activity for activity in self.activities if activity.id != activity_id]

    def change_time(self, start_date, end_date):
        self.start_date = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
        self.end_date = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')

    def change_location(self, location):
        self.location = location


if __name__ == '__main__':
    event = Event('Event', 'An event', '2022-10-10 08:00:00',
                  '2022-10-10 17:00:00', 'Location')
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
    event.add_activity({'id': 1, 'name': 'Workshop', 'description': 'A workshop', 'start_time': '2022-10-10 09:00:00',
                       'end_time': '2022-10-10 12:00:00', 'event_id': 1, 'rooms': [{'id': 1, 'name': 'Room 1', 'description': 'A room', 'capacity': 50}]})
    event.add_activity({'id': 2, 'name': 'Talk', 'description': 'A talk', 'start_time': '2022-10-10 13:00:00',
                       'end_time': '2022-10-10 15:00:00', 'event_id': 1, 'rooms': [{'id': 2, 'name': 'Room 2', 'description': 'A room', 'capacity': 100}]})
    print(event.activities)
    event.remove_activity(1)
    print(event.activities)
    event.remove_activity(2)
    print(event.activities)
