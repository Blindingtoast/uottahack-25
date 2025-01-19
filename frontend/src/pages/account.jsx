import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { AttendeeQRCode } from '@/components/ui/attendeeqr'

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch("/api/account");
        if (!response.ok) {
          throw new Error("Failed to fetch account data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching account data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-red-500 text-center">
            Error loading account data: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Your Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
        </div>
        
        <div className="flex justify-center">
          <AttendeeQRCode 
            id={userData.id} 
            className="bg-secondary p-4 my-2 rounded-lg"
          />
        </div>
        
        <div className="text-center text-sm text-gray-500">
          Attendee ID: {userData.id}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountPage;