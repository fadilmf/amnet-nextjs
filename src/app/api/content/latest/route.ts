import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch the latest 3 articles based on the createdAt field
    const latestArticles = await prisma.content.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3, // Limit to 3 articles
    });

    // Convert Buffer data to Base64 for frontend display
    const articlesWithBase64 = latestArticles.map((article) => {
      const base64Cover = article.cover
        ? `data:image/jpeg;base64,${article.cover.toString("base64")}`
        : null;

      return {
        ...article,
        cover: base64Cover,
      };
    });

    return NextResponse.json(articlesWithBase64, { status: 200 });
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
