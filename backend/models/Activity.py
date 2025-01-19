from datetime import datetime
from db import db


class Activity(db.Model):
    __tablename__ = "Activity"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    people = db.relationship("ActivityEntry", backref="Activity", lazy=True)
    event = db.Column(db.Integer, db.ForeignKey("Event.id"), nullable=False)

    def __init__(self, name, description, start_time, end_time, event_id, rooms):
        self.name = name
        self.description = description
        self.start_time = datetime.strptime(
            start_time.replace("Z", "+00:00"), "%Y-%m-%dT%H:%M:%S.%f%z"
        )
        self.end_time = datetime.strptime(
            end_time.replace("Z", "+00:00"), "%Y-%m-%dT%H:%M:%S.%f%z"
        )
        self.event = event_id

    def change_time(self, start_time, end_time):
        self.start_time = start_time
        self.end_time = end_time

    def change_rooms(self, rooms):
        self.rooms = rooms

    def __str__(self):
        return f"{self.name}: {self.description}, from {self.start_time} to {self.end_time}, in {self.rooms}"

    def __repr__(self):
        return f"{self.name}: {self.description}, from {self.start_time} to {self.end_time}, in {self.rooms}"

    def get_capacities(self):
        return [room.get_capacity_information() for room in self.rooms]

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "start_time": self.start_time.strftime("%Y-%m-%dT%H:%M:%S.%f%z"),
            "end_time": self.end_time.strftime("%Y-%m-%dT%H:%M:%S.%f%z"),
            "event_id": self.event,
        }
