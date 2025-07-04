"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { PublicArticleCard } from "@/components/public-article-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Article {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  cover: string;
  keywords?: string; // Make keywords optional to handle undefined case
  imageUrl: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/content");
        setArticles(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter and sort articles
  const filteredAndSortedArticles = articles
    .filter((article) => {
      const keywordArray = Array.isArray(article.keywords)
        ? article.keywords.map((k: string) => k.toLowerCase())
        : []; // Use empty array if keywords is undefined or not an array

      return (
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        keywordArray.some((keyword) =>
          keyword.includes(searchTerm.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-64"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="title">Sort by Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredAndSortedArticles.length === 0 ? (
        <p className="text-center text-muted-foreground">No articles found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedArticles.map((article) => (
            <PublicArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              summary={article.summary}
              imageUrl={article.cover}
              author={article.author}
              date={article.date}
              keywords={Array.isArray(article.keywords) ? article.keywords : []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
