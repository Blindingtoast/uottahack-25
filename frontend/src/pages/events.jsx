import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

const EventsPage = () => {
  // Mock data for joined events
  const joinedEvents = [
    {
      id: 1,
      name: "Tech Conference 2025",
      description: "Annual technology conference featuring latest innovations",
      start_date: new Date("2025-03-15T09:00:00"),
      end_date: new Date("2025-03-17T18:00:00"),
      location: "San Francisco Convention Center",
      activities: 12
    },
    {
      id: 2,
      name: "Music Festival",
      description: "Three days of live music and entertainment",
      start_date: new Date("2025-04-01T10:00:00"),
      end_date: new Date("2025-04-03T23:00:00"),
      location: "Central Park",
      activities: 24
    }
  ];

  // Mock data for nearby events
  const nearbyEvents = [
    {
      id: 3,
      name: "Food & Wine Expo",
      description: "Explore local cuisines and wine tasting",
      start_date: new Date("2025-02-20T11:00:00"),
      end_date: new Date("2025-02-21T20:00:00"),
      location: "Downtown Convention Hall",
      activities: 8
    },
    {
      id: 4,
      name: "Art Gallery Opening",
      description: "Contemporary art exhibition featuring local artists",
      start_date: new Date("2025-02-25T18:00:00"),
      end_date: new Date("2025-02-25T22:00:00"),
      location: "Modern Art Museum",
      activities: 5
    },
    {
      id: 5,
      name: "Business Networking",
      description: "Connect with professionals in your industry",
      start_date: new Date("2025-03-01T08:00:00"),
      end_date: new Date("2025-03-01T17:00:00"),
      location: "Grand Hotel",
      activities: 6
    }
  ];

  const EventCard = ({ event, isJoined }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{event.name}</span>
          {isJoined && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Joined</span>
          )}
        </CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {format(event.start_date, "MMM d, yyyy")} - {format(event.end_date, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {format(event.start_date, "h:mm a")} - {format(event.end_date, "h:mm a")}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">{event.activities} activities</span>
          </div>
          {!isJoined && (
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Join Event
            </button>
          )}
          {isJoined && (
            <button className="mt-4 w-full bg-gray-100 text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              View Activities
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Events</h1>
          <p className="text-gray-600">Events you're participating in</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {joinedEvents.map(event => (
              <EventCard key={event.id} event={event} isJoined={true} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Events Near You</h2>
          <p className="text-gray-600 mb-6">Discover upcoming events in your area</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyEvents.map(event => (
              <EventCard key={event.id} event={event} isJoined={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;