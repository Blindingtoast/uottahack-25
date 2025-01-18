import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const navigate = useNavigate();

  const handleViewActivities = (eventId) => {
    navigate(`/events/${eventId}`);
  };
  const [joinedEvents, setJoinedEvents] = React.useState([]);

  React.useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const response = await fetch("/api/events/joined", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch joined events");
        const events = await response.json();
        const formattedEvents = events.map((event) => ({
          id: event.id,
          name: event.name,
          description: event.description,
          start_date: new Date(event.start_date),
          end_date: new Date(event.end_date),
          location: event.location,
          activities: 0,
        }));
        setJoinedEvents(formattedEvents);
        console.log("Fetched joined events:", formattedEvents);
      } catch (error) {
        console.error("Error fetching joined events:", error);
        setJoinedEvents([]);
      }
    };

    fetchJoinedEvents();
  }, []);

  const [nearbyEvents, setNearbyEvents] = React.useState([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/all", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch events");
        const events = await response.json();
        const formattedEvents = events.map((event) => ({
          id: event.id,
          name: event.name,
          description: event.description,
          start_date: new Date(event.start_date),
          end_date: new Date(event.end_date),
          location: event.location,
          activities: 0,
        }));
        setNearbyEvents(formattedEvents);
        console.log("Fetched events:", formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setNearbyEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const EventCard = ({ event, isJoined }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{event.name}</span>
          {isJoined && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Joined
            </span>
          )}
        </CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {format(event.start_date, "MMM d, yyyy")} -{" "}
              {format(event.end_date, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {format(event.start_date, "h:mm a")} -{" "}
              {format(event.end_date, "h:mm a")}
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
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => handleViewActivities(event.id)}>
              Join Event
            </button>
          )}
          {isJoined && (
            <button
              className="mt-4 w-full bg-gray-100 text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => handleViewActivities(event.id)}
            >
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
            {joinedEvents.map((event) => (
              <EventCard key={event.id} event={event} isJoined={true} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Events Near You
          </h2>
          <p className="text-gray-600 mb-6">
            Discover upcoming events in your area
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyEvents.map((event) => (
              <EventCard key={event.id} event={event} isJoined={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
