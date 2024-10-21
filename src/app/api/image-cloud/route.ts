import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { publicId, prompt } = await req.json();

  try {
    const imageUrl = cloudinary.v2.url(publicId, {
      transformation: [
        {
          effect: `gen_background_replace:prompt_${encodeURIComponent(prompt)}`,
          width: 300,
          height: 300,
        },
      ],
    });

    return NextResponse.json({ imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating image" },
      { status: 500 }
    );
  }
}
