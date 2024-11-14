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
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define the Article type
interface Article {
  id: number;
  title: string;
  lastUpdated: string;
  keywords: string[];
  author: string;
  date: string;
  summary: string;
  image: string;
}

// Sample article data
const articles: Article[] = []; // Explicitly type as an array of Article

export default function AdminDraftPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("lastUpdated");

  // Filter articles based on search term
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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

      {/* Drafts Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Drafts</h2>

        {/* Check if there are any filtered articles */}
        {/* {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No drafts found. Please add new content or adjust your search
            criteria.
          </p>
        )} */}

        <div className="mt-4 text-right">
          <Link href="/content" className="text-green-600">
            Show All →
          </Link>
        </div>
      </div>
    </div>
  );
}
