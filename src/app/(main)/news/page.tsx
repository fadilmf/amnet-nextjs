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

// Mock data for articles
const articles = [
  {
    id: "1",
    title: "The Importance of Mangrove Conservation",
    snippet:
      "Mangroves play a crucial role in coastal ecosystems, providing habitat for diverse species and protecting shorelines...",
    author: "Dr. Jane Smith",
    date: "2024-05-15",
    keywords: ["conservation", "mangroves", "ecosystem"],
    imageUrl: "/images/mangrove-conservation.jpg",
  },
  {
    id: "2",
    title: "Sustainable Fishing Practices in ASEAN",
    snippet:
      "ASEAN countries are implementing new sustainable fishing practices to preserve marine biodiversity and ensure...",
    author: "John Doe",
    date: "2024-05-10",
    keywords: ["fishing", "sustainability", "ASEAN"],
    imageUrl: "/images/sustainable-fishing.jpg",
  },
  {
    id: "3",
    title: "Climate Change Impact on Southeast Asian Forests",
    snippet:
      "Recent studies show alarming effects of climate change on the forests of Southeast Asia, including increased...",
    author: "Dr. Maria Garcia",
    date: "2024-05-05",
    keywords: ["climate change", "forests", "Southeast Asia"],
    imageUrl: "/images/southeast-asian-forests.jpg",
  },
  // Add more mock articles as needed
];

export default function NewsPage() {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">News</h1>

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
