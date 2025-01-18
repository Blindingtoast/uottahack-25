from UserType import UserType, Admin, Atendee


class People():

    def __init__(self, name, age, id, user_type):
        self.name = name
        self.age = age
        self.id = id
        self.user_type = UserType.from_user_type(user_type)

    def subscribe(self, activity):
        print(f'{self.name} has subscribed to {activity}')


if __name__ == '__main__':
    admin = People('John', 30, 1, 'Admin')
    atendee = People('Jane', 25, 2, 'Atendee')

    print(admin.user_type.get_user_type())
    print(atendee.user_type.get_user_type())
    admin.subscribe('Workshop')
    atendee.subscribe('Workshop')