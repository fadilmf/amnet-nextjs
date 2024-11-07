"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FileText, Users, UserPlus, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for the bar chart
const countryPostData = [
  { country: "Indonesia", posts: 120 },
  { country: "Malaysia", posts: 80 },
  { country: "Philippines", posts: 100 },
  { country: "Thailand", posts: 90 },
  { country: "Vietnam", posts: 70 },
];

// Mock data for the popular content table
const popularContentData = [
  { id: 1, title: "Mangrove Conservation Techniques", views: 1500, likes: 230 },
  { id: 2, title: "Sustainable Fishing Practices", views: 1200, likes: 180 },
  { id: 3, title: "Coral Reef Restoration", views: 1000, likes: 150 },
  { id: 4, title: "Coastal Ecosystem Management", views: 950, likes: 140 },
  { id: 5, title: "Marine Biodiversity Protection", views: 900, likes: 130 },
];

export default function StatisticsPage() {
  return (
    <div className="flex h-full bg-gray-100 p-4 px-16">
      {/* Main Content */}
      <main className="flex-1">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Content Card */}
          <Card className="rounded-lg bg-red-100 text-center p-4">
            <CardContent className="flex flex-col items-center">
              <FileText className="h-10 w-10 text-red-500 mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-700">Content</div>
            </CardContent>
          </Card>

          {/* Total Visitors Card */}
          <Card className="rounded-lg bg-yellow-100 text-center p-4">
            <CardContent className="flex flex-col items-center">
              <Eye className="h-10 w-10 text-yellow-500 mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-700">Visitor</div>
            </CardContent>
          </Card>

          {/* New Users Card */}
          <Card className="rounded-lg bg-green-100 text-center p-4">
            <CardContent className="flex flex-col items-center">
              <UserPlus className="h-10 w-10 text-green-500 mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-700">New User</div>
            </CardContent>
          </Card>

          {/* Registered Users Card */}
          <Card className="rounded-lg bg-purple-100 text-center p-4">
            <CardContent className="flex flex-col items-center">
              <Users className="h-10 w-10 text-purple-500 mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-gray-700">Registered User</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bar Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Total Posts by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryPostData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="posts" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Popular Content Table */}
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Likes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularContentData.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell>{content.title}</TableCell>
                        <TableCell>{content.views}</TableCell>
                        <TableCell>{content.likes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
