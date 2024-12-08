"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Map,
  ImageIcon,
  Video,
  Leaf,
  Users,
  DollarSign,
  Building2,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShareButtons } from "@/components/share-buttons";
import { ParallaxSection } from "@/components/parallax-section";
import { ExistingConditionAccordion } from "@/components/existing-condition-accordion";
// import { DimensionCard } from "@/components/dimension-card";
import { useParams } from "next/navigation";

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
    graphImages?: Array<{
      id: string;
      file: string;
      alt: string;
    }>;
    isOverall?: boolean;
    conclusion?: string;
    spiderGraph?: string;
    tableImage?: string;
    tableData?: Array<{
      dimension: string;
      score: number;
      category: string;
    }>;
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
          {dimension.isOverall ? (
            <>
              <div className="flex justify-between items-center gap-8">
                {/* <CircularScore
                  score={dimension.score}
                  color={dimension.color}
                /> */}
                <Image
                  src={dimension.spiderGraph || ""}
                  alt="Sustainability Dimensions Spider Graph"
                  width={400}
                  height={400}
                  className="flex-1"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Conclusion
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {dimension.conclusion}
                </p>
              </div>

              {dimension.tableImage && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    Dimension Analysis
                  </h3>
                  <Image
                    src={dimension.tableImage || ""}
                    alt="Dimension Analysis Table"
                    width={500}
                    height={300}
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <CircularScore
                  score={dimension.score}
                  color={dimension.color}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Method
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {dimension.inputMethod}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Most Significant Aspects
                </h3>
                <ul className="space-y-2">
                  {dimension.significantAspects?.map((aspect, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-600">{aspect}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {dimension.graphImages?.map((image, index) => (
                  <div key={image.id}>
                    <Image
                      src={image.file}
                      alt={image.alt || `${dimension.name} Graph ${index + 1}`}
                      width={500}
                      height={300}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default function ArticleDetail() {
  const params = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeDimension, setActiveDimension] = useState(null);
  const [activeTab, setActiveTab] = useState("documents");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/content/${params.id}`);

        // console.log("ini response: ", response.json());

        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }

        const data = await response.json();
        console.log("ini data: ", data);
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticleDetail();
    }
  }, [params.id]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveTab("gallery");
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: params.id,
          name: commentName,
          email: commentEmail,
          text: commentText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Reset form
      setCommentName("");
      setCommentEmail("");
      setCommentText("");

      // Refresh article data to get new comment
      const updatedArticle = await fetch(`/api/content/${params.id}`).then(
        (res) => res.json()
      );
      setContent(updatedArticle);
    } catch (err) {
      console.error("Error posting comment:", err);
      // You might want to show an error message to the user
    }
  };

  const dimensionIcons = {
    ecology: { icon: Leaf, color: "#2E7D32" },
    social: { icon: Users, color: "#1565C0" },
    economy: { icon: DollarSign, color: "#EF6C00" },
    institutional: { icon: Building2, color: "#5E35B1" },
    technology: { icon: Monitor, color: "#D32F2F" },
  };

  const dimensions = [
    {
      name: "Overall",
      icon: FileText,
      color: "#000000",
      score: 75.6,
      isOverall: true,
      conclusion:
        "The sustainability analysis uses a Multi-Dimensional Scaling (MDS) approach adapted from the RAPFISH (Rapid Appraisal for Fisheries) method, which has been modified into RAPMANGROVE (Rapid Appraisal for Mangrove). This approach is developed using five evaluation categories: ecology, economy, social, institutional, and technology. The analysis is conducted through several stages: 1) reviewing the attributes within each sustainability dimension and defining these attributes through field observations and literature studies; 2) assigning scores based on the results of field observations and stakeholder opinions according to the defined attributes; 3) analyzing the assigned scores to determine the sustainability status of mangrove ecosystem management, as shown in Table 1 below. Based on the sustainability status analysis of the mangrove ecosystem area in Sidoarjo Regency, covering the dimensions of Ecology, Economy, Social, Institutional, and Technology, the average management of the mangrove ecosystem area in Sidoarjo shows a relatively sustainable result. This is evident from the RAP-MANGROVE score produced, where out of the five dimensions of sustainability status assessment, only the Social Dimension has a less sustainable value with a score of 47.23 (25 < SIR ≤ 50). Figure 11 below shows the sustainability status of the mangrove ecosystem in Sidoarjo Regency.",
      spiderGraph: "/spider-graph-placeholder.png",
      tableData: [
        { dimension: "Ecology", score: 85, category: "Very Good" },
        { dimension: "Social", score: 78, category: "Good" },
        { dimension: "Economy", score: 72, category: "Good" },
        { dimension: "Institutional", score: 68, category: "Fair" },
        { dimension: "Technology", score: 75, category: "Good" },
      ],
    },
    {
      name: "Ecology",
      icon: Leaf,
      inputMethod: content?.ecologyDimension?.inputMethod,
      significantAspects: content?.ecologyDimension?.significantAspects,
      color: "#2E7D32",
      score: content?.ecologyDimension?.sustainabilityScore,
    },
    {
      name: "Social",
      icon: Users,
      inputMethod: content?.socialDimension?.inputMethod,
      significantAspects: content?.socialDimension?.significantAspects,
      color: "#1565C0",
      score: content?.socialDimension?.sustainabilityScore,
    },
    {
      name: "Economy",
      icon: DollarSign,
      inputMethod: content?.economyDimension?.inputMethod,
      significantAspects: content?.economyDimension?.significantAspects,
      color: "#EF6C00",
      score: content?.economyDimension?.sustainabilityScore,
    },
    {
      name: "Institutional",
      icon: Building2,
      inputMethod: content?.institutionalDimension?.inputMethod,
      significantAspects: content?.institutionalDimension?.significantAspects,
      color: "#5E35B1",
      score: content?.institutionalDimension?.sustainabilityScore,
    },
    {
      name: "Technology",
      icon: Monitor,
      inputMethod: content?.technologyDimension?.inputMethod,
      significantAspects: content?.technologyDimension?.significantAspects,
      color: "#D32F2F",
      score: content?.technologyDimension?.sustainabilityScore,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-500">Article not found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <ParallaxSection>
        <section className="max-w-6xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-8 text-center text-green-800 font-serif"
          >
            {content.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center text-gray-600 mb-8 gap-6"
          >
            <p className="text-lg">By {content.author}</p>
            {content.institution && (
              <p className="text-lg">From {content.institution}</p>
            )}
            <span>|</span>
            <p className="text-lg">
              Published on {new Date(content.date).toLocaleDateString()}
            </p>
            <span>|</span>
            <p className="text-lg">{content.country.countryName}</p>
          </motion.div>

          {content.cover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full mb-8 flex items-center justify-center sticky top-0 z-10"
            >
              <Image
                // src={`data:image/jpeg;base64,${content.cover}`}
                src={content.cover}
                alt={content.title}
                width={1000}
                height={600}
                className="object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          )}

          <ShareButtons />
        </section>
      </ParallaxSection>

      {/* Summary Section */}
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
          <p className="text-lg leading-relaxed mb-8">{content.summary}</p>
          {content.keywords && content.keywords.length > 0 && (
            <p className="text-lg font-semibold">
              Keywords: {content.keywords.join(", ")}
            </p>
          )}
        </div>
      </motion.section>

      {/* Existing Condition Section */}
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
          <ExistingConditionAccordion
            conditions={content.existingConditions}
            scrollToGallery={scrollToGallery}
          />
        </div>
      </section>

      {/* Sustainability Analysis Results */}
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
              {content &&
                [
                  {
                    key: "ecology",
                    data: content.ecologyDimension,
                    name: "Ecology",
                    icon: dimensionIcons.ecology.icon,
                    color: dimensionIcons.ecology.color,
                  },
                  {
                    key: "social",
                    data: content.socialDimension,
                    name: "Social",
                    icon: dimensionIcons.social.icon,
                    color: dimensionIcons.social.color,
                  },
                  {
                    key: "economy",
                    data: content.economyDimension,
                    name: "Economy",
                    icon: dimensionIcons.economy.icon,
                    color: dimensionIcons.economy.color,
                  },
                  {
                    key: "institutional",
                    data: content.institutionalDimension,
                    name: "Institutional",
                    icon: dimensionIcons.institutional.icon,
                    color: dimensionIcons.institutional.color,
                  },
                  {
                    key: "technology",
                    data: content.technologyDimension,
                    name: "Technology",
                    icon: dimensionIcons.technology.icon,
                    color: dimensionIcons.technology.color,
                  },
                  {
                    key: "overall",
                    data: {
                      id: "overall",
                      // sustainabilityScore: 75.6,
                      isOverall: true,
                      conclusion: content.overallDimension?.overall,
                      spiderGraph:
                        content.overallDimension?.graphImages?.[0]?.file,
                      tableImage:
                        content.overallDimension?.graphImages?.[1]?.file,
                      tableData: [
                        {
                          dimension: "Ecology",
                          score: 85,
                          category: "Very Good",
                        },
                        { dimension: "Social", score: 78, category: "Good" },
                        { dimension: "Economy", score: 72, category: "Good" },
                        {
                          dimension: "Institutional",
                          score: 68,
                          category: "Fair",
                        },
                        {
                          dimension: "Technology",
                          score: 75,
                          category: "Good",
                        },
                      ],
                    },
                    name: "Overall",
                    icon: FileText,
                    color: "#000000",
                  },
                ].map(({ key, data, name, icon, color }) => (
                  <DimensionCard
                    key={data.id}
                    dimension={{
                      id: data.id,
                      name: name,
                      title: data.title,
                      inputMethod: data.inputMethod,
                      significantAspects: data.significantAspects,
                      score: data.sustainabilityScore,
                      color: color,
                      icon: icon,
                      graphImages: data.graphImages,
                      isOverall: data.isOverall,
                      conclusion: data.conclusion,
                      spiderGraph: data.spiderGraph,
                      tableData: data.tableData,
                    }}
                    isActive={activeDimension === data.id}
                    onClick={() =>
                      setActiveDimension(
                        activeDimension === data.id ? null : data.id
                      )
                    }
                    onClose={() => setActiveDimension(null)}
                  />
                ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Additional Resources Section */}
      <section className="mb-16" ref={galleryRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center text-green-800 font-serif"
          >
            Additional Resources
          </motion.h2>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
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

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.supportingDocs?.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2">{doc.name}</h3>
                    <a
                      href={`/api/download?file=${encodeURIComponent(
                        doc.file
                      )}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Download
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Maps Tab */}
            <TabsContent value="maps" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.maps?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-2 rounded-lg shadow-md cursor-pointer group"
                    onClick={() => openModal(item.file)}
                  >
                    <div className="aspect-square relative bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={item.file}
                        alt={item.alt}
                        fill
                        className="object-cover rounded-md transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                        <p className="truncate">{item.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {content.galleries?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-2 rounded-lg shadow-md cursor-pointer group"
                    onClick={() => openModal(item.image)}
                  >
                    <div className="aspect-square relative bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover rounded-md transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                        <p className="truncate">{item.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Modal Popup */}
            {isModalOpen && selectedImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={closeModal}
              >
                <div
                  className="relative max-w-5xl w-full mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-white text-2xl z-10"
                    onClick={closeModal}
                  >
                    &times;
                  </button>
                  <div className="relative w-full h-[80vh]">
                    <Image
                      src={selectedImage}
                      alt="Selected"
                      fill
                      className="rounded-lg shadow-lg object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            <TabsContent value="videos" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.videoLinks?.map((video) => {
                  // Convert video URL to embed URL
                  let embedUrl = video.url;

                  if (
                    video.url.includes("youtube.com") ||
                    video.url.includes("youtu.be")
                  ) {
                    // Extract video ID from YouTube URL
                    const videoId = video.url.includes("youtube.com")
                      ? video.url.split("v=")[1]?.split("&")[0]
                      : video.url.split("youtu.be/")[1]?.split("?")[0];

                    if (videoId) {
                      embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                  } else if (video.url.includes("drive.google.com")) {
                    // Convert Google Drive URL to embed URL
                    const fileId = video.url.match(
                      /\/d\/(.*?)\/|id=(.*?)(&|$)/
                    )?.[1];
                    if (fileId) {
                      embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
                    }
                  }

                  return (
                    <div key={video.id} className="aspect-video">
                      <iframe
                        src={embedUrl}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comments Section */}
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
          <div className="space-y-6">
            {content.comments?.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">
                    {comment.name || "Anonymous"}
                  </span>
                  <span className="text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </motion.div>
            ))}

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
