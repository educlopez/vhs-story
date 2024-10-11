// components/StoryEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { Loader2 } from "lucide-react";

export default function StoryEditor() {
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [prevImageUrl, setPrevImageUrl] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateBackground = async (text: string) => {
    if (text.length < 50) return;

    // Debounce the generation to avoid too many requests
    if (isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-background", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate background");
      }

      const data = await response.json();

      if (data.imageUrl) {
        // Save current image as previous for transition
        setPrevImageUrl(imageUrl);
        setImageUrl(data.imageUrl);
        setIsTransitioning(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsGenerating(false);
    }
  };

  // Debounced story update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (story.length >= 50) {
        generateBackground(story);
      }
    }, 1000); // Wait 1 second after last keystroke

    return () => clearTimeout(timeoutId);
  }, [story]);

  return (
    <div className="relative min-h-[600px] rounded-lg overflow-hidden">
      {/* Previous Image (for transition) */}
      {prevImageUrl && (
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            isTransitioning ? "opacity-0" : "opacity-40"
          }`}
        >
          <CldImage
            width="1200"
            height="800"
            src={prevImageUrl}
            alt="Previous horror scene"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Current Image */}
      {imageUrl && (
        <div
          className={`absolute inset-0 z-1 transition-opacity duration-1000 ${
            isTransitioning ? "opacity-40" : "opacity-0"
          }`}
          onTransitionEnd={() => {
            setIsTransitioning(false);
            setPrevImageUrl("");
          }}
        >
          <CldImage
            width="1200"
            height="800"
            src={imageUrl}
            alt="Horror scene"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Story Editor */}
      <div className="relative z-10 p-6">
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="w-full h-[400px] bg-black/70 text-white p-4 rounded-lg
                     border border-red-800 focus:border-red-600 focus:ring-1
                     focus:ring-red-600 outline-none resize-none"
          placeholder="Begin your horror story here... (write at least 50 characters to generate the background)"
        />

        {/* Loading Indicator */}
        {isGenerating && (
          <div className="absolute top-4 right-4">
            <Loader2 className="animate-spin text-red-600" />
          </div>
        )}

        {/* Character Count */}
        <div className="absolute bottom-8 right-8 text-sm text-gray-400">
          {story.length}/50 characters
        </div>
      </div>
    </div>
  );
}
