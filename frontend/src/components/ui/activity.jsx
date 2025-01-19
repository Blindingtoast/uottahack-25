import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    <Card className="h-full border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-semibold text-gray-700">
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
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
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
    </Card>
  );
};

const ActivityCard = ({ activity }) => {
  
  return (
    <Card>
      <div className="grid grid-cols-2">
        <div className="border-r">
          <CardHeader>
            <CardTitle >
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
                {activity.people?.length || 0} attendees
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
          </CardContent>
        </div>
        
        <CardContent>
          <LiveUpdates activityId={activity.id} />
        </CardContent>
      </div>
    </Card>
  );
};

export { ActivityCard };
