// app/api/content/[id]/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Find the content by ID
    const content = await prisma.content.findUnique({
      where: { id: parseInt(params.id) },
    });

    // If no content is found, return 404
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Convert the `cover` field and other binary fields to Base64 if they exist
    const contentWithBase64Images = {
      ...content,
      cover: content.cover
        ? `data:image/jpeg;base64,${content.cover.toString("base64")}`
        : null,
      // You can add other fields (like `attachmentDoc` or `supportingDoc`) that need to be converted to Base64
      attachmentDoc: content.attachmentDoc
        ? `data:application/pdf;base64,${content.attachmentDoc.toString(
            "base64"
          )}`
        : null,
      supportingDoc: content.supportingDoc
        ? `data:application/pdf;base64,${content.supportingDoc.toString(
            "base64"
          )}`
        : null,
    };

    // Return the content with Base64 images and other converted files
    return NextResponse.json(contentWithBase64Images);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const body = await request.json();
    const updatedContent = await prisma.content.update({
      where: { id: params.id },
      data: {
        title: body.title,
        author: body.author,
        summary: body.summary,
        keyword: body.keyword,
        ecologyDim: body.ecologyDim,
        socialDim: body.socialDim,
        economyDim: body.economyDim,
        institutionalDim: body.institutionalDim,
        technologyDim: body.technologyDim,
        sustainability: body.sustainability,
        cover: body.cover,
        videoLink: body.videoLink,
        attachmentDoc: body.attachmentDoc,
        supportingDoc: body.supportingDoc,
      },
    });

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    // await prisma.content.update({
    //   where: { id: params.id },
    //   data: { deletedAt: new Date() },
    // });

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json(
      { error: "Error deleting content" },
      { status: 500 }
    );
  }
}
