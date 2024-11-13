// src/app/api/comments/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the incoming data
    if (!body.contentId || !body.userId || !body.text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new comment
    const comment = await prisma.comment.create({
      data: {
        contentId: body.contentId,
        userId: body.userId,
        text: body.text,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Error creating comment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get("contentId");

    if (!contentId) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    // Fetch content with comments
    const content = await prisma.content.findUnique({
      where: {
        id: parseInt(contentId),
      },
      include: {
        comments: true,
        supportingDocs: true,
        galleries: true,
        videoLinks: true,
        maps: true,
      },
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Return content with related comments and other relations
    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error("Error fetching content with comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
