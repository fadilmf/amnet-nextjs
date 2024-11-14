// src/app/api/auth/register.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/bcrypt";

// export async function POST(req: NextRequest) {
//   const { email, password, role } = await req.json();

//   if (!email || !password) {
//     return NextResponse.json(
//       { error: "Email and password are required" },
//       { status: 400 }
//     );
//   }

//   const existingUser = await prisma.user.findUnique({ where: email });
//   if (existingUser) {
//     return NextResponse.json({ error: "User already exists" }, { status: 409 });
//   }

//   const hashedPassword = await hashPassword(password);
//   const user = await prisma.user.create({
//     data: { email, password: hashedPassword, role },
//   });

//   return NextResponse.json({ message: "User created", user });
// }
