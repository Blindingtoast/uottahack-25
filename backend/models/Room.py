from db import db


class Room(db.Model):
    __tablename__ = 'Room'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    capacity = db.Column(db.Integer, nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey('People.id'), nullable=False)
    ingress = db.Column(db.Integer, nullable=False)
    egress = db.Column(db.Integer, nullable=False)
    activities = db.relationship('ActivityRoom', backref='Room', lazy=True)

    def __init__(self, name, description, capacity, owner):
        self.name = name
        self.description = description
        self.capacity = capacity
        self.owner = owner
        self.ingress = 0
        self.egress = 0

    def edit_capacity(self, capacity):
        self.capacity = capacity

    def __str__(self):
        return f'{self.name}: {self.description}, capacity: {self.capacity}'

    def __repr__(self):
        return f'{self.name}: {self.description}, capacity: {self.capacity}'
    
    def get_capacity_information(self):
        return {'ingress': self.ingress, 'egress': self.egress, 'capacity': self.capacity}
    
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'capacity': self.capacity,
            'owner': self.owner,
            'ingress': self.ingress,
            'egress': self.egress
        }
