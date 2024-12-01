import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
        supportingDocs: true,
        galleries: true,
        videoLinks: true,
        maps: true,
        comments: true,
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
export async function PUT(request: Request, { params }: any) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid content ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Prepare dimension update data with images
    const prepareDimensionUpdate = (dimension: any) => {
      if (!dimension) return undefined;

      return {
        update: {
          title: dimension.title,
          inputMethod: dimension.inputMethod,
          significantAspects: dimension.significantAspects,
          sustainabilityScore: dimension.sustainabilityScore,
          graphImages: {
            deleteMany: {}, // Delete existing images
            create:
              dimension.graphImages?.map((img: any) => ({
                file: Buffer.from(img.file, "base64"),
                alt: img.alt,
              })) || [],
          },
        },
      };
    };

    // Update content with all related data
    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        title: body.title,
        summary: body.summary,
        author: body.author,
        date: body.date ? new Date(body.date) : undefined,
        keywords: body.keywords,
        cover: body.cover ? Buffer.from(body.cover, "base64") : undefined,
        status: body.status,

        // Update existing conditions
        existingConditions: {
          deleteMany: {}, // Delete existing conditions
          create:
            body.existingConditions?.map((condition: any) => ({
              title: condition.title,
              description: condition.description,
              images: {
                create:
                  condition.images?.map((img: any) => ({
                    file: Buffer.from(img.file, "base64"),
                    alt: img.alt,
                  })) || [],
              },
            })) || [],
        },

        // Update dimensions
        ecologyDimension: prepareDimensionUpdate(body.ecologyDimension),
        socialDimension: prepareDimensionUpdate(body.socialDimension),
        economyDimension: prepareDimensionUpdate(body.economyDimension),
        institutionalDimension: prepareDimensionUpdate(
          body.institutionalDimension
        ),
        technologyDimension: prepareDimensionUpdate(body.technologyDimension),

        // Update supporting docs
        supportingDocs: {
          deleteMany: {}, // Delete existing docs
          create:
            body.supportingDocs?.map((doc: any) => ({
              name: doc.name,
              file: Buffer.from(doc.file, "base64"),
            })) || [],
        },

        // Update galleries
        galleries: {
          deleteMany: {}, // Delete existing galleries
          create:
            body.galleries?.map((gallery: any) => ({
              image: Buffer.from(gallery.image, "base64"),
            })) || [],
        },

        // Update video links
        videoLinks: {
          deleteMany: {}, // Delete existing video links
          create:
            body.videoLinks?.map((link: any) => ({
              url: link.url,
            })) || [],
        },

        // Update maps
        maps: {
          deleteMany: {}, // Delete existing maps
          create:
            body.maps?.map((map: any) => ({
              file: map.file ? Buffer.from(map.file, "base64") : undefined,
              alt: map.alt,
            })) || [],
        },
      },
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
        supportingDocs: true,
        galleries: true,
        videoLinks: true,
        maps: true,
      },
    });

    // Transform binary data to base64 for response
    const transformedContent = {
      ...updatedContent,
      cover: updatedContent.cover?.toString("base64"),
      existingConditions: updatedContent.existingConditions.map(
        (condition) => ({
          ...condition,
          images: condition.images.map((img) => ({
            ...img,
            file: img.file.toString("base64"),
          })),
        })
      ),
      ecologyDimension: updatedContent.ecologyDimension
        ? {
            ...updatedContent.ecologyDimension,
            graphImages: updatedContent.ecologyDimension.graphImages.map(
              (img) => ({
                ...img,
                file: img.file.toString("base64"),
              })
            ),
          }
        : null,
      socialDimension: updatedContent.socialDimension
        ? {
            ...updatedContent.socialDimension,
            graphImages: updatedContent.socialDimension.graphImages.map(
              (img) => ({
                ...img,
                file: img.file.toString("base64"),
              })
            ),
          }
        : null,
      economyDimension: updatedContent.economyDimension
        ? {
            ...updatedContent.economyDimension,
            graphImages: updatedContent.economyDimension.graphImages.map(
              (img) => ({
                ...img,
                file: img.file.toString("base64"),
              })
            ),
          }
        : null,
      institutionalDimension: updatedContent.institutionalDimension
        ? {
            ...updatedContent.institutionalDimension,
            graphImages: updatedContent.institutionalDimension.graphImages.map(
              (img) => ({
                ...img,
                file: img.file.toString("base64"),
              })
            ),
          }
        : null,
      technologyDimension: updatedContent.technologyDimension
        ? {
            ...updatedContent.technologyDimension,
            graphImages: updatedContent.technologyDimension.graphImages.map(
              (img) => ({
                ...img,
                file: img.file.toString("base64"),
              })
            ),
          }
        : null,
      supportingDocs: updatedContent.supportingDocs.map((doc) => ({
        ...doc,
        file: doc.file.toString("base64"),
      })),
      galleries: updatedContent.galleries.map((gallery) => ({
        ...gallery,
        image: gallery.image.toString("base64"),
      })),
      maps: updatedContent.maps.map((map) => ({
        ...map,
        file: map.file?.toString("base64"),
      })),
    };

    return NextResponse.json(transformedContent);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      {
        error: "Error updating content",
        details: error instanceof Error ? error.message : String(error),
      },
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
    console.error("Error deleting content:", error);
    return NextResponse.json(
      {
        error: "Error deleting content",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
