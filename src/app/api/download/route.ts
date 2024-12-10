import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contentId = searchParams.get("contentId");
    const docId = searchParams.get("docId");

    console.log("Request params:", { contentId, docId });

    if (!contentId || !docId) {
      return NextResponse.json(
        { error: "Content ID and Document ID are required" },
        { status: 400 }
      );
    }

    console.log("Querying document with:", {
      contentId: parseInt(contentId),
      docId: parseInt(docId),
    });

    const supportingDoc = await prisma.supportingDoc.findFirst({
      where: {
        id: parseInt(docId),
        contentId: parseInt(contentId),
      },
    });

    console.log("Supporting Doc found:", {
      id: supportingDoc?.id,
      name: supportingDoc?.name,
      hasFile: !!supportingDoc?.file,
      fileSize: supportingDoc?.file?.length,
    });

    if (!supportingDoc || !supportingDoc.file) {
      return NextResponse.json(
        { error: "Document not found or empty" },
        { status: 404 }
      );
    }

    try {
      const response = new NextResponse(supportingDoc.file);
      response.headers.set("Content-Type", "application/pdf");
      response.headers.set(
        "Content-Disposition",
        `attachment; filename="${
          supportingDoc.name || `document-${docId}.pdf`
        }"`
      );
      console.log(
        "Response headers set:",
        Object.fromEntries(response.headers)
      );
      return response;
    } catch (responseError) {
      console.error("Error creating response:", responseError);
      throw responseError;
    }
  } catch (error) {
    console.error("Download error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
