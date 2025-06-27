// /src/app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { UserRole, Status } from "@prisma/client";
import bcrypt from "bcrypt";

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
export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = await params; // Await the params object

    // Check if user is super_admin
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (existingUser?.role === "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Super admin cannot be modified" },
        { status: 403 }
      );
    }

    const body = await request.json();

    let passwordData = {};
    if (body.password && body.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      passwordData = { password: hashedPassword };
    }

    const updatedUser = await prisma.user.update({
      where: { id }, // Use the awaited id
      data: {
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        handphone: body.handphone,
        institution: body.institution,
        position: body.position,
        status: body.status,
        role: body.role,
        ...passwordData,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /users/:id - Soft delete a user
export async function DELETE(request: Request, { params }: any) {
  try {
    const { id } = await params; // Await the params object

    // Check if user is super_admin
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (existingUser?.role === "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Super admin cannot be deleted" },
        { status: 403 }
      );
    }

    await prisma.user.delete({
      where: { id }, // Use the awaited id
    });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
