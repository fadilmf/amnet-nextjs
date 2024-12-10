import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

// GET Handler
export async function GET(request: Request, { params }: any) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid content ID" },
        { status: 400 }
      );
    }

    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        existingConditions: {
          include: {
            images: true,
          },
        },
        ecologyDimension: {
          include: {
            graphImages: true,
          },
        },
        socialDimension: {
          include: {
            graphImages: true,
          },
        },
        economyDimension: {
          include: {
            graphImages: true,
          },
        },
        institutionalDimension: {
          include: {
            graphImages: true,
          },
        },
        technologyDimension: {
          include: {
            graphImages: true,
          },
        },
        overallDimension: {
          include: {
            graphImages: true,
          },
        },
        supportingDocs: true,
        galleries: true,
        videoLinks: true,
        maps: true,
        comments: true,
        country: true,
      },
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Transform the content to use filePaths instead of binary data
    const transformedContent = {
      ...content,
      // Use cover directly as it's already a string path
      cover: content.cover,

      // Transform existing conditions images
      existingConditions: content.existingConditions.map((condition) => ({
        ...condition,
        images: condition.images.map((img) => ({
          ...img,
          file: img.file,
          alt: img.alt,
        })),
      })),

      // Transform dimension images
      ecologyDimension: content.ecologyDimension
        ? {
            ...content.ecologyDimension,
            graphImages: content.ecologyDimension.graphImages.map((img) => ({
              ...img,
              file: img.file,
              alt: img.alt,
            })),
          }
        : null,

      socialDimension: content.socialDimension
        ? {
            ...content.socialDimension,
            graphImages: content.socialDimension.graphImages.map((img) => ({
              ...img,
              file: img.file,
              alt: img.alt,
            })),
          }
        : null,

      economyDimension: content.economyDimension
        ? {
            ...content.economyDimension,
            graphImages: content.economyDimension.graphImages.map((img) => ({
              ...img,
              file: img.file,
              alt: img.alt,
            })),
          }
        : null,

      institutionalDimension: content.institutionalDimension
        ? {
            ...content.institutionalDimension,
            graphImages: content.institutionalDimension.graphImages.map(
              (img) => ({
                ...img,
                file: img.file,
                alt: img.alt,
              })
            ),
          }
        : null,

      technologyDimension: content.technologyDimension
        ? {
            ...content.technologyDimension,
            graphImages: content.technologyDimension.graphImages.map((img) => ({
              ...img,
              file: img.file,
              alt: img.alt,
            })),
          }
        : null,

      overallDimension: content.overallDimension
        ? {
            ...content.overallDimension,
            graphImages: content.overallDimension.graphImages.map((img) => ({
              ...img,
              file: img.file,
              alt: img.alt,
              preview: img.file,
            })),
          }
        : null,

      // Transform supporting documents
      supportingDocs: content.supportingDocs.map((doc) => ({
        id: doc.id,
        file: doc.file,
        name: doc.name || "",
        preview: doc.file
          ? {
              type: "application/pdf",
              data: Array.from(doc.file),
            }
          : null,
        isExisting: true,
      })),

      // Transform galleries
      galleries: content.galleries.map((gallery) => ({
        ...gallery,
        image: gallery.image,
      })),

      // Transform maps
      maps: content.maps.map((map) => ({
        ...map,
        file: map.file,
        alt: map.alt || "",
      })),
    };

    return NextResponse.json(transformedContent);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      {
        error: "Error fetching content",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// PUT Handler
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Pastikan id valid
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid content ID" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const existingConditionsData = [];
    const mapsData = [];
    const galleriesData = [];
    const supportingDocsData = [];
    const videoLinksData = [];

    // Debug log
    console.log("Received FormData entries:");
    for (const [key, value] of formData.entries()) {
      // Skip logging untuk data Bytes/Binary
      if (
        key.includes("file") ||
        key.includes("image") ||
        key.includes("existingImages") ||
        value instanceof File ||
        (typeof value === "string" && value.length > 1000) // Skip string panjang yang mungkin berisi data binary
      ) {
        console.log(`${key}: [Binary Data]`);
      } else {
        console.log(`${key}:`, value);
      }

      if (key.startsWith("existingConditions[")) {
        const matches = key.match(/\[(\d+)\]\[(\w+)\]/);
        if (matches) {
          const [, index, field] = matches;
          const idx = parseInt(index);

          if (!existingConditionsData[idx]) {
            existingConditionsData[idx] = {
              title: "",
              description: "",
              images: [],
              existingImages: [],
            };
          }

          if (field === "title") {
            existingConditionsData[idx].title = value;
          } else if (field === "description") {
            existingConditionsData[idx].description = value;
          } else if (field === "images") {
            existingConditionsData[idx].images.push(value);
          } else if (field === "existingImages") {
            existingConditionsData[idx].existingImages.push(value);
          }
        }
      }

      // Handle maps
      if (key.startsWith("maps[")) {
        const matches = key.match(/\[(\d+)\]\[(\w+)\]/);
        if (matches) {
          const [, index, field] = matches;
          const idx = parseInt(index);

          if (!mapsData[idx]) {
            mapsData[idx] = {
              file: null,
              alt: "",
              existingImage: null,
            };
          }

          if (field === "file" && value instanceof File) {
            // Handle new map file
            mapsData[idx].file = value;
          } else if (field === "existingImages") {
            // Handle existing map - parse JSON string
            try {
              const existingImage = JSON.parse(value as string);
              mapsData[idx].existingImage = existingImage;
            } catch (e) {
              console.error("Error parsing existing map data:", e);
            }
          } else if (field === "alt") {
            mapsData[idx].alt = value;
          }
        }
      }

      // Handle galleries
      if (key.startsWith("galleries[")) {
        const matches = key.match(/\[(\d+)\]\[(\w+)\]/);
        if (matches) {
          const [, index, field] = matches;
          const idx = parseInt(index);

          if (!galleriesData[idx]) {
            galleriesData[idx] = {
              file: null,
              existingImage: null,
            };
          }

          if (field === "file" && value instanceof File) {
            // Handle new gallery image
            galleriesData[idx].file = value;
          } else if (field === "existingImages") {
            // Handle existing gallery image
            try {
              const existingImage = JSON.parse(value as string);
              galleriesData[idx].existingImage = existingImage.data;
            } catch (e) {
              console.error("Error processing existing gallery image:", e);
            }
          }
        }
      }

      // Handle supporting docs
      if (key.startsWith("supportingDocs[")) {
        const matches = key.match(/\[(\d+)\]\[(\w+)\]/);
        if (matches) {
          const [, index, field] = matches;
          const idx = parseInt(index);

          if (!supportingDocsData[idx]) {
            supportingDocsData[idx] = {};
          }
          supportingDocsData[idx][field] = value;
        }
      }

      // Handle video links
      if (key.startsWith("videoLinks[")) {
        const matches = key.match(/\[(\d+)\]\[(\w+)\]/);
        if (matches) {
          const [, index, field] = matches;
          const idx = parseInt(index);

          if (!videoLinksData[idx]) {
            videoLinksData[idx] = {};
          }
          videoLinksData[idx][field] = value;
        }
      }
    }

    console.log("Processed videoLinks:", videoLinksData);

    // Debug log processed data
    // console.log("Processed videoLinksData:", videoLinksData);

    // Add handling for overallDimension
    const overallDimensionData = JSON.parse(
      formData.get("overallDimension") as string
    );
    const overallGraphImages = [];

    // Process new overall dimension images
    for (let i = 0; i < 2; i++) {
      const image = formData.get(`overallDimensionGraphImages[${i}]`) as File;
      const imageAlt = formData.get(
        `overallDimensionGraphImagesAlt[${i}]`
      ) as string;

      if (image && image instanceof File) {
        const imageBytes = await saveFileAsBytes(image);
        overallGraphImages.push({
          file: imageBytes,
          alt: imageAlt || "",
        });
      }
    }

    // Process existing overall dimension images
    for (let i = 0; i < 2; i++) {
      const existingImageStr = formData.get(
        `overallDimensionExistingGraphImages[${i}]`
      );

      if (existingImageStr) {
        try {
          const existingImage = JSON.parse(existingImageStr as string);
          overallGraphImages.push({
            file: Buffer.from(existingImage.data),
            alt: existingImage.alt || "",
          });
        } catch (error) {
          console.error(
            `Error processing existing overall dimension image:`,
            error
          );
        }
      }
    }

    console.log(
      "overall dimension graphImages:",
      overallGraphImages.map((img) => ({
        hasFile: !!img.file,
        fileSize: img.file ? img.file.length : 0,
        alt: img.alt,
      }))
    );

    // Process dimensions data
    const dimensions = [
      "ecology",
      "social",
      "economy",
      "institutional",
      "technology",
    ];

    const dimensionUpdates = {};

    for (const dim of dimensions) {
      const dimensionData = JSON.parse(
        formData.get(`${dim}Dimension`) as string
      );
      const graphImages = [];

      // Process new dimension images
      for (let i = 0; i < 2; i++) {
        const image = formData.get(`${dim}DimensionImages[${i}]`) as File;
        const imageAlt = formData.get(
          `${dim}DimensionImagesAlt[${i}]`
        ) as string;

        if (image && image instanceof File) {
          const imageBytes = await saveFileAsBytes(image);
          graphImages.push({
            file: imageBytes,
            alt: imageAlt || "",
          });
        }
      }

      // Process existing dimension images
      for (let i = 0; i < 2; i++) {
        const existingImageStr = formData.get(
          `${dim}DimensionExistingGraphImages[${i}]`
        );

        if (existingImageStr) {
          try {
            const existingImage = JSON.parse(existingImageStr as string);
            graphImages.push({
              file: Buffer.from(existingImage.data),
              alt: existingImage.alt || "",
            });
          } catch (error) {
            console.error(`Error processing existing image for ${dim}:`, error);
          }
        }
      }

      // Debug log untuk melihat hasil graphImages
      console.log(
        `${dim} dimension graphImages:`,
        graphImages.map((img) => ({
          hasFile: !!img.file,
          fileSize: img.file ? img.file.length : 0,
          alt: img.alt,
        }))
      );

      // Create dimension update object
      dimensionUpdates[`${dim}Dimension`] = {
        upsert: {
          create: {
            title: dimensionData.dimensionType || dim.toUpperCase(),
            inputMethod: dimensionData.inputMethod || "",
            significantAspects: dimensionData.significantAspects || [],
            sustainabilityScore: dimensionData.sustainabilityScore || 0,
            graphImages: {
              create: graphImages.map((img) => ({
                file: img.file,
                alt: img.alt,
              })),
            },
          },
          update: {
            title: dimensionData.dimensionType || dim.toUpperCase(),
            inputMethod: dimensionData.inputMethod || "",
            significantAspects: dimensionData.significantAspects || [],
            sustainabilityScore: dimensionData.sustainabilityScore || 0,
            graphImages: {
              deleteMany: {},
              create: graphImages.map((img) => ({
                file: img.file,
                alt: img.alt,
              })),
            },
          },
        },
      };
    }

    // Handle cover image
    let coverBytes;
    const coverFile = formData.get("cover") as File;
    if (coverFile && coverFile instanceof File) {
      coverBytes = await saveFileAsBytes(coverFile);
    }

    // Process supporting docs data
    const supportingDocs = [];

    // Debug log untuk melihat semua entries yang berkaitan dengan supporting docs
    console.log("\n=== CHECKING SUPPORTING DOCS ENTRIES ===");
    for (const [key, value] of formData.entries()) {
      if (
        key.includes("supportingDocs") ||
        key.includes("supportingDocsExisting")
      ) {
        console.log(`Found entry: ${key}`, {
          type: value instanceof Blob ? "Blob" : typeof value,
          size: value instanceof Blob ? value.size : undefined,
          value: value instanceof Blob ? "[Binary]" : value,
        });
      }
    }

    // Handle existing supporting docs
    const existingDocsEntries = Array.from(formData.entries()).filter(([key]) =>
      key.startsWith("supportingDocsExisting")
    );

    console.log("Existing docs entries found:", existingDocsEntries.length);

    for (const [key, docData] of existingDocsEntries) {
      try {
        if (docData instanceof Blob || docData instanceof File) {
          // Handle as binary data
          const buffer = Buffer.from(await docData.arrayBuffer());
          const name =
            formData.get(
              `supportingDocsExistingName[${supportingDocs.length}]`
            ) || "document.pdf";

          supportingDocs.push({
            name: name,
            file: buffer,
          });
        } else if (typeof docData === "string") {
          // Handle as string (might be binary data encoded as string)
          try {
            const buffer = Buffer.from(docData, "binary");
            const name =
              formData.get(
                `supportingDocsExistingName[${supportingDocs.length}]`
              ) || "document.pdf";

            console.log("Processing existing doc from string:", {
              key,
              bufferSize: buffer.length,
              name,
            });

            supportingDocs.push({
              name: name,
              file: buffer,
            });
          } catch (e) {
            console.error("Error processing existing doc string:", e);
          }
        }
      } catch (error) {
        console.error(`Error processing existing doc [${key}]:`, error);
      }
    }

    // Handle new supporting docs
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("supportingDocs[")) {
        const matches = key.match(/\[(\d+)\]\[file\]/);
        if (matches) {
          const index = parseInt(matches[1]);
          const name = formData.get(`supportingDocs[${index}][name]`) as string;
          const buffer = await fileToBytes(value);
          supportingDocs.push({
            name: name || value.name,
            file: buffer,
          });
        }
      }
    }

    // Debug log untuk melihat hasil processing
    console.log(
      "Final processed supporting docs:",
      supportingDocs.map((doc) => ({
        hasFile: !!doc.file,
        fileSize: doc.file ? doc.file.length : 0,
        name: doc.name,
      }))
    );

    // Update in database
    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        summary: formData.get("summary") as string,
        author: formData.get("author") as string,
        date: formData.get("date")
          ? new Date(formData.get("date") as string)
          : null,
        keywords: JSON.parse(formData.get("keywords") as string),
        status: formData.get("status") as string,
        userId: formData.get("userId") as string,
        countryId: parseInt(formData.get("countryId") as string),
        // Add cover update only if new file is uploaded
        ...(coverBytes && { cover: coverBytes }),
        ...dimensionUpdates,
        existingConditions: {
          deleteMany: {},
          create: await Promise.all(
            existingConditionsData.map(async (condition) => ({
              title: condition.title,
              description: condition.description,
              images: {
                create: [
                  // Handle existing images yang dikirim sebagai Bytes
                  ...(condition.existingImages || []).map((existingImage) => {
                    // Parse string JSON menjadi object jika masih dalam bentuk string
                    const imageData =
                      typeof existingImage === "string"
                        ? JSON.parse(existingImage)
                        : existingImage;

                    return {
                      file: imageData.data ? Buffer.from(imageData.data) : null, // Convert Bytes data ke Buffer
                      alt: imageData.alt || "",
                    };
                  }),
                  // Handle new images
                  ...(await Promise.all(
                    (condition.images || []).map(async (image: File) => ({
                      file: await saveFileAsBytes(image),
                      alt: "",
                    }))
                  )),
                ],
              },
            }))
          ),
        },

        // Update maps
        maps: {
          deleteMany: {},
          create: await Promise.all(
            mapsData
              .map(async (map) => {
                if (map.file instanceof File) {
                  // Handle new map file
                  return {
                    file: await saveFileAsBytes(map.file),
                    alt: map.alt || "",
                  };
                } else if (map.existingImage?.data) {
                  // Handle existing map
                  return {
                    file: Buffer.from(map.existingImage.data),
                    alt: map.existingImage.alt || map.alt || "",
                  };
                }
                return null;
              })
              .filter(Boolean)
          ),
        },

        // Update galleries
        galleries: {
          deleteMany: {},
          create: await Promise.all(
            galleriesData
              .map(async (gallery) => {
                if (gallery.file instanceof File) {
                  // Handle new gallery image
                  return {
                    image: await saveFileAsBytes(gallery.file),
                  };
                } else if (gallery.existingImage) {
                  // Handle existing gallery image
                  return {
                    image: Buffer.from(gallery.existingImage),
                  };
                }
                return null;
              })
              .filter(Boolean)
          ),
        },

        // Update supporting docs
        supportingDocs: {
          deleteMany: {},
          create: await Promise.all([
            // Handle existing docs
            ...existingDocsEntries.map(async ([key, value]) => {
              try {
                const parsed =
                  typeof value === "string" ? JSON.parse(value) : value;
                console.log("Processing existing doc:", {
                  name: parsed.name,
                  dataLength: parsed.data?.length,
                });

                return {
                  name: parsed.name,
                  file: Array.isArray(parsed.data)
                    ? Buffer.from(parsed.data)
                    : null,
                };
              } catch (error) {
                console.error("Error processing existing doc:", error);
                console.log("Raw value:", value);
                return null;
              }
            }),
            // Handle new docs
            ...Array.from(formData.entries())
              .filter(([key]) => key.match(/^supportingDocs\[\d+\]\[file\]/))
              .map(async ([key, value]) => {
                const index = key.match(/\[(\d+)\]/)?.[1];
                const name = formData.get(
                  `supportingDocs[${index}][name]`
                ) as string;
                const file = value as File;
                return {
                  name,
                  file: await fileToBytes(file),
                };
              }),
          ]).then((docs) => docs.filter(Boolean)),
        },

        // Update video links
        videoLinks: {
          deleteMany: {},
          create: videoLinksData?.map((link: any) => ({
            url: link.url,
            // title: link.title || "",
          })),
        },

        // Add overallDimension update
        overallDimension: {
          upsert: {
            create: {
              overall: overallDimensionData.overall || "",
              sustainabilityScore:
                overallDimensionData.sustainabilityScore || 0,
              graphImages: {
                create: overallGraphImages.map((img) => ({
                  file: img.file,
                  alt: img.alt,
                })),
              },
            },
            update: {
              overall: overallDimensionData.overall || "",
              sustainabilityScore:
                overallDimensionData.sustainabilityScore || 0,
              graphImages: {
                deleteMany: {},
                create: overallGraphImages.map((img) => ({
                  file: img.file,
                  alt: img.alt,
                })),
              },
            },
          },
        },
      },
      include: {
        existingConditions: {
          include: { images: true },
        },
        ecologyDimension: {
          include: { graphImages: true },
        },
        socialDimension: {
          include: { graphImages: true },
        },
        economyDimension: {
          include: { graphImages: true },
        },
        institutionalDimension: {
          include: { graphImages: true },
        },
        technologyDimension: {
          include: { graphImages: true },
        },
        maps: true,
        galleries: true,
        supportingDocs: true,
        videoLinks: true,
        overallDimension: {
          include: {
            graphImages: true,
          },
        },
      },
    });

    console.log("Updated videoLinks:", updatedContent.videoLinks);
    console.log(
      "Processed supporting docs:",
      supportingDocsData.map((doc) => ({
        hasFile: !!doc.file,
        fileSize: doc.file ? doc.file.length : 0,
        name: doc.name,
      }))
    );

    // Debug log
    console.log(
      "Supporting docs created:",
      updatedContent.supportingDocs.map((doc) => ({
        id: doc.id,
        name: doc.name,
        hasFile: !!doc.file,
      }))
    );

    return NextResponse.json({
      message: "Content updated successfully",
      content: updatedContent,
    });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Error updating content", details: String(error) },
      { status: 500 }
    );
  }
}

// DELETE Handler
export async function DELETE(request: Request, { params }: any) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid content ID" },
        { status: 400 }
      );
    }

    const deletedContent = await prisma.content.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Content deleted successfully",
      deletedContent,
    });
  } catch (error) {
    // console.error("Error deleting content:", error);
    return NextResponse.json(
      {
        error: "Error deleting content",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// PATCH Handler untuk update status
export async function PATCH(request: Request, { params }: any) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid content ID" },
        { status: 400 }
      );
    }

    // Langsung update status ke PUBLISHED
    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        status: "REVIEW",
      },
    });

    return NextResponse.json({
      message: "Content sent to review successfully",
      content: updatedContent,
    });
  } catch (error) {
    console.error("Error sending content to review:", error);
    return NextResponse.json(
      { error: "Error sending content to review" },
      { status: 500 }
    );
  }
}

async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

async function saveFileAsBytes(file: File): Promise<Buffer> {
  const bytes = await file.arrayBuffer();
  return Buffer.from(bytes);
}

async function fileToBytes(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
