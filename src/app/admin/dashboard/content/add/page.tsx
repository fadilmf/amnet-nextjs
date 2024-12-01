"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

type DimensionKey =
  | "ecologyDimension"
  | "socialDimension"
  | "economyDimension"
  | "institutionalDimension"
  | "technologyDimension";
type DimensionBase =
  | "ecology"
  | "social"
  | "economy"
  | "institutional"
  | "technology";

export default function AddContentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [content, setContent] = useState<Content>({
    title: "",
    snippet: "",
    author: "",
    date: "",
    cover: null,
    keywords: [],
    existingConditions: [],
    ecologyDimension: {
      dimensionType: "ECOLOGY",
      title: "",
      inputMethod: "",
      significantAspects: ["", "", ""],
      sustainabilityScore: 0,
      images: [],
      graphImages: [],
    },
    socialDimension: {
      dimensionType: "SOCIAL",
      title: "",
      inputMethod: "",
      significantAspects: ["", "", ""],
      sustainabilityScore: 0,
      images: [],
      graphImages: [],
    },
    economyDimension: {
      dimensionType: "ECONOMY",
      title: "",
      inputMethod: "",
      significantAspects: ["", "", ""],
      sustainabilityScore: 0,
      images: [],
      graphImages: [],
    },
    institutionalDimension: {
      dimensionType: "INSTITUTIONAL",
      title: "",
      inputMethod: "",
      significantAspects: ["", "", ""],
      sustainabilityScore: 0,
      images: [],
      graphImages: [],
    },
    technologyDimension: {
      dimensionType: "TECHNOLOGY",
      title: "",
      inputMethod: "",
      significantAspects: ["", "", ""],
      sustainabilityScore: 0,
      images: [],
      graphImages: [],
    },
    supportingDocuments: [],
    maps: [],
    gallery: [],
    videos: [],
    status: "DRAFT",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value.split(",").map((keyword) => keyword.trim());
    setContent((prev) => ({ ...prev, keywords }));
  };

  const addExistingCondition = () => {
    setContent((prev) => ({
      ...prev,
      existingConditions: [
        ...prev.existingConditions,
        { title: "", description: "", images: [] },
      ],
    }));
  };

  const removeExistingCondition = (index: number) => {
    setContent((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.filter((_, i) => i !== index),
    }));
  };

  const handleExistingConditionChange = (
    index: number,
    field: keyof ExistingCondition,
    value: string | File
  ) => {
    setContent((prev) => ({
      ...prev,
      existingConditions: prev.existingConditions.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition
      ),
    }));
  };

  const handleExistingConditionImageChange = (
    conditionIndex: number,
    imageIndex: number,
    field: "file" | "alt",
    value: File | string
  ) => {
    console.log(
      `Updating image for condition ${conditionIndex}, image ${imageIndex}:`,
      {
        field,
        value: field === "file" ? (value as File).name : value,
      }
    );

    setContent((prev) => {
      const newContent = {
        ...prev,
        existingConditions: prev.existingConditions.map((condition, i) =>
          i === conditionIndex
            ? {
                ...condition,
                images: condition.images.map((img, imgI) =>
                  imgI === imageIndex ? { ...img, [field]: value } : img
                ),
              }
            : condition
        ),
      };

      // Verifikasi perubahan
      console.log(
        `Updated condition ${conditionIndex} images:`,
        newContent.existingConditions[conditionIndex].images
      );

      return newContent;
    });
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

  const addSupportingDocument = () => {
    setContent((prev) => ({
      ...prev,
      supportingDocuments: [
        ...prev.supportingDocuments,
        { name: "", file: null },
      ],
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

  const addMap = () => {
    setContent((prev) => ({
      ...prev,
      maps: [...prev.maps, { file: null, alt: "" }],
    }));
  };

  const removeMap = (index: number) => {
    setContent((prev) => ({
      ...prev,
      maps: prev.maps.filter((_, i) => i !== index),
    }));
  };

  const addGalleryImage = () => {
    setContent((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { file: null, alt: "" }],
    }));
  };

  const removeGalleryImage = (index: number) => {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const addVideo = () => {
    setContent((prev) => ({
      ...prev,
      videos: [...prev.videos, { url: "", title: "" }],
    }));
  };

  const removeVideo = (index: number) => {
    setContent((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    updateFunction: (file: File) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      updateFunction(e.target.files[0]);
    }
  };

  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    // Debug log di awal fungsi
    console.log(
      "Checking existing conditions before submit:",
      content.existingConditions.map((ec) => ({
        ...ec,
        images: ec.images.map((img) => ({
          hasFile: !!img.file,
          fileName: img.file?.name,
          alt: img.alt,
        })),
      }))
    );

    setIsSubmitting(true);
    setSubmitResponse(null);

    try {
      const formData = new FormData();

      // Add basic fields
      formData.append("title", content.title);
      formData.append("userId", user?.id || "");
      formData.append("countryId", user?.countryId.toString() || "");
      formData.append("summary", content.snippet);
      formData.append("author", content.author);
      formData.append("date", content.date);
      formData.append("keywords", JSON.stringify(content.keywords));
      formData.append("status", status);

      // Add cover image if exists
      if (content.cover) {
        formData.append("cover", content.cover);
      }

      // Add existing conditions
      content.existingConditions.forEach((condition, index) => {
        formData.append(`existingConditions[${index}][title]`, condition.title);
        formData.append(
          `existingConditions[${index}][description]`,
          condition.description
        );

        // Perbaikan penanganan gambar
        if (condition.images && condition.images.length > 0) {
          condition.images.forEach((image, imgIndex) => {
            if (image.file) {
              console.log(
                `Appending image for condition ${index}, image ${imgIndex}:`,
                image.file.name
              );
              formData.append(
                `existingConditions[${index}][images][${imgIndex}]`,
                image.file,
                image.file.name // Tambahkan nama file
              );
              formData.append(
                `existingConditions[${index}][imagesAlt][${imgIndex}]`,
                image.alt || ""
              );
            }
          });
        }
      });

      // Add dimensions
      const dimensions: DimensionKey[] = [
        "ecologyDimension",
        "socialDimension",
        "economyDimension",
        "institutionalDimension",
        "technologyDimension",
      ];

      dimensions.forEach((dim) => {
        const dimension = content[dim];
        formData.append(
          dim,
          JSON.stringify({
            dimensionType: dimension.dimensionType,
            title: dimension.title,
            inputMethod: dimension.inputMethod,
            significantAspects: dimension.significantAspects,
            sustainabilityScore: dimension.sustainabilityScore,
          })
        );

        // Add dimension graph images
        dimension.graphImages.forEach((image, index) => {
          if (image.file) {
            formData.append(`${dim}GraphImages[${index}]`, image.file);
            formData.append(`${dim}GraphImagesAlt[${index}]`, image.alt);
          }
        });
      });

      // Add supporting documents
      content.supportingDocuments.forEach((doc, index) => {
        if (doc.file) {
          formData.append(`supportingDocs[${index}]`, doc.file);
          formData.append(`supportingDocsNames[${index}]`, doc.name);
        }
      });

      // Add maps
      content.maps.forEach((map, index) => {
        if (map.file) {
          formData.append(`maps[${index}]`, map.file);
          formData.append(`mapsAlt[${index}]`, map.alt);
        }
      });

      // Add gallery images
      content.gallery.forEach((image, index) => {
        if (image.file) {
          formData.append(`galleries[${index}]`, image.file);
          formData.append(`galleriesAlt[${index}]`, image.alt);
        }
      });

      // Add videos
      formData.append("videoLinks", JSON.stringify(content.videos));

      // Log FormData untuk debugging
      console.log("=== Data yang akan dikirim ===");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch("/api/content", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitResponse({
          success: true,
          message: `Content successfully ${
            status === "DRAFT" ? "saved as draft" : "published"
          }!`,
        });
        router.push("/admin/dashboard/content");
      } else {
        setSubmitResponse({
          success: false,
          error: data.error || data.details || "Failed to add content",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitResponse({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Content</h1>

      {/* Response Message */}
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
                required
              />
            </div>
            <div>
              <Label htmlFor="snippet">Summary</Label>
              <Textarea
                id="snippet"
                name="snippet"
                value={content.snippet}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={content.author}
                onChange={handleInputChange}
                required
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
                required
              />
            </div>
            <div>
              <Label htmlFor="cover">Cover Image</Label>
              <Input
                id="cover"
                name="cover"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileInput(e, (file) =>
                    setContent((prev) => ({ ...prev, cover: file }))
                  )
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                name="keywords"
                value={content.keywords.join(", ")}
                onChange={handleKeywordsChange}
              />
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
                <div className="mb-2">
                  <Label htmlFor={`condition-title-${index}`}>Title</Label>
                  <Input
                    id={`condition-title-${index}`}
                    value={condition.title}
                    onChange={(e) =>
                      handleExistingConditionChange(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Condition title"
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor={`condition-description-${index}`}>
                    Description
                  </Label>
                  <Textarea
                    id={`condition-description-${index}`}
                    value={condition.description}
                    onChange={(e) =>
                      handleExistingConditionChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Condition description"
                  />
                </div>
                {condition.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="mt-2 flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log(
                            `File selected for condition ${index}, image ${imgIndex}:`,
                            file.name
                          );
                          handleExistingConditionImageChange(
                            index,
                            imgIndex,
                            "file",
                            file
                          );
                        }
                      }}
                      className="mb-2"
                    />
                    <Input
                      value={image.alt}
                      onChange={(e) =>
                        handleExistingConditionImageChange(
                          index,
                          imgIndex,
                          "alt",
                          e.target.value
                        )
                      }
                      placeholder="Image alt text"
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
                <Input
                  placeholder="Document Name"
                  value={doc.name}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      supportingDocuments: prev.supportingDocuments.map(
                        (d, i) =>
                          i === index ? { ...d, name: e.target.value } : d
                      ),
                    }))
                  }
                />
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileInput(e, (file) =>
                      setContent((prev) => ({
                        ...prev,
                        supportingDocuments: prev.supportingDocuments.map(
                          (d, i) => (i === index ? { ...d, file } : d)
                        ),
                      }))
                    )
                  }
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
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileInput(e, (file) =>
                      setContent((prev) => ({
                        ...prev,
                        maps: prev.maps.map((m, i) =>
                          i === index ? { ...m, file } : m
                        ),
                      }))
                    )
                  }
                />
                <Input
                  placeholder="Map Alt Text"
                  value={map.alt}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      maps: prev.maps.map((m, i) =>
                        i === index ? { ...m, alt: e.target.value } : m
                      ),
                    }))
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
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileInput(e, (file) =>
                      setContent((prev) => ({
                        ...prev,
                        gallery: prev.gallery.map((img, i) =>
                          i === index ? { ...img, file } : img
                        ),
                      }))
                    )
                  }
                />
                <Input
                  placeholder="Image Alt Text"
                  value={image.alt}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      gallery: prev.gallery.map((img, i) =>
                        i === index ? { ...img, alt: e.target.value } : img
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
                <Input
                  placeholder="Video URL (YouTube/Google Drive)"
                  value={video.url}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      videos: prev.videos.map((v, i) =>
                        i === index ? { ...v, url: e.target.value } : v
                      ),
                    }))
                  }
                />
                <Input
                  placeholder="Video Title"
                  value={video.title}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      videos: prev.videos.map((v, i) =>
                        i === index ? { ...v, title: e.target.value } : v
                      ),
                    }))
                  }
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
    </div>
  );
}
