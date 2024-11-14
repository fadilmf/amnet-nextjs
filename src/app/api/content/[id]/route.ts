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
      include: { comments: true },
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    const contentWithBase64Images = {
      ...content,
      cover: content.cover
        ? `data:image/jpeg;base64,${content.cover.toString("base64")}`
        : null,
      // Add any other fields needing conversion to Base64 here
    };

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

    const updatedContent = await prisma.content.update({
      where: { id },
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
        cover: body.cover ? Buffer.from(body.cover, "base64") : undefined,
        ecologyGraph: body.ecologyGraph
          ? Buffer.from(body.ecologyGraph, "base64")
          : undefined,
        // Add other fields as needed
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
