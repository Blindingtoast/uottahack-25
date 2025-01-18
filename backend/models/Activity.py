from db import db


class Activity(db.Model):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    event_id = db.Column(db.Integer, nullable=False)
    rooms = db.relationship('rooms', backref='activities', lazy=True)

    def __init__(self, name, description, start_time, end_time, event_id, rooms):
        self.name = name
        self.description = description
        self.start_time = start_time
        self.end_time = end_time
        self.event_id = event_id
        self.rooms = rooms

    def change_time(self, start_time, end_time):
        self.start_time = start_time
        self.end_time = end_time

    def change_location(self, location):
        self.location = location

    def __str__(self):
        return f'{self.name}: {self.description}, from {self.start_time} to {self.end_time}, in {self.rooms}'

    def __repr__(self):
        return f'{self.name}: {self.description}, from {self.start_time} to {self.end_time}, in {self.rooms}'
    
    def get_capacities(self):
        return [room.get_capacity_information() for room in self.rooms]
