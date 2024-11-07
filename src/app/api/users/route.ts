import prisma from "@/lib/prisma";
import { Status, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// POST /users - Create a new user (only for SUPER_ADMIN)
export async function POST(req: Request) {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      handphone,
      institution,
      image,
      password,
      role,
    } = await req.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        handphone,
        institution,
        image,
        password: hashedPassword,
        role,
        status: Status.ACTIVE,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET /users - Get a paginated list of users, with optional filters
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const roleParam = searchParams.get("role");
//     const statusParam = searchParams.get("status");

//     // Convert the role and status params to enums if they exist
//     const role = roleParam && UserRole[roleParam as keyof typeof UserRole];
//     const status = statusParam && Status[statusParam as keyof typeof Status];

//     const users = await prisma.user.findMany({
//       where: {
//         ...(role ? { role } : {}),
//         ...(status ? { status } : {}),
//       },
//     });
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }, // Bisa diubah sesuai kebutuhan
      }),
      prisma.user.count(),
    ]);

    return NextResponse.json({ users, totalUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
