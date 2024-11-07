import { notFound } from "next/navigation";
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

const countryDataMap: Record<Country, { name: string }> = {
  indonesia: { name: "Indonesia" },
  malaysia: { name: "Malaysia" },
  thailand: { name: "Thailand" },
  philippines: { name: "Philippines" },
  vietnam: { name: "Vietnam" },
  brunei: { name: "Brunei" },
  cambodia: { name: "Cambodia" },
  laos: { name: "Laos" },
  myanmar: { name: "Myanmar" },
  singapore: { name: "Singapore" },
  timorleste: { name: "Timor-Leste" },
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

  // Filter articles based on the `country` parameter
  const countryArticles = articles.filter(
    (article) => article.country === country
  );

  // Check if the country is valid
  if (!countryDataMap[country]) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Articles in {countryDataMap[country].name}
      </h1>

      {countryArticles.length > 0 ? (
        <CountryArticlesList articles={countryArticles} />
      ) : (
        <div className="h-[800px]">
          <p>No articles in {countryDataMap[country].name}.</p>
        </div>
      )}
    </div>
  );
}
