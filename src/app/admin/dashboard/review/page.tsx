"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ReviewContent {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  user: {
    username: string;
    name: string;
    email: string;
  };
  country: {
    countryName: string;
    name: string;
  };
}

export default function ReviewPage() {
  const router = useRouter();
  //   const { user, status } = useAuth();
  const { user } = useAuth();
  const [contents, setContents] = useState<ReviewContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }

    if (user && user.role !== "SUPER_ADMIN") {
      router.push("/admin/dashboard");
    }
    //   }, [user, status, router]);
  }, [user, router]);

  useEffect(() => {
    fetchReviewContents();
  }, []);

  const fetchReviewContents = async () => {
    try {
      const response = await fetch("/api/admin/review");
      const data = await response.json();

      if (response.ok) {
        setContents(data);
        console.log("ini data: ", data);
      } else {
        console.error("Failed to fetch review contents:", data.error);
      }
    } catch (error) {
      console.error("Error fetching review contents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessing(id);
    try {
      const response = await fetch("/api/admin/review", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action }),
      });

      if (response.ok) {
        await fetchReviewContents(); // Refresh the list
      } else {
        const data = await response.json();
        console.error(`Failed to ${action} content:`, data.error);
      }
    } catch (error) {
      console.error(`Error ${action}ing content:`, error);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Content Review</CardTitle>
          <CardDescription>
            Review and approve content submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contents.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">
              No content waiting for review
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contents.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>{content.title}</TableCell>
                    <TableCell>{content.author}</TableCell>
                    <TableCell>{content.country.countryName}</TableCell>
                    <TableCell>{content.user.username}</TableCell>
                    <TableCell>
                      {format(new Date(content.createdAt), "PPP")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleAction(content.id, "approve")}
                          disabled={!!processing}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {processing === content.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleAction(content.id, "reject")}
                          disabled={!!processing}
                        >
                          {processing === content.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
