import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export function generateToken(userId: string, role: string): string {
  if (!userId || !role) {
    throw new Error("User ID and role are required to generate a token");
  }

  try {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Token verification failed");
  }
}
