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
          file: img.filePath, // Use filePath instead of binary data
        })),
      })),

      // Transform dimension images
      ecologyDimension: content.ecologyDimension
        ? {
            ...content.ecologyDimension,
            graphImages: content.ecologyDimension.graphImages.map((img) => ({
              ...img,
              file: img.filePath,
            })),
          }
        : null,

      socialDimension: content.socialDimension
        ? {
            ...content.socialDimension,
            graphImages: content.socialDimension.graphImages.map((img) => ({
              ...img,
              file: img.filePath,
            })),
          }
        : null,

      economyDimension: content.economyDimension
        ? {
            ...content.economyDimension,
            graphImages: content.economyDimension.graphImages.map((img) => ({
              ...img,
              file: img.filePath,
            })),
          }
        : null,

      institutionalDimension: content.institutionalDimension
        ? {
            ...content.institutionalDimension,
            graphImages: content.institutionalDimension.graphImages.map(
              (img) => ({
                ...img,
                file: img.filePath,
              })
            ),
          }
        : null,

      technologyDimension: content.technologyDimension
        ? {
            ...content.technologyDimension,
            graphImages: content.technologyDimension.graphImages.map((img) => ({
              ...img,
              file: img.filePath,
            })),
          }
        : null,

      overallDimension: content.overallDimension
        ? {
            ...content.overallDimension,
            graphImages: content.overallDimension.graphImages.map((img) => ({
              ...img,
              file: img.filePath,
            })),
          }
        : null,

      // Transform supporting documents
      supportingDocs: content.supportingDocs.map((doc) => ({
        ...doc,
        file: doc.filePath,
      })),

      // Transform galleries
      galleries: content.galleries.map((gallery) => ({
        ...gallery,
        image: gallery.imagePath,
      })),

      // Transform maps
      maps: content.maps.map((map) => ({
        ...map,
        file: map.filePath,
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
      console.log(`${key}:`, value);

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
            mapsData[idx] = {};
          }
          mapsData[idx][field] = value;
        }
      }

      // Handle galleries
      if (key.startsWith("galleries[")) {
        const matches = key.match(/\[(\d+)\]\[(\w+)\]/);
        if (matches) {
          const [, index, field] = matches;
          const idx = parseInt(index);

          if (!galleriesData[idx]) {
            galleriesData[idx] = {};
          }
          galleriesData[idx][field] = value;
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

    // Update in database
    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        existingConditions: {
          deleteMany: {},
          create: await Promise.all(
            existingConditionsData.map(async (condition) => ({
              title: condition.title,
              description: condition.description,
              images: {
                create: [
                  // Existing images
                  ...(condition.existingImages || []).map((path) => ({
                    filePath: path,
                    alt: "",
                  })),
                  // New images
                  ...(await Promise.all(
                    (condition.images || []).map(async (image: File) => ({
                      filePath: await saveFile(image),
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
          deleteMany: {}, // Clear existing relations but not the files
          create: await Promise.all(
            mapsData
              .map(async (map) => {
                if (map.file) {
                  // New map
                  return {
                    filePath: await saveFile(map.file),
                    alt: map.alt || "",
                  };
                } else if (map.existingFile) {
                  // Existing map
                  return {
                    filePath: map.existingFile,
                    alt: map.alt || "",
                  };
                }
              })
              .filter(Boolean)
          ), // Remove undefined entries
        },

        // Update galleries
        galleries: {
          deleteMany: {}, // Clear existing relations but not the files
          create: await Promise.all(
            galleriesData
              .map(async (gallery) => {
                if (gallery.file) {
                  // New gallery image
                  return {
                    imagePath: await saveFile(gallery.file),
                    alt: gallery.alt || "",
                  };
                } else if (gallery.existingFile) {
                  // Existing gallery image
                  return {
                    imagePath: gallery.existingFile,
                    alt: gallery.alt || "",
                  };
                }
              })
              .filter(Boolean)
          ), // Remove undefined entries
        },

        // Update supporting docs
        supportingDocs: {
          deleteMany: {}, // Clear existing relations but not the files
          create: await Promise.all(
            supportingDocsData
              .map(async (doc) => {
                if (doc.file) {
                  // New document
                  return {
                    filePath: await saveFile(doc.file),
                    name: doc.name || "",
                  };
                } else if (doc.existingFile) {
                  // Existing document
                  return {
                    filePath: doc.existingFile,
                    name: doc.name || "",
                  };
                }
              })
              .filter(Boolean)
          ), // Remove undefined entries
        },

        // Update video links
        videoLinks: {
          deleteMany: {},
          create: videoLinksData?.map((link: any) => ({
            url: link.url,
            // title: link.title || "",
          })),
        },
      },
      include: {
        existingConditions: {
          include: { images: true },
        },
        maps: true,
        galleries: true,
        supportingDocs: true,
        videoLinks: true,
      },
    });

    console.log("Updated videoLinks:", updatedContent.videoLinks);

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
