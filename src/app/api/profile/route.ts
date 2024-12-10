import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    const userProfile = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        role: true,
        // avatarUrl: true,
        handphone: true,
        country: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("ini user: ", userProfile);

    // const countryProfile = await prisma.country.findUnique({
    //   where: { id: userProfile.countryId },
    // });

    // return NextResponse.json({ userProfile, countryProfile });
    return NextResponse.json({ userProfile });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

// export async function PUT(req: NextRequest) {
//   const token = req.headers.get("Authorization")?.split(" ")[1];
//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const decoded = verifyToken(token) as { userId: string };
//     const data = await req.json();

//     const updatedProfile = await prisma.user.update({
//       where: { id: decoded.userId },
//       data: {
//         username: data.username,
//         phoneNumber: data.phoneNumber,
//         countryId: data.countryId,
//       },
//     });

//     return NextResponse.json({ user: updatedProfile });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update profile" },
//       { status: 500 }
//     );
//   }
// }
