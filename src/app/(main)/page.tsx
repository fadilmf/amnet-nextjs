import Image from "next/image";
import Link from "next/link";
import CarouselHome from "@/components/carousel-home";
import BestPracticesDimensions from "@/components/best-practice-dimension";
import { NewsCard } from "@/components/news/news-card";

export default function Home() {
  const countries = [
    { name: "Brunei Darussalam", image: "/flags2/brunei.png", link: "brunei" },
    { name: "Cambodia", image: "/flags2/cambodia.png", link: "cambodia" },
    { name: "Indonesia", image: "/flags2/indonesia.png", link: "indonesia" },
    { name: "Laos", image: "/flags2/laos.png", link: "laos" },
    { name: "Malaysia", image: "/flags2/malaysia.png", link: "malaysia" },
    { name: "Myanmar", image: "/flags2/myanmar.png", link: "myanmar" },
    {
      name: "Philippines",
      image: "/flags2/philippines.png",
      link: "philippines",
    },
    { name: "Singapore", image: "/flags2/singapore.png", link: "singapore" },
    { name: "Thailand", image: "/flags2/thailand.png", link: "thailand" },
    { name: "Timor Leste", image: "/flags2/timor.png", link: "timorleste" },
    { name: "Vietnam", image: "/flags2/vietnam.png", link: "vietnam" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <CarouselHome />

      {/* Categories Grid */}
      {/* <section className="bg-gray-50 py-16">
        <div className="flex flex-col items-center p-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            DIMENSION OF BEST PRACTICES
          </h1>

          <div className="w-1/4 h-1 bg-gray-800 my-4"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {dimensions.map((dimension, index) => (
              <div
                key={index}
                className="bg-green-600 text-white p-6 rounded-lg shadow-md flex flex-col items-start"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{dimension.icon}</span>
                  <h2 className="text-xl font-semibold">{dimension.title}</h2>
                </div>

                <ul className="list-disc pl-6 space-y-2">
                  {dimension.items.map((item, idx) => (
                    <li key={idx} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <BestPracticesDimensions />

      {/* Countries Section */}
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
                className="flex flex-col items-center hover:bg-gray-300 rounded-md p-4"
              >
                <Image
                  src={country.image}
                  alt={country.name}
                  width={200}
                  height={200}
                  className=" object-cover rounded-md shadow-lg"
                />
                <p className="text-center text-sm font-medium mt-2">
                  {country.name.toUpperCase()}
                </p>
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

          {/* <div className="mt-8 flex justify-around w-full bg-red-400"> */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-44 ">
            <div className="flex flex-col items-center 0">
              <h1 className="text-7xl font-bold">9</h1>
              <h1 className="mt-4 text-xl">Countries</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-7xl font-bold">2</h1>
              <h1 className="mt-4 text-xl">Total Best Practices</h1>
            </div>
            <div className="flex flex-col items-center ">
              <h1 className="text-7xl font-bold">1</h1>
              <h1 className="mt-4 text-xl">Your Best Practices</h1>
            </div>
          </div>

          {/* statistics */}
          <div></div>
        </div>
      </section>
    </div>
  );
}
