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
import { FileText, Users } from "lucide-react";
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

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Content
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Visitors
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,678</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Registered Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,678</div>
            </CardContent>
          </Card>
        </div>

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
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
