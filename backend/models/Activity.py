from Room import Room

class Activity():

    def __init__(self, id, name, description, start_time, end_time, event_id, rooms):
        self.id = id
        self.name = name
        self.description = description
        self.start_time = start_time
        self.end_time = end_time
        self.event_id = event_id
        self.rooms = [Room(room['id'], room['name'], room['description'], room['capacity']) for room in rooms]

    def change_time(self, start_time, end_time):
        self.start_time = start_time
        self.end_time = end_time

    def change_location(self, location):
        self.location = location

    def __str__(self):
        return f'{self.name}: {self.description}, from {self.start_time} to {self.end_time}, in {self.rooms}'
    
    def __repr__(self):
        return f'{self.name}: {self.description}, from {self.start_time} to {self.end_time}, in {self.rooms}'