// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = verifyToken(token) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        country: true,
      },
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
