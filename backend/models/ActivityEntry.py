from sqlalchemy.sql.expression import func

from db import db

class ActivityEntry(db.Model):
    __tablename__ = 'ActivityEntry'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('Activity.id'), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('People.id'), nullable=False)
    has_entered = db.Column(db.Integer, nullable=False)
    has_exited = db.Column(db.Integer, nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('Room.id'), nullable=True)
    is_priority = db.Column(db.Integer, nullable=False, default=0)

    def __init__(self, activity_id, person_id):
        self.activity_id = activity_id
        self.person_id = person_id
        self.has_entered = 0
        self.has_exited = 0

    @staticmethod
    def enter(activity_id, person_id, room_id):
        activity_entry = ActivityEntry.query.filter_by(activity_id=activity_id, person_id=person_id).first()
        activity_entry.has_entered = 1
        activity_entry.has_exited = 0
        activity_entry.room_id = room_id
        db.session.commit()
        return activity_entry
    
    @staticmethod
    def exit(activity_id, person_id):
        activity_entry = ActivityEntry.query.filter_by(activity_id=activity_id, person_id=person_id).first()
        activity_entry.has_exited = 1
        db.session.commit()
        return activity_entry
    
    @staticmethod
    def room_occupancy(activity_id, room_id):
        return ActivityEntry.query.filter_by(activity_id=activity_id, room_id=room_id, has_entered=1, has_exited=0).count()    
    
    @staticmethod
    def prioritize(activity_id, person_id):
        activity_entry = ActivityEntry.query.filter_by(activity_id=activity_id, person_id=person_id).first()
        activity_entry.is_priority = 1
        db.session.commit()

    @staticmethod
    def choose_people(activity_id, capacity):
        priority_people = ActivityEntry.query.filter_by(activity_id=activity_id, has_entered=0, is_priority=1).order_by(func.random()).limit(capacity).all()
        if len(priority_people) < capacity:
            non_priority_people = ActivityEntry.query.filter_by(activity_id=activity_id, has_entered=0, is_priority=0).order_by(func.random()).limit(capacity - len(priority_people)).all()
            return priority_people + non_priority_people
        return priority_people
        
