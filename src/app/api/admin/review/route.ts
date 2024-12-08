import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session || session.user.role !== "SUPER_ADMIN") {
    //   return NextResponse.json(
    //     { error: "Unauthorized access" },
    //     { status: 401 }
    //   );
    // }

    const contents = await prisma.content.findMany({
      where: {
        status: "REVIEW",
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        country: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch review contents" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session || session.user.role !== "SUPER_ADMIN") {
    //   return NextResponse.json(
    //     { error: "Unauthorized access" },
    //     { status: 401 }
    //   );
    // }

    const { id, action } = await request.json();

    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("ini id: ", id);
    console.log("ini action: ", action);

    const content = await prisma.content.update({
      where: { id },
      data: {
        status: action === "approve" ? "PUBLISHED" : "DRAFT",
        reviewedAt: new Date(),
        // reviewedBy: session.user.id,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content status" },
      { status: 500 }
    );
  }
}
