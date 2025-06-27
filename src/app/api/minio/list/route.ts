import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: `${process.env.MINIO_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true,
});

const bucketName = process.env.MINIO_BUCKET!;

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: "documents/",
    });
    const response = await s3.send(command);

    const files = (response.Contents || []).map((item) => ({
      ...item,
      Key: item.Key?.replace(/^documents\//, ""),
    }));

    return NextResponse.json(files);
  } catch (error) {
    console.error("List error:", error);
    return NextResponse.json(
      { error: "Failed to list files." },
      { status: 500 }
    );
  }
}
