"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlusCircle,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  FileIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ExistingCondition {
  title: string;
  description: string;
  images: {
    file: File | null;
    alt: string;
    filePath?: string;
  }[];
}

interface SustainabilityDimension {
  dimensionType:
    | "ECOLOGY"
    | "SOCIAL"
    | "ECONOMY"
    | "INSTITUTIONAL"
    | "TECHNOLOGY";
  inputMethod: string;
  significantAspects: string[];
  sustainabilityScore: number;
  images: { file: File | null; alt: string }[];
  graphImages: { file: File | null; alt: string }[];
}

interface Content {
  title: string;
  snippet: string;
  author: string;
  date: string;
  cover: File | null;
  coverPreview?: string;
  keywords: string[];
  existingConditions: ExistingCondition[];
  ecologyDimension: SustainabilityDimension;
  socialDimension: SustainabilityDimension;
  economyDimension: SustainabilityDimension;
  institutionalDimension: SustainabilityDimension;
  technologyDimension: SustainabilityDimension;
  supportingDocs: {
    file: File | null;
    name: string;
    preview?: string;
    filePath?: string;
  }[];
  maps: { file: File | null; alt: string; filePath: string }[];
  gallery: { file: File | null; alt: string }[];
  videos: { url: string; preview?: boolean }[];
  status: "DRAFT" | "REVIEW";
  overallDimension: {
    overall: string;
    sustainabilityScore: number;
    graphImages: { file: File | null; alt: string; preview?: string }[];
  };
}

const initialDimensionState = (
  type: SustainabilityDimension["dimensionType"]
): SustainabilityDimension => ({
  dimensionType: type,
  inputMethod: "",
  significantAspects: ["", "", ""],
  sustainabilityScore: 0,
  images: [],
  graphImages: [],
});

const initialContent: Content = {
  title: "",
  snippet: "",
  author: "",
  date: "",
  cover: null,
  keywords: [],
  existingConditions: [],
  ecologyDimension: initialDimensionState("ECOLOGY"),
  socialDimension: initialDimensionState("SOCIAL"),
  economyDimension: initialDimensionState("ECONOMY"),
  institutionalDimension: initialDimensionState("INSTITUTIONAL"),
  technologyDimension: initialDimensionState("TECHNOLOGY"),
  supportingDocs: [],
  maps: [],
  gallery: [],
  videos: [],
  status: "DRAFT",
  overallDimension: {
    overall: "",
    sustainabilityScore: 0,
    graphImages: [],
  },
};

export default function EditContentPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [content, setContent] = useState<Content>(initialContent);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/api/content/${params.id}`);
        const data = response.data;

        setContent({
          title: data.title || "",
          snippet: data.summary || "",
          author: data.author || "",
          date: data.date
            ? new Date(data.date).toISOString().split("T")[0]
            : "",
          cover: null,
          coverPreview: data.cover || "",
          keywords: data.keywords || [],
          existingConditions:
            data.existingConditions?.map((condition: any) => ({
              title: condition.title || "",
              description: condition.description || "",
              images:
                condition.images?.map((img: any) => ({
                  file: null,
                  alt: img.alt || "",
                  preview: img.file || "",
                  filePath: img.file || "",
                })) || [],
            })) || [],
          ecologyDimension: {
            ...initialDimensionState("ECOLOGY"),
            ...data.ecologyDimension,
            graphImages:
              data.ecologyDimension?.graphImages?.map((img: any) => ({
                file: null,
                alt: img.alt,
                preview: img.file,
              })) || [],
          },
          socialDimension: {
            ...initialDimensionState("SOCIAL"),
            ...data.socialDimension,
            graphImages:
              data.socialDimension?.graphImages?.map((img: any) => ({
                file: null,
                alt: img.alt,
                preview: img.file,
              })) || [],
          },
          economyDimension: {
            ...initialDimensionState("ECONOMY"),
            ...data.economyDimension,
            graphImages:
              data.economyDimension?.graphImages?.map((img: any) => ({
                file: null,
                alt: img.alt,
                preview: img.file,
              })) || [],
          },
          institutionalDimension: {
            ...initialDimensionState("INSTITUTIONAL"),
            ...data.institutionalDimension,
            graphImages:
              data.institutionalDimension?.graphImages?.map((img: any) => ({
                file: null,
                alt: img.alt,
                preview: img.file,
              })) || [],
          },
          technologyDimension: {
            ...initialDimensionState("TECHNOLOGY"),
            ...data.technologyDimension,
            graphImages:
              data.technologyDimension?.graphImages?.map((img: any) => ({
                file: null,
                alt: img.alt,
                preview: img.file,
              })) || [],
          },
          supportingDocs:
            data.supportingDocs?.map((doc: any) => ({
              file: null,
              name: doc.name || "",
              preview: doc.filePath || "",
              filePath: doc.filePath || "",
            })) || [],
          maps:
            data.maps?.map((map: any) => ({
              file: null,
              alt: map.alt,
              filePath: map.file,
            })) || [],
          gallery:
            data.galleries?.map((gallery: any) => ({
              file: null,
              alt: gallery.alt,
              preview: gallery.image,
            })) || [],
          videos:
            data.videoLinks?.map((video: any) => ({
              url: video.url,
              preview: true,
            })) || [],
          status: data.status || "DRAFT",
          overallDimension: {
            overall: data.overallDimension?.overall || "",
            sustainabilityScore:
              data.overallDimension?.sustainabilityScore || 0,
            graphImages:
              data.overallDimension?.graphImages?.map((img: any) => ({
                file: null,
                alt: img.alt,
                preview: img.file,
              })) || [],
          },
        });
      } catch (error) {
        console.error("Error fetching content:", error);
        setSubmitResponse({
          success: false,
          error: "Failed to fetch content data",
        });
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
        setContent((prev) =>
          prev ? { ...prev, coverPreview: reader.result as string } : null
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (status: "DRAFT" | "REVIEW") => {
    setIsSubmitting(true);
    setSubmitResponse(null);

    try {
      const formData = new FormData();

      // Basic fields
      formData.append("title", content.title);
      formData.append("summary", content.snippet);
      formData.append("author", content.author);
      formData.append("date", content.date);
      formData.append("keywords", JSON.stringify(content.keywords));
      formData.append("status", status);
      formData.append("userId", user?.id || "");
      formData.append("countryId", user?.countryId.toString() || "");

      // Handle existing conditions dengan format yang sama seperti AddContentPage
      content.existingConditions.forEach((condition, index) => {
        formData.append(`existingConditions[${index}][title]`, condition.title);
        formData.append(
          `existingConditions[${index}][description]`,
          condition.description
        );

        condition.images.forEach((image) => {
          if (image.file) {
            // New image
            formData.append(`existingConditions[${index}][images]`, image.file);
          } else if (image.filePath) {
            // Existing image
            formData.append(
              `existingConditions[${index}][existingImages]`,
              image.filePath
            );
          }
        });
      });

      // Handle maps
      content.maps.forEach((map, index) => {
        if (map.file) {
          // New map
          formData.append(`maps[${index}][file]`, map.file);
          formData.append(`maps[${index}][alt]`, map.alt);
        } else if (map.filePath) {
          // Existing map
          formData.append(`maps[${index}][existingFile]`, map.filePath);
          formData.append(`maps[${index}][alt]`, map.alt);
        }
      });

      // Handle gallery images
      content.gallery.forEach((image, index) => {
        if (image.file) {
          // New gallery image
          formData.append(`galleries[${index}][file]`, image.file);
          formData.append(`galleries[${index}][alt]`, image.alt);
        } else if (image.preview) {
          // Existing gallery image
          formData.append(`galleries[${index}][existingFile]`, image.preview);
          formData.append(`galleries[${index}][alt]`, image.alt);
        }
      });

      // Handle supporting documents
      content.supportingDocs.forEach((doc, index) => {
        if (doc.file) {
          // New document
          formData.append(`supportingDocs[${index}][file]`, doc.file);
          formData.append(`supportingDocs[${index}][name]`, doc.name);
        } else if (doc.preview) {
          // Existing document
          formData.append(
            `supportingDocs[${index}][existingFile]`,
            doc.preview
          );
          formData.append(`supportingDocs[${index}][name]`, doc.name);
        }
      });

      // Update video links - send both existing and new videos
      content.videos.forEach((video, index) => {
        formData.append(`videoLinks[${index}][url]`, video.url);
      });

      // Add overall dimension data
      formData.append(
        "overallDimension",
        JSON.stringify({
          overall: content.overallDimension.overall,
          sustainabilityScore: content.overallDimension.sustainabilityScore,
        })
      );

      // Add overall dimension graph images
      content.overallDimension.graphImages.forEach((image, index) => {
        if (image.file) {
          formData.append(`overallDimensionGraphImages[${index}]`, image.file);
          formData.append(
            `overallDimensionGraphImagesAlt[${index}]`,
            image.alt
          );
        } else if (image.preview) {
          formData.append(
            `overallDimensionExistingGraphImages[${index}]`,
            image.preview
          );
          formData.append(
            `overallDimensionGraphImagesAlt[${index}]`,
            image.alt
          );
        }
      });

      console.log("Submitting form data:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.put(`/api/content/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitResponse({
        success: true,
        message: `Content successfully ${
          status === "DRAFT" ? "saved as draft" : "sent to review"
        }!`,
      });
    } catch (error) {
      console.error("Error updating content:", error);
      setSubmitResponse({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while updating content",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add handlers for adding new fields
  const addExistingCondition = () => {
    setContent((prev) => ({
      ...prev,
      existingConditions: [
        ...prev.existingConditions,
        { title: "", description: "", images: [] },
      ],
    }));
  };

  const addImageToExistingCondition = (conditionIndex: number) => {
    setContent((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.map((condition, i) =>
        i === conditionIndex
          ? {
              ...condition,
              images: [...condition.images, { file: null, alt: "" }],
            }
          : condition
      ),
    }));
  };

  const addSupportingDocument = () => {
    setContent((prev) => ({
      ...prev,
      supportingDocs: [...prev.supportingDocs, { file: null, name: "" }],
    }));
  };

  const addMap = () => {
    setContent((prev) => ({
      ...prev,
      maps: [...prev.maps, { file: null, alt: "", filePath: "" }],
    }));
  };

  const addGalleryImage = () => {
    setContent((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { file: null, alt: "" }],
    }));
  };

  const addVideo = () => {
    setContent((prev) => ({
      ...prev,
      videos: [...prev.videos, { url: "" }],
    }));
  };

  // Add handlers for removing fields
  const removeExistingCondition = (index: number) => {
    setContent((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.filter((_, i) => i !== index),
    }));
  };

  const removeImageFromExistingCondition = (
    conditionIndex: number,
    imageIndex: number
  ) => {
    setContent((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.map((condition, i) =>
        i === conditionIndex
          ? {
              ...condition,
              images: condition.images.filter((_, imgI) => imgI !== imageIndex),
            }
          : condition
      ),
    }));
  };

  const removeSupportingDocument = (index: number) => {
    setContent((prev) => ({
      ...prev,
      supportingDocs: prev.supportingDocs.filter((_, i) => i !== index),
    }));
  };

  const removeMap = (index: number) => {
    setContent((prev) => ({
      ...prev,
      maps: prev.maps.filter((_, i) => i !== index),
    }));
  };

  const removeGalleryImage = (index: number) => {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const removeVideo = (index: number) => {
    setContent((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  // Add dimension-specific handlers
  const handleDimensionChange = (
    dimension: DimensionKey,
    field: keyof SustainabilityDimension,
    value: string | number | File | { file: File | null; alt: string }[]
  ) => {
    setContent((prev) => ({
      ...prev,
      [dimension]: {
        ...(prev[dimension] as SustainabilityDimension),
        [field]: value,
      },
    }));
  };

  const handleSignificantAspectChange = (
    dimension: DimensionKey,
    index: number,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [dimension]: {
        ...(prev[dimension] as SustainabilityDimension),
        significantAspects: (
          prev[dimension] as SustainabilityDimension
        ).significantAspects.map((aspect, i) => (i === index ? value : aspect)),
      },
    }));
  };

  // Update handler untuk existing condition fields
  const handleExistingConditionChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.map((condition, i) =>
        i === index
          ? {
              ...condition,
              [field]: value,
            }
          : condition
      ),
    }));
  };

  // Handler functions
  const handleSupportingDocChange = (
    index: number,
    field: "file" | "name",
    value: File | string
  ) => {
    setContent((prev) => ({
      ...prev,
      supportingDocs: prev.supportingDocs.map((doc, i) => {
        if (i === index) {
          if (field === "file") {
            // If changing file, create preview URL
            return {
              ...doc,
              file: value as File,
              name: (value as File).name, // Auto-set name from file
            };
          }
          // If changing name
          return { ...doc, name: value as string };
        }
        return doc;
      }),
    }));
  };

  // Tambahkan cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup all preview URLs when component unmounts
      if (content?.supportingDocs) {
        content.supportingDocs.forEach((doc) => {
          if (doc?.preview && !doc.filePath) {
            try {
              URL.revokeObjectURL(doc.preview);
            } catch (error) {
              console.error("Error revoking URL:", error);
            }
          }
        });
      }
    };
  }, []);

  // Handler untuk maps
  const handleMapFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setContent((prev) => ({
        ...prev,
        maps: prev.maps.map((map, i) =>
          i === index
            ? {
                ...map,
                file,
                filePath: map.filePath || "",
              }
            : map
        ),
      }));
    }
  };

  const handleMapAltChange = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      maps: prev.maps.map((map, i) =>
        i === index
          ? {
              ...map,
              alt: value,
            }
          : map
      ),
    }));
  };

  const handleExistingConditionImageChange = (
    conditionIndex: number,
    imageIndex: number,
    field: "file" | "alt",
    value: File | string
  ) => {
    setContent((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.map((condition, i) =>
        i === conditionIndex
          ? {
              ...condition,
              images: condition.images.map((img, imgI) =>
                imgI === imageIndex
                  ? {
                      ...img,
                      [field]: value,
                      preview:
                        field === "file"
                          ? URL.createObjectURL(value as File)
                          : img.preview,
                    }
                  : img
              ),
            }
          : condition
      ),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Content</h1>

      {submitResponse && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitResponse.success
              ? "bg-green-100 text-green-700 border border-green-400"
              : "bg-red-100 text-red-700 border border-red-400"
          }`}
        >
          {submitResponse.success ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>{submitResponse.message}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              <span>{submitResponse.error}</span>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <form className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div>
                <Label htmlFor="snippet">Summary</Label>
                <Textarea
                  id="snippet"
                  name="snippet"
                  value={content.snippet}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={4}
                />
              </div>

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
                {content.coverPreview && (
                  <img
                    src={content.coverPreview}
                    alt="Cover preview"
                    className="mt-2 max-w-xs rounded"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              {content.existingConditions.map((condition, index) => (
                <div key={index} className="border p-4 my-4 rounded">
                  <div>
                    <Label htmlFor={`existingConditions[${index}].title`}>
                      Title
                    </Label>
                    <Input
                      id={`existingConditions[${index}].title`}
                      value={condition.title}
                      onChange={(e) =>
                        handleExistingConditionChange(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`existingConditions[${index}].description`}>
                      Description
                    </Label>
                    <Textarea
                      id={`existingConditions[${index}].description`}
                      value={condition.description}
                      onChange={(e) =>
                        handleExistingConditionChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  {/* Existing Conditions Images */}
                  <div className="mt-4">
                    <Label>Current Images</Label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {condition.images.map(
                        (image, imgIndex) =>
                          image.preview && (
                            <div key={imgIndex} className="relative">
                              <img
                                src={image.preview}
                                alt={image.alt}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <Button
                                type="button"
                                onClick={() =>
                                  removeImageFromExistingCondition(
                                    index,
                                    imgIndex
                                  )
                                }
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                      )}
                    </div>

                    {/* Input fields for new images */}
                    {condition.images.map(
                      (image, imgIndex) =>
                        !image.preview && (
                          <div
                            key={imgIndex}
                            className="flex gap-2 mb-2 items-center"
                          >
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  const file = e.target.files[0];
                                  handleExistingConditionImageChange(
                                    index,
                                    imgIndex,
                                    "file",
                                    file
                                  );
                                }
                              }}
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                removeImageFromExistingCondition(
                                  index,
                                  imgIndex
                                )
                              }
                              variant="destructive"
                              size="sm"
                            >
                              Remove
                            </Button>
                          </div>
                        )
                    )}

                    <Button
                      type="button"
                      onClick={() => addImageToExistingCondition(index)}
                      size="sm"
                      className="mt-2"
                    >
                      Add Image
                    </Button>
                  </div>

                  <Button
                    type="button"
                    onClick={() => removeExistingCondition(index)}
                    variant="destructive"
                    size="sm"
                    className="mt-2 ml-2"
                  >
                    Remove Condition
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addExistingCondition}
                className="mt-2"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Existing Condition
              </Button>
            </CardContent>
          </Card>

          {(
            [
              "ecology",
              "social",
              "economy",
              "institutional",
              "technology",
            ] as const
          ).map((dim: DimensionBase) => {
            const dimensionKey = `${dim}Dimension` as DimensionKey;
            const dimensionData = content[
              dimensionKey
            ] as SustainabilityDimension;

            return (
              <Card key={dim}>
                <CardHeader>
                  <CardTitle>
                    {dim.charAt(0).toUpperCase() + dim.slice(1)} Dimension
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`${dim}-input-method`}>Input Method</Label>
                    <Input
                      id={`${dim}-input-method`}
                      value={dimensionData.inputMethod}
                      onChange={(e) =>
                        handleDimensionChange(
                          dimensionKey,
                          "inputMethod",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {[0, 1, 2].map((i) => (
                    <div key={i}>
                      <Label htmlFor={`${dim}-aspect-${i}`}>
                        Significant Aspect {i + 1}
                      </Label>
                      <Input
                        id={`${dim}-aspect-${i}`}
                        value={dimensionData.significantAspects[i]}
                        onChange={(e) =>
                          handleSignificantAspectChange(
                            dimensionKey,
                            i,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}

                  <div>
                    <Label htmlFor={`${dim}-score`}>Sustainability Score</Label>
                    <Input
                      id={`${dim}-score`}
                      type="number"
                      value={dimensionData.sustainabilityScore}
                      onChange={(e) =>
                        handleDimensionChange(
                          dimensionKey,
                          "sustainabilityScore",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>

                  {dimensionData.images.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`${dim}-image-${index}-file`}>
                        Image {index + 1}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id={`${dim}-image-${index}-file`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const newImages = [...dimensionData.images];
                              newImages[index] = {
                                ...newImages[index],
                                file: e.target.files[0],
                              };
                              handleDimensionChange(
                                dimensionKey,
                                "images",
                                newImages
                              );
                            }
                          }}
                        />
                        <Input
                          id={`${dim}-image-${index}-alt`}
                          value={image.alt}
                          onChange={(e) => {
                            const newImages = [...dimensionData.images];
                            newImages[index] = {
                              ...newImages[index],
                              alt: e.target.value,
                            };
                            handleDimensionChange(
                              dimensionKey,
                              "images",
                              newImages
                            );
                          }}
                          placeholder="Image alt text"
                        />
                        {image.preview && (
                          <img
                            src={image.preview}
                            alt={image.alt}
                            className="w-16 h-16 object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <Label>Dimension Graphs (Optional)</Label>
                    <div className="space-y-4">
                      {dimensionData.graphImages.map((image, index) => (
                        <div key={index} className="space-y-2">
                          <Label>Graph {index + 1}</Label>
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  const newGraphImages = [
                                    ...dimensionData.graphImages,
                                  ];
                                  newGraphImages[index] = {
                                    ...newGraphImages[index],
                                    file: e.target.files[0],
                                  };
                                  handleDimensionChange(
                                    dimensionKey,
                                    "graphImages",
                                    newGraphImages
                                  );
                                }
                              }}
                            />
                            <Input
                              placeholder="Graph alt text"
                              value={image.alt || ""}
                              onChange={(e) => {
                                const newGraphImages = [
                                  ...dimensionData.graphImages,
                                ];
                                newGraphImages[index] = {
                                  ...newGraphImages[index],
                                  alt: e.target.value,
                                };
                                handleDimensionChange(
                                  dimensionKey,
                                  "graphImages",
                                  newGraphImages
                                );
                              }}
                            />
                            {image.preview && (
                              <img
                                src={image.preview}
                                alt={image.alt}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Card>
            <CardHeader>
              <CardTitle>Overall Dimension</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="overall">Conclusion</Label>
                <Textarea
                  id="overall"
                  value={content.overallDimension.overall}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      overallDimension: {
                        ...prev.overallDimension,
                        overall: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="overallScore">
                  Overall Sustainability Score
                </Label>
                <Input
                  id="overallScore"
                  type="number"
                  value={content.overallDimension.sustainabilityScore}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      overallDimension: {
                        ...prev.overallDimension,
                        sustainabilityScore: parseFloat(e.target.value),
                      },
                    }))
                  }
                />
              </div>
              <div className="mt-4">
                <Label>Overall Graphs</Label>
                <div className="space-y-4">
                  {content.overallDimension.graphImages.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <Label>Graph {index + 1}</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const newGraphImages = [
                                ...content.overallDimension.graphImages,
                              ];
                              newGraphImages[index] = {
                                file: e.target.files[0],
                                alt: e.target.files[0].name,
                              };
                              setContent((prev) => ({
                                ...prev,
                                overallDimension: {
                                  ...prev.overallDimension,
                                  graphImages: newGraphImages,
                                },
                              }));
                            }
                          }}
                        />
                        {image.preview && (
                          <img
                            src={image.preview}
                            alt={image.alt}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {content.supportingDocs.map((doc, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  {/* For existing documents */}
                  {doc.filePath ? (
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md flex-grow">
                      <FileIcon className="h-4 w-4" />
                      <span className="text-sm">{doc.name}</span>
                      <a
                        href={doc.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm ml-auto"
                      >
                        View Document
                      </a>
                    </div>
                  ) : (
                    /* For new documents */
                    <>
                      <div className="flex-grow">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleSupportingDocChange(index, "file", file);
                            }
                          }}
                        />
                      </div>
                      <Input
                        type="text"
                        placeholder="Document name"
                        value={doc.name}
                        onChange={(e) =>
                          handleSupportingDocChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className="w-1/3"
                      />
                    </>
                  )}
                  <Button
                    type="button"
                    onClick={() => removeSupportingDocument(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addSupportingDocument}
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maps</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Maps Preview */}
              <div className="mt-4">
                <Label>Current Maps</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {content.maps.map(
                    (map, index) =>
                      map.filePath && (
                        <div key={index} className="relative">
                          <img
                            src={map.filePath}
                            alt={map.alt}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <Button
                            type="button"
                            onClick={() => removeMap(index)}
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                  )}
                </div>
              </div>

              {/* Input fields for new maps */}
              {content.maps.map(
                (map, index) =>
                  !map.filePath && (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMapFileChange(index, e)}
                      />
                      <Input
                        placeholder="Map Alt Text"
                        value={map.alt}
                        onChange={(e) =>
                          handleMapAltChange(index, e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        onClick={() => removeMap(index)}
                        variant="destructive"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  )
              )}

              <Button type="button" onClick={addMap}>
                Add Map
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Gallery Images Preview */}
              <div className="mt-4">
                <Label>Current Gallery Images</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {content.gallery.map(
                    (image, index) =>
                      image.preview && (
                        <div key={index} className="relative">
                          <img
                            src={image.preview}
                            alt={image.alt}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <Button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                  )}
                </div>
              </div>

              {/* Input fields for new gallery images */}
              {content.gallery.map(
                (image, index) =>
                  !image.preview && (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const file = e.target.files[0];
                            setContent((prev) => ({
                              ...prev,
                              gallery: prev.gallery.map((img, i) =>
                                i === index
                                  ? {
                                      ...img,
                                      file,
                                      preview: URL.createObjectURL(file),
                                    }
                                  : img
                              ),
                            }));
                          }
                        }}
                      />
                      <Input
                        placeholder="Image Alt Text"
                        value={image.alt}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            gallery: prev.gallery.map((img, i) =>
                              i === index
                                ? { ...img, alt: e.target.value }
                                : img
                            ),
                          }))
                        }
                      />
                      <Button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        variant="destructive"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  )
              )}

              <Button type="button" onClick={addGalleryImage}>
                Add Gallery Image
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Videos</CardTitle>
            </CardHeader>
            <CardContent>
              {content.videos.map((video, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  {video.preview ? (
                    // Preview/existing video URL - readonly
                    <div className="flex-grow bg-gray-100 p-2 rounded-md">
                      <span className="text-sm">{video.url}</span>
                    </div>
                  ) : (
                    // New video URL input
                    <Input
                      value={video.url}
                      onChange={(e) => {
                        setContent((prev) => ({
                          ...prev,
                          videos: prev.videos.map((v, i) =>
                            i === index ? { url: e.target.value } : v
                          ),
                        }));
                      }}
                      placeholder="Video URL"
                      className="flex-grow"
                    />
                  )}
                  <Button
                    type="button"
                    onClick={() => removeVideo(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addVideo} className="mt-2">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Video
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSubmit("DRAFT")}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save as Draft"
              )}
            </Button>
            <Button
              type="button"
              onClick={() => handleSubmit("REVIEW")}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
