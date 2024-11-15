"use client";

import Image from "next/image";
import Link from "next/link";
import CarouselHome from "@/components/carousel-home";
import BestPracticesDimensions from "@/components/best-practice-dimension";
import { NewsCard } from "@/components/news/news-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArticleCard } from "@/components/article-card";

interface Article {
  id: number;
  title: string;
  summary: string;
  cover: string | null; // Base64 string for cover image or null
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/content/latest");
        setArticles(response.data);
      } catch (err) {
        setError("Failed to load articles");
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  const countries = [
    {
      name: "Brunei Darussalam",
      image: "https://flagcdn.com/w320/bn.png",
      link: "brunei",
    },
    {
      name: "Cambodia",
      image: "https://flagcdn.com/w320/kh.png",
      link: "cambodia",
    },
    {
      name: "Indonesia",
      image: "https://flagcdn.com/w320/id.png",
      link: "indonesia",
    },
    { name: "Laos", image: "https://flagcdn.com/w320/la.png", link: "laos" },
    {
      name: "Malaysia",
      image: "https://flagcdn.com/w320/my.png",
      link: "malaysia",
    },
    {
      name: "Myanmar",
      image: "https://flagcdn.com/w320/mm.png",
      link: "myanmar",
    },
    {
      name: "Philippines",
      image: "https://flagcdn.com/w320/ph.png",
      link: "philippines",
    },
    {
      name: "Singapore",
      image: "https://flagcdn.com/w320/sg.png",
      link: "singapore",
    },
    {
      name: "Thailand",
      image: "https://flagcdn.com/w320/th.png",
      link: "thailand",
    },
    {
      name: "Timor Leste",
      image: "https://flagcdn.com/w320/tl.png",
      link: "timorleste",
    },
    {
      name: "Vietnam",
      image: "https://flagcdn.com/w320/vn.png",
      link: "vietnam",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <CarouselHome />
      <BestPracticesDimensions />
      {/* Grid for Flags */}
      <section className="bg-white py-16">
        <div className="flex flex-col items-center p-4">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center my-6">
            BEST PRACTICES BY COUNTRIES
          </h1>

          {/* Line Divider */}
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>

          {/* Grid for Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-24 mt-8">
            {countries.map((country, index) => (
              <Link
                href={`/content/${country.link}`}
                key={index}
                className="flex flex-col items-center"
              >
                {/* Card Wrapper */}
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                  {/* Card for Flag */}
                  <div className="bg-gray-100 rounded-md shadow-md p-2">
                    <Image
                      src={country.image}
                      alt={country.name}
                      width={200}
                      height={120}
                      className="object-cover rounded-md"
                    />
                  </div>
                  {/* Card for Country Name */}
                  <div className="mt-2 w-full bg-gray-50 rounded-md shadow-sm p-2 flex items-center justify-center min-h-[50px]">
                    <p className="text-center text-sm font-medium">
                      {country.name.toUpperCase()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 flex flex-col w-full px-4 py-16">
        <div className="flex flex-col items-center p-4">
          <h2 className="text-2xl font-semibold text-center mb-8">ARTICLES</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
          {loading ? (
            <p>Loading articles...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  summary={article.summary}
                  imageUrl={article.cover}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
