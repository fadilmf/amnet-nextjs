import Image from "next/image";

const countries = [
  {
    name: "Indonesia",
    nickname: "The Emerald of the Equator",
    flag: "https://flagcdn.com/h60/id.png",
    color: "bg-red-600",
    content:
      "From the mystical temples of Borobudur to the serene waters of Raja Ampat, Indonesia stands as a testament to the boundless beauty of nature and human spirit. With over 17,000 islands, its diversity is mirrored in the myriad languages, traditions, and flavors found across its regions. The lush mangrove forests, vital to the global ecological balance, weave a narrative of sustainability and heritage that Indonesians are deeply proud of.",
  },
  {
    name: "Malaysia",
    nickname: "The Harmony of Cultures",
    flag: "/malaysia.png",
    color: "bg-yellow-400",
    content:
      "In Malaysia, the harmonious blend of Malay, Chinese, Indian, and indigenous cultures creates a symphony of colors and experiences. Its mangrove-rich coastlines not only protect the land but nourish the communities that call it home. The Petronas Towers soar into the sky, a modern beacon of Malaysia's vision, while ancient rainforests whisper stories of a timeless past.",
  },
  {
    name: "Thailand",
    nickname: "The Land of Smiles",
    flag: "https://flagcdn.com/h60/th.png",
    color: "bg-blue-600",
    content:
      "Thailand, where the majestic Chao Phraya River cradles the bustling heart of Bangkok, is a land where smiles transcend language. From the golden hues of Buddhist temples to the fertile mangroves that buffer its coastline, Thailand embodies the balance between spiritual peace and environmental stewardship. The essence of Thai culture—hospitality, resilience, and a love for life—flows as generously as its rivers.",
  },
  {
    name: "Vietnam",
    nickname: "The Land of the Ascending Dragon",
    flag: "https://flagcdn.com/h60/vn.png",
    color: "bg-red-500",
    content:
      "Vietnam's sweeping landscapes, from the emerald terraces of Sapa to the tranquil expanse of the Mekong Delta, tell tales of centuries past and the resilience of its people. The nation's mangroves play a crucial role, guarding coastal areas and providing livelihoods for many. Here, every bowl of phở and every smile exchanged in the busy streets of Hanoi reflects a heritage steeped in perseverance and hope.",
  },
  {
    name: "Philippines",
    nickname: "The Pearl of the Orient Seas",
    flag: "https://flagcdn.com/h60/ph.png",
    color: "bg-blue-500",
    content:
      "An archipelago blessed with over 7,000 islands, the Philippines resonates with laughter, music, and stories of bayanihan—the spirit of community. The mangroves, deeply interwoven with the lives of fishermen and coastal communities, stand as silent guardians against storms and a source of life. The warmth of the Filipino heart, coupled with breathtaking beaches and vivid fiestas, makes the nation a beacon of joy and resilience.",
  },
  {
    name: "Singapore",
    nickname: "The Garden of Modernity",
    flag: "https://flagcdn.com/h60/sg.png",
    color: "bg-red-500",
    content:
      "Singapore, a testament to the power of vision and innovation, has emerged as a green jewel where urban life meets lush greenery. The city-state's commitment to sustainability is evident in its meticulous care for green spaces and thriving mangrove patches. Beyond the sleek skyline and cutting-edge technology lies a story of a diverse population working together to craft a brighter future.",
  },
  {
    name: "Myanmar",
    nickname: "The Hidden Gem of Timeless Traditions",
    flag: "https://flagcdn.com/h60/mm.png",
    color: "bg-yellow-500",
    content:
      "With its golden stupas glistening under the sun and the Ayeyarwady River flowing gracefully, Myanmar is a land of traditions and stories passed down through generations. The mangroves along its coast are lifelines for local communities, embodying nature's resilience amid change. Despite challenges, the people's warmth and deep-rooted values shine, offering visitors an experience that feels like stepping into a sacred tale.",
  },
  {
    name: "Cambodia",
    nickname: "The Kingdom of Wonders",
    flag: "https://flagcdn.com/h60/kh.png",
    color: "bg-red-700",
    content:
      "Cambodia, known for the grandeur of Angkor Wat and the depth of its cultural heritage, is a nation that wears its history with pride and hope. The country's mangroves are a vital thread in the fabric of rural life, supporting both ecological health and livelihoods. The Khmer spirit—marked by strength, kindness, and an unwavering smile—welcomes all who come to explore its rich and storied land.",
  },
  {
    name: "Laos",
    nickname: "The Serene Heart of Southeast Asia",
    flag: "https://flagcdn.com/h60/la.png",
    color: "bg-red-600",
    content:
      "Laos, where life flows as gently as the Mekong, invites a slower, introspective journey. Its unspoiled mangroves and forests are a reflection of the nation's respect for nature. The people of Laos embrace simplicity, spirituality, and community, offering visitors a warmth that feels like home. Amidst its temples and misty mountains lies a promise of peace and profound connection.",
  },
  {
    name: "Brunei",
    nickname: "The Land of Tranquility and Majesty",
    flag: "https://flagcdn.com/h60/bn.png",
    color: "bg-yellow-600",
    content:
      "Brunei, with its wealth steeped in oil and its vision rooted in heritage, is a nation that exudes quiet confidence. The mangrove forests here are pristine, forming a serene haven that echoes the country's dedication to conservation. The sultanate's golden domes, traditional water villages, and thoughtful pace of life create an atmosphere where the past and present harmonize effortlessly.",
  },
  {
    name: "Timor-Leste",
    nickname: "The Rising Sun of Southeast Asia",
    flag: "https://flagcdn.com/h60/tl.png",
    color: "bg-red-500",
    content:
      "The youngest ASEAN nation, Timor-Leste, is a place where hope and history coalesce. Its mangroves and coastal forests play a pivotal role in protecting its shores, while its people embody a spirit of rebuilding and renewal. With breathtaking landscapes and a cultural tapestry woven from indigenous roots and Portuguese influence, Timor-Leste stands as a testament to courage and new beginnings.",
  },
];

export default function AseanCountries() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <Image
            src="/logoasean.png" // Pastikan path ini benar sesuai lokasi di folder public Anda
            alt="ASEAN Logo"
            width={200} // Sesuaikan ukuran logo
            height={200}
            className="mb-4"
          />
        </div>
        <h1 className="text-4xl font-bold text-center mb-8">
          Discovering the Heart of ASEAN
        </h1>
        <p className="text-xl text-center mb-12">
          A Warm Embrace of Diversity and Unity
        </p>
        <p className="text-lg mb-12 text-justify">
          Southeast Asia, a region where the vibrant pulse of culture,
          tradition, and natural beauty intertwines seamlessly, is home to the
          nations that form the ASEAN community. Each country, unique in its
          essence, contributes to a tapestry rich with history, resilience, and
          dreams. Let's embark on a journey through this extraordinary
          collection of lands and people, embracing their stories, strengths,
          and the profound bonds that tie them together.
        </p>
        <div className="space-y-12">
          {countries.map((country) => (
            <div
              key={country.name}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div
                className={`${country.color} p-6 flex items-center justify-between`}
              >
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {country.name}
                  </h2>
                  <p className="text-lg text-white opacity-90">
                    {country.nickname}
                  </p>
                </div>
                <Image
                  src={country.flag}
                  alt={`${country.name} flag`}
                  width={90}
                  height={60}
                  className="rounded"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed text-justify">
                  {country.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
