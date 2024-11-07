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

interface Article {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  keyword: string;
  cover: string;
}

export default function AdminContentPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("lastUpdated");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
        console.log("ini artikel data: ", data);
      } catch (err) {
        setError("Error fetching articles. Please try again later.");
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "lastUpdated") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const yourContent = sortedArticles.slice(0, 3); // Assuming the first 3 are "Your Content"
  const allContent = sortedArticles;

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
          <h2 className="text-2xl font-semibold">Your Content</h2>
          <Link
            href="/admin/dashboard/content/add"
            className="bg-yellow-500 text-white rounded-md px-4 py-2"
          >
            Add Content
          </Link>
        </div>
        {yourContent.length === 0 ? (
          <p className="text-gray-500">Belum ada data</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {yourContent.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                summary={article.summary}
                author={article.author}
                date={article.date}
                keywords={article.keyword.split(",")}
                imageUrl={article.cover}
                // imageUrl={""}
              />
            ))}
          </div>
        )}
      </div>

      {/* "All Content" Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Content</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allContent.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              summary={article.summary}
              author={article.author}
              date={article.date}
              keywords={article.keyword.split(",")}
              imageUrl={article.cover}
            />
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/content" className="text-green-600">
            Show All →
          </Link>
        </div>
      </div>
    </div>
  );
}
