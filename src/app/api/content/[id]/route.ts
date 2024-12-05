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

    const formData = await request.formData();

    // Parse basic fields
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const author = formData.get("author") as string;
    const date = formData.get("date") as string;
    const keywords = JSON.parse(formData.get("keywords") as string);
    const status = formData.get("status") as string;
    const userId = formData.get("userId") as string;
    const countryId = parseInt(formData.get("countryId") as string, 10);

    // Handle cover image
    const coverFile = formData.get("cover") as File | null;
    let coverBuffer = null;
    if (coverFile) {
      coverBuffer = Buffer.from(await coverFile.arrayBuffer());
    }

    // Parse existing conditions
    const existingConditions = [];
    let index = 0;
    while (formData.has(`existingConditions[${index}][title]`)) {
      const condition = {
        title: formData.get(`existingConditions[${index}][title]`),
        description: formData.get(`existingConditions[${index}][description]`),
        images: [] as { file: Buffer; alt: string }[],
      };

      // Handle images for each condition
      let imgIndex = 0;
      while (
        formData.has(`existingConditions[${index}][images][${imgIndex}]`)
      ) {
        const imageFile = formData.get(
          `existingConditions[${index}][images][${imgIndex}]`
        ) as File;
        const imageAlt = formData.get(
          `existingConditions[${index}][imagesAlt][${imgIndex}]`
        ) as string;

        if (imageFile) {
          const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
          condition.images.push({
            file: imageBuffer,
            alt: imageAlt,
          });
        }
        imgIndex++;
      }

      existingConditions.push(condition);
      index++;
    }

    // Helper function to process dimension data
    const processDimension = async (dimensionType: string) => {
      const dimensionData = formData.get(dimensionType);
      if (!dimensionData) return null;

      const dimension = JSON.parse(dimensionData as string);
      const graphImages = [];

      // Process graph images
      let graphIndex = 0;
      while (formData.has(`${dimensionType}GraphImages[${graphIndex}]`)) {
        const imageFile = formData.get(
          `${dimensionType}GraphImages[${graphIndex}]`
        ) as File;
        const imageAlt = formData.get(
          `${dimensionType}GraphImagesAlt[${graphIndex}]`
        ) as string;

        if (imageFile) {
          const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
          graphImages.push({
            file: imageBuffer,
            alt: imageAlt,
          });
        }
        graphIndex++;
      }

      return {
        update: {
          title: dimension.title,
          inputMethod: dimension.inputMethod,
          significantAspects: dimension.significantAspects,
          sustainabilityScore: dimension.sustainabilityScore,
          graphImages: {
            deleteMany: {},
            create: graphImages.map((img) => ({
              file: img.file,
              alt: img.alt,
            })),
          },
        },
      };
    };

    // Update content with all related data
    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        title,
        summary,
        author,
        date: new Date(date),
        keywords,
        cover: coverBuffer,
        status,
        userId,
        countryId,

        // Update existing conditions
        existingConditions: {
          deleteMany: {},
          create: existingConditions.map((condition) => ({
            title: condition.title,
            description: condition.description,
            images: {
              create: condition.images.map((img) => ({
                file: img.file,
                alt: img.alt,
              })),
            },
          })),
        },

        // Update dimensions
        ecologyDimension: await processDimension("ecologyDimension"),
        socialDimension: await processDimension("socialDimension"),
        economyDimension: await processDimension("economyDimension"),
        institutionalDimension: await processDimension(
          "institutionalDimension"
        ),
        technologyDimension: await processDimension("technologyDimension"),

        // ... similar updates for supporting docs, galleries, videos, and maps ...
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

    return NextResponse.json(updatedContent);
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
