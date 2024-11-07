// src/components/country-articles-list.tsx
"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/article-card";
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
  snippet: string;
  author: string;
  date: string;
  keywords: string[];
  imageUrl: string;
}

interface CountryArticlesListProps {
  articles: Article[];
}

export default function CountryArticlesList({
  articles,
}: CountryArticlesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filteredAndSortedArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedArticles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>

      {filteredAndSortedArticles.length === 0 && (
        <p className="text-center text-muted-foreground">No articles found.</p>
      )}
    </div>
  );
}
