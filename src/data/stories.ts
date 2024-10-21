import { Story } from "@/app/types";

export const stories: Story[] = [
  {
    id: "haunted-mansion",
    title: "The Haunted Mansion",
    description: "Explore a mysterious mansion with dark secrets...",
    initialScene: "entrance",
    scenes: {
      entrance: {
        text: "You stand before an imposing Victorian mansion. Its windows seem to watch your every move...",
        background: "/backgrounds/mansion-exterior.jpg",
        choices: [
          {
            text: "Enter through the front door",
            nextScene: "foyer",
            imageEffects: {
              backgroundImage: "halloween-story/mansion-interior",
            },
          },
          {
            text: "Look for another way in",
            nextScene: "garden",
            imageEffects: {
              backgroundImage: "halloween-story/mansion-garden",
            },
          },
        ],
      },
      foyer: {
        text: "The grand foyer is dimly lit by flickering candles. A ghostly presence sends chills down your spine...",
        background: "/backgrounds/mansion-foyer.jpg",
        choices: [
          {
            text: "Investigate the strange noises upstairs",
            nextScene: "upstairs",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "halloween-story/mansion-stairs",
            },
          },
          {
            text: "Check the mysterious door beneath the stairs",
            nextScene: "basement",
            imageEffects: {
              filter: "sepia",
              backgroundImage: "halloween-story/mansion-basement",
            },
          },
        ],
      },
      garden: {
        text: "You find yourself in an overgrown garden, where twisted vines and dark shadows seem to come alive...",
        background: "/backgrounds/mansion-garden.jpg",
        choices: [
          {
            text: "Inspect the old well",
            nextScene: "well",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "halloween-story/old-well",
            },
          },
          {
            text: "Look for a hidden entrance",
            nextScene: "hidden-door",
            imageEffects: {
              backgroundImage: "halloween-story/hidden-door",
            },
          },
        ],
      },
      well: {
        text: "As you peer down the well, a strange glow emanates from the depths. You hear a faint whisper calling your name...",
        background: "/backgrounds/old-well.jpg",
        choices: [
          {
            text: "Climb down to investigate",
            nextScene: "underground-chamber",
            imageEffects: {
              filter: "brightness(0.5)",
              backgroundImage: "halloween-story/underground-chamber",
            },
          },
          {
            text: "Step away from the well",
            nextScene: "garden",
            imageEffects: {
              filter: "contrast(1.5)",
              backgroundImage: "halloween-story/mansion-garden",
            },
          },
        ],
      },
      upstairs: {
        text: "You creep up the stairs, each step creaking beneath your feet. At the top, you see a flickering light coming from a room on the left...",
        background: "/backgrounds/mansion-stairs.jpg",
        choices: [
          {
            text: "Enter the room",
            nextScene: "haunted-room",
            imageEffects: {
              filter: "saturate(0.2)",
              backgroundImage: "halloween-story/haunted-room",
            },
          },
          {
            text: "Continue down the hallway",
            nextScene: "end-of-hallway",
            imageEffects: {
              backgroundImage: "halloween-story/hallway",
            },
          },
        ],
      },
      // Additional scenes can be added here...
    },
  },
  {
    id: "vampire-curse",
    title: "The Vampire's Curse",
    description: "A night out takes a dark turn...",
    initialScene: "party",
    scenes: {
      party: {
        text: "The Halloween party is in full swing when you notice someone watching you from the shadows...",
        background: "/backgrounds/party.jpg",
        choices: [
          {
            text: "Approach the mysterious stranger",
            nextScene: "encounter",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "halloween-story/vampire-lair",
            },
          },
          {
            text: "Stay with your friends",
            nextScene: "dance",
            imageEffects: {
              backgroundImage: "halloween-story/party-crowd",
            },
          },
        ],
      },
      // Add more scenes...
    },
  },
];
