import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Mengambil data dari request body
    const { articleId, name, email, text } = await request.json();

    // Validasi input
    if (!articleId || !text || text.trim() === "") {
      return NextResponse.json(
        { error: "Article ID and comment text are required" },
        { status: 400 }
      );
    }

    const contentId = parseInt(articleId);
    if (isNaN(contentId)) {
      return NextResponse.json(
        { error: "Invalid Article ID" },
        { status: 400 }
      );
    }

    // Membuat komentar baru
    const newComment = await prisma.comment.create({
      data: {
        contentId: articleId,
        name: name && name.trim() !== "" ? name.trim() : "Anonymous", // Atur default jika nama kosong
        email: email && email.trim() !== "" ? email.trim() : null, // Null jika email kosong
        text: text.trim(),
      },
    });

    // Mengembalikan respons JSON dengan komentar yang baru dibuat
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        error: "Failed to create comment",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    const contentId = parseInt(articleId, 10);
    if (isNaN(contentId)) {
      return NextResponse.json(
        { error: "Invalid Article ID" },
        { status: 400 }
      );
    }

    // Mendapatkan komentar terkait artikel berdasarkan ID
    const comments = await prisma.comment.findMany({
      where: {
        contentId: contentId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Pastikan respons JSON valid
    if (!comments || comments.length === 0) {
      return NextResponse.json(
        { message: "No comments found for this article" },
        { status: 200 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch comments",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
