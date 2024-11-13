import { notFound } from "next/navigation";
import Image from "next/image";
import { Frown } from "lucide-react";
import CountryArticlesList from "@/components/country-articles-list";

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

// Mock data for articles, each with a `country` property
const articles = [
  {
    id: "1",
    title: "The Importance of Mangrove Conservation",
    snippet:
      "Mangroves play a crucial role in coastal ecosystems, providing habitat for diverse species and protecting shorelines...",
    author: "Dr. Jane Smith",
    date: "2024-05-15",
    keywords: ["conservation", "mangroves", "ecosystem"],
    country: "indonesia",
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
    country: "malaysia",
    imageUrl: "/images/sustainable-fishing.jpg",
  },
  // Add more mock articles as needed
];

// `generateStaticParams` to define static paths for the allowed countries
export async function generateStaticParams() {
  return Object.keys(countryDataMap).map((country) => ({
    country,
  }));
}

export default async function CountryContentPage({
  params,
}: {
  params: { country: Country };
}) {
  const { country } = await params;

  // Check if the country is valid
  if (!countryDataMap[country]) {
    notFound();
  }

  // Filter articles based on the `country` parameter
  const countryArticles = articles.filter(
    (article) => article.country === country
  );

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

      {countryArticles.length > 0 ? (
        <CountryArticlesList articles={countryArticles} />
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
