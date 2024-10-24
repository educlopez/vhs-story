"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useStory } from "@/context/StoryContext";
import { Icon } from "@/components/RetroIcons";
import {
  CldUploadWidget,
  CldImage,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stories } from "@/data/stories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import mansion from "@/app/assets/images/mansion-vhs.png";
import vampire from "@/app/assets/images/vampire-vhs.png";
import itclown from "@/app/assets/images/it-vhs.png";
interface TransparentData {
  secure_url: string;
}

interface UploadData {
  secure_url: string;
}

const Start = () => {
  const router = useRouter();
  const { setName, setImage, setSelectedStory, setCurrentScene } = useStory();
  const [imageSize, setImageSize] = useState({ width: 300, height: 300 });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string>("");
  const [uploadData, setUploadData] = useState<UploadData | null>(null);
  const [transparentData, setTransparentData] =
    useState<TransparentData | null>(null);
  const [selectedStoryImage, setSelectedStoryImage] = useState<string | null>(
    null
  );
  const [useDemoAvatar, setUseDemoAvatar] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isDevelopment = false;

  console.log(
    isDevelopment ? "Development mode is active." : "Production mode is active."
  );

  useEffect(() => {
    if (isDevelopment) {
      setName("Maria");
      setImage(
        "https://res.cloudinary.com/dyzxnud9z/image/upload/c_limit,w_640/f_auto/q_auto/v1729501370/cr3mokn1zhmsag2asroe?_a=BAVCyODW0"
      );
      setSelectedStory(stories.find((s) => s.id === "it-clown-terror") || null);
      setSelectedStoryId("it-clown-terror");
      setTransparentData({
        secure_url:
          "https://res.cloudinary.com/dyzxnud9z/image/upload/c_limit,w_640/f_auto/q_auto/v1729501370/cr3mokn1zhmsag2asroe?_a=BAVCyODW0",
      });
    }
  }, [isDevelopment, setName, setImage, setSelectedStory, setSelectedStoryId]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStorySelect = (value: string) => {
    setSelectedStoryId(value);
    const story = stories.find((s) => s.id === value);
    if (story) {
      setSelectedStory(story);
      setSelectedStoryImage(
        story.id === "haunted-mansion" ? mansion.src :
        story.id === "vampire-curse" ? vampire.src :
        story.id === "it-clown-terror" ? itclown.src :
        null
      );
    }
  };

  const demoAvatarUrl = "https://res.cloudinary.com/dyzxnud9z/image/upload/c_limit,w_640/f_auto/q_auto/v1729501370/cr3mokn1zhmsag2asroe?_a=BAVCyODW0"; // URL de la imagen demo

  const handleDemoAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUseDemoAvatar(e.target.checked);
    if (e.target.checked) {
      setImagePreview(demoAvatarUrl); // Mostrar la imagen demo en la vista previa
      setUploadData(null); // No se sube nada a Cloudinary
      setImage(demoAvatarUrl); // Usar la imagen demo en la lógica
    } else {
      setImagePreview(uploadData?.secure_url || null); // Mostrar la imagen cargada si no se usa la demo
    }
  };

  const handleStartAdventure = () => {
    if ((transparentData || useDemoAvatar) && selectedStoryId) {
      const story = stories.find((s) => s.id === selectedStoryId);
      if (story) {
        setSelectedStory(story);
        setCurrentScene(story.initialScene);
        if (!useDemoAvatar && transparentData) {
          setImage(transparentData.secure_url);
        }
        router.push("/story");
      }
    } else {
      alert(
        "Please wait for the image processing to complete and select a story before starting."
      );
    }
  };

  useEffect(() => {
    if (!uploadData) return;
    (async function run() {
      const results = await fetch("/api/image-cloud", {
        method: "POST",
        body: JSON.stringify({
          image: uploadData.secure_url,
          options: {
            background_removal: "cloudinary_ai",
          },
        }),
      }).then((r) => r.json());

      if (results.error) {
        setErrorMessage("Due to lack of credits, this function is not available. You can use the demo image.");
        return;
      }

      const transparentResult = await checkStatus();
      setTransparentData(transparentResult);

      async function checkStatus() {
        const resource = await fetch(
          `/api/resource/?publicId=${results.public_id}`
        ).then((r) => r.json());
        if (
          resource.info.background_removal.cloudinary_ai.status === "pending"
        ) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return await checkStatus();
        }
        return resource;
      }
    })();
  }, [uploadData]);

  return (
    <div className="relative mx-auto max-w-2xl space-y-10 px-4 pb-16 pt-14 sm:px-6 lg:max-w-5xl lg:px-8 flex flex-col justify-between">
      <span className="text-3xl font-bold mb-6 text-white flex flex-row items-center vhs-effect">
        Start <Icon name="play" size={24} />
      </span>

      <div className="flex flex-col md:flex-row justify-between w-full">
        <Card className="w-[380px] bg-black text-white border-none">
          <CardHeader>
            <CardTitle>Prepare Your Story</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {!isDevelopment && (
              <>
                {/* Name input */}
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <Input
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
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="demo-avatar"
                      checked={useDemoAvatar}
                      onChange={handleDemoAvatarChange}
                      className="mr-2"
                    />
                    <label htmlFor="demo-avatar" className="text-sm">
                      Use Demo Avatar
                    </label>
                  </div>
                  {!uploadData && !useDemoAvatar ? (
                    <CldUploadWidget
                      uploadPreset="halloween-story"
                      onSuccess={(result) => {
                        const info = result.info as CloudinaryUploadWidgetInfo;
                        setImageSize({
                          width: info.width,
                          height: info.height,
                        });
                        setUploadData(info);
                        setImagePreview(info.secure_url);
                      }}
                    >
                      {({ open }) => (
                        <Button onClick={() => open()}>Upload Image</Button>
                      )}
                    </CldUploadWidget>
                  ) : (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        Image Preview
                      </h2>
                      {uploadData && !transparentData && !errorMessage &&(
                        <p>Processing image... Please wait.</p>
                      )}
                      {errorMessage && (
                        <div className="text-red-500">{errorMessage}</div>
                      )}
                      {useDemoAvatar ? (
                        <CldImage
                          width={imageSize.width}
                          height={imageSize.height}
                          src={demoAvatarUrl}
                          alt="Demo Avatar Preview"
                          className="max-w-full h-auto"
                        />
                      ) : (
                        transparentData && (
                          <CldImage
                            width={imageSize.width}
                            height={imageSize.height}
                            src={transparentData.secure_url}
                            alt="Avatar preview"
                            className="max-w-full h-auto"
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {isDevelopment && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Development Mode</h2>
                <p>Using default values for name, image, and story.</p>
              </div>
            )}

            <Button
              onClick={handleStartAdventure}
              disabled={
                (!transparentData && !useDemoAvatar) || !selectedStoryId
              }
            >
              Start Adventure
            </Button>
          </CardContent>
        </Card>

        <div className="w-full md:w-1/2">
          {selectedStoryImage && (
            <motion.img
              src={selectedStoryImage}
              alt="Selected Story"
              className="w-full h-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Start;
