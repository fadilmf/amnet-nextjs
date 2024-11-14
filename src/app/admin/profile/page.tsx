"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define types for user profile and country profile
interface UserProfile {
  avatarUrl: string;
  name: string;
  role: string;
  country: string;
  phoneNumber: string;
  email: string;
}

interface CountryProfile {
  name: string;
  latitude: string;
  longitude: string;
  landArea: string;
  totalLandArea: string;
  forestArea: string;
  population: string;
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

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-6xl mx-auto">
      {/* Left Card - Profile Details */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {/* <Image
              src={profileData.avatarUrl}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full"
            /> */}
            <Avatar className="w-64 h-64">
              <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isEditing ? (
              <div className="space-y-4 w-full">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={profileData.name}
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
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <Button onClick={toggleEdit} className="mt-4 w-full">
                  Save
                </Button>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <p className="text-lg font-semibold">{profileData.name}</p>
                <p className="text-sm text-gray-600">{profileData.role}</p>
                <p className="text-sm text-gray-600">
                  Country: {profileData.country}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {profileData.phoneNumber}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {profileData.email}
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
              <p>{initialCountryProfile.name}</p>
            </div>
            <div>
              <p className="font-semibold">Latitude:</p>
              <p>{initialCountryProfile.latitude}</p>
            </div>
            <div>
              <p className="font-semibold">Longitude:</p>
              <p>{initialCountryProfile.longitude}</p>
            </div>
            <div>
              <p className="font-semibold">Land Area:</p>
              <p>{initialCountryProfile.landArea}</p>
            </div>
            <div>
              <p className="font-semibold">Total Land Area:</p>
              <p>{initialCountryProfile.totalLandArea}</p>
            </div>
            <div>
              <p className="font-semibold">Forest Area:</p>
              <p>{initialCountryProfile.forestArea}</p>
            </div>
            <div>
              <p className="font-semibold">Population:</p>
              <p>{initialCountryProfile.population}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
