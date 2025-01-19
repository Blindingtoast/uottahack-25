import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scanner as QRCodeScanner } from "@yudiel/react-qr-scanner";
import { Loader2 } from "lucide-react";

const ScannerPage = () => {
  const [loading, setLoading] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [entryType, setEntryType] = useState("");

  const [availableActivities, setAvailableActivities] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  const latestValues = useRef({
    event: "",
    activity: "",
    room: "",
    entered: null,
  });

  useEffect(() => {
    latestValues.current = {
      event: selectedEvent,
      activity: selectedActivity,
      room: selectedRoom,
      entered: entryType === "entrance",
    };
  }, [selectedEvent, selectedActivity, selectedRoom, entryType]);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const response = await fetch("api/scanner/dropdowns");
      const data = await response.json();
      setDropdownData(data);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    if (selectedEvent && dropdownData.length) {
      const activities = [
        ...new Set(
          dropdownData
            .filter((item) => item.event === selectedEvent)
            .map((item) => item.activity)
        ),
      ];
      setAvailableActivities(activities);
      setSelectedActivity("");
      setSelectedRoom("");
      setEntryType("");
    }
  }, [selectedEvent, dropdownData]);

  useEffect(() => {
    if (selectedEvent && selectedActivity && dropdownData.length) {
      const rooms = [
        ...new Set(
          dropdownData
            .filter(
              (item) =>
                item.event === selectedEvent &&
                item.activity === selectedActivity
            )
            .map((item) => item.room)
        ),
      ];
      setAvailableRooms(rooms);
      setSelectedRoom("");
      setEntryType("");
    }
  }, [selectedActivity, selectedEvent, dropdownData]);

  const handleScan = async (data) => {
    const { event, activity, room, entered } = latestValues.current;

    if (!data || !event || !activity || !room || entered === null) return;

    setLoading(true);
    try {
      const response = await fetch("/api/scanned", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qrData: data,
          event: event,
          activity: activity,
          room: room,
          entered: entered,
        }),
      });

      if (!response.ok) {
        throw new Error("Scan submission failed");
      }

      console.log("Scan submitted successfully");
    } catch (error) {
      console.error("Error submitting scan:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique events with their display names
  const uniqueEvents = [...new Set(dropdownData.map((item) => item.event))]
    .map(eventId => {
      const item = dropdownData.find(d => d.event === eventId);
      return {
        id: eventId,
        name: item?.event_name || eventId
      };
    });

  // Get display names for the selected items
  const getEventName = (eventId) => {
    const item = dropdownData.find(d => d.event === eventId);
    return item?.event_name || eventId;
  };

  const getActivityName = (activityId) => {
    const item = dropdownData.find(d => 
      d.event === selectedEvent && d.activity === activityId
    );
    return item?.activity_name || activityId;
  };

  const getRoomName = (roomId) => {
    const item = dropdownData.find(d => 
      d.event === selectedEvent && 
      d.activity === selectedActivity && 
      d.room === roomId
    );
    return item?.room_name || roomId;
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          QR Scanner
        </CardTitle>
        <div className="text-sm text-center text-gray-600">
          {selectedEvent && <div>{getEventName(selectedEvent)}</div>}
          {selectedActivity && <div>{getActivityName(selectedActivity)}</div>}
          {selectedRoom && <div>{getRoomName(selectedRoom)}</div>}
          {entryType && <div>{entryType}</div>}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="event-select">Select an Event:</label>
            <Select
              id="event-select"
              value={selectedEvent}
              onValueChange={setSelectedEvent}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                {uniqueEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="activity-select">Select an Activity:</label>
            <Select
              id="activity-select"
              value={selectedActivity}
              onValueChange={setSelectedActivity}
              disabled={!selectedEvent}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Activity" />
              </SelectTrigger>
              <SelectContent>
                {availableActivities.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {getActivityName(activity)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="room-select">Select a Room:</label>
            <Select
              id="room-select"
              value={selectedRoom}
              onValueChange={setSelectedRoom}
              disabled={!selectedActivity}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Room" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map((room) => (
                  <SelectItem key={room} value={room}>
                    {getRoomName(room)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="entry-type-select">Select Entry Type:</label>
            <Select
              id="entry-type-select"
              value={entryType}
              onValueChange={setEntryType}
              disabled={!selectedRoom}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Entry Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrance">Entrance</SelectItem>
                <SelectItem value="exit">Exit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}
          <QRCodeScanner
            onScan={handleScan}
            onError={(e) => console.log(`got an error: ${e}`)}
            className="w-full aspect-square bg-gray-100 rounded-lg"
            allowMultiple={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ScannerPage;