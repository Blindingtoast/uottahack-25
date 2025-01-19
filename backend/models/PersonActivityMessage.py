from db import db
from datetime import datetime


class PersonActivityMessage(db.Model):
    __tablename__ = "PersonActivityMessage"

    id = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey("People.id"), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey("Activity.id"), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey("Room.id"), nullable=True)
    timestamp = db.Column(db.String, nullable=False)
    message = db.Column(db.String(1024), nullable=False)

    def __init__(self, person_id, activity_id, room_id, message):
        self.person_id = person_id
        self.activity_id = activity_id
        self.room_id = room_id
        self.message = message
        self.timestamp = datetime.strptime(
            datetime.now().replace("Z", "+00:00"), "%Y-%m-%dT%H:%M:%S.%f%z"
        )

    def __str__(self):
        return f"{self.person_id} - {self.activity_id}: {self.message}"

    def __repr__(self):
        return f"{self.person_id} - {self.activity_id}: {self.message}"

    def to_json(self):
        return {
            "id": self.id,
            "person_id": self.person_id,
            "activity_id": self.activity_id,
            "room_id": self.room_id,
            "message": self.message,
        }

    @staticmethod
    def send_message(activity_id, person_id_list, message):
        for person_id in person_id_list:
            person_activity_message = PersonActivityMessage.query.filter_by(
                activity_id=activity_id, person_id=person_id
            ).first()
            if person_activity_message is None:
                person_activity_message = PersonActivityMessage(
                    person_id, activity_id, message
                )
                db.session.add(person_activity_message)
            else:
                person_activity_message.message = message
        db.session.commit()
