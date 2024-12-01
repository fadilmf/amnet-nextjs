import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/bcrypt";
import { generateToken } from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Cari pengguna berdasarkan username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Periksa apakah pengguna ada dan kata sandinya valid
    if (!user || !(await verifyPassword(password, user.password!))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Periksa apakah `user.id` dan `user.role` tersedia
    if (!user.id || !user.role) {
      throw new Error("User ID or role is missing");
    }

    // Buat token JWT
    const token = generateToken(user.id, user.role);

    const userData = {
      id: user.id,
      username: user.username,
      role: user.role,
      countryId: user.countryId,
    };

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
