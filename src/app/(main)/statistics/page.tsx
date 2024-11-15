"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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

interface StatisticData {
  totalContent: number;
  totalVisitors: number;
  newUsers: number;
  registeredUsers: number;
}

interface PostByCountryData {
  country: string;
  posts: number;
}

interface PopularContentData {
  id: number;
  title: string;
  views: number;
  likes: number;
}

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<StatisticData | null>(null);
  const [postsByCountry, setPostsByCountry] = useState<PostByCountryData[]>([]);
  const [popularContent, setPopularContent] = useState<PopularContentData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        setStatistics(response.data.summary);
        setPostsByCountry(response.data.postsByCountry);
        setPopularContent(response.data.mostPopularContent);
      } catch (err) {
        setError("Failed to load statistics");
        console.error("Error fetching statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
              <div className="text-2xl font-bold">
                {statistics?.totalContent || 0}
              </div>
              <div className="text-sm text-gray-700">Content</div>
            </CardContent>
          </Card>

          {/* Total Visitors Card */}
          <Card className="rounded-lg bg-yellow-100 text-center p-4">
            <CardContent className="flex flex-col items-center">
              <Eye className="h-10 w-10 text-yellow-500 mb-2" />
              <div className="text-2xl font-bold">
                {statistics?.totalVisitors || 0}
              </div>
              <div className="text-sm text-gray-700">Visitor</div>
            </CardContent>
          </Card>

          {/* New Users Card */}
          <Card className="rounded-lg bg-green-100 text-center p-4">
            <CardContent className="flex flex-col items-center">
              <UserPlus className="h-10 w-10 text-green-500 mb-2" />
              <div className="text-2xl font-bold">
                {statistics?.newUsers || 0}
              </div>
              <div className="text-sm text-gray-700">New User</div>
            </CardContent>
          </Card>

          {/* Registered Users Card */}
          <Card className="rounded-lg bg-purple-100 text-center p-4">
            <CardContent className="flex flex-col items-center">
              <Users className="h-10 w-10 text-purple-500 mb-2" />
              <div className="text-2xl font-bold">
                {statistics?.registeredUsers || 0}
              </div>
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
                <BarChart data={postsByCountry}>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularContent.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell>{content.title}</TableCell>
                        <TableCell>{content.views}</TableCell>
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
