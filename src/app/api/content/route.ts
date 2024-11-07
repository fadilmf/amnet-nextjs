// src/app/api/content/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure the body is not null and contains necessary fields
    // if (!body || !body.userId || !body.email) {
    //   return NextResponse.json(
    //     { error: "Invalid or missing fields in request body" },
    //     { status: 400 }
    //   );
    // }

    // If validation passes, proceed with content creation
    const content = await prisma.content.create({
      data: {
        userId: body.userId,
        email: body.email,
        countryId: body.countryId,
        title: body.title,
        author: body.author,
        institution: body.institution,
        cover: body.cover ? Buffer.from(body.cover, "base64") : null, // Convert base64 to binary
        summary: body.summary,
        keyword: body.keyword,
        ecologyDim: body.ecologyDim,
        socialDim: body.socialDim,
        economyDim: body.economyDim,
        institutionalDim: body.institutionalDim,
        technologyDim: body.technologyDim,
        sustainability: body.sustainability,
        videoLink: body.videoLink,
        attachmentDoc: body.attachmentDoc
          ? Buffer.from(body.attachmentDoc, "base64")
          : null,
        supportingDoc: body.supportingDoc
          ? Buffer.from(body.supportingDoc, "base64")
          : null,
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
    const contents = await prisma.content.findMany(); // Ambil data dari database
    console.log("ini contents : ", contents);

    // Mengonversi gambar dalam bentuk Buffer menjadi Base64
    const contentsWithBase64Images = contents.map((content) => {
      // Mengonversi field `cover` dari buffer menjadi base64 jika ada
      if (content.cover) {
        const base64Cover = content.cover.toString("base64");
        return { ...content, cover: `data:image/jpeg;base64,${base64Cover}` };
      }
      return content;
    });

    // Kirimkan data yang sudah diperbarui ke frontend
    return NextResponse.json(contentsWithBase64Images, { status: 200 });
  } catch (error) {
    console.error("Error fetching contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
