// app/api/check-video-status/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publicId = searchParams.get("publicId");

  if (!publicId) {
    return NextResponse.json(
      { error: "Public ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.api.resource(
        publicId,
        { resource_type: "video" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    if ((result as any).status === "uploading") {
      return NextResponse.json({ status: "processing" });
    } else if ((result as any).status === "active") {
      return NextResponse.json({
        status: "complete",
        url: (result as any).secure_url,
      });
    } else {
      return NextResponse.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error checking video status:", error);
    return NextResponse.json(
      { error: "Failed to check video status" },
      { status: 500 }
    );
  }
}
