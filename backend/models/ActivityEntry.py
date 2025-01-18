from db import db

class ActivityEntry(db.Model):
    __tablename__ = 'ActivityEntry'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('Activity.id'), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('People.id'), nullable=False)

    def __init__(self, activity_id, person_id):
        self.activity_id = activity_id
        self.person_id = person_id