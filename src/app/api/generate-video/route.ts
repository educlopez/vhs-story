// app/api/generate-video/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { frames } = await request.json();

    if (!frames || frames.length < 2) {
      return NextResponse.json(
        { error: "Need at least 2 frames to create a video" },
        { status: 400 }
      );
    }

    // Create video transformation
    const videoTransformation = frames.map((frame: any, index: number) => ({
      resource_type: "image",
      public_id: frame.imageUrl.split("/").pop()?.split(".")[0],
      // Add transitions between frames
      transformation: [
        { duration: 2 }, // Each frame shows for 2 seconds
        // Add zoom effect alternating between frames
        index % 2 === 0
          ? { effect: "zoom:1.1", start_offset: "0" }
          : { effect: "zoom:0.9", start_offset: "0" },
        // Add fade transition
        { effect: "transition", duration: 500 },
      ],
    }));

    const result = await cloudinary.video("horror_story", {
      resource_type: "video",
      transformation: [
        { width: 1280, height: 720, crop: "fill" },
        ...videoTransformation,
        { format: "mp4" },
      ],
    });

    return NextResponse.json({
      videoUrl: result.secure_url,
      success: true,
    });
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    );
  }
}
