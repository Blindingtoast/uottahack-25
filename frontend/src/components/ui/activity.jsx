import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ActivityCard({ name, description, start_time, end_time, rooms }) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Time:</strong> {start_time} - {end_time}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <strong>Rooms:</strong> {rooms}
        </p>
      </CardContent>
    </Card>
  );
}


function ActivitiesList({eventId}) {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Event Activities</h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            name={activity.name}
            description={activity.description}
            start_time={activity.start_time}
            end_time={activity.end_time}
            rooms={activity.rooms}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivitiesList;

