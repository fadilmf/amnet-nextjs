"use client";

import { useState, useEffect } from "react";
import { ArticleCard } from "@/components/article-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface Draft {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
  cover: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminDraftPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get("/api/admin/draft");

        console.log("ini response:", response.data);
        setDrafts(response.data);
      } catch (err) {
        setError("Failed to fetch drafts");
        console.error("Error fetching drafts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  const filteredDrafts = drafts.filter(
    (draft) =>
      draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedDrafts = [...filteredDrafts].sort((a, b) => {
    if (sortBy === "lastUpdated") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const handleDelete = () => {
    // Refresh drafts list after deletion
    const fetchDrafts = async () => {
      try {
        const response = await axios.get("/api/admin/draft");
        setDrafts(response.data);
      } catch (err) {
        setError("Failed to fetch drafts");
        console.error("Error fetching drafts:", err);
      }
    };
    fetchDrafts();
  };

  const handlePublish = async (id: string) => {
    try {
      // Implement your publish logic here
      await axios.patch(`/api/content/${id}`, { status: "PUBLISHED" });
      // Refresh the drafts list
      const response = await axios.get("/api/admin/draft");
      setDrafts(response.data);
    } catch (err) {
      console.error("Error publishing content:", err);
      // Handle error appropriately
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
        <div className="flex flex-1 items-center gap-2">
          <Input
            type="text"
            placeholder="Search drafts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-80"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Sort by</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Last Updated" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastUpdated">Last Updated</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Drafts</h2>
        {sortedDrafts.length === 0 ? (
          <p className="text-gray-500 text-center">No drafts found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedDrafts.map((draft) => (
              <div key={draft.id}>
                <ArticleCard
                  id={draft.id.toString()}
                  title={draft.title}
                  summary={draft.summary}
                  author={draft.author}
                  date={draft.date}
                  keywords={draft.keywords}
                  imageUrl={draft.cover}
                  onDelete={handleDelete}
                  onPublish={() => handlePublish(draft.id.toString())}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
