from db import db

class EventEntry(db.Model):
    __tablename__ = 'EventEntry'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id = db.Column(db.Integer, db.ForeignKey('Event.id'), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('People.id'), nullable=False)

    def __init__(self, event_id, person_id):
        self.event_id = event_id
        self.person_id = person_id

    @staticmethod
    def register(event_id, person_id):
        event_entry = EventEntry(event_id, person_id)
        db.session.add(event_entry)
        db.session.commit()
        return event_entry
    
    @staticmethod
    def unregister(event_id, person_id):
        event_entry = EventEntry.query.filter_by(event_id=event_id, person_id=person_id).first()
        db.session.delete(event_entry)
        db.session.commit()
        return event_entry
    
    def __repr__(self):
        return f'{self.event_id}: {self.person_id}'