"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Users,
  DollarSign,
  Building2,
  Cpu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  Comment,
  Gallery,
  Map,
  SupportingDoc,
  VideoLink,
} from "@prisma/client";

interface Content {
  id: number;
  userId: string | null;
  email: string | null;
  countryId: number | null;
  title: string | null;
  author: string | null;
  institution: string | null;
  cover: string | null; // Base64-encoded string if converting from Bytes
  summary: string | null;
  keyword: string | null;
  ecologyDim: number | null;
  ecologyMethod: string | null;
  ecologyMost1: string | null;
  ecologyMost2: string | null;
  ecologyMost3: string | null;
  socialDim: number | null;
  socialMethod: string | null;
  socialMost1: string | null;
  socialMost2: string | null;
  socialMost3: string | null;
  economyDim: number | null;
  economyMethod: string | null;
  economyMost1: string | null;
  economyMost2: string | null;
  economyMost3: string | null;
  institutionalDim: number | null;
  institutionalMethod: string | null;
  institutionalMost1: string | null;
  institutionalMost2: string | null;
  institutionalMost3: string | null;
  technologyDim: number | null;
  technologyMethod: string | null;
  technologyMost1: string | null;
  technologyMost2: string | null;
  technologyMost3: string | null;

  sustainability: string | null;
  sustainabilityIndex: number | null;
  sustainabilityImage: string | null; // Base64-encoded string if converting from Bytes

  ecologyGraph: string | null; // Base64-encoded string if converting from Bytes
  ecologyLevel: string | null; // Base64-encoded string if converting from Bytes
  socialGraph: string | null; // Base64-encoded string if converting from Bytes
  socialLevel: string | null; // Base64-encoded string if converting from Bytes
  economyGraph: string | null; // Base64-encoded string if converting from Bytes
  economyLevel: string | null; // Base64-encoded string if converting from Bytes
  institutionalGraph: string | null; // Base64-encoded string if converting from Bytes
  institutionalLevel: string | null; // Base64-encoded string if converting from Bytes
  technologyGraph: string | null; // Base64-encoded string if converting from Bytes
  technologyLevel: string | null; // Base64-encoded string if converting from Bytes

  visitorRegistered: number | null;
  visitorPublic: number | null;
  createdAt: string | null;
  updatedAt: string | null;

  existingCondition1: string | null;
  existingCondition2: string | null;
  existingCondition3: string | null;
  existingCondition4: string | null;
  existingCondition5: string | null;
  existingCondition6: string | null;
  existingCondition7: string | null;
  existingCondition8: string | null;
  existingCondition9: string | null;
  existingCondition10: string | null;
  existingCondition11: string | null;
  existingCondition12: string | null;
  existingCondition13: string | null;
  existingCondition14: string | null;
  existingCondition15: string | null;
  existingCondition16: string | null;
  existingCondition17: string | null;
  existingCondition18: string | null;
  existingCondition19: string | null;
  existingCondition20: string | null;
  existingCondition21: string | null;
  existingCondition22: string | null;
  existingCondition23: string | null;

  comments: Comment[];
  supportingDocs: SupportingDoc[];
  videoLinks: VideoLink[];
  galleries: Gallery[];
  maps: Map[];
}

// interface Comment {
//   id: number;
//   name: string | null;
//   email: string | null;
//   text: string;
//   createdAt: string;
// }

const existingConditionTitles = [
  "Institutional Arrangement",
  "Regional Administration",
  "Population Demographics",
  "Community Education Level",
  "Agricultural, Plantation, and Fisheries Conditions",
  "Community Culture and Ethnicity",
  "Topography",
  "Climate",
  "Land Cover and Mangrove Density",
  "Shoreline Changes",
  "Species Composition",
  "Dominant Mangrove Species",
  "Biomass, Carbon Storage, and Carbon Dioxide Absorption",
  "Fauna Diversity",
  "Pond Conditions",
  "Pond Design & Constructions",
  "Layout and Irrigation System",
  "Water Quality Condition",
  "Soil Quality Condition",
  "Cultivation",
  "Best Practice Financial Condition",
  "Financial Analysis of Livestock Farming",
  "Financial Analysis of Vegetation Cultivation",
];

const ExistingConditionCarousel: React.FC<{ content: Content }> = ({
  content,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + 23) % 23);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % 23);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 min-h-[500px] flex flex-col justify-between"
        >
          <h3 className="text-4xl font-bold mb-4 text-green-800">
            {existingConditionTitles[activeIndex]}
          </h3>
          <p className="text-gray-600 text-2xl text-justify">
            {(content[
              `existingCondition${activeIndex + 1}` as keyof Content
            ] as string) || "No data available"}
          </p>

          {/* Counter */}
          <div className="text-center mt-4">
            <span className="text-green-800 text-xl">{activeIndex + 1}/23</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: 23 }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-green-600" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${existingConditionTitles[index]} section`}
          />
        ))}
      </div>
    </div>
  );
};

// const dimensions = [
//   { name: "Ecology", icon: Leaf, color: "#2E7D32", score: 75 }, // Hijau
//   { name: "Social", icon: Users, color: "#1565C0", score: 68 }, // Biru
//   { name: "Economy", icon: DollarSign, color: "#EF6C00", score: 82 }, // Oranye
//   { name: "Institutional", icon: Building2, color: "#5E35B1", score: 70 }, // Ungu
//   { name: "Technology", icon: Cpu, color: "#D32F2F", score: 88 }, // Merah
// ];

const dimensions: {
  name: string;
  icon: React.ElementType;
  color: string;
  scoreKey: keyof Content;
  methodKey: keyof Content;
  graphKey: keyof Content;
  aspects: (keyof Content)[];
}[] = [
  {
    name: "Ecology",
    icon: Leaf,
    color: "#2E7D32",
    scoreKey: "ecologyDim",
    methodKey: "ecologyMethod",
    graphKey: "ecologyGraph",
    aspects: ["ecologyMost1", "ecologyMost2", "ecologyMost3"],
  },
  {
    name: "Social",
    icon: Users,
    color: "#1565C0",
    scoreKey: "socialDim",
    methodKey: "socialMethod",
    graphKey: "socialGraph",
    aspects: ["socialMost1", "socialMost2", "socialMost3"],
  },
  {
    name: "Economy",
    icon: DollarSign,
    color: "#EF6C00",
    scoreKey: "economyDim",
    methodKey: "economyMethod",
    graphKey: "economyGraph",
    aspects: ["economyMost1", "economyMost2", "economyMost3"],
  },
  {
    name: "Institutional",
    icon: Building2,
    color: "#5E35B1",
    scoreKey: "institutionalDim",
    methodKey: "institutionalMethod",
    graphKey: "institutionalGraph",
    aspects: ["institutionalMost1", "institutionalMost2", "institutionalMost3"],
  },
  {
    name: "Technology",
    icon: Cpu,
    color: "#D32F2F",
    scoreKey: "technologyDim",
    methodKey: "technologyMethod",
    graphKey: "technologyGraph",
    aspects: ["technologyMost1", "technologyMost2", "technologyMost3"],
  },
];

const CircularScore: React.FC<{ score: number; color: string }> = ({
  score,
  color,
}) => (
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

const DimensionCard: React.FC<{
  dimension: {
    name: string;
    icon: React.ElementType;
    color: string;
    scoreKey: keyof Content;
    methodKey: keyof Content;
    graphKey: keyof Content;
    aspects: (keyof Content)[];
  };
  content: Content;
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
}> = ({ dimension, content, isActive, onClick, onClose }) => {
  const score = content[dimension.scoreKey] as number | null;
  const method = content[dimension.methodKey] as string | null;
  const aspects = dimension.aspects.map(
    (aspectKey) => content[aspectKey] as string | null
  );
  const graphData = content[dimension.graphKey] as Buffer | null;
  const graphDataBase64 = graphData
    ? Buffer.from(graphData).toString("base64")
    : null;

  return (
    <motion.div
      layout
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${
        isActive ? "fixed inset-4 z-50 max-w-4xl mx-auto" : "cursor-pointer"
      }`}
      onClick={!isActive ? onClick : undefined}
    >
      <div
        className={`p-4 ${isActive ? "pb-2" : ""}`}
        style={{ backgroundColor: "white" }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <dimension.icon
              style={{ color: dimension.color }}
              className="w-8 h-8"
            />
            <h2
              style={{ color: dimension.color }}
              className="text-2xl font-bold"
            >
              {dimension.name} Dimension
            </h2>
          </div>
          {isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
      {isActive && (
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="flex justify-center">
            {score !== null ? (
              <CircularScore score={score} color={dimension.color} />
            ) : (
              <p className="text-gray-500">Score not available</p>
            )}
          </div>
          {graphDataBase64 && (
            <img
              src={`data:image/png;base64,${graphDataBase64}`}
              alt={`${dimension.name} Graph`}
              className="w-full h-auto rounded-lg"
            />
          )}
          {/* <p>{dimension.name + ": " + graphData}</p> */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Method</h3>
            <p className="text-gray-600 mb-4">
              {method || "Method not available"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Most Significant Aspects
            </h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {aspects.map((aspect, index) =>
                aspect ? <li key={index}>{aspect}</li> : null
              )}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function ArticleDetail() {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/api/content/${id}`);
        console.log("ini detail artikel: ", response.data);
        setContent(response.data);
      } catch (err) {
        setError("Failed to fetch content");
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/comments`, {
        articleId: parseInt(id),
        name: commentName || "Anonymous",
        email: commentEmail || null,
        text: commentText,
      });

      setCommentText("");
      setCommentName("");
      setCommentEmail("");

      const response = await axios.get(`/api/content/${id}`);
      setContent(response.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError(`Failed to submit comment: ${error}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>No content found</div>;

  return (
    <div className="py-8">
      <section className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-8">{content.title}</h1>
        <div className="w-full flex justify-evenly items-center text-gray-600 mb-8 px-16">
          {content.author && (
            <p className="text-lg">Author: {content.author}</p>
          )}
          {content.institution && (
            <p className="text-lg">Institution: {content.institution}</p>
          )}
          {content.createdAt && (
            <p className="text-lg">
              Published on: {new Date(content.createdAt).toLocaleDateString()}
            </p>
          )}
          {content.email && (
            <p className="text-sm text-gray-500">Contact: {content.email}</p>
          )}
        </div>
        <div className="w-full mb-8 flex items-center justify-center">
          {content.cover && (
            <Image
              src={content.cover}
              alt={content.title || "Cover image"}
              width={1000}
              height={1000}
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </section>

      <section className="bg-green-800 px-16 text-white mb-8">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl text-white font-semibold mb-4">Summary</h2>
          <div className="w-1/4 h-1 bg-white my-2"></div>
          <p className="mt-8">{content.summary}</p>
          <p className="mt-12">Keyword: {content.keyword}</p>
        </div>
      </section>

      <section className="mb-16 bg-white px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl text-gray-800 font-semibold mb-4">
            Existing Condition
          </h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2 mb-8"></div>
          <ExistingConditionCarousel content={content} />
        </div>
      </section>

      <section className="mb-8 px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Sustainability Analysis Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <AnimatePresence>
              {dimensions.map((dimension) => (
                <DimensionCard
                  key={dimension.name}
                  dimension={dimension}
                  content={content}
                  isActive={activeDimension === dimension.name}
                  onClick={() => setActiveDimension(dimension.name)}
                  onClose={() => setActiveDimension(null)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mb-8 bg-green-800 px-16 text-white">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Sustainability</h2>
          <div className="w-1/4 h-1 bg-white my-2"></div>
          <p className="mt-8">{content.sustainability}</p>
        </div>
      </section>

      <section className="mb-8 bg-white px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Supporting Documents</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>

          {content.supportingDocs.length > 0 ? (
            content.supportingDocs.map((doc, index) => (
              <div key={doc.id} className="mb-8 w-full">
                {/* <embed
                  src={`data:application/pdf;base64,${doc.file.toString(
                    "base64"
                  )}`}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                  className="rounded-lg"
                /> */}
                <div className="mt-4 flex justify-center">
                  <a
                    href={`data:application/pdf;base64,${doc.file.toString(
                      "base64"
                    )}`}
                    download={`supporting-document-${index + 1}.pdf`}
                  >
                    <Button className="bg-green-800 hover:bg-green-900">
                      Download PDF {index + 1}
                    </Button>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No supporting documents available</p>
          )}
        </div>
      </section>

      {content.maps && content.maps.length > 0 && (
        <section className="mb-8 bg-white px-16">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Maps</h2>
            <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full">
              {content.maps.map((map, index) => {
                // Convert byte array to Base64 string
                const base64String = `data:image/jpeg;base64,${Buffer.from(
                  map.mapFile
                ).toString("base64")}`;
                return (
                  <div key={index} className="relative w-full h-64">
                    <img
                      src={base64String}
                      alt={`Map Image - ${index + 1}`}
                      className="object-cover rounded-lg w-full h-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {content.galleries && content.galleries.length > 0 && (
        <section className="mb-8 bg-white px-16">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Galleries</h2>
            <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full">
              {content.galleries.map((gallery, index) => {
                // Convert byte array to Base64 string
                const base64String = `data:image/jpeg;base64,${Buffer.from(
                  gallery.image
                ).toString("base64")}`;
                return (
                  <div key={index} className="relative w-full h-64">
                    <img
                      src={base64String}
                      alt={`Gallery Image - ${index + 1}`}
                      className="object-cover rounded-lg w-full h-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {content.videoLinks && content.videoLinks.length > 0 && (
        <section className="mb-8 bg-white px-16">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Videos</h2>
            <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full">
              {content.videoLinks.map((video, index) => {
                // Transform YouTube URL into embed-friendly format
                let videoId;
                if (video.url.includes("youtube.com")) {
                  const urlParams = new URL(video.url).searchParams;
                  videoId = urlParams.get("v"); // Get the video ID from "v" parameter
                } else if (video.url.includes("youtu.be")) {
                  videoId = video.url.split("/").pop(); // Get the video ID from the URL path
                }
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                return (
                  <div key={index} className="relative aspect-video w-full">
                    <iframe
                      src={embedUrl}
                      title={`${content.title || "Video"} - ${index + 1}`}
                      className="absolute inset-0 w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="mb-8 bg-white px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
          <div className="space-y-4 w-full mt-8">
            {content.comments?.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    {comment.name || "Anonymous"}
                  </span>
                  <span className="text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
            <form className="space-y-4" onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="Your Name (optional)"
                className="w-full p-2 border rounded"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email (optional)"
                className="w-full p-2 border rounded"
                value={commentEmail}
                onChange={(e) => setCommentEmail(e.target.value)}
              />
              <Textarea
                placeholder="Add a comment..."
                className="min-h-[100px]"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button type="submit" className="bg-green-800 hover:bg-green-900">
                Post Comment
              </Button>
            </form>
          </div>
        </div>
      </section>

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
