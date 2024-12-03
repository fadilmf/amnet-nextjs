import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const drafts = await prisma.content.findMany({
      where: {
        status: "DRAFT",
      },
      select: {
        id: true,
        title: true,
        summary: true,
        author: true,
        date: true,
        cover: true,
        keywords: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(drafts);
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
