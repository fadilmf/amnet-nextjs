"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

// Define types for user profile and country profile
interface Country {
  id: number;
  countryName: string;
  latitude: number;
  longitude: number;
  landAreas: string;
  forestAreas: string;
  totalForestAreas: string;
  mangroveAreas: string;
  totalMangroveAreas: number;
  percentage: number;
  challenges: string;
  recommendation: string;
  programActivities: string;
  policy: string;
}

interface UserProfile {
  id: string;
  username: string;
  role: string;
  handphone: string;
  country: Country;
}

// Mock data - replace with real data in production
const initialUserProfile: UserProfile = {
  avatarUrl: "/avatar.png",
  name: "John Doe",
  role: "Admin",
  country: "Indonesia",
  phoneNumber: "+62 123-456-7890",
  email: "johndoe@example.com",
};

const initialCountryProfile: CountryProfile = {
  name: "Indonesia",
  latitude: "-6.1751",
  longitude: "106.8650",
  landArea: "1.904 million km²",
  totalLandArea: "1.9 million km²",
  forestArea: "884,950 km²",
  population: "273.5 million",
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] =
    useState<UserProfile>(initialUserProfile);
  const [countryData, setCountryData] = useState<CountryProfile>(
    initialCountryProfile
  );
  const [isLoading, setIsLoading] = useState(true);
  // const { toast } = useToast();
  const { user } = useAuth();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.userProfile) {
          setProfileData(response.data.userProfile);
        }
        if (response.data.countryProfile) {
          setCountryData(response.data.countryProfile);
        }

        console.log("ini response: ", response.data);
      } catch (error) {
        // toast({
        //   title: "Error",
        //   description: "Failed to load profile data",
        //   variant: "destructive",
        // });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
    // }, [user, toast]);
  }, [user]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.put("/api/profile", profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.user) {
        // toast({
        //   title: "Success",
        //   description: "Profile updated successfully",
        // });
        setIsEditing(false);
      }
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to update profile",
      //   variant: "destructive",
      // });
    }
  };

  // Handle input changes in the form fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle editing mode
  const toggleEdit = () => setIsEditing(!isEditing);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-6xl mx-auto">
      {/* Left Card - Profile Details */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {isEditing ? (
              <div className="space-y-4 w-full">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    value={profileData.role}
                    onChange={handleInputChange}
                    className="w-full"
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="handphone">Phone Number</Label>
                  <Input
                    id="handphone"
                    name="handphone"
                    value={profileData.handphone}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleSubmit} className="mt-4 w-full">
                  Save
                </Button>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <p className="text-lg font-semibold">{profileData.username}</p>
                <p className="text-sm text-gray-600">{profileData.role}</p>
                <p className="text-sm text-gray-600">
                  Country: {profileData.country.countryName}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {profileData.handphone}
                </p>
                <Button onClick={toggleEdit} className="mt-4">
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Right Card - Country Profile */}
      <Card className="flex-1 bg-green-800 text-white">
        <CardHeader>
          <CardTitle>Country Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p>{profileData.country.countryName}</p>
            </div>
            <div>
              <p className="font-semibold">Latitude:</p>
              <p>{profileData.country.latitude}</p>
            </div>
            <div>
              <p className="font-semibold">Longitude:</p>
              <p>{profileData.country.longitude}</p>
            </div>
            <div>
              <p className="font-semibold">Land Area:</p>
              <p>{profileData.country.landAreas}</p>
            </div>
            <div>
              <p className="font-semibold">Forest Area:</p>
              <p>{profileData.country.forestAreas}</p>
            </div>
            <div>
              <p className="font-semibold">Total Forest Area:</p>
              <p>{profileData.country.totalForestAreas}</p>
            </div>
            <div>
              <p className="font-semibold">Mangrove Area:</p>
              <p>{profileData.country.mangroveAreas}</p>
            </div>
            <div>
              <p className="font-semibold">Forest Percentage:</p>
              <p>{profileData.country.percentage}%</p>
            </div>
            <div>
              <p className="font-semibold">Challenges:</p>
              <p>{profileData.country.challenges}</p>
            </div>
            <div>
              <p className="font-semibold">Recommendations:</p>
              <p>{profileData.country.recommendation}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
