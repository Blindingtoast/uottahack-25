class Room():

    def __init__(self, id, name, description, capacity):
        self.id = id
        self.name = name
        self.description = description
        self.capacity = capacity

    def edit_capacity(self, capacity):
        self.capacity = capacity

    def __str__(self):
        return f'{self.name}: {self.description}, capacity: {self.capacity}'
    
    def __repr__(self):
        return f'{self.name}: {self.description}, capacity: {self.capacity}'