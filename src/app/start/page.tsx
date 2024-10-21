"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useStory } from "@/context/StoryContext";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { stories } from "@/data/stories";

const Start = () => {
  const router = useRouter();
  const { setName, setImage, setSelectedStory, setCurrentScene } = useStory();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string>("");
  const [uploadData, setUploadData] = useState(null);
  const [transparentData, setTransparentData] = useState(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStorySelect = (value: string) => {
    setSelectedStoryId(value);
    const story = stories.find((s) => s.id === value);
    if (story) setSelectedStory(story);
  };

  const handleStartAdventure = () => {
    if (transparentData && selectedStoryId) {
      const story = stories.find((s) => s.id === selectedStoryId);
      if (story) {
        setSelectedStory(story);
        setCurrentScene(story.initialScene);
        setImage(transparentData.secure_url);
        router.push("/story");
      }
    } else {
      alert("Please wait for the image processing to complete and select a story before starting.");
    }
  };

  useEffect(() => {
    if (!uploadData) return;
    (async function run() {
      const results = await fetch('/api/image-cloud', {
        method: 'POST',
        body: JSON.stringify({
          image: uploadData.secure_url,
          options: {
            background_removal: 'cloudinary_ai'
          }
        })
      }).then(r => r.json());

      const transparentResult = await checkStatus();

      setTransparentData(transparentResult);

      async function checkStatus() {
        const resource = await fetch(`/api/resource/?publicId=${results.public_id}`).then(r => r.json());
        if (resource.info.background_removal.cloudinary_ai.status === 'pending') {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return await checkStatus();
        }
        return resource;
      }
    })();
  }, [uploadData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Prepare Your Adventure</h1>

      {/* Name input */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          onChange={handleNameChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Story selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Choose Your Story
        </label>
        <Select onValueChange={handleStorySelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a story" />
          </SelectTrigger>
          <SelectContent>
            {stories.map((story) => (
              <SelectItem key={story.id} value={story.id}>
                {story.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Image upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Upload Your Avatar
        </label>
        {!uploadData ? (
          <CldUploadWidget
            uploadPreset="halloween-story"
            onSuccess={(result: any) => {
              setImageSize({
                width: result?.info?.width,
                height: result?.info?.height,
              });
              setUploadData(result?.info);
              setImagePreview(result?.info?.secure_url);
            }}
          >
            {({ open }) => <Button onClick={() => open()}>Upload Image</Button>}
          </CldUploadWidget>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Image Preview</h2>
            {uploadData && !transparentData && (
              <p>Processing image... Please wait.</p>
            )}
            {transparentData && (
              <CldImage
                width={imageSize.width}
                height={imageSize.height}
                src={transparentData.secure_url}
                alt="Avatar preview"
                className="max-w-full h-auto"
              />
            )}
          </div>
        )}
      </div>

      <Button
        onClick={handleStartAdventure}
        disabled={!transparentData || !selectedStoryId}
      >
        Start Adventure
      </Button>
    </div>
  );
};

export default Start;
