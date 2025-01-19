from db import db

from models.People import People
from models.Activity import Activity
from models.Room import Room
from models.ActivityEntry import ActivityEntry
from models.EventEntry import EventEntry
from models.Event import Event
from models.ActivityRoom import ActivityRoom


def create_sample_people():
    sample_people = [
        People("Noah Gagnon", 20, "Admin", "test@test.com", "test"),
        People("Jane Doe", 25, "Attendee", "test2@test.com", "test"),
        People("John Doe", 30, "Attendee", "test3@test.com", "test"),
        People("Alice Smith", 22, "Attendee", "test4@test.com", "test"),
        People("Bob Johnson", 28, "Attendee", "test5@test.com", "test"),
        People("Charlie Brown", 35, "Admin", "test6@test.com", "test"),
        People("David Wilson", 40, "Attendee", "test7@test.com", "test"),
        People("Eve Davis", 19, "Attendee", "test8@test.com", "test"),
        People("Frank Miller", 33, "Admin", "test9@test.com", "test"),
        People("Grace Lee", 27, "Attendee", "test10@test.com", "test"),
        People("Hank Green", 31, "Attendee", "test11@test.com", "test"),
        People("Ivy White", 24, "Admin", "test12@test.com", "test"),
        People("Jack Black", 29, "Attendee", "test13@test.com", "test"),
        People("Karen Young", 26, "Attendee", "test14@test.com", "test"),
        People("Larry King", 32, "Admin", "test15@test.com", "test"),
        People("Mona Lisa", 21, "Attendee", "test16@test.com", "test"),
        People("Nina Brown", 34, "Attendee", "test17@test.com", "test"),
        People("Oscar Wilde", 23, "Admin", "test18@test.com", "test"),
        People("Paul Newman", 36, "Attendee", "test19@test.com", "test"),
        People("Quincy Adams", 37, "Attendee", "test20@test.com", "test")
    ]

    for person in sample_people:
        db.session.add(person)

    db.session.commit()


def create_sample_events():
    sample_events = [
        Event("UNotAHack", "A hackathon in the heart of the city",
              "2025-01-18T08:00:00.000000+00:00", "2025-01-18T17:00:00.000000+00:00", "City Hall", 1),
        Event("Tech Conference", "A conference for tech enthusiasts",
              "2025-01-19T01:00:00.000000+00:00", "2025-01-19T17:00:00.000000+00:00", "Convention Center", 1),
        Event("Startup Weekend", "A weekend for startups",
              "2025-01-20T08:00:00.000000+00:00", "2025-01-20T17:00:00.000000+00:00", "Co-working Space", 5),
        Event("Code Camp", "A camp for coders", "2025-01-21T08:00:00.000000+00:00",
              "2025-01-21T17:00:00.000000+00:00", "University Campus", 6),
        Event("Design Workshop", "A workshop for designers",
              "2025-01-22T08:00:00.000000+00:00", "2025-01-22T17:00:00.000000+00:00", "Design Studio", 5),
        Event("Marketing Seminar", "A seminar for marketers",
              "2025-01-23T08:00:00.000000+00:00", "2025-01-23T17:00:00.000000+00:00", "Marketing Agency", 6),
        Event("Product Launch", "A launch event for a new product",
              "2025-01-24T08:00:00.000000+00:00", "2025-01-24T17:00:00.000000+00:00", "Company Headquarters", 5),
        Event("Investor Pitch", "A pitch event for investors",
              "2025-01-25T08:00:00.000000+00:00", "2025-01-25T17:00:00.000000+00:00", "Venture Capital Firm", 9),
        Event("Demo Day", "A day for startups to demo their products",
              "2025-01-26T08:00:00.000000+00:00", "2025-01-26T17:00:00.000000+00:00", "Accelerator Program", 10),
        Event("Networking Event", "An event for networking",
              "2025-01-27T08:00:00.000000+00:00", "2025-01-27T17:00:00.000000+00:00", "Community Center", 8)
    ]

    for event in sample_events:
        db.session.add(event)

    db.session.commit()


def create_sample_activities():
    sample_activities = [
        # Activities for UNotAHack
        Activity("Opening Ceremony", "Kickoff the hackathon",
                 "2025-01-18T08:30:00.000000+00:00", "2025-01-19T22:00:00.000000+00:00", 1, "Main Hall"),
        Activity("Team Formation", "Form teams for the hackathon",
                 "2025-01-18T09:00:00.000000+00:00", "2025-01-19T23:00:00.000000+00:00", 1, "Main Hall"),
        Activity("Coding Session 1", "First coding session",
                 "2025-01-18T10:00:00.000000+00:00", "2025-01-18T12:00:00.000000+00:00", 1, "Main Hall"),
        Activity("Lunch Break", "Lunch break for participants",
                 "2025-01-18T12:00:00.000000+00:00", "2025-01-18T13:00:00.000000+00:00", 1, "Cafeteria"),
        Activity("Coding Session 2", "Second coding session",
                 "2025-01-18T13:00:00.000000+00:00", "2025-01-18T17:00:00.000000+00:00", 1, "Main Hall"),
        # Activities for Tech Conference
        Activity("Keynote Speech", "Opening keynote speech",
                 "2025-01-19T00:30:00.000000+00:00", "2025-01-19T09:30:00.000000+00:00", 2, "Auditorium"),
        Activity("Panel Discussion", "Discussion with industry experts",
                 "2025-01-19T09:30:00.000000+00:00", "2025-01-19T11:00:00.000000+00:00", 2, "Auditorium"),
        Activity("Networking Session", "Networking with other attendees",
                 "2025-01-19T11:00:00.000000+00:00", "2025-01-19T12:00:00.000000+00:00", 2, "Lobby"),
        Activity("Lunch Break", "Lunch break for participants",
                 "2025-01-19T12:00:00.000000+00:00", "2025-01-19T13:00:00.000000+00:00", 2, "Cafeteria"),
        Activity("Workshop 1", "First workshop session",
                 "2025-01-19T13:00:00.000000+00:00", "2025-01-19T15:00:00.000000+00:00", 2, "Workshop Room 1"),
        Activity("Workshop 2", "Second workshop session",
                 "2025-01-19T15:00:00.000000+00:00", "2025-01-19T17:00:00.000000+00:00", 2, "Workshop Room 2"),
        # Activities for other events
        Activity("Startup Pitch", "Pitch your startup idea",
                 "2025-01-20T09:00:00.000000+00:00", "2025-01-20T11:00:00.000000+00:00", 3, "Pitch Room"),
        Activity("Mentorship Session", "Get advice from mentors",
                 "2025-01-20T11:00:00.000000+00:00", "2025-01-20T13:00:00.000000+00:00", 3, "Mentorship Room"),
        Activity("Coding Session", "Work on your startup project",
                 "2025-01-20T13:00:00.000000+00:00", "2025-01-20T17:00:00.000000+00:00", 3, "Co-working Space"),
        Activity("Intro to Coding", "Learn the basics of coding",
                 "2025-01-21T09:00:00.000000+00:00", "2025-01-21T11:00:00.000000+00:00", 4, "Classroom 1"),
        Activity("Advanced Coding", "Advanced coding techniques",
                 "2025-01-21T11:00:00.000000+00:00", "2025-01-21T13:00:00.000000+00:00", 4, "Classroom 2"),
        Activity("Coding Challenge", "Participate in a coding challenge",
                 "2025-01-21T13:00:00.000000+00:00", "2025-01-21T17:00:00.000000+00:00", 4, "Lab"),
        Activity("Design Basics", "Learn the basics of design",
                 "2025-01-22T09:00:00.000000+00:00", "2025-01-22T11:00:00.000000+00:00", 5, "Design Studio"),
        Activity("Advanced Design", "Advanced design techniques",
                 "2025-01-22T11:00:00.000000+00:00", "2025-01-22T13:00:00.000000+00:00", 5, "Design Studio"),
        Activity("Design Challenge", "Participate in a design challenge",
                 "2025-01-22T13:00:00.000000+00:00", "2025-01-22T17:00:00.000000+00:00", 5, "Design Studio"),
        Activity("Marketing 101", "Learn the basics of marketing",
                 "2025-01-23T09:00:00.000000+00:00", "2025-01-23T11:00:00.000000+00:00", 6, "Conference Room"),
        Activity("Advanced Marketing", "Advanced marketing strategies",
                 "2025-01-23T11:00:00.000000+00:00", "2025-01-23T13:00:00.000000+00:00", 6, "Conference Room"),
        Activity("Marketing Challenge", "Participate in a marketing challenge",
                 "2025-01-23T13:00:00.000000+00:00", "2025-01-23T17:00:00.000000+00:00", 6, "Conference Room"),
        Activity("Product Presentation", "Present your product",
                 "2025-01-24T09:00:00.000000+00:00", "2025-01-24T11:00:00.000000+00:00", 7, "Main Hall"),
        Activity("Product Feedback", "Get feedback on your product",
                 "2025-01-24T11:00:00.000000+00:00", "2025-01-24T13:00:00.000000+00:00", 7, "Main Hall"),
        Activity("Product Improvement", "Work on improving your product",
                 "2025-01-24T13:00:00.000000+00:00", "2025-01-24T17:00:00.000000+00:00", 7, "Main Hall"),
        Activity("Investor Presentation", "Present to investors",
                 "2025-01-25T09:00:00.000000+00:00", "2025-01-25T11:00:00.000000+00:00", 8, "Pitch Room"),
        Activity("Investor Feedback", "Get feedback from investors",
                 "2025-01-25T11:00:00.000000+00:00", "2025-01-25T13:00:00.000000+00:00", 8, "Pitch Room"),
        Activity("Investor Meetings", "One-on-one meetings with investors",
                 "2025-01-25T13:00:00.000000+00:00", "2025-01-25T17:00:00.000000+00:00", 8, "Meeting Room"),
        Activity("Demo Presentations", "Present your demo",
                 "2025-01-26T09:00:00.000000+00:00", "2025-01-26T11:00:00.000000+00:00", 9, "Demo Room"),
        Activity("Demo Feedback", "Get feedback on your demo",
                 "2025-01-26T11:00:00.000000+00:00", "2025-01-26T13:00:00.000000+00:00", 9, "Demo Room"),
        Activity("Demo Improvements", "Work on improving your demo",
                 "2025-01-26T13:00:00.000000+00:00", "2025-01-26T17:00:00.000000+00:00", 9, "Demo Room"),
        Activity("Networking Session", "Network with other attendees",
                 "2025-01-27T09:00:00.000000+00:00", "2025-01-27T11:00:00.000000+00:00", 10, "Networking Hall"),
        Activity("Closing Ceremony", "Closing ceremony for the event",
                 "2025-01-27T11:00:00.000000+00:00", "2025-01-27T12:00:00.000000+00:00", 10, "Main Hall"),
        Activity("Farewell Lunch", "Farewell lunch for participants",
                 "2025-01-27T12:00:00.000000+00:00", "2025-01-27T13:00:00.000000+00:00", 10, "Cafeteria"),
        Activity("Post-event Networking", "Post-event networking session",
                 "2025-01-27T13:00:00.000000+00:00", "2025-01-27T17:00:00.000000+00:00", 10, "Networking Hall")
    ]

    for activity in sample_activities:
        db.session.add(activity)

    db.session.commit()


def create_sample_rooms():
    # __init__(self, name, description, capacity, owner):
    sample_rooms = [
        Room("Main Hall", "The main hall for events", 500, 1),
        Room("Auditorium", "An auditorium for presentations", 200, 1),
        Room("Conference Room", "A conference room for meetings", 50, 1),
        Room("Workshop Room 1", "A room for workshops", 30, 1),
        Room("Workshop Room 2", "Another room for workshops", 30, 1),
        Room("Pitch Room", "A room for pitches", 20, 1),
        Room("Mentorship Room", "A room for mentorship sessions", 10, 2),
        Room("Lab", "A lab for coding challenges", 20, 2),
        Room("Design Studio", "A studio for design challenges", 20, 2),
        Room("Networking Hall", "A hall for networking sessions", 50, 2),
        Room("Cafeteria", "A cafeteria for meals", 100, 2),
        Room("Lobby", "A lobby for networking", 50, 6),
        Room("Co-working Space", "A space for startups", 50, 6),
        Room("University Campus", "A campus for events", 500, 5),
        Room("Convention Center", "A center for conferences", 200, 7),
        Room("City Hall", "A hall for city events", 100, 8),
        Room("Design Studio", "A studio for design challenges", 20, 9),
        Room("Marketing Agency", "An agency for marketing events", 50, 10)
    ]

    for room in sample_rooms:
        db.session.add(room)

    db.session.commit()


def create_sample_activity_entries():
    sample_activity_entries = [
        # 11 entries for the first activity
        ActivityEntry(1, 1),
        ActivityEntry(1, 2),
        ActivityEntry(1, 3),
        ActivityEntry(1, 4),
        ActivityEntry(1, 5),
        ActivityEntry(1, 6),
        ActivityEntry(1, 7),
        ActivityEntry(1, 8),
        ActivityEntry(1, 9),
        ActivityEntry(1, 10),
        ActivityEntry(1, 11),
        # 9 entries for the second activity
        ActivityEntry(2, 1),
        ActivityEntry(2, 2),
        ActivityEntry(2, 3),
        ActivityEntry(2, 4),
        ActivityEntry(2, 5),
        ActivityEntry(2, 6),
        ActivityEntry(2, 7),
        ActivityEntry(2, 8),
        ActivityEntry(2, 9),
        # Assorted entries for the rest
        ActivityEntry(3, 1),
        ActivityEntry(3, 2),
        ActivityEntry(3, 3),
        ActivityEntry(4, 4),
        ActivityEntry(4, 5),
        ActivityEntry(5, 6),
        ActivityEntry(5, 7),
        ActivityEntry(6, 8),
        ActivityEntry(6, 9),
        ActivityEntry(7, 10)
    ]

    for entry in sample_activity_entries:
        db.session.add(entry)

    db.session.commit()

def create_sample_event_entries():
    sample_event_entries = [
        EventEntry(1, 1),
        EventEntry(1, 3),
        EventEntry(1, 5),
        EventEntry(1, 6),
        EventEntry(1, 7),
        EventEntry(1, 9),
        EventEntry(2, 11),
        EventEntry(2, 5),
        EventEntry(3, 2),
        EventEntry(3, 4),
        EventEntry(3, 6),
        EventEntry(3, 8),
        EventEntry(3, 10)
    ]

    for entry in sample_event_entries:
        db.session.add(entry)

    db.session.commit()

def create_sample_activity_rooms():
    sample_activity_rooms = [
        ActivityRoom(1, 1),
        ActivityRoom(1, 2),
        ActivityRoom(2, 1),
        ActivityRoom(3, 1),
        ActivityRoom(3, 2),
        ActivityRoom(4, 1),
        ActivityRoom(5, 1),
        ActivityRoom(5, 2),
        ActivityRoom(6, 1),
        ActivityRoom(6, 2),
        ActivityRoom(7, 1),
        ActivityRoom(7, 2),
        ActivityRoom(8, 1),
        ActivityRoom(8, 2),
        ActivityRoom(9, 1),
        ActivityRoom(9, 2),
        ActivityRoom(10, 1),
        ActivityRoom(10, 2)
    ]

    for activity_room in sample_activity_rooms:
        db.session.add(activity_room)

    db.session.commit()

def create_sample():
    create_sample_people()
    create_sample_events()
    create_sample_rooms()
    create_sample_activities()
    create_sample_activity_entries()
    create_sample_event_entries()
    create_sample_activity_rooms()