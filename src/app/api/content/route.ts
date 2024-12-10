import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
// import sharp from "sharp";
import sharp from "sharp";

// Helper function untuk kompresi gambar
async function compressImage(buffer: Buffer, quality: number = 80) {
  try {
    // Deteksi format gambar
    const metadata = await sharp(buffer).metadata();

    // Jika file bukan gambar atau format tidak didukung
    if (!metadata.format) {
      // Return buffer asli jika bukan gambar
      return buffer;
    }

    // Proses kompresi berdasarkan format
    let processedImage = sharp(buffer);

    switch (metadata.format.toLowerCase()) {
      case "jpeg":
      case "jpg":
        processedImage = processedImage.jpeg({ quality });
        break;
      case "png":
        processedImage = processedImage.png({ quality });
        break;
      case "webp":
        processedImage = processedImage.webp({ quality });
        break;
      default:
        // Format lain, kembalikan buffer asli
        return buffer;
    }

    return processedImage
      .resize(1920, undefined, {
        withoutEnlargement: true,
        fit: "inside",
      })
      .toBuffer();
  } catch (error) {
    console.error("Error compressing image:", error);
    // Jika terjadi error, kembalikan buffer asli
    return buffer;
  }
}

// Helper function untuk mengubah File menjadi Bytes
async function fileToBytes(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Convert FormData to object for logging
    const formDataObj = Object.fromEntries(formData.entries());
    console.log("Received FormData as object:", formDataObj);

    // Validasi data yang diperlukan
    const title = formData.get("title") as string;
    const userId = formData.get("userId") as string;
    const countryId = parseInt(formData.get("countryId") as string, 10);
    const summary = formData.get("summary") as string;
    const author = formData.get("author") as string;
    const date = formData.get("date");
    const status = formData.get("status") as string;

    if (!title || !summary || !author || !date || !status) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          details: "Title, summary, author, date and status are required",
        },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    // Handle cover image
    const cover = formData.get("cover") as File;
    let coverBytes = null;
    if (cover && cover instanceof File) {
      coverBytes = await fileToBytes(cover);
    }

    const existingConditions = [];
    for (let i = 0; true; i++) {
      const title = formData.get(`existingConditions[${i}][title]`);
      const description = formData.get(`existingConditions[${i}][description]`);

      if (!title && !description) break;

      const images = [];
      // Handle images for each condition
      for (let j = 0; true; j++) {
        const image = formData.get(
          `existingConditions[${i}][images][${j}]`
        ) as File;
        const alt = formData.get(`existingConditions[${i}][imagesAlt][${j}]`);

        if (!image) break;

        const buffer = await fileToBytes(image);
        const compressedBuffer = await compressImage(buffer);

        images.push({
          file: compressedBuffer,
          alt: alt as string,
        });
      }

      existingConditions.push({
        title,
        description,
        images,
      });
    }

    // Parse dimension data
    const dimensions = [
      "ecology",
      "social",
      "economy",
      "institutional",
      "technology",
    ] as const;

    // Initialize contentData object
    const contentData: Record<string, any> = {};

    // Process each dimension
    for (const dim of dimensions) {
      const dimensionKey = `${dim}Dimension`;
      let dimensionData = {};

      try {
        dimensionData = JSON.parse(formData.get(dimensionKey) as string) || {};
      } catch {
        console.error(`Invalid JSON for ${dimensionKey}`);
      }

      // Handle graph images for this dimension
      const graphImages = [];
      for (let i = 0; i < 2; i++) {
        const graphImage = formData.get(
          `${dimensionKey}GraphImages[${i}]`
        ) as File;
        const graphAlt = formData.get(
          `${dimensionKey}GraphImagesAlt[${i}]`
        ) as string;

        if (graphImage && graphImage instanceof File) {
          const buffer = await fileToBytes(graphImage);
          const compressedBuffer = await compressImage(buffer);

          graphImages.push({
            file: compressedBuffer,
            alt: graphAlt || "",
          });
        }
      }

      // Add the dimension data to the content creation object
      contentData[dimensionKey] = {
        create: {
          title: dimensionData.title || "",
          inputMethod: dimensionData.inputMethod || "",
          significantAspects: dimensionData.significantAspects || [],
          sustainabilityScore: dimensionData.sustainabilityScore || 0,
          graphImages: {
            create: graphImages,
          },
        },
      };
    }

    // Handle supporting documents
    const supportingDocs = [];
    for (const [key, value] of formData.entries()) {
      if (
        key.startsWith("supportingDocs") &&
        !key.startsWith("supportingDocsNames")
      ) {
        if (value instanceof File) {
          const buffer = await fileToBytes(value);
          const name =
            (formData.get(
              `supportingDocsNames[${supportingDocs.length}]`
            ) as string) || "";

          supportingDocs.push({
            file: buffer,
            name: name,
          });
        }
      }
    }

    // Handle galleries
    const galleries = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("galleries") && !key.startsWith("galleriesAlt")) {
        if (value instanceof File) {
          const buffer = await fileToBytes(value);
          const compressedBuffer = await compressImage(buffer);
          const alt =
            (formData.get(`galleriesAlt[${galleries.length}]`) as string) || "";

          galleries.push({
            image: compressedBuffer,
            alt: alt,
          });
        }
      }
    }

    // Handle maps
    const maps = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("maps") && !key.startsWith("mapsAlt")) {
        if (value instanceof File) {
          const buffer = await fileToBytes(value);
          const compressedBuffer = await compressImage(buffer);
          const alt = (formData.get(`mapsAlt[${maps.length}]`) as string) || "";

          maps.push({
            file: compressedBuffer,
            alt: alt,
          });
        }
      }
    }

    // Parse video links dan keywords dengan validasi
    const videoLinks = JSON.parse(
      (formData.get("videoLinks") as string) || "[]"
    );
    const keywords = JSON.parse((formData.get("keywords") as string) || "[]");

    // Handle overall dimension
    const overallDimensionData = JSON.parse(
      formData.get("overallDimension") as string
    );
    const overallDimensionGraphImages = [];

    // Process overall dimension graph images
    for (let i = 0; i < 2; i++) {
      const graphImage = formData.get(
        `overallDimensionGraphImages[${i}]`
      ) as File;
      const graphAlt = formData.get(
        `overallDimensionGraphImagesAlt[${i}]`
      ) as string;

      if (graphImage && graphImage instanceof File) {
        const buffer = await fileToBytes(graphImage);
        const compressedBuffer = await compressImage(buffer);

        overallDimensionGraphImages.push({
          file: compressedBuffer,
          alt: graphAlt || "",
        });
      }
    }

    console.log("ini obj yang mau dibikin: ", {
      title,
      cover: coverBytes,
      summary,
      author,
      date: new Date(date as string),
      keywords,
      status,
      existingConditions,
      ecologyDimension: contentData.ecologyDimension,
      socialDimension: contentData.socialDimension,
      economyDimension: contentData.economyDimension,
      institutionalDimension: contentData.institutionalDimension,
      technologyDimension: contentData.technologyDimension,
      supportingDocs: supportingDocs,
      maps: maps,
      galleries: galleries,
      videoLinks: videoLinks.map((link: { url: string; title: string }) => ({
        url: link.url,
        title: link.title,
      })),
      overallDimension: {
        create: {
          overall: overallDimensionData.overall || "",
          sustainabilityScore: overallDimensionData.sustainabilityScore || 0,
          graphImages: {
            create: overallDimensionGraphImages.map((image) => ({
              file: image.file,
              alt: image.alt,
            })),
          },
        },
      },
    });

    // Create content in database with binary data
    const content = await prisma.content.create({
      data: {
        title,
        userId,
        countryId,
        cover: coverBytes,
        summary,
        author,
        date: new Date(date as string),
        keywords,
        status,
        existingConditions: {
          create: existingConditions.map((condition: any) => ({
            title: condition.title as string,
            description: condition.description as string,
            images: {
              create: condition.images?.map((image: any) => ({
                file: image.file,
                alt: image.alt,
              })),
            },
          })),
        },
        ecologyDimension: contentData.ecologyDimension,
        socialDimension: contentData.socialDimension,
        economyDimension: contentData.economyDimension,
        institutionalDimension: contentData.institutionalDimension,
        technologyDimension: contentData.technologyDimension,
        supportingDocs: {
          create: supportingDocs.map((doc: any) => ({
            name: doc.name,
            file: doc.file,
          })),
        },
        maps: {
          create: maps.map((map: any) => ({
            file: map.file,
            alt: map.alt,
          })),
        },
        galleries: {
          create: galleries.map((gallery: any) => ({
            image: gallery.image,
            alt: gallery.alt,
          })),
        },
        videoLinks: {
          create: videoLinks.map((link: any) => ({
            url: link.url,
          })),
        },
        overallDimension: {
          create: {
            overall: overallDimensionData.overall || "",
            sustainabilityScore: overallDimensionData.sustainabilityScore || 0,
            graphImages: {
              create: overallDimensionGraphImages.map((image) => ({
                file: image.file,
                alt: image.alt,
              })),
            },
          },
        },
      },
    });

    console.log("tes");
    return NextResponse.json({ success: true, data: content });
    // return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON data",
          details: error.message,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get("countryId");

    const contents = await prisma.content.findMany({
      where: {
        status: "PUBLISHED",
        // countryId: parseInt(countryId as string),
        ...(countryId ? { countryId: parseInt(countryId) } : {}),
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
        maps: true,
        galleries: true,
        videoLinks: true,
        overallDimension: {
          include: {
            graphImages: true,
          },
        },
      },
    });

    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
