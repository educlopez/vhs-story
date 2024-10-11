// app/api/generate-background/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Base images IDs que usaremos para las transformaciones
const baseImages = [
  "horror-base/dark-forest.jpg",
  "horror-base/abandoned-house.jpg",
  "horror-base/misty-graveyard.jpg",
  "horror-base/dark-corridor.jpg",
  "horror-base/haunted-room.jpg",
];

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // Seleccionar una imagen base basada en el contenido del texto
    const baseImage = selectBaseImage(text);

    // Crear URL con transformaciones
    const imageUrl = cloudinary.url(baseImage, {
      transformation: [
        // Aplicar transformaciones basadas en el contenido
        ...getHorrorEffects(text),
        // Ajustes generales
        { width: 1200, height: 800, crop: "fill" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    return NextResponse.json({
      imageUrl,
      success: true,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}

function selectBaseImage(text: string): string {
  // Análisis simple del texto para seleccionar la imagen base más apropiada
  const textLower = text.toLowerCase();

  if (textLower.includes("forest") || textLower.includes("woods")) {
    return baseImages[0];
  } else if (textLower.includes("house") || textLower.includes("home")) {
    return baseImages[1];
  } else if (textLower.includes("grave") || textLower.includes("cemetery")) {
    return baseImages[2];
  } else if (textLower.includes("hallway") || textLower.includes("corridor")) {
    return baseImages[3];
  } else {
    return baseImages[4];
  }
}

function getHorrorEffects(text: string): any[] {
  const effects = [];
  const textLower = text.toLowerCase();

  // Efectos base
  effects.push({ effect: "vignette:50" });

  // Ajustes condicionales basados en el contenido
  if (textLower.includes("dark") || textLower.includes("night")) {
    effects.push({ effect: "brightness:-30" }, { effect: "contrast:20" });
  }

  if (textLower.includes("fog") || textLower.includes("mist")) {
    effects.push({ effect: "art:athena" });
  }

  if (textLower.includes("blood") || textLower.includes("red")) {
    effects.push({ effect: "tint:40:red" }, { effect: "contrast:30" });
  }

  if (textLower.includes("ghost") || textLower.includes("spirit")) {
    effects.push({ effect: "art:ghosted" }, { opacity: 80 });
  }

  return effects;
}
