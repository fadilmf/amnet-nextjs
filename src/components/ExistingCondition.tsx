import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContentSection {
  title: string;
  content: string;
  color: string;
}

const sections: ContentSection[] = [
  {
    title: "Institutional Arrangement",
    content:
      "The institutional arrangements for managing mangrove areas involve coordination among government agencies like Dinas Perikanan and Dinas Lingkungan Hidup, the private sector including local SMEs, and local communities such as fishermen and pond farmers. These entities work together to balance conservation efforts with sustainable economic benefits.",
    color: "#4CAF50",
  },
  {
    title: "Regional Administration",
    content:
      "The regional administration in Sidoarjo consists of various government bodies that oversee the management and development of the area. Key players include the Bupati of Sidoarjo, who leads the local government, and government agencies like Dinas Lingkungan Hidup, Dinas Perikanan, and other relevant offices.",
    color: "#2196F3",
  },
  {
    title: "Population Demographics",
    content:
      "As of 2023, Sidoarjo ranks fourth in terms of population size in East Java, following Surabaya, Malang, and Jember. The population of Sidoarjo is projected to be 2.148 million, reflecting an increase of 1.08% compared to the previous year.",
    color: "#FFC107",
  },
  {
    title: "Community Culture",
    content:
      "Sidoarjo's community is diverse, with a predominantly Javanese population and significant representation from Madurese, Chinese, and Arab ethnic groups. Traditional practices like Nyadran and events such as Lelang Bandeng showcase the blend of cultural and economic values in the region.",
    color: "#9C27B0",
  },
  {
    title: "Agricultural Conditions",
    content:
      "The agricultural sector in Sidoarjo spans various land uses, including home gardens, dry fields, and ponds. Despite ongoing land conversion, farmers maintain productivity with key crops like rice, corn, and sugarcane. The fisheries sector is centered on coastal ponds, producing significant quantities of milkfish and shrimp.",
    color: "#FF5722",
  },
  {
    title: "Topography",
    content:
      "Sidoarjo's topography ranges from 0 to 25 meters above sea level, divided into three main classes. The coastal areas (0-3m) support aquaculture, while the central (3-10m) and western (10-25m) regions are more suitable for agriculture and other land-based activities.",
    color: "#795548",
  },
  {
    title: "Climate",
    content:
      "In 2022, Sidoarjo experienced temperatures ranging from 21.0°C to 36.5°C, with an average humidity of 81.6%. Rainfall patterns showed some anomalies, with an unusual peak in May. The climate dynamics are influenced by varying wind speeds and atmospheric pressure.",
    color: "#607D8B",
  },
  {
    title: "Mangrove Density",
    content:
      "Mangrove cover in Sidoarjo saw a significant reduction of 51.66% from 2000 to 2023. However, the remaining mangroves have formed a well-organized green belt along the coast, providing effective protection against coastal erosion. Dense mangroves increased to 462.24 hectares by 2023.",
    color: "#8BC34A",
  },
  {
    title: "Shoreline Changes",
    content:
      "From 2000 to 2023, Sidoarjo's shoreline experienced significant changes. Sekardangan and Kedungpandan showed heavy accretion, while Kupang had lighter accretion. These changes were influenced by sediment deposition from the Porong River delta and mudflow disposal from Lapindo.",
    color: "#00BCD4",
  },
  {
    title: "Species Composition",
    content:
      "The KLM region of Sidoarjo hosts diverse mangrove species across coastal zones, riverbanks, and pond regions. Major species include Sonneratia alba, Avicennia marina, and Rhizophora apiculata, with accompanying vegetation varying by location and salinity levels.",
    color: "#FFEB3B",
  },
];

const ContentCard: React.FC<{ section: ContentSection; isCenter: boolean }> = ({
  section,
  isCenter,
}) => {
  const springProps = useSpring({
    scale: isCenter ? 1 : 0.8,
    opacity: isCenter ? 1 : 0.7,
    config: config.gentle,
  });

  return (
    <animated.div
      style={{
        ...springProps,
        background: "white",
        borderRadius: "10px",
        padding: "20px",
        width: "280px",
        height: isCenter ? "400px" : "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      <h2
        className="text-xl font-bold text-center mb-4"
        style={{ color: section.color }}
      >
        {section.title}
      </h2>
      {isCenter && (
        <p className="text-sm text-gray-600 overflow-auto flex-grow">
          {section.content}
        </p>
      )}
    </animated.div>
  );
};

const ExistingCondition: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [offset, setOffset] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + sections.length) % sections.length);
    setOffset((prev) => prev + 300);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sections.length);
    setOffset((prev) => prev - 300);
  };

  useEffect(() => {
    // Reset offset when it gets too large or too small
    if (Math.abs(offset) >= sections.length * 300) {
      setOffset(offset % (sections.length * 300));
    }
  }, [offset]);

  const springProps = useSpring({
    transform: `translateX(${offset}px)`,
    config: config.gentle,
  });

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-12 text-center text-green-800">
        CONTENT WEB AMNET
      </h1>
      <div className="relative w-full max-w-4xl h-[500px] overflow-hidden">
        <animated.div
          style={{
            ...springProps,
            display: "flex",
            alignItems: "center",
            height: "100%",
            position: "absolute",
            left: "50%",
            marginLeft: "-140px",
          }}
        >
          {[...sections, ...sections, ...sections].map((section, index) => (
            <div
              key={index}
              style={{
                flexShrink: 0,
                width: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ContentCard
                section={section}
                isCenter={index % sections.length === activeIndex}
              />
            </div>
          ))}
        </animated.div>
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          aria-label="Previous section"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          aria-label="Next section"
        >
          <ChevronRight size={24} />
        </button>
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
          <span className="text-lg font-bold">
            {activeIndex + 1}/{sections.length}
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {sections.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              activeIndex === index ? "bg-green-600" : "bg-gray-300"
            }`}
            onClick={() => {
              const diff = index - activeIndex;
              setActiveIndex(index);
              setOffset((prev) => prev - diff * 300);
            }}
            aria-label={`View ${sections[index].title} section`}
          />
        ))}
      </div>
    </div>
  );
};

export default ExistingCondition;
