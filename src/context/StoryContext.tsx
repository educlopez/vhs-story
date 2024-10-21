"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Story, StoryScene } from "@/app/types";

interface StoryContextType {
  name: string;
  setName: (name: string) => void;
  image: string;
  setImage: (image: string) => void;
  selectedStory: Story | null;
  setSelectedStory: (story: Story) => void;
  currentScene: string;
  setCurrentScene: (scene: string) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string>("");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentScene, setCurrentScene] = useState<string>("");

  return (
    <StoryContext.Provider
      value={{
        name,
        setName,
        image,
        setImage,
        selectedStory,
        setSelectedStory,
        currentScene,
        setCurrentScene,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};
