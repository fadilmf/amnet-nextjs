// /src/app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { UserRole, Status } from "@prisma/client";

// GET /users/:id - Get user details
export async function GET(req: Request, { params }: any) {
  try {
    // const user = await authorizeUser(Role.ADMIN, Role.SUPER_ADMIN);

    const foundUser = await prisma.user.findUnique({
      where: { id: params.id },
    });
    if (!foundUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(foundUser);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// PUT /users/:id - Update user information
export async function PUT(req: Request, { params }: any) {
  try {
    // const user = await authorizeUser(Role.ADMIN, Role.SUPER_ADMIN);

    const { username, email, role, status } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { username, email, role, status },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// DELETE /users/:id - Soft delete a user
export async function DELETE(req: Request, { params }: any) {
  try {
    // const user = await authorizeUser(Role.SUPER_ADMIN);

    const deletedUser = await prisma.user.update({
      where: { id: params.id },
      data: { status: Status.DISABLED },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
