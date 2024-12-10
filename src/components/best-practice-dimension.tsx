"use client";

import { useState, useRef, useEffect } from "react";
import {
  Leaf,
  Users,
  DollarSign,
  Building2,
  Monitor,
  XCircle,
} from "lucide-react";

interface Dimension {
  title: string;
  icon: JSX.Element;
  items: string[];
  description: string;
}

const dimensions: Dimension[] = [
  {
    title: "Ecology",
    icon: <Leaf size={40} />,
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
      "and several others",
    ],
    description:
      "The Ecological Dimension encompasses all data, information, or parameters that describe the ecological condition of the mangrove ecosystem in a given location.",
  },
  {
    title: "Social",
    icon: <Users size={40} />,
    items: [
      "a. Conflict in mangrove resource utilization",
      "b. Coordination between aquaculture groups",
      "c. Number of households (RT) utilizing mangrove resources",
      "d. Participation in mangrove management",
      "e. Community education level",
      "f. Frequency of community meetings",
      "g. Implementation of legal sanctions on illegal logging activities",
      "h. Number of forest/aquaculture farmer groups",
      "and several others",
    ],
    description:
      "The Social Dimension encompasses all data, information, or parameters that describe the social condition of the mangrove ecosystem in a given location.",
  },
  {
    title: "Economy",
    icon: <DollarSign size={40} />,
    items: [
      "a. Employment absorption",
      "b. Accessibility of mangrove areas",
      "c. Direct benefits of the mangrove ecosystem",
      "d. Indirect benefits of the mangrove ecosystem",
      "e. Percentage of community income from silvofishery aquaculture activities",
      "f. Percentage of community income from harvesting aquatic organisms in the mangrove ecosystem",
      "g. Ownership of aquaculture land",
      "h. Feasibility of aquaculture business",
      "i. Contribution to Gross Regional Domestic Product (GRDP)",
      "and several others",
    ],
    description:
      "The Economic Dimension encompasses all data, information, or parameters that describe the economic condition of the community within the mangrove ecosystem in a given location.",
  },
  {
    title: "Institutional",
    icon: <Building2 size={40} />,
    items: [
      "a. Availability of policies and plans for mangrove forest management",
      "b. Availability of NGOs/supporting institutions",
      "c. Coordination between institutions",
      "d. Integration of management programs",
      "e. Intensity of mangrove aquaculture monitoring by Pandega (aquaculture guardians)",
      "f. Law enforcement",
      "g. Role of universities and academics",
      "and several others",
    ],
    description:
      "The Institutional Dimension encompasses all data, information, or parameters that describe the institutional condition of mangrove ecosystem management at a given location.",
  },
  {
    title: "Technology",
    icon: <Monitor size={40} />,
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
      "and several others",
    ],
    description:
      "The Technological Dimension encompasses all data, information, or parameters that describe the technology used in the management of the mangrove ecosystem at a given location.",
  },
];

export default function Component() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const closeDetail = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailRef.current &&
        !detailRef.current.contains(event.target as Node)
      ) {
        closeDetail();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
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

        {selectedIndex === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full mx-auto mt-8">
            <div className="contents lg:col-span-3">
              {dimensions.slice(0, 3).map((dimension, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className="bg-green-600 text-white p-6 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <span className="mr-3">{dimension.icon}</span>
                    <h2 className="text-xl font-semibold">{dimension.title}</h2>
                  </div>
                  <p className="text-justify text-sm">
                    {dimension.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="contents gap-6 lg:col-span-3 lg:flex lg:justify-center">
              {dimensions.slice(3).map((dimension, index) => (
                <div
                  key={index + 3}
                  onClick={() => handleCardClick(index + 3)}
                  className="bg-green-600 text-white p-6 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 lg:w-1/3"
                >
                  <div className="flex items-center mb-4">
                    <span className="mr-3">{dimension.icon}</span>
                    <h2 className="text-xl font-semibold">{dimension.title}</h2>
                  </div>
                  <p className="text-sm text-justify">
                    {dimension.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={detailRef}
            className="bg-green-600 text-white p-8 rounded-lg shadow-lg max-w-5xl md:h-[480px] w-full transition-transform duration-300 ease-in-out mt-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="mr-4">{dimensions[selectedIndex].icon}</span>
                <h2 className="text-3xl font-semibold">
                  {dimensions[selectedIndex].title}
                </h2>
              </div>
              <button
                onClick={closeDetail}
                className="text-3xl focus:outline-none hover:text-red-500"
                aria-label="Close details"
              >
                <XCircle />
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
}
