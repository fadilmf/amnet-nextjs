// src/app/api/content/add/route.ts

import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import { IncomingMessage } from "http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Set up multer for file uploads (using local storage as an example)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Adjust the directory based on your setup
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware to parse both form data and files
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  return new Promise((resolve, reject) => {
    upload.fields([
      { name: "galeri", maxCount: 1 },
      { name: "map", maxCount: 1 },
      { name: "supportingDocument", maxCount: 1 },
    ])(req as IncomingMessage, {} as any, async (err: any) => {
      if (err) {
        reject(
          NextResponse.json({ error: "File upload error" }, { status: 500 })
        );
      }

      // Access form data and files from req.body and req.files
      const {
        title,
        author,
        date,
        institution,
        email,
        summary,
        keyword,
        institutionalArrangement,
        pondConditions,
        pondDesign,
        layout,
        waterQualityCondition,
        soilQualityCondition,
        cultivation,
        bestPracticeFinancialCondition,
        livestockFinancialAnalysis,
        vegetationFinancialAnalysis,
        ecology,
        social,
        economy,
        institutional,
        technology,
        sustainability,
        video,
      } = req.body;

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const galeriFile = files["galeri"]?.[0];
      const mapFile = files["map"]?.[0];
      const supportingDocumentFile = files["supportingDocument"]?.[0];

      try {
        // Save the form data and files to Prisma
        const content = await prisma.content.create({
          data: {
            title,
            author,
            institution,
            email,
            summary,
            keyword,
            ecologyDim: ecology,
            socialDim: social,
            economyDim: economy,
            institutionalDim: institutional,
            technologyDim: technology,
            sustainability,
            videoLink: video,
            attachmentDoc: galeriFile
              ? `/uploads/${galeriFile.filename}`
              : null,
            supportingDoc: supportingDocumentFile
              ? `/uploads/${supportingDocumentFile.filename}`
              : null,
            existingCondition1: institutionalArrangement,
            existingCondition2: pondConditions,
            existingCondition3: pondDesign,
            existingCondition4: layout,
            existingCondition5: waterQualityCondition,
            existingCondition6: soilQualityCondition,
            existingCondition7: cultivation,
            existingCondition8: bestPracticeFinancialCondition,
            existingCondition9: livestockFinancialAnalysis,
            existingCondition10: vegetationFinancialAnalysis,
          },
        });

        resolve(
          NextResponse.json({ message: "Content added successfully!", content })
        );
      } catch (error) {
        console.error("Error saving content:", error);
        reject(
          NextResponse.json({ error: "Error saving content" }, { status: 500 })
        );
      }
    });
  });
}
