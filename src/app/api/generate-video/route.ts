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

    // Prepare the manifest JSON
    const manifestJson = {
      type: "video",
      width: 1280,
      height: 720,
      duration: frames.length * 4, // 4 seconds per frame
      fps: 30,
      tracks: [
        {
          width: 1280,
          height: 720,
          x: 0,
          y: 0,
          clipDefaults: {
            clipDuration: 4000,
            transitionDuration: 1000,
            transition: "linearblur",
          },
          clips: frames.map((frame: any) => ({
            media: frame.imageUrl,
            type: "image",
            transformation: "c_fill,w_1280,h_720",
          })),
        },
        {
          y: -25,
          clipDefaults: {
            textAlign: "center",
            textVerticalAlign: "bottom",
            fontSize: 30,
            fontColor: "white",
            fontType: "Arial",
            transitionDuration: 1000,
            transition: "fade",
            clipDuration: 4000,
            textMaxWidth: 1180,
          },
          clips: frames.map((frame: any) => ({
            type: "textArea",
            text: frame.text.slice(0, 50), // Limit text to 50 characters
          })),
        },
      ],
    };

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.create_slideshow(
        {
          manifest_json: JSON.stringify(manifestJson),
          resource_type: "video",
          type: "upload",
          notification_url:
            "https://your-webhook-url.com/cloudinary-notification",
          tags: ["horror_story"],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    console.log("Cloudinary result:", result);

    return NextResponse.json({
      success: true,
      status: "processing",
      publicId: (result as any).public_id,
      batchId: (result as any).batch_id,
    });
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json(
      { error: "Failed to generate video", details: error },
      { status: 500 }
    );
  }
}
