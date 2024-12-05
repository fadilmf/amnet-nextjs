import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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
    console.log("ini cover: ", cover);
    let coverPath = "";
    if (cover && cover instanceof File) {
      const coverBuffer = Buffer.from(await cover.arrayBuffer());
      const coverFilename = `${Date.now()}-${cover.name}`;
      await writeFile(path.join(uploadDir, coverFilename), coverBuffer);
      coverPath = `/uploads/${coverFilename}`;
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

        // Save image file
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const filename = `${Date.now()}-${image.name}`;
        await writeFile(path.join(uploadDir, filename), imageBuffer);

        images.push({
          filePath: `/uploads/${filename}`,
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
          const buffer = Buffer.from(await graphImage.arrayBuffer());
          const filename = `${Date.now()}-${graphImage.name}`;
          await writeFile(path.join(uploadDir, filename), buffer);

          graphImages.push({
            filePath: `/uploads/${filename}`,
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
    const supportingDocPaths = [];
    const supportingDocs = [];
    const supportingDocsNames = [];

    for (const [key, value] of formData.entries()) {
      if (
        key.startsWith("supportingDocs") &&
        !key.startsWith("supportingDocsNames")
      ) {
        if (value instanceof File) {
          supportingDocs.push(value);
        }
      }
      if (key.startsWith("supportingDocsNames")) {
        if (typeof value === "string") {
          supportingDocsNames.push(value);
        }
      }
    }

    // Process supporting documents
    for (let i = 0; i < supportingDocs.length; i++) {
      const doc = supportingDocs[i];
      const name = supportingDocsNames[i] || "";

      const buffer = Buffer.from(await doc.arrayBuffer());
      const filename = `${Date.now()}-${doc.name}`;
      await writeFile(path.join(uploadDir, filename), buffer);

      supportingDocPaths.push({
        filePath: `/uploads/${filename}`,
        name: name,
      });
    }

    // Handle galleries
    const galleryPaths = [];
    const galleries = [];
    const galleriesAlt = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("galleries") && !key.startsWith("galleriesAlt")) {
        if (value instanceof File) {
          galleries.push(value);
        }
      }
      if (key.startsWith("galleriesAlt")) {
        if (typeof value === "string") {
          galleriesAlt.push(value);
        }
      }
    }

    // Process galleries
    for (let i = 0; i < galleries.length; i++) {
      const gallery = galleries[i];
      const alt = galleriesAlt[i] || "";

      const buffer = Buffer.from(await gallery.arrayBuffer());
      const filename = `${Date.now()}-${gallery.name}`;
      await writeFile(path.join(uploadDir, filename), buffer);

      galleryPaths.push({
        imagePath: `/uploads/${filename}`,
        alt: alt,
      });
    }

    // Loop untuk memeriksa dan menangani maps dan mapsAlt satu per satu
    const mapPaths = [];
    const maps = [];
    const mapsAlt = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("maps")) {
        if (value instanceof File) {
          // Memasukkan map ke dalam array maps
          maps.push(value);
        }
      }
      if (key.startsWith("mapsAlt")) {
        // Memasukkan alt untuk maps ke dalam array mapsAlt
        if (typeof value === "string") {
          mapsAlt.push(value);
        }
      }
    }

    console.log("Maps: ", maps);
    console.log("MapsAlt: ", mapsAlt);

    // Loop untuk mengolah maps dan mapsAlt
    for (let i = 0; i < maps.length; i++) {
      const map = maps[i];
      const alt = mapsAlt[i] || ""; // Mendapatkan alt jika ada

      const buffer = Buffer.from(await map.arrayBuffer());
      const filename = `${Date.now()}-${map.name}`;
      await writeFile(path.join(uploadDir, filename), buffer);

      // Menambahkan path dan alt ke mapPaths
      mapPaths.push({
        filePath: `/uploads/${filename}`,
        alt: alt, // Jika alt kosong, set dengan string kosong
      });
    }

    console.log("Map paths: ", mapPaths);

    // Parse video links dan keywords dengan validasi
    const videoLinks = JSON.parse(
      (formData.get("videoLinks") as string) || "[]"
    );
    const keywords = JSON.parse((formData.get("keywords") as string) || "[]");

    console.log("ini obj yang mau dibikin: ", {
      title,
      cover: coverPath,
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
      supportingDocs: supportingDocPaths,
      maps: mapPaths,
      galleries: galleryPaths,
      videoLinks: videoLinks.map((link: { url: string; title: string }) => ({
        url: link.url,
        title: link.title,
      })),
    });

    // Create content in database with file paths
    const content = await prisma.content.create({
      data: {
        title,
        userId,
        countryId,
        cover: coverPath,
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
                filePath: image.filePath,
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
          create: supportingDocPaths.map((doc: any) => ({
            name: doc.name,
            filePath: doc.filePath,
          })),
        },
        maps: {
          create: mapPaths.map((map: any) => ({
            filePath: map.filePath,
            alt: map.alt,
          })),
        },
        galleries: {
          create: galleryPaths.map((gallery: any) => ({
            imagePath: gallery.imagePath,
            alt: gallery.alt,
          })),
        },
        videoLinks: {
          create: videoLinks.map((link: any) => ({
            url: link.url,
          })),
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
