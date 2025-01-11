"use server";

import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    console.error("No file provided");
    return { success: false, error: "No file provided" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "document-uploads",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload failed:", error);
              reject({
                success: false,
                error: "Upload failed: " + error.message,
              });
            } else {
              console.log("Cloudinary upload successful:", result);
              resolve({
                success: true,
                url: result?.secure_url,
                title: file.name,
              });
            }
          }
        )
        .end(buffer);
    });
  } catch (error) {
    console.error("Error in uploadFile:", error);
    return {
      success: false,
      error: "File upload failed: " + (error as Error).message,
    };
  }
}

export async function saveDocumentToDb({
  fileUrl,
  userId,
  title,
}: {
  fileUrl: string;
  userId: string;
  title: string;
}) {
  try {
    const document = await prisma.documents.create({
      data: {
        fileUrl,
        userId,
        title,
      },
    });
    if (!document) {
      return "Failed to save document";
    }
    return "Document saved successfully";
  } catch (error) {
    console.error("Database save failed:", error);
    return "Failed to save document";
  }
}

export async function getDocumentsForUser({ userId }: { userId: string }) {
  try {
    const documents = await prisma.documents.findMany({
      where: { userId },
    });
    if (!documents) {
      return "No documents found";
    }
    return documents;
  } catch (error) {
    console.error("Database fetch failed:", error);
    return "Failed to fetch documents";
  }
}
