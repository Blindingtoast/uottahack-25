import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  DoorClosed,
  ArrowDownRight,
  ArrowUpRight,
  Trash,
  Edit,
} from "lucide-react";

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    capacity: "",
    ingress: "",
    egress: "",
  });

  const handleBackClick = () => {
    navigate("/rooms");
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/rooms/${roomId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }

        const data = await response.json();
        setRoomData(data);
        setEditData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching room data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error("Failed to update room");
      }

      setRoomData(editData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating room:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        const response = await fetch(`/api/rooms/${roomId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete room");
        }

        navigate("/rooms");
      } catch (err) {
        console.error("Error deleting room:", err);
      }
    }
  };

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
        <div className="text-left">
          <button
            onClick={handleBackClick}
            className="bg-blue-500 text-white px-4 py-2 rounded my-4 ml-6"
          >
            Back to Rooms
          </button>
        </div>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <button
              onClick={() => navigate("/rooms")}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Rooms
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-left">
          <button
            onClick={handleBackClick}
            className="bg-blue-500 text-white px-4 py-2 rounded my-4 ml-6"
          >
            Back to Rooms
          </button>
        </div>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Room Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested room could not be found.</p>
            <button
              onClick={() => navigate("/rooms")}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Rooms
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="text-left">
        <button
          onClick={handleBackClick}
          className="bg-blue-500 text-white px-4 py-2 rounded my-4 ml-6"
        >
          Back to Rooms
        </button>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8">
          {!isEditing ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{roomData.name}</CardTitle>
                    <CardDescription>{roomData.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Capacity: {roomData.capacity} people</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ArrowDownRight className="h-5 w-5 mr-2" />
                    <span>Ingress: {roomData.ingress}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ArrowUpRight className="h-5 w-5 mr-2" />
                    <span>Egress: {roomData.egress}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DoorClosed className="h-5 w-5 mr-2" />
                    <span>Room ID: {roomData.id}</span>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="pt-6">
              <form onSubmit={handleEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={editData.capacity}
                    onChange={(e) =>
                      setEditData({ ...editData, capacity: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingress
                  </label>
                  <input
                    type="text"
                    value={editData.ingress}
                    onChange={(e) =>
                      setEditData({ ...editData, ingress: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Egress
                  </label>
                  <input
                    type="text"
                    value={editData.egress}
                    onChange={(e) =>
                      setEditData({ ...editData, egress: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
