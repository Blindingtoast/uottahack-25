from db import db

class EventEntry(db.Model):
    __tablename__ = 'EventEntry'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id = db.Column(db.Integer, db.ForeignKey('Event.id'), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('People.id'), nullable=False)

    def __init__(self, event_id, person_id):
        self.event_id = event_id
        self.person_id = person_id