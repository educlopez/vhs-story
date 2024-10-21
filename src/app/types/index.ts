export interface Story {
  id: string;
  title: string;
  description: string;
  initialScene: string;
  scenes: {
    [key: string]: StoryScene;
  };
}

export interface StoryScene {
  text: string;
  background: string;
  choices: Choice[];
  imageEffects?: ImageEffect;
}

export interface Choice {
  text: string;
  nextScene: string;
  imageEffects?: ImageEffect;
}

export interface ImageEffect {
  filter?: "grayscale" | "sepia";
  backgroundImage?: string; // Cloudinary public_id for background
}

export interface UserState {
  characterImageId: string;
  selectedStory?: Story;
  currentScene?: string;
}
