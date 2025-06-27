import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// S3 client configuration
const s3 = new S3Client({
  region: "us-east-1",
  endpoint: `${process.env.MINIO_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true, // Required for MinIO
});

const bucketName = process.env.MINIO_BUCKET!;

// Handle upload
export async function POST(req: Request) {
  const { fileName, fileType } = await req.json();

  const allowedTypes = ["application/pdf"];
  if (!allowedTypes.includes(fileType)) {
    return NextResponse.json(
      { error: "Invalid file type. Only PDF files are allowed." },
      { status: 400 }
    );
  }

  //   if (!fileName || !fileName.match(/^[a-zA-Z0-9_\-.]+$/)) {
  //     return NextResponse.json({ error: "Invalid file name." }, { status: 400 });
  //   }

  // Validasi ukuran file jika Anda memiliki informasi ukuran file di request
  // Note: Ukuran file biasanya tidak tersedia dalam request body kecuali diunggah langsung.
  const MAX_FILE_SIZE_MB = 10; // Maksimal ukuran 10MB
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  if (req.headers.get("content-length")) {
    const contentLength = parseInt(
      req.headers.get("content-length") || "0",
      10
    );
    if (contentLength > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE_MB}MB.` },
        { status: 400 }
      );
    }
  }

  try {
    let finalFileName = fileName;

    // Periksa apakah file dengan nama tersebut sudah ada
    const checkCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `documents/${fileName}`, // Prefix untuk file yang ingin diperiksa
    });
    const response = await s3.send(checkCommand);

    if (response.Contents?.length) {
      // Jika file sudah ada, tambahkan penomoran
      const fileExtension = fileName.split(".").pop(); // Dapatkan ekstensi file
      const baseName = fileName.replace(`.${fileExtension}`, ""); // Nama tanpa ekstensi
      let counter = 1;

      do {
        finalFileName = `${baseName} (${counter}).${fileExtension}`;
        const checkNewCommand = new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: `documents/${finalFileName}`,
        });
        const newResponse = await s3.send(checkNewCommand);
        if (!newResponse.Contents?.length) break; // Berhenti jika nama baru belum ada
        counter++;
      } while (true);
    }

    // Upload file dengan nama baru
    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: `documents/${finalFileName}`,
      ContentType: fileType,
    });

    await s3.send(uploadCommand);

    return NextResponse.json({
      message: "File uploaded successfully.",
      fileName: finalFileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
}

// Handle delete
export async function DELETE(req: Request) {
  const { fileName } = await req.json();

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: `documents/${fileName}`,
    });

    await s3.send(command);

    return NextResponse.json({ message: "File deleted successfully." });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete file." },
      { status: 500 }
    );
  }
}
