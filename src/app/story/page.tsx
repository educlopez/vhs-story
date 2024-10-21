"use client";

import { useState, useEffect } from "react";
import { useStory } from "@/context/StoryContext";
import { CldImage } from "next-cloudinary";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Story = () => {
  const router = useRouter();
  const { name, image, selectedStory, currentScene, setCurrentScene } =
    useStory();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!selectedStory) {
      router.push("/start");
      return;
    }

    const scene = selectedStory.scenes[currentScene];
    if (scene) {
      let index = 0;
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

  const handleChoice = (nextScene: string) => {
    if (selectedStory.scenes[nextScene]) {
      setCurrentScene(nextScene);
      setDisplayedText("");
      setIsTyping(true);
    } else {
      // If the next scene doesn't exist, the story has ended
      router.push("/end");
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
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-white">
            {selectedStory.title}
          </h1>
          <div className="flex mb-6">
            <div className="w-1/3">
              <CldImage
                width="300"
                height="300"
                src={image}
                alt={`${name}'s avatar`}
                className="rounded-full"
                underlay={scene.background}
              />
            </div>
            <div className="w-2/3 pl-6">
              <p className="text-lg mb-4 text-white">{displayedText}</p>
              <AnimatePresence>
                {!isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {scene.choices.map((choice, index) => (
                      <Button
                        key={index}
                        onClick={() => handleChoice(choice.nextScene)}
                        className="mr-4 mb-4"
                      >
                        {choice.text}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
