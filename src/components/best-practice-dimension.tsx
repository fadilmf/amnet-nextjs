// "use client";

// import { useState } from "react";

// // Define a type for a single Dimension
// interface Dimension {
//   title: string;
//   icon: string;
//   items: string[];
//   description: string;
// }

// // Dimension data
// const dimensions: Dimension[] = [
//   {
//     title: "Ecology",
//     icon: "🌍",
//     items: [
//       "Rehabilitation of mangrove ecosystems",
//       "Changes in the coastline",
//     ],
//     description:
//       "The Ecological Dimension encompasses all data, information, or parameters that describe the ecological condition of the mangrove ecosystem in a given location.",
//   },
//   {
//     title: "Social",
//     icon: "👥",
//     items: ["Conflicts over mangrove resource utilization"],
//     description:
//       "The Social Dimension encompasses all data, information, or parameters that describe the social condition of the mangrove ecosystem in a given location.",
//   },
//   {
//     title: "Economy",
//     icon: "💰",
//     items: [],
//     description:
//       "The Economic Dimension encompasses all data, information, or parameters that describe the economic condition of the community within the mangrove ecosystem in a given location.",
//   },
//   {
//     title: "Institutional",
//     icon: "🏛️",
//     items: [],
//     description:
//       "The Institutional Dimension encompasses all data, information, or parameters that describe the institutional condition of mangrove ecosystem management at a given location.",
//   },
//   {
//     title: "Technology",
//     icon: "💻",
//     items: [],
//     description:
//       "The Technological Dimension encompasses all data, information, or parameters that describe the technology used in the management of the mangrove ecosystem at a given location.",
//   },
// ];

// const BestPracticesDimensions: React.FC = () => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16">
//       <div className="flex flex-col items-center p-4 w-full">
//         <h1 className="text-3xl font-bold text-center mb-6">
//           DIMENSION OF BEST PRACTICES
//         </h1>
//         <div className="w-1/4 h-1 bg-gray-800 my-4"></div>

//         {/* Grid of Dimensions */}
//         {hoveredIndex === null ? (
//           // Tampilkan grid hanya jika tidak ada kartu yang di-hover
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full mx-auto">
//             {dimensions.map((dimension, index) => (
//               <div
//                 key={index}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 className="bg-green-600 text-white p-6 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out"
//               >
//                 <div className="flex items-center mb-4">
//                   <span className="text-4xl mr-3">{dimension.icon}</span>
//                   <h2 className="text-xl font-semibold">{dimension.title}</h2>
//                 </div>
//                 <p className="text-sm">{dimension.description}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           // Expanded view muncul saat ada kartu yang di-hover
//           <div
//             onMouseLeave={() => setHoveredIndex(null)} // Kembali ke grid saat mouse keluar
//             className="bg-green-700 text-white p-8 rounded-lg shadow-lg max-w-2xl w-full transition-transform duration-300 ease-in-out"
//           >
//             <div className="flex items-center mb-6">
//               <span className="text-5xl mr-4">
//                 {dimensions[hoveredIndex].icon}
//               </span>
//               <h2 className="text-3xl font-semibold">
//                 {dimensions[hoveredIndex].title}
//               </h2>
//             </div>
//             <p className="text-base mb-4">
//               {dimensions[hoveredIndex].description}
//             </p>
//             <ul className="list-disc pl-6 space-y-2">
//               {dimensions[hoveredIndex].items.map((item, idx) => (
//                 <li key={idx} className="text-sm">
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default BestPracticesDimensions;

"use client";

import { CircleX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Define a type for a single Dimension
interface Dimension {
  title: string;
  icon: string;
  items: string[];
  description: string;
}

// Dimension data
const dimensions: Dimension[] = [
  {
    title: "Ecology",
    icon: "🌍",
    items: [
      "a. Mangrove ecosystem rehabilitation",
      "b. Mangrove vegetation density Width of mangroves in the greenbelt/coastal buffer zone",
      "c. Width of mangroves in the greenbelt/coastal buffer zone",
      "d. Percentage of mangroves in the Mangrove Landscape Area (KLM)",
      "e. Percentage of mangroves in aquaculture units",
      "f. Shoreline changes",
      "g. Rate of mangrove ecosystem pressure",
      "h. Carbon management",
      "i. Coastal sedimentation",
      "j. Coastal abrasion",
    ],
    description:
      "The Ecological Dimension encompasses all data, information, or parameters that describe the ecological condition of the mangrove ecosystem in a given location.",
  },
  {
    title: "Social",
    icon: "👥",
    items: [
      "a. Conflict in mangrove resource utilization",
      "b. Coordination between aquaculture groups",
      "c. Number of households (RT) utilizing mangrove resources",
      "d. Participation in mangrove management",
      "e. Community education level",
      "f. Frequency of community meetings",
      "g. Implementation of legal sanctions on illegal logging activities",
      "h. Number of forest/aquaculture farmer groups",
    ],
    description:
      "The Social Dimension encompasses all data, information, or parameters that describe the social condition of the mangrove ecosystem in a given location.",
  },
  {
    title: "Economy",
    icon: "💰",
    items: [
      "a. Employment absorption",
      "b. Accessibility of mangrove areas",
      "c. Direct benefits of the mangrove ecosystem",
      "d. Indirect benefits of the mangrove ecosystem",
      "e. Percentage of community income from silvofishery aquaculture activities",
      "f. Percentage of community income from harvesting aquatic organisms in the mangrove ecosystem",
      "g. Ownership of aquaculture land",
      "h. Feasibility of aquaculture business",
      "i.  Contribution to Gross Regional Domestic Product (GRDP)",
    ],
    description:
      "The Economic Dimension encompasses all data, information, or parameters that describe the economic condition of the community within the mangrove ecosystem in a given location.",
  },
  {
    title: "Institutional",
    icon: "🏛️",
    items: [
      "a. Availability of policies and plans for mangrove forest management",
      "b. Availability of NGOs/supporting institutions",
      "c. Coordination between institutions",
      "d. Integration of management programs",
      "e. Intensity of mangrove aquaculture monitoring by Pandega (aquaculture guardians)",
      "f. Law enforcement",
      "g. Role of universities and academics",
    ],
    description:
      "The Institutional Dimension encompasses all data, information, or parameters that describe the institutional condition of mangrove ecosystem management at a given location.",
  },
  {
    title: "Technology",
    icon: "💻",
    items: [
      "a. Water quality monitoring",
      "b. Aquaculture water circulation management",
      "c. Effectiveness of dikes/wave barriers",
      "d. Aquaculture technology",
      "e. Mangrove cultivation technology",
      "f. Water resource management technology (e.g., water pumps)",
      "g. Abrasion control technology",
      "h. Flood/tidal flood prevention technology",
      "i. Sedimentation prevention technology",
    ],
    description:
      "The Technological Dimension encompasses all data, information, or parameters that describe the technology used in the management of the mangrove ecosystem at a given location.",
  },
];

const BestPracticesDimensions: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null); // Reference for detail view

  const handleCardClick = (index: number) => {
    // Toggle the selected index
    if (selectedIndex === index) {
      setSelectedIndex(null); // Close the details if the same card is clicked
    } else {
      setSelectedIndex(index); // Open the details for the clicked card
    }
  };

  const closeDetail = () => {
    setSelectedIndex(null); // Close the detail view
  };

  // Handle clicks outside the detail view to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailRef.current &&
        !detailRef.current.contains(event.target as Node)
      ) {
        closeDetail();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16">
      <div className="flex flex-col items-center p-4 w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          DIMENSION OF BEST PRACTICES
        </h1>
        <div className="w-1/4 h-1 bg-gray-800 my-4"></div>

        {/* Grid of Dimensions */}
        {selectedIndex === null ? (
          // Display grid only if no card is selected
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl md:h-[480px] w-full mx-auto mt-8">
            {dimensions.map((dimension, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)} // Set click handler
                className="bg-green-600 text-white p-6 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{dimension.icon}</span>
                  <h2 className="text-xl font-semibold">{dimension.title}</h2>
                </div>
                <p className="text-sm">{dimension.description}</p>
              </div>
            ))}
          </div>
        ) : (
          // Expanded view shows when a card is selected
          <div
            ref={detailRef}
            className="bg-green-600 text-white p-8 rounded-lg shadow-lg max-w-5xl md:h-[480px] w-full transition-transform duration-300 ease-in-out mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-5xl mr-4">
                  {dimensions[selectedIndex].icon}
                </span>
                <h2 className="text-3xl font-semibold">
                  {dimensions[selectedIndex].title}
                </h2>
              </div>
              <button
                onClick={closeDetail}
                className="text-3xl focus:outline-none"
              >
                <CircleX />
              </button>
            </div>
            <p className="text-base mb-4">
              {dimensions[selectedIndex].description}
            </p>
            <ul className="pl-6 space-y-2">
              {dimensions[selectedIndex].items.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestPracticesDimensions;
