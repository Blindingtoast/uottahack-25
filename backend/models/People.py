from models.UserType import UserType
from db import db


class People(db.Model):
    __tablename__ = 'People'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    user_type = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    activities = db.relationship('ActivityEntry', backref='People', lazy=True)
    events = db.relationship('EventEntry', backref='People', lazy=True)

    def __init__(self, name, age, user_type, email, password):
        self.name = name
        self.age = age
        self.user_type = user_type
        self.email = email
        self.password = password


    def subscribe(self, activity):
        print(f'{self.name} has subscribed to {activity}')

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'user_type': self.user_type,
        }

    @staticmethod
    def get_person(email, password):
        person = People.query.filter_by(email=email, password=password).first()
        return person
    
    @staticmethod
    def register_person(name, age, user_type, email, password):
        person = People(name, age, user_type, email, password)
        db.session.add(person)
        db.session.commit()
        return person


if __name__ == '__main__':
    admin = People('John', 30, 1, 'Admin', 'test', 'test')
    atendee = People('Jane', 25, 2, 'Atendee', 'test', 'test')

    print(admin.user_type.get_user_type())
    print(atendee.user_type.get_user_type())
    admin.subscribe('Workshop')
    atendee.subscribe('Workshop')
