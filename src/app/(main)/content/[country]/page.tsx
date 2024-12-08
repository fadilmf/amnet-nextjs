"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { Frown } from "lucide-react";
import { PublicArticleCard } from "@/components/public-article-card";
import { useEffect, useState } from "react";

type Country =
  | "brunei"
  | "cambodia"
  | "indonesia"
  | "laos"
  | "malaysia"
  | "myanmar"
  | "philippines"
  | "singapore"
  | "thailand"
  | "timorleste"
  | "vietnam";

const countryDataMap: Record<Country, { name: string; flagUrl: string }> = {
  indonesia: {
    name: "Indonesia",
    flagUrl: "https://flagcdn.com/h60/id.png",
  },
  malaysia: {
    name: "Malaysia",
    flagUrl: "https://flagcdn.com/h60/my.png",
  },
  thailand: {
    name: "Thailand",
    flagUrl: "https://flagcdn.com/h60/th.png",
  },
  philippines: {
    name: "Philippines",
    flagUrl: "https://flagcdn.com/h60/ph.png",
  },
  vietnam: {
    name: "Vietnam",
    flagUrl: "https://flagcdn.com/h60/vn.png",
  },
  brunei: {
    name: "Brunei",
    flagUrl: "https://flagcdn.com/h60/bn.png",
  },
  cambodia: {
    name: "Cambodia",
    flagUrl: "https://flagcdn.com/h60/kh.png",
  },
  laos: {
    name: "Laos",
    flagUrl: "https://flagcdn.com/h60/la.png",
  },
  myanmar: {
    name: "Myanmar",
    flagUrl: "https://flagcdn.com/h60/mm.png",
  },
  singapore: {
    name: "Singapore",
    flagUrl: "https://flagcdn.com/h60/sg.png",
  },
  timorleste: {
    name: "Timor-Leste",
    flagUrl: "https://flagcdn.com/h60/tl.png",
  },
};

// Definisikan interface untuk Content berdasarkan schema Prisma
interface Content {
  id: string;
  title: string;
  cover: string;
  summary: string;
  author: string;
  date: string;
  keywords: string[];
  status: string;
  countryId: number;
  // ... tambahkan field lain sesuai kebutuhan
}

// Map nama negara ke countryId
const countryIdMap: Record<Country, number> = {
  brunei: 1,
  cambodia: 2,
  indonesia: 3,
  laos: 4,
  malaysia: 5,
  myanmar: 6,
  philippines: 7,
  singapore: 8,
  thailand: 9,
  timorleste: 10,
  vietnam: 11,
};

export default function CountryContentPage() {
  const params = useParams();
  const country = params?.country as Country;
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setIsLoading(true);
        const countryId = countryIdMap[country];
        const response = await fetch(`/api/content?countryId=${countryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch contents");
        }
        const data = await response.json();
        setContents(data);
      } catch (error) {
        console.error("Error fetching contents:", error);
        setContents([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (country) {
      fetchContents();
    }
  }, [country]);

  // Check if the country is valid
  if (!country || !countryDataMap[country]) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <Image
          src={countryDataMap[country].flagUrl}
          alt={`${countryDataMap[country].name} flag`}
          width={50}
          height={50}
          className="mr-2"
        />
        <h1 className="text-3xl font-bold">
          Articles from {countryDataMap[country].name}
        </h1>
      </div>

      {isLoading ? (
        <div className="h-[800px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        </div>
      ) : contents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <PublicArticleCard
              key={content.id}
              id={content.id}
              title={content.title}
              summary={content.summary}
              author={content.author}
              date={content.date}
              keywords={content.keywords}
              imageUrl={content.cover}
            />
          ))}
        </div>
      ) : (
        <div className="h-[800px] flex flex-col items-center justify-center text-gray-500">
          <Frown size={200} className="mb-4" />
          <p className="text-5xl font-semibold mb-2">OOPS!</p>
          <p className="text-center text-lg">
            It looks like no articles have been uploaded from this country yet.
            Contact your country admin or sign up to become one!
          </p>
        </div>
      )}
    </div>
  );
}
