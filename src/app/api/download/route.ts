import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const file = searchParams.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "File parameter is required" },
        { status: 400 }
      );
    }

    // Ensure the file path is within your public directory
    const filePath = path.join(process.cwd(), "public", file);

    // Basic security check to prevent directory traversal
    if (!filePath.startsWith(path.join(process.cwd(), "public"))) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 403 });
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType =
      {
        ".pdf": "application/pdf",
        ".doc": "application/msword",
        ".docx":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        // Add more content types as needed
      }[ext] || "application/octet-stream";

    // Get the original filename
    const fileName = path.basename(filePath);

    // Create response with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
