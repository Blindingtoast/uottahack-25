from models.UserType import UserType
from db import db


class People(db.Model):
    __tablename__ = 'people'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    user_type = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, name, age, id, user_type, email, password):
        self.name = name
        self.age = age
        self.id = id
        self.user_type = UserType.from_user_type(user_type)
        self.email = email
        self.password = password


    def subscribe(self, activity):
        print(f'{self.name} has subscribed to {activity}')

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'user_type': self.user_type.get_user_type()
        }

    @staticmethod
    def get_person(email, password):
        person = People.query.filter_by(email=email, password=password).first()
        return person.to_json()
    
    @staticmethod
    def register_person(name, age, user_type, email, password):
        person = People(name, age, 1, user_type, email, password)
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
