// // src/middleware/authMiddleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "@/lib/auth/jwt";

// export function authMiddleware(roles: string[]) {
//   return async (req: NextRequest) => {
//     const token = req.headers.get("Authorization")?.split(" ")[1];
//     if (!token)
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     try {
//       const decoded = verifyToken(token) as { userId: string; role: string };
//       if (!roles.includes(decoded.role)) {
//         return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//       }
//       req.user = decoded; // Add user info to request if needed
//       return NextResponse.next();
//     } catch {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//   };
// }
