import cloudinary from "@/lib/cloudinary";
import handleError from "@/lib/handlers/errors";
import { ValidationError, RequestError } from "@/lib/http-errors";
import { NextResponse } from "next/server";

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image types
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    // Validate file exists
    if (!file || !(file instanceof File)) {
      throw new ValidationError({ file: ["File is required"] });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new ValidationError({
        file: ["Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed"],
      });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new ValidationError({
        file: ["File size must be less than 5MB"],
      });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "querystack/profiles",
              resource_type: "image",
              transformation: [
                { width: 500, height: 500, crop: "limit" }, // Resize large images
                { quality: "auto" }, // Auto optimize quality
                { fetch_format: "auto" }, // Auto format (WebP if supported)
              ],
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else if (result) {
                resolve(result);
              } else {
                reject(new Error("Upload failed"));
              }
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          url: result.secure_url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as Response;
  }
}
