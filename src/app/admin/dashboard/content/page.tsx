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
import { PublishedArticleCard } from "@/components/published-article-card";

// Updated interface to match new schema
interface Article {
  id: number;
  title: string | null;
  summary: string | null;
  author: string | null;
  date: string | null;
  keywords: string[];
  cover: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
}

export default function AdminContentPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("lastUpdated");

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/admin/content");
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();

      // Transform the data to match our Article interface
      const transformedArticles: Article[] = data.map((item: any) => ({
        id: item.id,
        title: item.title || "",
        summary: item.summary || "",
        author: item.author || "",
        date: item.date ? new Date(item.date).toISOString() : null,
        keywords: item.keywords || [],
        cover: item.cover || "", // base64 string from API
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));

      setArticles(transformedArticles);
    } catch (err) {
      setError("Error fetching articles. Please try again later.");
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      article.title?.toLowerCase().includes(searchLower) ||
      article.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchLower)
      )
    );
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "lastUpdated") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === "alphabetical") {
      return (a.title || "").localeCompare(b.title || "");
    }
    return 0;
  });

  // Filter untuk konten yang published dan draft
  const publishedContent = sortedArticles.filter(
    (article) => article.status === "PUBLISHED"
  );
  const draftContent = sortedArticles.filter(
    (article) => article.status === "DRAFT"
  );

  // Handler untuk refresh data setelah membuat draft
  const handleDraftCreated = () => {
    fetchArticles();
  };

  const handleDelete = () => {
    fetchArticles(); // Refresh the list after deletion
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
      {/* Search and Sort Section */}
      <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
        <div className="flex flex-1 items-center gap-2">
          <Input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-80"
          />
          <Button className="bg-yellow-500 text-white px-4 py-2">Go</Button>
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

      {/* "Your Content" Section */}
      <div className="mb-8">
        <div className="flex gap-4 items-center mb-4">
          {/* <h2 className="text-2xl font-semibold">Your Content</h2> */}
          <Link
            href="/admin/dashboard/content/add"
            className="bg-yellow-500 text-white rounded-md px-4 py-2"
          >
            Add Content
          </Link>
        </div>
        {/* {draftContent.length === 0 ? (
          <p className="text-gray-500">No drafts available</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {draftContent.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id.toString()}
                title={article.title || "Untitled"}
                summary={article.summary || "No summary available"}
                author={article.author || "Unknown"}
                date={article.date || article.createdAt}
                keywords={article.keywords}
                imageUrl={article.cover}
              />
            ))}
          </div>
        )} */}
      </div>

      {/* "Published Content" Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Published Content</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publishedContent.map((article) => (
            <PublishedArticleCard
              key={article.id}
              id={article.id.toString()}
              title={article.title || "Untitled"}
              summary={article.summary || "No summary available"}
              author={article.author || "Unknown"}
              date={article.date || article.createdAt}
              keywords={article.keywords}
              imageUrl={article.cover}
              onDraftCreated={handleDraftCreated}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
