// src/lib/auth/auth.middleware.ts

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const roles = ["ADMIN", "SUPER_ADMIN"];

export const authMiddleware = (req: NextRequest) => {
  const userRole = req.headers.get("role") as string; // You should set this in the request header after authentication
  if (!roles.includes(userRole)) {
    return NextResponse.error();
  }
  return NextResponse.next();
};
