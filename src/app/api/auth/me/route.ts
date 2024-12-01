// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = verifyToken(token) as { userId: string; user?: any };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        country: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    // Token verification failed (including expired token)
    return NextResponse.json({ error: "Token expired" }, { status: 401 });
  }
}
