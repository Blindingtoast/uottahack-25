import { useState, useEffect } from "react";
import { SurveyDialog } from "@/components/ui/survey";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import { format } from "date-fns";

const LiveUpdates = ({ activityId }) => {
  const [updates, setUpdates] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch(`/api/activities/${activityId}/updates`);
        if (!response.ok) {
          throw new Error("Failed to fetch updates");
        }
        const updatesData = await response.json();
        setUpdates(updatesData);
      } catch (err) {
        console.error("Error fetching updates:", err);
      }
    };

    fetchUpdates();
    const interval = setInterval(fetchUpdates, 30000);

    return () => clearInterval(interval);
  }, [activityId]);

  const visibleUpdates = isExpanded ? updates : updates.slice(0, 3);

  return (
    <>
      <CardHeader>
          <CardTitle>
            Live Updates
          </CardTitle>
          {updates.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              {isExpanded ? "Show less" : `Show all (${updates.length})`}
            </button>
          )}
      </CardHeader>
      <CardContent className="space-y-4">
        {updates.length > 0 ? (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {visibleUpdates.map((update) => (
              <Card key={update.id} className="bg-gray-50">
                <CardContent className="p-3">
                  <p className="text-sm text-gray-800">{update.message}</p>
                  <span className="text-xs text-gray-500">
                    {format(new Date(update.timestamp), "MMM d, h:mm a")}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-500">No recent updates</p>
          </div>
        )}
      </CardContent>
    </>
  );
};

const ActivityCard = ({ activity }) => {
  const [isRegistered, setIsRegistered] = useState(activity.registered);

  const handleRegister = async () => {
    try {
      const response = await fetch(`/api/activities/${activity.id}/register`, {
        method: isRegistered ? "DELETE" : "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to update registration status");
      }
      setIsRegistered(!isRegistered);
    } catch (err) {
      console.error("Error updating registration status:", err);
    }
  };

  return (
    <Card>
      <div className="grid grid-cols-2">
        <div className="border-r">
          <CardHeader>
            <CardTitle>
              {activity.name}
            </CardTitle>
            <CardDescription>{activity.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">
                {format(new Date(activity.start_time), "h:mm a")} -{" "}
                {format(new Date(activity.end_time), "h:mm a")}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">
                {activity.people || 0} attendees
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">
                {format(new Date(activity.start_time), "MMMM d, yyyy")}
              </span>
            </div>
            {activity.rooms?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activity.rooms.map((room, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {room.name || room}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={handleRegister}
              className={`mt-4 px-4 py-2 text-sm font-semibold rounded ${
                isRegistered ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {isRegistered ? "Unregister" : "Register"}
            </button>
          </CardContent>
        </div>
        
        <CardContent className="flex flex-col h-full">
          <div className="flex-1 overflow-y" >
            <LiveUpdates activityId={activity.id} />
          </div>
          <div className="justify-end">
            <SurveyDialog activityId={activity.id} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export { ActivityCard };