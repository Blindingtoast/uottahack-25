import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, DoorClosed, ArrowDownRight, ArrowUpRight, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoomsPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms/all", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch rooms");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const RoomCard = ({ room }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">Capacity: {room.capacity} people</span>
          </div>
          {room.ingress !== null && (
            <div className="flex items-center text-gray-600">
              <ArrowDownRight className="h-4 w-4 mr-2" />
              <span className="text-sm">Ingress: {room.ingress}</span>
            </div>
          )}
          {room.egress !== null && (
            <div className="flex items-center text-gray-600">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              <span className="text-sm">Egress: {room.egress}</span>
            </div>
          )}
          <div className="flex items-center text-gray-600">
            <DoorClosed className="h-4 w-4 mr-2" />
            <span className="text-sm">Room ID: {room.id}</span>
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            View Details
          </button>
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Rooms</h1>
            <p className="text-gray-600">Manage your rooms and their details</p>
          </div>
          <button
            onClick={() => navigate('/rooms/create')}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Create Room
          </button>
        </div>

        {rooms.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <DoorClosed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Rooms Found</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first room</p>
                <button
                  onClick={() => navigate('/rooms/create')}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle className="h-5 w-5" />
                  Create Room
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;