from db import db


class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    capacity = db.Column(db.Integer, nullable=False)
    ingress = db.Column(db.Integer, nullable=False)
    egress = db.Column(db.Integer, nullable=False)

    def __init__(self, name, description, capacity):
        self.name = name
        self.description = description
        self.capacity = capacity
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
