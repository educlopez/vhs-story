import { Story } from "@/app/types";

export const stories: Story[] = [
  {
    id: "haunted-mansion",
    title: "The Haunted Mansion",
    description: "Explore a mysterious mansion with dark secrets...",
    initialScene: "entrance",
    finalScene: "end",
    monsterTransformation: {
      scene: "ghost-form",
      monster: "ghost",
    },
    scenes: {
      entrance: {
        text: "You stand before an imposing Victorian mansion. Its windows seem to watch your every move, and a sense of dread looms in the air...",
        background: "horror-base/backgrounds/mansion/mansion-exterior",
        choices: [
          {
            text: "Enter through the front door",
            nextScene: "foyer",
            imageEffects: {
              backgroundImage:
                "horror-base/backgrounds/mansion/mansion-interior",
            },
          },
          {
            text: "Look for another way in",
            nextScene: "garden",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/mansion/mansion-garden",
            },
          },
        ],
      },
      foyer: {
        text: "The grand foyer is dimly lit by flickering candles. You sense an ominous presence as the air grows colder...",
        background: "horror-base/backgrounds/mansion/mansion-foyer",
        choices: [
          {
            text: "Investigate the strange noises upstairs",
            nextScene: "upstairs",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/mansion/mansion-stairs",
            },
          },
          {
            text: "Check the mysterious door beneath the stairs",
            nextScene: "basement",
            imageEffects: {
              filter: "sepia",
              backgroundImage:
                "horror-base/backgrounds/mansion/mansion-basement",
            },
          },
        ],
      },
      garden: {
        text: "You find yourself in an overgrown garden. The shadows seem to reach for you, and a faint whispering fills the air...",
        background: "horror-base/backgrounds/mansion/mansion-garden",
        choices: [
          {
            text: "Inspect the old well",
            nextScene: "well",
            imageEffects: {
              filter: "grayscale",
              backgroundImage:
                "horror-base/backgrounds/mansion/mansion-old-well",
            },
          },
          {
            text: "Look for a hidden entrance",
            nextScene: "hidden-door",
            imageEffects: {
              backgroundImage:
                "horror-base/backgrounds/mansion/mansion-hidden-door",
            },
          },
        ],
      },
      well: {
        text: "A strange glow emanates from the depths of the well, accompanied by a chilling voice calling your name...",
        background: "horror-base/backgrounds/mansion/mansion-old-well",
        choices: [
          {
            text: "Climb down to investigate",
            nextScene: "underground-chamber",
            imageEffects: {
              filter: "grayscale",
              backgroundImage:
                "horror-base/backgrounds/mansion/mansion-underground-chamber",
            },
          },
          {
            text: "Step away from the well",
            nextScene: "garden",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/mansion/mansion-garden",
            },
          },
        ],
      },
      upstairs: {
        text: "You creep up the stairs, each step creaking. At the top, a faint glow seeps from a partially open door on the left...",
        background: "horror-base/backgrounds/mansion/mansion-stairs",
        choices: [
          {
            text: "Enter the room",
            nextScene: "haunted-room",
            imageEffects: {
              filter: "grayscale",
              backgroundImage:
                "horror-base/backgrounds/mansion/mansion-haunted-room",
            },
          },
          {
            text: "Continue down the hallway",
            nextScene: "end-of-hallway",
            imageEffects: {
              backgroundImage:
                "horror-base/backgrounds/mansion/mansion-hallway",
            },
          },
        ],
      },
      basement: {
        text: "You descend into the basement, where a dense mist clings to the ground. The room grows darker, and a feeling of change washes over you...",
        background: "horror-base/backgrounds/mansion/mansion-basement",
        choices: [
          {
            text: "Embrace the transformation",
            nextScene: "ghost-form",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/mansion/mansion-ghost",
            },
          },
          {
            text: "Fight against it",
            nextScene: "escape-attempt",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/mansion/mansion-escape",
            },
          },
        ],
      },
      "ghost-form": {
        text: "The mist consumes you, and you feel yourself becoming one with the darkness. You are now a ghost, forever bound to the mansion...",
        background: "horror-base/backgrounds/mansion/mansion-ghost",
        choices: [],
      },
      "escape-attempt": {
        text: "You struggle to escape the basement, but the mist tightens its grip, pulling you back into the shadows. Your transformation is inevitable...",
        background: "horror-base/backgrounds/mansion/mansion-escape",
        choices: [],
      },
    },
  },
  {
    id: "vampire-curse",
    title: "The Vampire's Curse",
    description: "A night out takes a dark turn...",
    initialScene: "party",
    finalScene: "end",
    monsterTransformation: {
      scene: "vampire-transformation",
      monster: "vampire with big smile",
    },
    scenes: {
      party: {
        text: "The Halloween party is lively, but you feel uneasy as someone watches you from the shadows...",
        background: "horror-base/backgrounds/vampire/party",
        choices: [
          {
            text: "Approach the mysterious stranger",
            nextScene: "encounter",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/vampire/vampire-lair",
            },
          },
          {
            text: "Stay with your friends",
            nextScene: "dance",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/party-crowd",
            },
          },
        ],
      },
      encounter: {
        text: "The stranger greets you with a chilling smile. 'I've been waiting for you,' they say, as the room seems to darken...",
        background: "horror-base/backgrounds/vampire/vampire-lair",
        choices: [
          {
            text: "Run away",
            nextScene: "alley",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/alley",
            },
          },
          {
            text: "Follow the stranger",
            nextScene: "ritual-chamber",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-chamber",
            },
          },
        ],
      },
      dance: {
        text: "You stay with your friends, but the unsettling feeling lingers. Suddenly, you notice the stranger standing closer, whispering something inaudible...",
        background: "horror-base/backgrounds/vampire/party-crowd",
        choices: [
          {
            text: "Confront the stranger",
            nextScene: "encounter",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/vampire/vampire-lair",
            },
          },
          {
            text: "Leave the party",
            nextScene: "alley",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/alley",
            },
          },
        ],
      },
      alley: {
        text: "You find yourself in a dark alley, but it feels like something is following you. The sound of footsteps echoes behind...",
        background: "horror-base/backgrounds/vampire/alley",
        choices: [
          {
            text: "Hide behind a dumpster",
            nextScene: "confrontation",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/vampire/dumpster",
            },
          },
          {
            text: "Keep running",
            nextScene: "ritual-chamber",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-chamber",
            },
          },
        ],
      },
      "ritual-chamber": {
        text: "You are dragged into a dimly lit chamber. The stranger reveals themselves as a vampire, preparing a ritual that will change you forever...",
        background: "horror-base/backgrounds/vampire/ritual-chamber",
        choices: [
          {
            text: "Submit to the ritual",
            nextScene: "vampire-transformation",
            imageEffects: {
              filter: "grayscale",
              backgroundImage:
                "horror-base/backgrounds/vampire/vampire-transformation",
            },
          },
          {
            text: "Try to escape",
            nextScene: "ritual-failure",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-failure",
            },
          },
        ],
      },
      "vampire-transformation": {
        text: "The ritual completes, and you feel your body change. Fangs emerge, and darkness fills your mind—you are now a vampire...",
        background: "horror-base/backgrounds/vampire/vampire-transformation",
        choices: [],
      },
      "ritual-failure": {
        text: "You struggle to escape, but the ritual is too powerful. Darkness consumes you as the transformation takes hold...",
        background: "horror-base/backgrounds/vampire/ritual-failure",
        choices: [],
      },
    },
  },
];
