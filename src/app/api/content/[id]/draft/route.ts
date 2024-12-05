import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { auth } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user
    // const session = await auth();
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Update status to DRAFT
    const updatedContent = await prisma.content.update({
      where: {
        id: parseInt(params.id),
        status: "PUBLISHED",
      },
      data: {
        status: "DRAFT",
      },
    });

    if (!updatedContent) {
      return NextResponse.json(
        { error: "Published content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("Error updating content status:", error);
    return NextResponse.json(
      { error: "Failed to update content status" },
      { status: 500 }
    );
  }
}
