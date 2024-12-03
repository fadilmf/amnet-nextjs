"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

interface ContentData {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
  keywords: string[];
  cover: string | null;
  status: "DRAFT" | "PUBLISHED";
  existingConditions: Array<{
    title: string;
    description: string;
    images: Array<{
      file: File | null;
      alt: string;
    }>;
  }>;
}

export default function EditContentPage() {
  const params = useParams();
  const router = useRouter();
  //   const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContentData | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/api/content/${params.id}`);
        setContent(response.data);
        if (response.data.cover) {
          setCoverPreview(response.data.cover);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        // toast({
        //   title: "Error",
        //   description: "Failed to fetch content data",
        //   variant: "destructive",
        // });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchContent();
    }
  }, [params.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContent((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value.split(",").map((k) => k.trim());
    setContent((prev) => (prev ? { ...prev, keywords } : null));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContent((prev) => (prev ? { ...prev, cover: file } : null));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    if (!content) return;

    setSaving(true);
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append("title", content.title);
      formData.append("summary", content.summary);
      formData.append("author", content.author);
      formData.append("date", content.date);
      formData.append("keywords", JSON.stringify(content.keywords));
      formData.append("status", status);

      // Append cover if it's a File object
      if (content.cover instanceof File) {
        formData.append("cover", content.cover);
      }

      // Append existing conditions
      content.existingConditions.forEach((condition, index) => {
        formData.append(`existingConditions[${index}][title]`, condition.title);
        formData.append(
          `existingConditions[${index}][description]`,
          condition.description
        );

        condition.images.forEach((image, imgIndex) => {
          if (image.file) {
            formData.append(
              `existingConditions[${index}][images][${imgIndex}]`,
              image.file
            );
            formData.append(
              `existingConditions[${index}][imagesAlt][${imgIndex}]`,
              image.alt
            );
          }
        });
      });

      await axios.put(`/api/content/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //   toast({
      //     title: "Success",
      //     description:
      //       status === "DRAFT"
      //         ? "Draft saved successfully"
      //         : "Content published successfully",
      //   });

      router.push("/admin/dashboard/draft");
    } catch (error) {
      console.error("Error saving content:", error);
      //   toast({
      //     title: "Error",
      //     description: "Failed to save content",
      //     variant: "destructive",
      //   });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Content not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Edit Content</h1>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={content.title}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          {/* Summary */}
          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={content.summary}
              onChange={handleInputChange}
              className="mt-1"
              rows={4}
            />
          </div>

          {/* Author */}
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={content.author}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={content.date}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          {/* Keywords */}
          <div>
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              name="keywords"
              value={content.keywords.join(", ")}
              onChange={handleKeywordsChange}
              className="mt-1"
            />
          </div>

          {/* Cover Image */}
          <div>
            <Label htmlFor="cover">Cover Image</Label>
            <Input
              id="cover"
              name="cover"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="mt-1"
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="mt-2 max-w-xs rounded"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end mt-8">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/dashboard/draft")}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSubmit("DRAFT")}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save as Draft"
              )}
            </Button>
            <Button onClick={() => handleSubmit("PUBLISHED")} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
