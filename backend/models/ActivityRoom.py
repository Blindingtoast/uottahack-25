from db import db

class ActivityRoom(db.Model):
    __tablename__ = 'ActivityRoom'

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('Room.id'), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('Activity.id'), nullable=False)

    def __init__(self, room_id, activity_id):
        self.room_id = room_id
        self.activity_id = activity_id