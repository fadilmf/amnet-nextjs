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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ExistingCondition {
  title: string;
  description: string;
  images: { file: File | null; alt: string }[];
}

interface SustainabilityDimension {
  dimensionType:
    | "ECOLOGY"
    | "SOCIAL"
    | "ECONOMY"
    | "INSTITUTIONAL"
    | "TECHNOLOGY";
  title: string;
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
  supportingDocuments: { name: string; file: File | null }[];
  maps: { file: File | null; alt: string }[];
  gallery: { file: File | null; alt: string }[];
  videos: { url: string; title: string }[];
  status: "DRAFT" | "PUBLISHED";
}

const initialDimensionState = (
  type: SustainabilityDimension["dimensionType"]
): SustainabilityDimension => ({
  dimensionType: type,
  title: "",
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
  supportingDocuments: [],
  maps: [],
  gallery: [],
  videos: [],
  status: "DRAFT",
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
                  preview: img.url || "",
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
          supportingDocuments:
            data.supportingDocs?.map((doc: any) => ({
              name: doc.name,
              file: null,
              preview: doc.file,
            })) || [],
          maps:
            data.maps?.map((map: any) => ({
              file: null,
              alt: map.alt,
              preview: map.file,
            })) || [],
          gallery:
            data.galleries?.map((gallery: any) => ({
              file: null,
              alt: gallery.alt,
              preview: gallery.image,
            })) || [],
          videos: data.videoLinks || [],
          status: data.status || "DRAFT",
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

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    setIsSubmitting(true);
    setSubmitResponse(null);

    try {
      const formData = new FormData();

      // Append basic fields
      formData.append("title", content.title);
      formData.append("summary", content.snippet);
      formData.append("author", content.author);
      formData.append("date", content.date);
      formData.append("keywords", JSON.stringify(content.keywords));
      formData.append("status", status);
      formData.append("userId", user?.id || "");
      formData.append("countryId", user?.countryId.toString() || "");

      // Append cover if it's a new File
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

      // Append dimensions data
      const dimensions: (keyof Content)[] = [
        "ecologyDimension",
        "socialDimension",
        "economyDimension",
        "institutionalDimension",
        "technologyDimension",
      ];

      dimensions.forEach((dim) => {
        const dimension = content[dim] as SustainabilityDimension;
        formData.append(
          dim,
          JSON.stringify({
            title: dimension.title,
            inputMethod: dimension.inputMethod,
            significantAspects: dimension.significantAspects,
            sustainabilityScore: dimension.sustainabilityScore,
          })
        );

        dimension.graphImages.forEach((image, index) => {
          if (image.file) {
            formData.append(`${dim}GraphImages[${index}]`, image.file);
            formData.append(`${dim}GraphImagesAlt[${index}]`, image.alt);
          }
        });
      });

      // ... append other data (supporting docs, maps, gallery, videos) ...

      const response = await axios.put(`/api/content/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitResponse({
        success: true,
        message: `Content successfully ${
          status === "DRAFT" ? "saved as draft" : "published"
        }!`,
      });

      router.push("/admin/dashboard/content");
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
      supportingDocuments: [
        ...prev.supportingDocuments,
        { name: "", file: null },
      ],
    }));
  };

  const addMap = () => {
    setContent((prev) => ({
      ...prev,
      maps: [...prev.maps, { file: null, alt: "" }],
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
      videos: [...prev.videos, { url: "", title: "" }],
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
      supportingDocuments: prev.supportingDocuments.filter(
        (_, i) => i !== index
      ),
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
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  name="summary"
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
                    <Label htmlFor={`existingConditions[${index}][title]`}>
                      Title
                    </Label>
                    <Input
                      id={`existingConditions[${index}][title]`}
                      name={`existingConditions[${index}][title]`}
                      value={condition.title}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`existingConditions[${index}][description]`}
                    >
                      Description
                    </Label>
                    <Textarea
                      id={`existingConditions[${index}][description]`}
                      name={`existingConditions[${index}][description]`}
                      value={condition.description}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  {condition.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="flex gap-2 mb-2 items-center"
                    >
                      <Label
                        htmlFor={`existingConditions[${index}][images][${imgIndex}]`}
                      >
                        Image
                      </Label>
                      <Input
                        id={`existingConditions[${index}][images][${imgIndex}]`}
                        name={`existingConditions[${index}][images][${imgIndex}]`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setContent((prev) => ({
                              ...prev,
                              existingConditions: prev.existingConditions.map(
                                (c, i) =>
                                  i === index
                                    ? {
                                        ...c,
                                        images: c.images.map((img, imgI) =>
                                          imgI === imgIndex
                                            ? {
                                                ...img,
                                                file: file,
                                                alt: img.alt,
                                                preview: img.preview,
                                              }
                                            : img
                                        ),
                                      }
                                    : c
                              ),
                            }));
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setContent((prev) => ({
                                ...prev,
                                existingConditions: prev.existingConditions.map(
                                  (c, i) =>
                                    i === index
                                      ? {
                                          ...c,
                                          images: c.images.map((img, imgI) =>
                                            imgI === imgIndex
                                              ? {
                                                  ...img,
                                                  alt: img.alt,
                                                  preview:
                                                    reader.result as string,
                                                }
                                              : img
                                          ),
                                        }
                                      : c
                                ),
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="mt-1"
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          removeImageFromExistingCondition(index, imgIndex)
                        }
                        variant="destructive"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addImageToExistingCondition(index)}
                    size="sm"
                    className="mt-2"
                  >
                    Add Image
                  </Button>
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
                    <Label htmlFor={`${dim}-title`}>Title</Label>
                    <Input
                      id={`${dim}-title`}
                      value={dimensionData.title}
                      onChange={(e) =>
                        handleDimensionChange(
                          dimensionKey,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </div>

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
                      {[0, 1].map((graphIndex) => (
                        <div key={graphIndex} className="space-y-2">
                          <Label>Graph {graphIndex + 1}</Label>
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  const newGraphImages = [
                                    ...dimensionData.graphImages,
                                  ];
                                  newGraphImages[graphIndex] = {
                                    ...newGraphImages[graphIndex],
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
                              value={
                                dimensionData.graphImages[graphIndex]?.alt || ""
                              }
                              onChange={(e) => {
                                const newGraphImages = [
                                  ...dimensionData.graphImages,
                                ];
                                newGraphImages[graphIndex] = {
                                  ...newGraphImages[graphIndex],
                                  alt: e.target.value,
                                };
                                handleDimensionChange(
                                  dimensionKey,
                                  "graphImages",
                                  newGraphImages
                                );
                              }}
                            />
                            {dimensionData.graphImages[graphIndex]?.preview && (
                              <img
                                src={
                                  dimensionData.graphImages[graphIndex].preview
                                }
                                alt={dimensionData.graphImages[graphIndex].alt}
                                className="w-16 h-16 object-cover"
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
              <CardTitle>Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {content.supportingDocuments.map((doc, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <Label htmlFor={`supportingDocuments[${index}][name]`}>
                    Name
                  </Label>
                  <Input
                    id={`supportingDocuments[${index}][name]`}
                    name={`supportingDocuments[${index}][name]`}
                    value={doc.name}
                    onChange={(e) => {
                      setContent((prev) => ({
                        ...prev,
                        supportingDocuments: prev.supportingDocuments.map(
                          (d, i) =>
                            i === index
                              ? {
                                  ...d,
                                  name: e.target.value,
                                }
                              : d
                        ),
                      }));
                    }}
                    className="mt-1"
                  />
                  <Label htmlFor={`supportingDocuments[${index}][file]`}>
                    File
                  </Label>
                  <Input
                    id={`supportingDocuments[${index}][file]`}
                    name={`supportingDocuments[${index}][file]`}
                    type="file"
                    accept="application/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setContent((prev) => ({
                          ...prev,
                          supportingDocuments: prev.supportingDocuments.map(
                            (d, i) =>
                              i === index
                                ? {
                                    ...d,
                                    file: file,
                                    preview: d.preview,
                                  }
                                : d
                          ),
                        }));
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setContent((prev) => ({
                            ...prev,
                            supportingDocuments: prev.supportingDocuments.map(
                              (d, i) =>
                                i === index
                                  ? {
                                      ...d,
                                      preview: reader.result as string,
                                    }
                                  : d
                            ),
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mt-1"
                  />
                  <Button
                    type="button"
                    onClick={() => removeSupportingDocument(index)}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addSupportingDocument}>
                Add Supporting Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maps</CardTitle>
            </CardHeader>
            <CardContent>
              {content.maps.map((map, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <Label htmlFor={`maps[${index}][file]`}>File</Label>
                  <Input
                    id={`maps[${index}][file]`}
                    name={`maps[${index}][file]`}
                    type="file"
                    accept="application/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setContent((prev) => ({
                          ...prev,
                          maps: prev.maps.map((m, i) =>
                            i === index
                              ? {
                                  ...m,
                                  file: file,
                                  alt: m.alt,
                                  preview: m.preview,
                                }
                              : m
                          ),
                        }));
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setContent((prev) => ({
                            ...prev,
                            maps: prev.maps.map((m, i) =>
                              i === index
                                ? {
                                    ...m,
                                    alt: m.alt,
                                    preview: reader.result as string,
                                  }
                                : m
                            ),
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mt-1"
                  />
                  <Label htmlFor={`maps[${index}][alt]`}>Alt</Label>
                  <Input
                    id={`maps[${index}][alt]`}
                    name={`maps[${index}][alt]`}
                    value={map.alt}
                    onChange={(e) => {
                      setContent((prev) => ({
                        ...prev,
                        maps: prev.maps.map((m, i) =>
                          i === index
                            ? {
                                ...m,
                                alt: e.target.value,
                              }
                            : m
                        ),
                      }));
                    }}
                    className="mt-1"
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
              ))}
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
              {content.gallery.map((image, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <Label htmlFor={`gallery[${index}][file]`}>File</Label>
                  <Input
                    id={`gallery[${index}][file]`}
                    name={`gallery[${index}][file]`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setContent((prev) => ({
                          ...prev,
                          gallery: prev.gallery.map((img, i) =>
                            i === index
                              ? {
                                  ...img,
                                  file: file,
                                  alt: img.alt,
                                  preview: img.preview,
                                }
                              : img
                          ),
                        }));
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setContent((prev) => ({
                            ...prev,
                            gallery: prev.gallery.map((img, i) =>
                              i === index
                                ? {
                                    ...img,
                                    alt: img.alt,
                                    preview: reader.result as string,
                                  }
                                : img
                            ),
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mt-1"
                  />
                  <Label htmlFor={`gallery[${index}][alt]`}>Alt</Label>
                  <Input
                    id={`gallery[${index}][alt]`}
                    name={`gallery[${index}][alt]`}
                    value={image.alt}
                    onChange={(e) => {
                      setContent((prev) => ({
                        ...prev,
                        gallery: prev.gallery.map((img, i) =>
                          i === index
                            ? {
                                ...img,
                                alt: e.target.value,
                              }
                            : img
                        ),
                      }));
                    }}
                    className="mt-1"
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
              ))}
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
                  <Label htmlFor={`videos[${index}][url]`}>URL</Label>
                  <Input
                    id={`videos[${index}][url]`}
                    name={`videos[${index}][url]`}
                    value={video.url}
                    onChange={(e) => {
                      setContent((prev) => ({
                        ...prev,
                        videos: prev.videos.map((v, i) =>
                          i === index
                            ? {
                                ...v,
                                url: e.target.value,
                              }
                            : v
                        ),
                      }));
                    }}
                    className="mt-1"
                  />
                  <Label htmlFor={`videos[${index}][title]`}>Title</Label>
                  <Input
                    id={`videos[${index}][title]`}
                    name={`videos[${index}][title]`}
                    value={video.title}
                    onChange={(e) => {
                      setContent((prev) => ({
                        ...prev,
                        videos: prev.videos.map((v, i) =>
                          i === index
                            ? {
                                ...v,
                                title: e.target.value,
                              }
                            : v
                        ),
                      }));
                    }}
                    className="mt-1"
                  />
                  <Button
                    type="button"
                    onClick={() => removeVideo(index)}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addVideo}>
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
              onClick={() => handleSubmit("PUBLISHED")}
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
