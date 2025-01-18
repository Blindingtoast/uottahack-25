import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SurveyDialog } from "@/components/ui/survey";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Users, MapPin, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const ActivitiesPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoints
        const [eventResponse, activitiesResponse] = await Promise.all([
          fetch(`/api/events/${eventId}`),
          fetch(`/api/events/${eventId}/activities`),
        ]);

        if (!eventResponse.ok || !activitiesResponse.ok) {
          throw new Error("Failed to fetch event data");
        }

        const eventData = await eventResponse.json();
        const activitiesData = await activitiesResponse.json();

        setEventData(eventData);
        setActivities(activitiesData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching event data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const handleRegistrationToggle = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: eventData.registered ? 'DELETE' : 'PUT',
      });
  
      if (!response.ok) {
        throw new Error('Failed to update registration status');
      }
  
      const updatedEventData = { ...eventData, registered: !eventData.registered };
      setEventData(updatedEventData);
    } catch (err) {
      console.error('Error updating registration status:', err);
    }
  };

  const ActivityCard = ({ activity }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{activity.name}</CardTitle>
            <CardDescription>{activity.description}</CardDescription>
          </div>
          <button
            onClick={() => navigate(`/activities/${activity.id}`)}
            className="text-blue-600 hover:text-blue-700"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {format(new Date(activity.start_time), "h:mm a")} -{" "}
              {format(new Date(activity.end_time), "h:mm a")}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {activity.people?.length || 0} attendees
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {format(new Date(activity.start_time), "MMMM d, yyyy")}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {activity.rooms?.map((room, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {room.name || room}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <button
              onClick={() => navigate("/events")}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Events
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Event Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested event could not be found.</p>
            <button
              onClick={() => navigate("/events")}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Events
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {eventData.name}
          </h1>
          <p className="text-gray-600 mb-4">{eventData.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                {format(new Date(eventData.start_date), "MMM d")} -{" "}
                {format(new Date(eventData.end_date), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{eventData.location}</span>
            </div>
            <div className="ml-auto">
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleRegistrationToggle}>
                {eventData.registered ? (
                  <>
                    Leave Event <span className="ml-2">-</span>
                  </>
                ) : (
                  <>
                    Join Event <span className="ml-2">+</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Activities</h2>
          <p className="text-gray-600 mb-6">
            Browse all activities for this event
          </p>
          {activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-600">
                  No activities found for this event.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
