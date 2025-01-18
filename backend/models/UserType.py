class UserType():

    def __init__(self) -> None:
        pass

    def get_user_type(self):
        pass

    @staticmethod
    def from_user_type(user_type):
        if user_type == 'Admin':
            return Admin()
        elif user_type == 'Atendee':
            return Atendee()
        
class Admin(UserType):

    def __init__(self):
        pass

    def get_user_type(self):
        return 'Admin'


class Atendee(UserType):

    def __init__(self):
        pass

    def get_user_type(self):
        return 'Atendee'
