from db import db


class PersonActivitySurvey(db.Model):
    __tablename__ = "PersonActivitySurvey"

    person_id = db.Column(
        db.Integer, db.ForeignKey("People.id"), primary_key=True, nullable=False
    )
    activity_id = db.Column(
        db.Integer, db.ForeignKey("Activity.id"), primary_key=True, nullable=False
    )
    survey = db.Column(db.String(16), nullable=False)

    def __init__(self, person_id, activity_id, survey):
        self.person_id = person_id
        self.activity_id = activity_id
        self.survey = survey

    def __str__(self):
        return f"{self.person_id} - {self.activity_id}: {self.survey}"

    def __repr__(self):
        return f"{self.person_id} - {self.activity_id}: {self.survey}"

    def to_json(self):
        return {
            "id": self.id,
            "person_id": self.person_id,
            "activity_id": self.activity_id,
            "survey": self.survey,
        }
