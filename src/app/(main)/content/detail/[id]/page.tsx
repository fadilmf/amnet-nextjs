"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";

interface Content {
  id: number;
  title: string | null;
  author: string | null;
  summary: string | null;
  keyword: string | null;
  ecologyDim: string | null;
  socialDim: string | null;
  economyDim: string | null;
  institutionalDim: string | null;
  technologyDim: string | null;
  sustainability: string | null;
  cover: string | null;
  videoLink: string | null;
  attachmentDoc: string | null;
  supportingDoc: string | null;
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
}

interface Comment {
  id: number;
  name: string | null;
  email: string | null;
  text: string;
  createdAt: string;
}

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

const ExistingConditionCarousel = ({ content }: { content: Content }) => {
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

export default function ArticleDetail() {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/api/content/${id}`);
        console.log("Content detail response:", response.data.supportingDoc);
        console.log("ini respon ya: ", response);
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
          <h2 className="text-2xl font-semibold mb-4">
            Analysis Sustainability
          </h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>

          <Tabs defaultValue="ecology" className="w-full mt-8">
            <TabsList className="w-full justify-start border-b mb-6">
              <TabsTrigger value="ecology">Ecology</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="economy">Economy</TabsTrigger>
              <TabsTrigger value="institutional">Institutional</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
            </TabsList>

            <TabsContent value="ecology">
              <Card className="p-6 bg-gray-50">
                <div className="prose max-w-none">
                  <p>{content.ecologyDim}</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card className="p-6 bg-gray-50">
                <p>{content.socialDim}</p>
              </Card>
            </TabsContent>

            <TabsContent value="economy">
              <Card className="p-6 bg-gray-50">
                <p>{content.economyDim}</p>
              </Card>
            </TabsContent>

            <TabsContent value="institutional">
              <Card className="p-6 bg-gray-50">
                <p>{content.institutionalDim}</p>
              </Card>
            </TabsContent>

            <TabsContent value="technology">
              <Card className="p-6 bg-gray-50">
                <p>{content.technologyDim}</p>
              </Card>
            </TabsContent>
          </Tabs>
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
          <h2 className="text-2xl font-semibold mb-4">Supporting Document</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>

          {content.supportingDoc && (
            <div className="mb-4 w-full">
              <embed
                src={content.supportingDoc}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            </div>
          )}

          {content.supportingDoc && (
            <a href={content.supportingDoc} download>
              <Button className="bg-green-800 hover:bg-green-900">
                Download Supporting PDF
              </Button>
            </a>
          )}
        </div>
      </section>

      {content.attachmentDoc && (
        <section className="mb-8 bg-green-800 px-16 text-white">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="w-1/4 h-1 bg-white my-2"></div>
            <div className="relative w-full h-[400px] mt-8">
              <Image
                src={content.attachmentDoc}
                alt="Gallery image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </section>
      )}

      {content.videoLink && (
        <section className="mb-8 bg-white px-16">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Video</h2>
            <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
            <div className="relative aspect-video mt-8 w-full">
              <iframe
                src={content.videoLink}
                title={content.title || "Video"}
                className="absolute inset-0 w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {content.supportingDoc && (
        <section className="mb-8 bg-green-800 px-16 text-white">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Map</h2>
            <div className="w-1/4 h-1 bg-white my-2"></div>
            <div className="relative w-full h-[400px] mt-8">
              <Image
                src={content.supportingDoc}
                alt="Map"
                fill
                className="object-cover rounded-lg"
              />
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
    </div>
  );
}
