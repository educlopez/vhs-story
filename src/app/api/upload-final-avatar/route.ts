import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "final-avatars",
      type: "fetch",
    });

    return NextResponse.json({ secure_url: result.secure_url });
  } catch (error: any) {
    console.error("Error uploading final avatar:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload final avatar" },
      { status: 500 }
    );
  }
}
