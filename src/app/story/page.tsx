"use client";
import { Icon } from "@/components/RetroIcons";
import { useState, useEffect, useCallback } from "react";
import { useStory } from "@/context/StoryContext";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Story = () => {
  const router = useRouter();
  const {
    name,
    image,
    selectedStory,
    currentScene,
    setCurrentScene,
    setFinalAvatarImage,
    setSelectedStory,
  } = useStory();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMonsterForm, setIsMonsterForm] = useState(false);

  const updateFinalAvatar = useCallback(() => {
    if (selectedStory?.scenes[currentScene] && image) {
      const avatarUrl = getCldImageUrl({
        src: image,
        width: 300,
        height: 300,
        crop: "fill",
        underlay: selectedStory.scenes[currentScene].background,
        replace: isMonsterForm
          ? {
              from: "person",
              to: selectedStory.monsterTransformation?.monster || "monster",
              preserveGeometry: true,
            }
          : undefined,
      });
      setFinalAvatarImage(avatarUrl);
    }
  }, [selectedStory, currentScene, image, setFinalAvatarImage, isMonsterForm]);

  useEffect(() => {
    if (
      selectedStory?.monsterTransformation &&
      currentScene === selectedStory.monsterTransformation.scene
    ) {
      setIsMonsterForm(true);
    }
  }, [currentScene, selectedStory]);

  useEffect(() => {
    if (!selectedStory) {
      router.push("/start");
      return;
    }

    const scene = selectedStory.scenes[currentScene];
    if (scene) {
      let index = -1;
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + scene.text[index]);
        index++;
        if (index === scene.text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [currentScene, selectedStory, router]);

  useEffect(() => {
    updateFinalAvatar();
  }, [updateFinalAvatar]);

  const handleChoice = (nextScene: string) => {
    if (selectedStory?.scenes[nextScene]) {
      setCurrentScene(nextScene);
      setDisplayedText("");
      setIsTyping(true);
      if (
        selectedStory.monsterTransformation &&
        nextScene === selectedStory.monsterTransformation.scene
      ) {
        setIsMonsterForm(true);
      }
      updateFinalAvatar();
    } else if (selectedStory) {
      setSelectedStory((prev) => {
        if (!prev) return prev;
        return { ...prev, finalScene: currentScene };
      });
      updateFinalAvatar();
      setTimeout(() => {
        router.push("/end");
      }, 100);
    }
  };

  if (!selectedStory || !currentScene) return null;

  const scene = selectedStory.scenes[currentScene];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <CldImage
        width="1920"
        height="1080"
        src={scene.background}
        sizes="100vw"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 ">
        <div className="container mx-auto px-4 py-8 relative z-10 h-screen w-full">
          <span className="text-3xl font-bold mb-6 text-white flex flex-row items-center">
            {selectedStory.title} <Icon name="play" size={24} />
          </span>
          <div className="flex mb-6">
            <div className="w-full pl-6">
              <p className="text-lg mb-4 text-white">{displayedText}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center absolute bottom-12 w-full">
            <AnimatePresence>
              {!isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col justify-center items-center gap-2 mb-2"
                >
                  {scene.choices.map((choice, index) => (
                    <Button
                      key={index}
                      onClick={() => handleChoice(choice.nextScene)}
                    >
                      {choice.text}
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <CldImage
              width="100"
              height="100"
              src={image}
              alt={`${name}'s avatar`}
              className={`rounded-full ${isMonsterForm ? "monster-form" : ""}`}
              underlay={scene.background}
              replace={
                isMonsterForm
                  ? {
                      from: "person",
                      to:
                        selectedStory?.monsterTransformation?.monster ||
                        "monster",
                      preserveGeometry: true,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
