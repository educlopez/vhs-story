// components/HorrorStoryCreator.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import {
  Loader2,
  Video,
  Clock,
  Trash2,
  RefreshCw,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface StoryFrame {
  id: string;
  text: string;
  imageUrl: string;
  timestamp: number;
  paragraphIndex: number;
}

export function HorrorStoryCreator() {
  const [story, setStory] = useState("");
  const [frames, setFrames] = useState<StoryFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState<StoryFrame | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [maxDuration] = useState(10);
  const [editingParagraphIndex, setEditingParagraphIndex] = useState<
    number | null
  >(null);
  const [videoGenerationStatus, setVideoGenerationStatus] =
    useState<string>("");
  const [videoPublicId, setVideoPublicId] = useState<string | null>(null);
  const [videoGenerationError, setVideoGenerationError] = useState<
    string | null
  >(null);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  const lastKeyPressTime = useRef<number>(0);
  const generationDelay = 2000;

  const paragraphs = story.split("\n").filter((p) => p.trim());

  const handleStoryChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newText = e.target.value;
    setStory(newText);

    // Check if Enter was pressed and there's a new paragraph
    if (newText.endsWith("\n") && newText !== story) {
      const currentTime = Date.now();
      if (currentTime - lastKeyPressTime.current >= generationDelay) {
        const newParagraphs = newText.split("\n").filter((p) => p.trim());
        const lastParagraph = newParagraphs[newParagraphs.length - 1];

        if (lastParagraph && lastParagraph.length >= 20) {
          await generateNewFrame(lastParagraph, newParagraphs.length - 1);
          lastKeyPressTime.current = currentTime;
        }
      }
    }
  };

  const generateNewFrame = async (text: string, paragraphIndex: number) => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      console.log("Generating new frame for text:", text);
      const response = await fetch("/api/generate-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.error}`
        );
      }

      const data = await response.json();
      console.log("Response from generate-background:", data);

      if (!data.imageUrl) {
        throw new Error("No image URL in the response");
      }

      const newFrame: StoryFrame = {
        id: `frame-${Date.now()}`,
        text,
        imageUrl: data.imageUrl,
        timestamp: frames.length * (maxDuration / 10),
        paragraphIndex,
      };

      setFrames((prev) => [...prev, newFrame]);
      setCurrentFrame(newFrame);
    } catch (error) {
      console.error("Error generating frame:", error);
      setVideoGenerationError(`Error generating frame: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateFrame = async (paragraphIndex: number) => {
    const paragraph = paragraphs[paragraphIndex];
    if (!paragraph) return;

    // Remove existing frame for this paragraph
    setFrames((prev) =>
      prev.filter((f) => f.paragraphIndex !== paragraphIndex)
    );

    // Generate new frame
    await generateNewFrame(paragraph, paragraphIndex);
  };

  const deleteFrame = (frameId: string) => {
    setFrames((prev) => prev.filter((f) => f.id !== frameId));
    if (currentFrame?.id === frameId) {
      setCurrentFrame(null);
    }
  };

  const generateVideo = async () => {
    if (frames.length < 2 || isProcessingVideo) return;
    setIsProcessingVideo(true);
    setVideoUrl(null);
    setVideoPublicId(null);
    setVideoGenerationStatus("Iniciando generación de video...");
    setVideoGenerationError(null);

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frames }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate video");
      }

      console.log("API Response:", data);

      if (data.success && data.publicId) {
        setVideoPublicId(data.publicId);
        setVideoGenerationStatus(
          "Video en proceso de generación. Por favor, espere..."
        );
        startPolling(data.publicId);
      } else {
        setVideoGenerationStatus("Error en la generación del video.");
        setVideoGenerationError("Respuesta inesperada del servidor");
      }
    } catch (error) {
      console.error("Error generating video:", error);
      setVideoGenerationError(`Error: ${error.message}`);
      setVideoGenerationStatus("Error en la generación del video.");
    } finally {
      setIsProcessingVideo(false);
    }
  };

  const startPolling = (publicId: string) => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }

    pollingInterval.current = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/check-video-status?publicId=${publicId}`
        );
        const data = await response.json();

        if (data.status === "complete") {
          setVideoUrl(data.url);
          setVideoGenerationStatus("Video generado con éxito!");
          clearInterval(pollingInterval.current!);
        } else if (data.status === "failed") {
          setVideoGenerationError("La generación del video ha fallado.");
          clearInterval(pollingInterval.current!);
        }
      } catch (error) {
        console.error("Error checking video status:", error);
      }
    }, 5000); // Check every 5 seconds
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Story and Paragraphs */}
          <div className="col-span-7 space-y-4">
            {/* Main Textarea */}
            <div className="bg-gray-800 rounded-lg p-4">
              <textarea
                value={story}
                onChange={handleStoryChange}
                className="w-full h-[200px] bg-gray-900 text-white p-4 rounded-lg
                         border border-red-800 focus:border-red-600 focus:ring-1
                         focus:ring-red-600 outline-none resize-none"
                placeholder="Write your horror story here... Press Enter after each scene to generate imagery."
              />
            </div>

            {/* Paragraphs List */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-4">Story Scenes</h3>
              <div className="space-y-4">
                {paragraphs.map((paragraph, index) => {
                  const frame = frames.find((f) => f.paragraphIndex === index);
                  return (
                    <div
                      key={index}
                      className={`relative p-4 rounded-lg transition-all
                                ${frame ? "bg-gray-700" : "bg-gray-750"}
                                ${
                                  editingParagraphIndex === index
                                    ? "ring-2 ring-red-600"
                                    : ""
                                }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-bold text-gray-400 mb-2">
                            Scene {index + 1}
                          </div>
                          <p className="text-sm">{paragraph}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => regenerateFrame(index)}
                            className="p-2 rounded-lg hover:bg-gray-600 transition-colors"
                            title="Regenerate scene"
                          >
                            <RefreshCw size={16} />
                          </button>
                          {frame && (
                            <button
                              onClick={() => deleteFrame(frame.id)}
                              className="p-2 rounded-lg hover:bg-red-600 transition-colors"
                              title="Delete scene"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                      {frame && (
                        <div className="mt-2 h-24 rounded-lg overflow-hidden relative group">
                          <CldImage
                            width="400"
                            height="100"
                            src={frame.imageUrl}
                            alt={`Scene ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                        transition-opacity flex items-center justify-center"
                          >
                            <ChevronRight size={24} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Preview and Timeline */}
          <div className="col-span-5 space-y-4">
            {/* Preview Panel */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-4">Scene Preview</h3>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : currentFrame ? (
                  <CldImage
                    width="800"
                    height="500"
                    src={currentFrame.imageUrl}
                    alt="Current scene"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <p className="text-gray-500">No scene selected</p>
                  </div>
                )}
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2 className="animate-spin text-red-600 w-8 h-8" />
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Timeline</h3>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">{maxDuration}s</span>
                </div>
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {frames.map((frame) => (
                  <div
                    key={frame.id}
                    className={`relative flex-shrink-0 w-48 rounded-lg overflow-hidden
                              ${
                                currentFrame?.id === frame.id
                                  ? "ring-2 ring-red-600"
                                  : ""
                              }`}
                  >
                    <button
                      onClick={() => setCurrentFrame(frame)}
                      className="w-full"
                    >
                      <CldImage
                        width="200"
                        height="120"
                        src={frame.imageUrl}
                        alt="Timeline frame"
                        className="w-full h-[120px] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">
                            Scene {frame.paragraphIndex + 1}
                          </span>
                          <span className="text-xs text-gray-400">
                            {frame.timestamp.toFixed(1)}s
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Generation Status and Error */}
            {(videoGenerationStatus || videoGenerationError) && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-2">
                  Estado de generación del video
                </h3>
                {videoGenerationStatus && <p>{videoGenerationStatus}</p>}
                {videoGenerationError && (
                  <p className="text-red-500 mt-2">{videoGenerationError}</p>
                )}
              </div>
            )}

            {/* Generate Video Button */}
            <button
              onClick={generateVideo}
              disabled={frames.length < 2 || isProcessingVideo}
              className={`w-full px-6 py-3 rounded-lg flex items-center justify-center space-x-2
                 ${
                   frames.length < 2 || isProcessingVideo
                     ? "bg-gray-700 text-gray-500"
                     : "bg-red-600 hover:bg-red-700"
                 }`}
            >
              <Video className="w-5 h-5" />
              <span>
                {isProcessingVideo ? "Procesando..." : "Generar Video"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
