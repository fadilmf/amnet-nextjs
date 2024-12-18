import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// GET /api/users - Retrieve all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        handphone: true,
        institution: true,
        position: true,
        status: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received user data:", body); // Log the received data

    // Validate required fields
    if (!body.username || !body.email) {
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 }
      );
    }

    // Hash the password if it is provided
    let hashedPassword = null;
    if (body.password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(body.password, saltRounds);
    }

    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        handphone: body.handphone,
        institution: body.institution,
        position: body.position,
        status: body.status,
        role: body.role,
        countryId: body.countryId,
        password: hashedPassword, // Store the hashed password
      },
    });

    console.log("User created:", user); // Log the created user
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update a user
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

// DELETE /api/users/[id] - Delete a user
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
