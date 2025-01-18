import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ActivityCard({ name, description, start_time, end_time, room }) {
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
          <strong>Room:</strong> {room}
        </p>
      </CardContent>
    </Card>
  );
}

export default ActivityCard;
