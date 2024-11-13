"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import ExistingCondition from "@/components/ExistingCondition";

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
  cover: string | null; // We'll store the base64 string here
  videoLink: string | null;
  attachmentDoc: string | null; // We'll store the base64 string here
  supportingDoc: string | null; // We'll store the base64 string here
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

  const galleryImages = content?.attachmentDoc
    ? [content.attachmentDoc] // Assuming attachmentDoc is a single image for now
    : [];

  const maps = content?.supportingDoc
    ? [content.supportingDoc] // Assuming supportingDoc is a single image for now
    : [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevMap = () => {
    setCurrentMapIndex((prev) => (prev === 0 ? maps.length - 1 : prev - 1));
  };

  const handleNextMap = () => {
    setCurrentMapIndex((prev) => (prev === maps.length - 1 ? 0 : prev + 1));
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mengirim request POST ke rute /api/comments dengan format yang diminta
      await axios.post(`/api/comments`, {
        articleId: parseInt(id),
        name: commentName || "Anonymous",
        email: commentEmail || null,
        text: commentText,
      });

      // Reset input form setelah komentar berhasil dikirim
      setCommentText("");
      setCommentName("");
      setCommentEmail("");

      // Refresh komentar setelah pengiriman
      // const updatedContent = await axios.get(`/api/content/${id}`);
      const response = await axios.get(`/api/content/${id}`);
      setContent(response.data);
      // setContent(updatedContent.data);
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
      <section className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">{content.title}</h1>
        <div className="w-full mb-8 flex items-center justify-center">
          {content.cover && (
            <Image
              // src={`data:image/jpeg;base64, ${content.cover}`}
              src={`${content.cover}`}
              alt={content.title || "Cover image"}
              width={1000}
              height={1000}
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </section>

      <section className="bg-green-800 px-16 text-white">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl text-white font-semibold mb-4">Summary</h2>
          <div className="w-1/4 h-1 bg-white my-2"></div>
          <p className="mt-8">{content.summary}</p>
          <p className="mt-12">Keyword: {content.keyword}</p>
        </div>
      </section>

      <section className="mb-8 bg-white px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl text-gray-800 font-semibold mb-4">
            Existing Condition
          </h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
          <ExistingCondition />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="condition1">
              <AccordionTrigger>Institutional Arrangement</AccordionTrigger>
              <AccordionContent>{content.existingCondition1}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition2">
              <AccordionTrigger>Regional Administration</AccordionTrigger>
              <AccordionContent>{content.existingCondition2}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition3">
              <AccordionTrigger>Population Demographics</AccordionTrigger>
              <AccordionContent>{content.existingCondition3}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition4">
              <AccordionTrigger>Community Education Level</AccordionTrigger>
              <AccordionContent>{content.existingCondition4}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition5">
              <AccordionTrigger>
                Agricultural, Plantation, and Fisheries Conditions
              </AccordionTrigger>
              <AccordionContent>{content.existingCondition5}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition6">
              <AccordionTrigger>
                Community Culture and Ethnicity
              </AccordionTrigger>
              <AccordionContent>{content.existingCondition6}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition7">
              <AccordionTrigger>Topography</AccordionTrigger>
              <AccordionContent>{content.existingCondition7}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition8">
              <AccordionTrigger>Climate</AccordionTrigger>
              <AccordionContent>{content.existingCondition8}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition9">
              <AccordionTrigger>
                Land Cover and Mangrove Density
              </AccordionTrigger>
              <AccordionContent>{content.existingCondition9}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition10">
              <AccordionTrigger>Shoreline Changes</AccordionTrigger>
              <AccordionContent>{content.existingCondition10}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition11">
              <AccordionTrigger>Species Composition</AccordionTrigger>
              <AccordionContent>{content.existingCondition11}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition12">
              <AccordionTrigger>Dominant Mangrove Species</AccordionTrigger>
              <AccordionContent>{content.existingCondition12}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition13">
              <AccordionTrigger>
                Biomass, Carbon Storage, and Carbon Dioxide Absorption
              </AccordionTrigger>
              <AccordionContent>{content.existingCondition13}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition14">
              <AccordionTrigger>Fauna Diversity</AccordionTrigger>
              <AccordionContent>{content.existingCondition14}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition15">
              <AccordionTrigger>Pond Conditions</AccordionTrigger>
              <AccordionContent>{content.existingCondition15}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition16">
              <AccordionTrigger>Pond Design & Constructions</AccordionTrigger>
              <AccordionContent>{content.existingCondition16}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition17">
              <AccordionTrigger>Layout and Irrigation System</AccordionTrigger>
              <AccordionContent>{content.existingCondition17}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition18">
              <AccordionTrigger>Water Quality Condition</AccordionTrigger>
              <AccordionContent>{content.existingCondition18}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition19">
              <AccordionTrigger>Soil Quality Condition</AccordionTrigger>
              <AccordionContent>{content.existingCondition19}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition20">
              <AccordionTrigger>Cultivation</AccordionTrigger>
              <AccordionContent>{content.existingCondition20}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition21">
              <AccordionTrigger>
                Best Practice Financial Condition
              </AccordionTrigger>
              <AccordionContent>{content.existingCondition21}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition22">
              <AccordionTrigger>
                Financial Analysis of Livestock Farming
              </AccordionTrigger>
              <AccordionContent>{content.existingCondition22}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="condition23">
              <AccordionTrigger>
                Financial Analysis of Vegetation Cultivation
              </AccordionTrigger>
              <AccordionContent>{content.existingCondition23}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="mb-8 px-16 ">
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

      {/* <section className="mb-8 bg-white px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Supporting Document</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
          <p className="mt-8">Supporting document available</p>
        </div>
      </section> */}

      <section className="mb-8 bg-white px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Supporting Document</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>

          {/* Menampilkan PDF dengan <embed> */}
          {content.supportingDoc && (
            <div className="mb-4">
              <embed
                src={content.supportingDoc}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            </div>
          )}

          {/* Tombol Unduh */}
          {content.supportingDoc && (
            <a href={content.supportingDoc} download>
              <Button className="bg-green-800 hover:bg-green-900">
                Download Supporting PDF
              </Button>
            </a>
          )}
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="mb-8 bg-green-800 px-16 text-white">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="w-1/4 h-1 bg-white my-2"></div>
            <div className="relative w-full h-[400px] mt-8">
              <Image
                // src={`data:image/jpeg;base64,${galleryImages[currentImageIndex]}`}
                src={`${galleryImages[currentImageIndex]}`}
                alt={`Gallery image ${currentImageIndex + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {content.videoLink && (
        <section className="mb-8 bg-white px-16">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Video</h2>
            <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
            <div className="relative aspect-video mt-8">
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

      {maps.length > 0 && (
        <section className="mb-8 bg-green-800 px-16 text-white">
          <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Map</h2>
            <div className="w-1/4 h-1 bg-white my-2"></div>
            <div className="relative w-full h-[400px]">
              <Image
                // src={`data:image/jpeg;base64,${maps[currentMapIndex]}`}
                src={`${maps[currentMapIndex]}`}
                alt={`Map ${currentMapIndex + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2"
                onClick={handlePrevMap}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleNextMap}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* <section className="mb-8 bg-white px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
          <div className="space-y-4 w-full mt-8">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">John Doe</span>
                <span className="text-muted-foreground">2 days ago</span>
              </div>
              <p>This is a great initiative for mangrove conservation!</p>
            </div>
            <form className="space-y-4">
              <Textarea
                placeholder="Add a comment..."
                className="min-h-[100px]"
              />
              <Button className="bg-green-800 hover:bg-green-900">
                Post Comment
              </Button>
            </form>
          </div>
        </div>
      </section> */}

      <section className="mb-8 bg-white px-16">
        <div className="flex flex-col items-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="w-1/4 h-1 bg-gray-800 my-2"></div>
          <div className="space-y-4 w-full mt-8">
            {/* Existing comments */}
            {content.comments?.map((comment) => (
              <div key={comment.id} className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    {comment.name || "Anonymous"}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
            {/* Comment form */}
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
