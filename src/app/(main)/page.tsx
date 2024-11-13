import Image from "next/image";
import Link from "next/link";
import CarouselHome from "@/components/carousel-home";
import BestPracticesDimensions from "@/components/best-practice-dimension";
import { NewsCard } from "@/components/news/news-card";

export default function Home() {
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
      {/* News Section */}
      <section className="bg-gray-50 flex flex-col w-full px-4 py-16">
        <div className="flex flex-col items-center p-4">
          <h2 className="text-2xl font-semibold text-center mb-8">NEWS</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* Add news cards here */}
            <NewsCard
              title="Build prototypes with thousands of components."
              description="berita tes"
            />

            <NewsCard
              title="Lorem ipsum"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint neque aliquam Lorem ipsum Lorem ipsum Lorem ipsum"
            />
            <NewsCard
              title="tes"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint neque aliquam"
            />
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <section className="bg-white py-16">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center mb-8">
            STATISTICS
          </h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-44 ">
            <div className="flex flex-col items-center">
              <h1 className="text-7xl font-bold">9</h1>
              <h1 className="mt-4 text-xl">Countries</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-7xl font-bold">2</h1>
              <h1 className="mt-4 text-xl">Total Best Practices</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-7xl font-bold">1</h1>
              <h1 className="mt-4 text-xl">Your Best Practices</h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
