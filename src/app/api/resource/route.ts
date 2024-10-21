import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const publicId = searchParams.get("publicId");

  if (!publicId) {
    return NextResponse.json(
      { error: "Public ID is required" },
      { status: 400 }
    );
  }

  try {
    const results = await cloudinary.api.resource(publicId);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching resource" },
      { status: 500 }
    );
  }
}
