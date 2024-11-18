"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Leaf,
  Users,
  DollarSign,
  Building2,
  Monitor,
  ChevronDown,
  Facebook,
  Instagram,
  Send,
  FileText,
  Map,
  ImageIcon,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const existingConditions = [
  {
    title: "Institutional Arrangement",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Regional Administration",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Population Demographics",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Community Education Level",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Agricultural Conditions",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];

const dimensions = [
  { name: "Ecology", icon: Leaf, color: "#2E7D32", score: 75 },
  { name: "Social", icon: Users, color: "#1565C0", score: 68 },
  { name: "Economy", icon: DollarSign, color: "#EF6C00", score: 82 },
  { name: "Institutional", icon: Building2, color: "#5E35B1", score: 70 },
  { name: "Technology", icon: Monitor, color: "#D32F2F", score: 88 },
];

const ShareButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex space-x-2 sticky top-0 z-20 mb-6"
    >
      <Button
        className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
        onClick={() =>
          window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" +
              encodeURIComponent(window.location.href),
            "_blank"
          )
        }
      >
        <Facebook className="h-4 w-4 mr-2" />
        Share
      </Button>
      <Button
        className="bg-[#25D366] hover:bg-[#128C7E] text-white"
        onClick={() =>
          window.open(
            "https://wa.me/?text=" + encodeURIComponent(window.location.href),
            "_blank"
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="mr-2"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
        Share
      </Button>
      <Button
        className="bg-[#E4405F] hover:bg-[#D93C50] text-white"
        onClick={() => window.open("https://www.instagram.com/", "_blank")}
      >
        <Instagram className="h-4 w-4 mr-2" />
        Share
      </Button>
      <Button
        className="bg-[#000000] hover:bg-[#333333] text-white"
        onClick={() => window.open("https://www.tiktok.com/", "_blank")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="mr-2"
        >
          <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
        </svg>
        Share
      </Button>
      <Button
        className="bg-[#0088cc] hover:bg-[#0077b5] text-white"
        onClick={() =>
          window.open(
            "https://t.me/share/url?url=" +
              encodeURIComponent(window.location.href),
            "_blank"
          )
        }
      >
        <Send className="h-4 w-4 mr-2" />
        Share
      </Button>
    </motion.div>
  );
};

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="leaf-pattern"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M25,2 Q40,25 25,48 Q10,25 25,2 Z"
              fill="none"
              stroke="rgba(74, 222, 128, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
      </svg>
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-green-200 opacity-20"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() + 0.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const ExistingConditionAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {existingConditions.map((condition, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="text-xl font-semibold text-green-800">
            {condition.title}
          </AccordionTrigger>
          <AccordionContent>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              {condition.content}
            </motion.p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const CircularScore = ({ score, color }: { score: number; color: string }) => (
  <motion.div
    className="relative w-40 h-40"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
  >
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <motion.circle
        className="text-gray-200 stroke-current"
        strokeWidth="10"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.circle
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: score / 100 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </svg>
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <span className="text-4xl font-bold">{score}%</span>
      <span className="text-sm font-medium">Sustainability Score</span>
    </motion.div>
  </motion.div>
);

const DimensionCard = ({
  dimension,
  isActive,
  onClick,
  onClose,
}: {
  dimension: {
    name: string;
    icon: React.ElementType;
    color: string;
    score: number;
  };
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
}) => {
  return (
    <motion.div
      layout
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 ${
        isActive
          ? "fixed inset-4 z-50 max-w-4xl mx-auto"
          : "cursor-pointer hover:shadow-xl"
      }`}
      onClick={!isActive ? onClick : undefined}
    >
      <div
        className={`p-6 ${isActive ? "pb-4" : ""}`}
        style={{ backgroundColor: `${dimension.color}15` }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <dimension.icon
              style={{ color: dimension.color }}
              className="w-10 h-10"
            />
            <h2
              style={{ color: dimension.color }}
              className="text-3xl font-bold font-serif"
            >
              {dimension.name} Dimension
            </h2>
          </div>
          {isActive && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>
      {isActive && (
        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="flex justify-center">
            <CircularScore score={dimension.score} color={dimension.color} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Method</h3>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Most Significant Aspects
            </h3>
            <ul className="space-y-2">
              {[1, 2, 3].map((_, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-600">
                    Significant aspect {index + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ParallaxSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative">
      {children}
    </motion.div>
  );
};

export default function ArticleDetail() {
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the comment
    console.log("Comment submitted:", {
      commentName,
      commentEmail,
      commentText,
    });
    setCommentText("");
    setCommentName("");
    setCommentEmail("");
  };

  // Dummy data for supporting documents, maps, galleries, and videos
  const supportingDocs = [
    { id: 1, file: new ArrayBuffer(0) },
    { id: 2, file: new ArrayBuffer(0) },
  ];
  const maps = [
    { mapFile: new ArrayBuffer(0) },
    { mapFile: new ArrayBuffer(0) },
    { mapFile: new ArrayBuffer(0) },
  ];
  const galleries = [
    { image: new ArrayBuffer(0) },
    { image: new ArrayBuffer(0) },
    { image: new ArrayBuffer(0) },
    { image: new ArrayBuffer(0) },
  ];
  const videoLinks = [
    { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">
        <ParallaxSection>
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-8 text-center text-green-800 font-serif"
            >
              Sustainable Mangrove Ecosystem
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center items-center text-gray-600 mb-8 gap-6"
            >
              <p className="text-lg">By John Doe</p>
              <p className="text-lg">From Green University</p>
              <p className="text-lg">Published on May 15, 2024</p>
              <p className="text-sm text-gray-500">
                Contact: john.doe@example.com
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full mb-8 flex items-center justify-center sticky top-0 z-10"
            >
              <Image
                src="/placeholder.svg?height=600&width=1000"
                alt="Mangrove Ecosystem"
                width={1000}
                height={600}
                className="object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>

            <ShareButtons />
          </section>
        </ParallaxSection>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-800 mb-16 z-10"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center font-serif">
              Summary
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-lg leading-relaxed mb-8">
              This study explores the sustainable management of mangrove
              ecosystems, focusing on their ecological, social, and economic
              impacts. Our findings highlight the importance of community
              involvement and innovative conservation techniques in preserving
              these vital coastal habitats.
            </p>
            <p className="text-lg font-semibold">
              Keywords: Mangroves, Sustainability, Ecosystem Management, Coastal
              Conservation
            </p>
          </div>
        </motion.section>

        <section className="mb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl text-green-800 font-bold mb-8 text-center font-serif"
            >
              Existing Condition
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-green-800 mx-auto mb-12"
            ></motion.div>
            <ExistingConditionAccordion />
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 bg-white py-16 shadow-inner"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-green-800 mb-12 font-serif">
              Sustainability Analysis Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {dimensions.map((dimension) => (
                  <DimensionCard
                    key={dimension.name}
                    dimension={dimension}
                    isActive={activeDimension === dimension.name}
                    onClick={() =>
                      setActiveDimension(
                        activeDimension === dimension.name
                          ? null
                          : dimension.name
                      )
                    }
                    onClose={() => setActiveDimension(null)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 bg-green-800"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center font-serif">
              Sustainability
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-lg leading-relaxed">
              Our analysis reveals that the mangrove ecosystem in the study area
              demonstrates a moderate level of sustainability. While there are
              strong ecological preservation efforts in place, there's room for
              improvement in economic utilization and social engagement.
              Implementing integrated coastal management strategies and
              promoting eco-tourism could significantly enhance the overall
              sustainability of this vital ecosystem.
            </p>
          </div>
        </motion.section>

        <section className="mb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8 text-center text-green-800 font-serif"
            >
              Additional Resources
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-green-800 mx-auto mb-12"
            ></motion.div>
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="documents">
                  <FileText className="w-5 h-5 mr-2" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="maps">
                  <Map className="w-5 h-5 mr-2" />
                  Maps
                </TabsTrigger>
                <TabsTrigger value="gallery">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="videos">
                  <Video className="w-5 h-5 mr-2" />
                  Videos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="documents" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supportingDocs.map((doc, index) => (
                    <div
                      key={doc.id}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        Supporting Document {index + 1}
                      </h3>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Download PDF {index + 1}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="maps" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {maps.map((map, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <div className="aspect-video bg-gray-200 rounded-md mb-2"></div>
                      <p className="text-center">Map {index + 1}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="gallery" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleries.map((gallery, index) => (
                    <div
                      key={index}
                      className="bg-white p-2 rounded-lg shadow-md"
                    >
                      <div className="aspect-square bg-gray-200 rounded-md"></div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="videos" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoLinks.map((video, index) => {
                    const videoId = video.url.split("v=")[1];
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    return (
                      <div key={index} className="aspect-video">
                        <iframe
                          src={embedUrl}
                          title={`Video ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        ></iframe>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="mb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8 text-center text-green-800 font-serif"
            >
              Comments
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-green-800 mx-auto mb-12"
            ></motion.div>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">Jane Smith</span>
                  <span className="text-gray-500">May 20, 2024</span>
                </div>
                <p className="text-gray-700">
                  This research provides valuable insights into mangrove
                  ecosystem management. I'm particularly interested in the
                  economic dimension and how we can balance conservation with
                  sustainable resource utilization.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">Alex Johnson</span>
                  <span className="text-gray-500">May 22, 2024</span>
                </div>
                <p className="text-gray-700">
                  Great work on highlighting the social aspects of mangrove
                  conservation. Community involvement is indeed crucial for
                  long-term sustainability. I'd love to see more details on
                  successful community engagement strategies in future studies.
                </p>
              </motion.div>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md space-y-4"
                onSubmit={handleCommentSubmit}
              >
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                />
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors duration-300"
                >
                  Post Comment
                </Button>
              </motion.form>
            </div>
          </div>
        </section>
      </div>

      {activeDimension && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setActiveDimension(null)}
        />
      )}
    </div>
  );
}
