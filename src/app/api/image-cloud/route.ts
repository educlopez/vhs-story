import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { image, options } = await req.json();

  try {
    const results = await cloudinary.uploader.upload(image, options);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing image" },
      { status: 500 }
    );
  }
}
