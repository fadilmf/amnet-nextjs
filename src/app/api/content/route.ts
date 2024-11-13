// src/app/api/content/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const bufferOrNull = (data: string | null | undefined) =>
      data ? Buffer.from(data, "base64") : null;

    const supportingDocsData =
      body.supportingDocs && body.supportingDocs.length > 0
        ? body.supportingDocs.map((doc: string) => ({
            file: Buffer.from(doc, "base64"),
          }))
        : [];

    const galleriesData =
      body.galleries && body.galleries.length > 0
        ? body.galleries.map((img: string) => ({
            image: Buffer.from(img, "base64"),
          }))
        : [];

    const videoLinksData =
      body.videoLinks && body.videoLinks.length > 0
        ? body.videoLinks.map((url: string) => ({
            url: url,
          }))
        : [];

    const mapsData =
      body.maps && body.maps.length > 0
        ? body.maps.map((map: string) => ({
            mapFile: Buffer.from(map, "base64"),
          }))
        : [];

    // Create new content with relationships to other tables
    const content = await prisma.content.create({
      data: {
        userId: body.userId,
        email: body.email,
        countryId: body.countryId,
        title: body.title,
        author: body.author,
        institution: body.institution,
        cover:
          body.cover && Array.isArray(body.cover) && body.cover.length > 0
            ? Buffer.from(body.cover[0], "base64")
            : null,
        summary: body.summary,
        keyword: body.keyword,
        ecologyDim: body.ecologyDim,
        ecologyMethod: body.ecologyMethod,
        ecologyMost1: body.ecologyMost1,
        ecologyMost2: body.ecologyMost2,
        ecologyMost3: body.ecologyMost3,
        socialDim: body.socialDim,
        socialMethod: body.socialMethod,
        socialMost1: body.socialMost1,
        socialMost2: body.socialMost2,
        socialMost3: body.socialMost3,
        economyDim: body.economyDim,
        economyMethod: body.economyMethod,
        economyMost1: body.economyMost1,
        economyMost2: body.economyMost2,
        economyMost3: body.economyMost3,
        institutionalDim: body.institutionalDim,
        institutionalMethod: body.institutionalMethod,
        institutionalMost1: body.institutionalMost1,
        institutionalMost2: body.institutionalMost2,
        institutionalMost3: body.institutionalMost3,
        technologyDim: body.technologyDim,
        technologyMethod: body.technologyMethod,
        technologyMost1: body.technologyMost1,
        technologyMost2: body.technologyMost2,
        technologyMost3: body.technologyMost3,
        sustainability: body.sustainability,
        sustainabilityIndex: body.sustainabilityIndex,
        visitorRegistered: 0,
        visitorPublic: 0,
        existingCondition1: body.existingCondition1,
        existingCondition2: body.existingCondition2,
        existingCondition3: body.existingCondition3,
        existingCondition4: body.existingCondition4,
        existingCondition5: body.existingCondition5,
        existingCondition6: body.existingCondition6,
        existingCondition7: body.existingCondition7,
        existingCondition8: body.existingCondition8,
        existingCondition9: body.existingCondition9,
        existingCondition10: body.existingCondition10,
        existingCondition11: body.existingCondition11,
        existingCondition12: body.existingCondition12,
        existingCondition13: body.existingCondition13,
        existingCondition14: body.existingCondition14,
        existingCondition15: body.existingCondition15,
        existingCondition16: body.existingCondition16,
        existingCondition17: body.existingCondition17,
        existingCondition18: body.existingCondition18,
        existingCondition19: body.existingCondition19,
        existingCondition20: body.existingCondition20,
        existingCondition21: body.existingCondition21,
        existingCondition22: body.existingCondition22,
        existingCondition23: body.existingCondition23,

        // Additional Graphs and Levels as Buffer
        ecologyGraph: bufferOrNull(body.ecologyGraph),
        ecologyLevel: bufferOrNull(body.ecologyLevel),
        socialGraph: bufferOrNull(body.socialGraph),
        socialLevel: bufferOrNull(body.socialLevel),
        economyGraph: bufferOrNull(body.economyGraph),
        economyLevel: bufferOrNull(body.economyLevel),
        institutionalGraph: bufferOrNull(body.institutionalGraph),
        institutionalLevel: bufferOrNull(body.institutionalLevel),
        technologyGraph: bufferOrNull(body.technologyGraph),
        technologyLevel: bufferOrNull(body.technologyLevel),

        // Create related entries only if the data is not empty
        ...(supportingDocsData.length > 0 && {
          supportingDocs: {
            create: supportingDocsData,
          },
        }),
        ...(galleriesData.length > 0 && {
          galleries: {
            create: galleriesData,
          },
        }),
        ...(videoLinksData.length > 0 && {
          videoLinks: {
            create: videoLinksData,
          },
        }),
        ...(mapsData.length > 0 && {
          maps: {
            create: mapsData,
          },
        }),
      },
    });

    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json(
      { error: "Error creating content" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch content data along with related data
    const contents = await prisma.content.findMany({
      include: {
        supportingDocs: true,
        galleries: true,
        videoLinks: true,
        maps: true,
      },
    });

    // Convert Buffer data to Base64 for frontend display
    const contentsWithBase64Files = contents.map((content) => {
      const base64Cover = content.cover
        ? `data:image/jpeg;base64,${content.cover.toString("base64")}`
        : null;

      // Convert supportingDocs array to Base64
      const base64SupportingDocs = content.supportingDocs.map((doc) => ({
        ...doc,
        file: `data:application/pdf;base64,${doc.file.toString("base64")}`,
      }));

      // Convert galleries array to Base64
      const base64Galleries = content.galleries.map((gallery) => ({
        ...gallery,
        image: `data:image/jpeg;base64,${gallery.image.toString("base64")}`,
      }));

      // Convert maps array to Base64
      const base64Maps = content.maps.map((map) => ({
        ...map,
        mapFile: `data:image/jpeg;base64,${map.mapFile.toString("base64")}`,
      }));

      // Return content with converted data
      return {
        ...content,
        cover: base64Cover,
        supportingDocs: base64SupportingDocs,
        galleries: base64Galleries,
        maps: base64Maps,
      };
    });

    return NextResponse.json(contentsWithBase64Files, { status: 200 });
  } catch (error) {
    console.error("Error fetching contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
