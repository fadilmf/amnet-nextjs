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
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { compressImage } from "@/lib/imageCompression";
import BytesImage from "@/components/BytesImage";

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
  graphImages: { file: File | null; alt: string; preview?: string }[];
}

interface SupportingDoc {
  file: File | null;
  name: string;
  preview?: { type: string; data: number[] } | null;
  isExisting: boolean;
}

interface Content {
  title: string;
  snippet: string;
  author: string;
  date: string;
  cover: File | null;
  // coverPreview?: string;
  coverPreview?: string | { type: string; data: number[] };
  keywords: string[];
  // existingConditions: ExistingCondition[];
  existingConditions: {
    title: string;
    description: string;
    images: {
      file: File | null;
      alt: string;
      preview?: string | { type: string; data: number[] };
    }[];
  }[];
  ecologyDimension: SustainabilityDimension;
  socialDimension: SustainabilityDimension;
  economyDimension: SustainabilityDimension;
  institutionalDimension: SustainabilityDimension;
  technologyDimension: SustainabilityDimension;
  supportingDocs: {
    file: File | null;
    name: string;
    preview?: { type: string; data: number[] } | null;
    isExisting: boolean;
  }[];
  maps: {
    file: File | null;
    preview?: string | { type: string; data: number[] };
  }[];
  gallery: {
    file: File | null;
    preview?: string | { type: string; data: number[] };
  }[];
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
        const { data } = await axios.get(`/api/content/${params.id}`);
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
                  preview: img.file, // Data Bytes dari API
                  existingFile: img.file, // Simpan data Bytes asli
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
              name: doc.name,
              preview: {
                type: "application/pdf",
                data: doc.file, // Data Bytes dari API
              },
              isExisting: true, // Tambahkan flag isExisting
            })) || [],
          maps:
            data.maps?.map((map: any) => ({
              file: null,
              preview: map.file || "",
            })) || [],
          gallery:
            data.galleries?.map((img: any) => ({
              file: null,
              preview: img.image, // Data Bytes dari API
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

      // Add cover image if it exists
      if (content.cover) {
        formData.append("cover", content.cover);
      }

      // Add dimensions data
      const dimensions = [
        "ecology",
        "social",
        "economy",
        "institutional",
        "technology",
      ];

      dimensions.forEach((dim) => {
        const dimensionKey = `${dim}Dimension` as keyof Content;
        const dimensionData = content[dimensionKey];

        if (dimensionData) {
          formData.append(
            `${dim}Dimension`,
            JSON.stringify({
              dimensionType: dimensionData.dimensionType || dim.toUpperCase(),
              inputMethod: dimensionData.inputMethod || "",
              significantAspects: dimensionData.significantAspects || [],
              sustainabilityScore: dimensionData.sustainabilityScore || 0,
            })
          );

          if (dimensionData.graphImages) {
            dimensionData.graphImages.forEach((image, index) => {
              console.log(`Processing ${dim} graph image ${index}:`, {
                hasFile: !!image.file,
                hasPreview: !!image.preview,
                alt: image.alt,
              });

              if (image.file instanceof File) {
                console.log(
                  `Adding new graph file for ${dim}:`,
                  image.file.name
                );
                formData.append(`${dim}DimensionImages[${index}]`, image.file);
                formData.append(
                  `${dim}DimensionImagesAlt[${index}]`,
                  image.alt || ""
                );
              } else if (image.preview) {
                console.log(`Adding existing graph image for ${dim}`);
                formData.append(
                  `${dim}DimensionExistingGraphImages[${index}]`,
                  JSON.stringify({
                    data: image.preview,
                    alt: image.alt || "",
                  })
                );
              }
            });
          }
        } else {
          formData.append(
            `${dim}Dimension`,
            JSON.stringify({
              dimensionType: dim.toUpperCase(),
              inputMethod: "",
              significantAspects: ["", "", ""],
              sustainabilityScore: 0,
            })
          );
        }
      });

      // Handle overall dimension separately
      if (content.overallDimension) {
        formData.append(
          "overallDimension",
          JSON.stringify({
            overall: content.overallDimension.overall || "",
            sustainabilityScore:
              content.overallDimension.sustainabilityScore || 0,
          })
        );

        // Handle overall dimension graph images
        content.overallDimension.graphImages.forEach((image, index) => {
          console.log(`Processing overall dimension graph image ${index}:`, {
            hasFile: !!image.file,
            hasPreview: !!image.preview,
            alt: image.alt,
          });

          if (image.file instanceof File) {
            console.log(`Adding new graph file for overall:`, image.file.name);
            formData.append(
              `overallDimensionGraphImages[${index}]`,
              image.file
            );
            formData.append(
              `overallDimensionGraphImagesAlt[${index}]`,
              image.alt || ""
            );
          } else if (image.preview) {
            console.log(`Adding existing graph image for overall`);
            formData.append(
              `overallDimensionExistingGraphImages[${index}]`,
              JSON.stringify({
                data: image.preview,
                alt: image.alt || "",
              })
            );
          }
        });
      }

      // Log semua entries di FormData untuk debugging
      console.log("\n=== FORM DATA ENTRIES ===");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, "File:", value.name);
        } else {
          console.log(key, value);
        }
      }

      // Handle existing conditions dengan format yang sama seperti AddContentPage
      content.existingConditions.forEach((condition, index) => {
        formData.append(`existingConditions[${index}][title]`, condition.title);
        formData.append(
          `existingConditions[${index}][description]`,
          condition.description
        );

        condition.images.forEach((image, imageIndex) => {
          if (image.file) {
            // New image
            formData.append(
              `existingConditions[${index}][images][${imageIndex}]`,
              image.file
            );
          } else if (image.existingFile) {
            // Existing image with Bytes data
            formData.append(
              `existingConditions[${index}][existingImages][${imageIndex}]`,
              JSON.stringify({
                data: image.existingFile,
                alt: image.alt || "",
              })
            );
          }
        });
      });

      // Handle maps
      content.maps.forEach((map, index) => {
        if (map.file instanceof File) {
          // New map file
          formData.append(`maps[${index}][file]`, map.file);
        } else if (map.preview) {
          // Existing map
          formData.append(
            `maps[${index}][existingImages]`,
            JSON.stringify({
              data: map.preview,
            })
          );
        }
      });

      // Debug log untuk melihat state saat ini
      console.log(
        "Current supportingDocs state:",
        content.supportingDocs.map((doc) => ({
          name: doc.name,
          isNewFile: doc.file instanceof File,
          hasExistingFile: !!doc.existingFile,
          existingFileSize: doc.existingFile ? doc.existingFile.length : 0,
        }))
      );

      // Kirim supporting docs dengan format yang jelas
      content.supportingDocs.forEach((doc, index) => {
        if (doc.isExisting && doc.preview) {
          // Kirim existing doc dengan data Bytes
          formData.append(
            `supportingDocsExisting[${index}]`,
            JSON.stringify({
              name: doc.name,
              data: doc.preview.data,
            })
          );
        } else if (doc.file) {
          // Kirim new doc
          formData.append(`supportingDocs[${index}][file]`, doc.file);
          formData.append(`supportingDocs[${index}][name]`, doc.name);
        }
      });

      // Debug log untuk FormData
      console.log("\n=== SUPPORTING DOCS IN FORM DATA ===");
      const supportingDocsEntries = Array.from(formData.entries()).filter(
        ([key]) =>
          key.includes("supportingDocs") ||
          key.includes("supportingDocsExisting")
      );

      supportingDocsEntries.forEach(([key, value]) => {
        if (value instanceof File) {
          console.log(`${key}:`, {
            type: "File",
            name: value.name,
            size: value.size,
          });
        } else {
          try {
            const parsed = JSON.parse(value.toString());
            console.log(`${key}:`, {
              type: "Existing",
              name: parsed.name,
              dataSize: parsed.data ? parsed.data.length : 0,
            });
          } catch (e) {
            console.log(`${key}:`, value);
          }
        }
      });

      // Update video links - send both existing and new videos
      content.videos.forEach((video, index) => {
        formData.append(`videoLinks[${index}][url]`, video.url);
      });

      console.log("Submitting form data:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Handle gallery images
      content.gallery.forEach((image, index) => {
        if (image.file instanceof File) {
          // New gallery image
          formData.append(`galleries[${index}][file]`, image.file);
        } else if (image.preview) {
          // Existing gallery image
          formData.append(
            `galleries[${index}][existingImages]`,
            JSON.stringify({
              data: image.preview,
            })
          );
        }
      });

      // Debug log untuk gallery
      console.log("\n=== GALLERY IN FORM DATA ===");
      const galleryEntries = Array.from(formData.entries()).filter(([key]) =>
        key.includes("galleries")
      );

      galleryEntries.forEach(([key, value]) => {
        if (value instanceof File) {
          console.log(`${key}:`, {
            type: "File",
            name: value.name,
            size: value.size,
          });
        } else {
          try {
            const parsed = JSON.parse(value.toString());
            console.log(`${key}:`, {
              type: "Existing",
              dataSize: parsed.data ? parsed.data.length : 0,
            });
          } catch (e) {
            console.log(`${key}:`, value);
          }
        }
      });

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

      // Add redirect after successful submission

      if (status === "DRAFT") {
        router.push("/admin/dashboard/draft");
      } else {
        router.push("/admin/dashboard/content");
      }
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

  const addSupportingDoc = () => {
    setContent((prev) => ({
      ...prev,
      supportingDocs: [
        ...prev.supportingDocs,
        { file: null, name: "", preview: null },
      ],
    }));
  };

  const addMap = () => {
    setContent((prev) => ({
      ...prev,
      maps: [...prev.maps, { file: null, preview: null }],
    }));
  };

  const addGalleryImage = () => {
    setContent((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { file: null, preview: null }],
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

  const removeSupportingDoc = (index: number) => {
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

  // Handle supporting docs change
  const handleSupportingDocChange = async (
    index: number,
    field: "file" | "name",
    value: File | string
  ) => {
    if (field === "file" && value instanceof File) {
      setContent((prev) => ({
        ...prev,
        supportingDocs: prev.supportingDocs.map((doc, i) =>
          i === index
            ? {
                file: value,
                name: value.name,
                preview: null,
                isExisting: false,
              }
            : doc
        ),
      }));
    } else if (field === "name" && !value.isExisting) {
      setContent((prev) => ({
        ...prev,
        supportingDocs: prev.supportingDocs.map((doc, i) =>
          i === index
            ? {
                ...doc,
                name: value as string,
              }
            : doc
        ),
      }));
    }
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

  // Update handler untuk maps
  const handleMapChange = async (index: number, file: File) => {
    const compressedFile = await compressImage(file);
    setContent((prev) => ({
      ...prev,
      maps: prev.maps.map((map, i) =>
        i === index
          ? {
              ...map,
              file: compressedFile,
              preview: URL.createObjectURL(compressedFile),
            }
          : map
      ),
    }));
  };

  const handleExistingConditionImageChange = async (
    conditionIndex: number,
    imageIndex: number,
    field: "file" | "alt",
    value: File | string
  ) => {
    if (field === "file" && value instanceof File) {
      const compressedFile = await compressImage(value);
      setContent((prev) => ({
        ...prev,
        existingConditions: prev.existingConditions.map((condition, i) =>
          i === conditionIndex
            ? {
                ...condition,
                images: condition.images.map((img, imgI) =>
                  imgI === imageIndex ? { ...img, file: compressedFile } : img
                ),
              }
            : condition
        ),
      }));
    } else {
      setContent((prev) => ({
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
      }));
    }
  };

  // Update dimension image handling
  const handleDimensionImageChange = async (
    dimension: DimensionKey,
    imageIndex: number,
    file: File
  ) => {
    if (file.type.startsWith("image/")) {
      const compressedFile = await compressImage(file);
      const newImages = [...content[dimension].images];
      newImages[imageIndex] = {
        file: compressedFile,
        alt: compressedFile.name,
      };
      handleDimensionChange(dimension, "images", newImages);
    }
  };

  // Update dimension graph image handling
  const handleDimensionGraphImageChange = async (
    dimension: DimensionKey,
    graphIndex: number,
    file: File
  ) => {
    if (file.type.startsWith("image/")) {
      const compressedFile = await compressImage(file);
      const newGraphImages = [...content[dimension].graphImages];
      newGraphImages[graphIndex] = {
        file: compressedFile,
        alt: compressedFile.name,
      };
      handleDimensionChange(dimension, "graphImages", newGraphImages);
    }
  };

  // Update overall dimension graph image handling
  const handleOverallGraphImageChange = async (
    graphIndex: number,
    file: File
  ) => {
    if (file.type.startsWith("image/")) {
      const compressedFile = await compressImage(file);
      const newGraphImages = [...content.overallDimension.graphImages];
      newGraphImages[graphIndex] = {
        file: compressedFile,
        alt: compressedFile.name,
      };
      setContent((prev) => ({
        ...prev,
        overallDimension: {
          ...prev.overallDimension,
          graphImages: newGraphImages,
        },
      }));
    }
  };

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      content?.supportingDocs?.forEach((doc) => {
        if (doc.preview) {
          URL.revokeObjectURL(doc.preview);
        }
      });
    };
  }, []);

  const handleGalleryChange = async (index: number, file: File) => {
    const compressedFile = await compressImage(file);
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.map((img, i) =>
        i === index
          ? {
              ...img,
              file: compressedFile,
              preview: URL.createObjectURL(compressedFile),
            }
          : img
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
                  <div className="mt-2 relative">
                    <BytesImage
                      bytes={
                        typeof content.coverPreview === "string"
                          ? null
                          : content.coverPreview
                      }
                      preview={
                        typeof content.coverPreview === "string"
                          ? content.coverPreview
                          : undefined
                      }
                      alt="Cover preview"
                      width={320}
                      height={240}
                      className="rounded object-cover"
                    />
                  </div>
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
                      {condition.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative">
                          {/* Show existing images from database */}
                          {(image.preview || image.existingFile) && (
                            <div className="relative w-16 h-16">
                              <BytesImage
                                bytes={image.existingFile || image.preview}
                                alt={image.alt || "Condition image"}
                                width={64}
                                height={64}
                                className="object-cover rounded"
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
                          )}

                          {/* Input fields for new images */}
                          {!image.preview && !image.existingFile && (
                            <div className="flex gap-2 mb-2 items-center">
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
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add Image button */}
                    <Button
                      type="button"
                      onClick={() => addImageToExistingCondition(index)}
                      size="sm"
                      className="mt-2"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
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

                  {/* Graph Images */}
                  <div className="mt-4">
                    <Label>Graph Images</Label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {dimensionData.graphImages.map((image, index) => (
                        <div key={index} className="relative">
                          {/* Show existing/preview graph images */}
                          {(image.preview || image.file) && (
                            <div className="relative w-16 h-16">
                              <BytesImage
                                bytes={image.preview}
                                preview={
                                  image.file
                                    ? URL.createObjectURL(image.file)
                                    : undefined
                                }
                                alt={image.alt || "Graph image"}
                                width={64}
                                height={64}
                                className="object-cover rounded"
                              />
                              <Button
                                type="button"
                                onClick={() => {
                                  const newGraphImages = [
                                    ...dimensionData.graphImages,
                                  ];
                                  newGraphImages.splice(index, 1);
                                  handleDimensionChange(
                                    dimensionKey,
                                    "graphImages",
                                    newGraphImages
                                  );
                                }}
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}

                          {/* Input fields for new graph images */}
                          {!image.preview && !image.file && (
                            <div className="flex gap-2 mb-2 items-center">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleDimensionGraphImageChange(
                                      dimensionKey,
                                      index,
                                      e.target.files[0]
                                    );
                                  }
                                }}
                              />
                              <Input
                                value={image.alt}
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
                                placeholder="Graph alt text"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {dimensionData.graphImages.length < 2 && (
                      <Button
                        type="button"
                        onClick={() => {
                          const newGraphImages = [
                            ...dimensionData.graphImages,
                            { file: null, alt: "" },
                          ];
                          handleDimensionChange(
                            dimensionKey,
                            "graphImages",
                            newGraphImages
                          );
                        }}
                        size="sm"
                        className="mt-2"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Graph
                      </Button>
                    )}
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
              <div className="mt-4">
                <Label>Overall Graphs</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {content.overallDimension.graphImages.map((image, index) => (
                    <div key={index} className="relative">
                      {/* Show existing/preview graph images */}
                      {(image.preview || image.file) && (
                        <div className="relative w-16 h-16">
                          <BytesImage
                            bytes={image.preview}
                            preview={
                              image.file
                                ? URL.createObjectURL(image.file)
                                : undefined
                            }
                            alt={image.alt || "Overall graph"}
                            width={64}
                            height={64}
                            className="object-cover rounded"
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const newGraphImages = [
                                ...content.overallDimension.graphImages,
                              ];
                              newGraphImages.splice(index, 1);
                              setContent((prev) => ({
                                ...prev,
                                overallDimension: {
                                  ...prev.overallDimension,
                                  graphImages: newGraphImages,
                                },
                              }));
                            }}
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {/* Input fields for new graph images */}
                      {!image.preview && !image.file && (
                        <div className="flex gap-2 mb-2 items-center">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleOverallGraphImageChange(
                                  index,
                                  e.target.files[0]
                                );
                              }
                            }}
                          />
                          <Input
                            value={image.alt}
                            onChange={(e) => {
                              const newGraphImages = [
                                ...content.overallDimension.graphImages,
                              ];
                              newGraphImages[index] = {
                                ...newGraphImages[index],
                                alt: e.target.value,
                              };
                              setContent((prev) => ({
                                ...prev,
                                overallDimension: {
                                  ...prev.overallDimension,
                                  graphImages: newGraphImages,
                                },
                              }));
                            }}
                            placeholder="Graph alt text"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {content.overallDimension.graphImages.length < 2 && (
                  <Button
                    type="button"
                    onClick={() => {
                      const newGraphImages = [
                        ...content.overallDimension.graphImages,
                        { file: null, alt: "" },
                      ];
                      setContent((prev) => ({
                        ...prev,
                        overallDimension: {
                          ...prev.overallDimension,
                          graphImages: newGraphImages,
                        },
                      }));
                    }}
                    size="sm"
                    className="mt-2"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Graph
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.supportingDocs.map((doc, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      {doc.isExisting ? (
                        // Existing document - show name only with icon
                        <div className="flex items-center gap-2 py-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <span className="text-sm font-medium">
                            {doc.name}
                          </span>
                        </div>
                      ) : (
                        // New document - show input fields
                        <>
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
                            className="mb-2"
                          />
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleSupportingDocChange(
                                  index,
                                  "file",
                                  e.target.files[0]
                                );
                              }
                            }}
                          />
                        </>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSupportingDoc(index)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => {
                  setContent((prev) => ({
                    ...prev,
                    supportingDocs: [
                      ...prev.supportingDocs,
                      {
                        file: null,
                        name: "",
                        preview: null,
                        isExisting: false,
                      },
                    ],
                  }));
                }}
                size="sm"
                className="mt-4"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Supporting Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4">
                <Label>Maps</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {content.maps.map((map, index) => (
                    <div key={index} className="relative">
                      {/* Show existing/preview map */}
                      {(map.preview || map.file) && (
                        <div className="relative w-16 h-16">
                          <BytesImage
                            bytes={map.preview}
                            preview={
                              map.file
                                ? URL.createObjectURL(map.file)
                                : undefined
                            }
                            alt="Map"
                            width={64}
                            height={64}
                            className="object-cover rounded"
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
                      )}

                      {/* Input field for new map */}
                      {!map.preview && !map.file && (
                        <div className="flex gap-2 mb-2 items-center">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleMapChange(index, e.target.files[0]);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    setContent((prev) => ({
                      ...prev,
                      maps: [...prev.maps, { file: null, preview: null }],
                    }));
                  }}
                  size="sm"
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Map
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mt-2">
                {content.gallery.map((image, index) => (
                  <div key={index} className="relative">
                    {/* Show existing/preview gallery image */}
                    {(image.preview || image.file) && (
                      <div className="relative w-16 h-16">
                        <BytesImage
                          bytes={image.preview}
                          preview={
                            image.file
                              ? URL.createObjectURL(image.file)
                              : undefined
                          }
                          alt="Gallery image"
                          width={64}
                          height={64}
                          className="object-cover rounded"
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
                    )}

                    {/* Input field for new gallery image */}
                    {!image.preview && !image.file && (
                      <div className="flex gap-2 mb-2 items-center">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleGalleryChange(index, e.target.files[0]);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => {
                  setContent((prev) => ({
                    ...prev,
                    gallery: [...prev.gallery, { file: null, preview: null }],
                  }));
                }}
                size="sm"
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
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
