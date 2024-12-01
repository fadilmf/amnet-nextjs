import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // Cek autentikasi admin
    // const session = await getServerSession(authOptions);

    // if (!session || session.user.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Ambil semua konten dengan relasi yang terkait
    const contents = await prisma.content.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("ini contents: ", contents);

    return NextResponse.json(contents);
  } catch (error) {
    console.error("Error fetching contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
