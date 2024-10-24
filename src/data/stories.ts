import { Story } from "@/app/types";

export const stories: Story[] = [
  {
    id: "haunted-mansion",
    title: "The Haunted Mansion",
    description:
      "Explore a mysterious mansion filled with dark secrets and terrifying truths...",
    initialScene: "entrance",
    finalScene: "end",
    monsterTransformation: {
      scene: "ghost-form",
      monster: "ghost",
    },
    scenes: {
      entrance: {
        text: "You stand before a towering Victorian mansion. Its cracked windows and crumbling façade tell a story of abandonment, yet you feel as though something—or someone—is watching you from within. A cold gust of wind brushes past you, carrying faint whispers.",
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
        text: "The grand foyer is shrouded in darkness, save for the flickering glow of dusty chandeliers. Cold drafts seem to come from every corner, and with each step, the floor creaks as though the house itself is alive...",
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
        text: "The garden is overgrown and wild, with tangled vines and twisted trees. The air here feels thick with centuries of decay. As you walk deeper, you hear voices—not human, but something older, something waiting...",
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
        text: "The well is ancient, with moss-covered stones. From its depths, a strange glow pulses in rhythm with your heartbeat. A chilling voice calls your name, beckoning you to come closer...",
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
      "underground-chamber": {
        text: "You descend into the chamber below the well, finding ancient symbols carved into the walls. The air is thick with the smell of damp earth and something else—blood. As the glow intensifies, you feel a dark force taking over...",
        background:
          "horror-base/backgrounds/mansion/mansion-underground-chamber",
        choices: [
          {
            text: "Embrace the dark power",
            nextScene: "ghost-form",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/mansion/mansion-ghost",
            },
          },
          {
            text: "Resist and try to escape",
            nextScene: "escape-attempt",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/mansion/mansion-escape",
            },
          },
        ],
      },
      upstairs: {
        text: "As you ascend the staircase, each step groans under your weight. The temperature drops further as you reach the top, and a dim light flickers from a room to the left. Shadows dance on the walls, and a feeling of impending doom grows...",
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
      "haunted-room": {
        text: "The room is cluttered with broken furniture and shattered mirrors. In the center, a ghostly figure stands silently, staring at you with hollow eyes. As you approach, the air grows impossibly cold, and you realize that it isn’t just watching—it’s waiting for you to join it...",
        background: "horror-base/backgrounds/mansion/mansion-haunted-room",
        choices: [
          {
            text: "Submit to the haunting",
            nextScene: "ghost-form",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/mansion/mansion-ghost",
            },
          },
          {
            text: "Run from the room",
            nextScene: "upstairs",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/mansion/mansion-stairs",
            },
          },
        ],
      },
      basement: {
        text: "The basement is cold and damp, with a thick mist swirling at your feet. The further you descend, the more your surroundings warp. Reality itself seems to distort as whispers fill the air, urging you to surrender...",
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
        text: "The mist engulfs you, and as the darkness consumes your mind, your body dissolves into the shadows. You have become a ghost, bound forever to haunt this cursed mansion...",
        background: "horror-base/backgrounds/mansion/mansion-ghost",
        choices: [],
      },
      "escape-attempt": {
        text: "You struggle to escape the grip of the dark forces in the basement, but your efforts only hasten your fate. The mist tightens its hold, and your transformation into a specter of the mansion becomes inevitable...",
        background: "horror-base/backgrounds/mansion/mansion-escape",
        choices: [],
      },
    },
  },
  {
    id: "vampire-curse",
    title: "The Vampire's Curse",
    description:
      "A night out at a Halloween party takes a dark turn when you meet a mysterious stranger hiding sinister secrets.",
    initialScene: "party",
    finalScene: "end",
    monsterTransformation: {
      scene: "vampire-transformation",
      monster: "vampire with a sinister smile",
    },
    scenes: {
      party: {
        text: "The Halloween party is lively, music blaring, and laughter all around. But you can't shake the feeling that someone is watching you from the shadows...",
        background: "horror-base/backgrounds/vampire/party",
        choices: [
          {
            text: "Approach the mysterious figure in the corner",
            nextScene: "encounter",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/vampire/vampire-lair",
            },
          },
          {
            text: "Stay with your friends and dance",
            nextScene: "dance",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/party-crowd",
            },
          },
          {
            text: "Step outside for some fresh air",
            nextScene: "alley",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/alley",
            },
          },
        ],
      },
      encounter: {
        text: "The figure turns to face you, revealing a pale face and piercing red eyes. 'I've been watching you,' they whisper, and the air around you grows cold...",
        background: "horror-base/backgrounds/vampire/vampire-lair",
        choices: [
          {
            text: "Run back to the party",
            nextScene: "party",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/party",
            },
          },
          {
            text: "Follow the stranger to a private room",
            nextScene: "private-room",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/private-room",
            },
          },
          {
            text: "Confront the stranger",
            nextScene: "confrontation",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/vampire/ritual-chamber",
            },
          },
        ],
      },
      dance: {
        text: "You try to shake off the strange feeling by dancing with your friends, but the stranger is now standing closer, watching your every move...",
        background: "horror-base/backgrounds/vampire/party-crowd",
        choices: [
          {
            text: "Ignore them and keep dancing",
            nextScene: "dance-intensifies",
            imageEffects: {
              filter: "sepia",
              backgroundImage: "horror-base/backgrounds/vampire/party-crowd",
            },
          },
          {
            text: "Confront the stranger",
            nextScene: "encounter",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/vampire/vampire-lair",
            },
          },
          {
            text: "Leave the party immediately",
            nextScene: "alley",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/alley",
            },
          },
        ],
      },
      "dance-intensifies": {
        text: "The music grows louder, and the room spins. As you lose yourself in the dance, you feel a strange pull. The stranger’s eyes are locked on you, and the world begins to blur...",
        background: "horror-base/backgrounds/vampire/party-crowd",
        choices: [
          {
            text: "Succumb to the pull",
            nextScene: "vampire-bite",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-chamber",
            },
          },
          {
            text: "Break away and run",
            nextScene: "alley",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/alley",
            },
          },
        ],
      },
      "private-room": {
        text: "The stranger leads you into a secluded room. 'You shouldn't have come here,' they say with a predatory grin as they close the door behind you.",
        background: "horror-base/backgrounds/vampire/private-room",
        choices: [
          {
            text: "Try to escape",
            nextScene: "escape-attempt",
            imageEffects: {
              filter: "sepia",
              backgroundImage: "horror-base/backgrounds/vampire/alley",
            },
          },
          {
            text: "Ask what they want",
            nextScene: "ritual-chamber",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-chamber",
            },
          },
        ],
      },
      alley: {
        text: "You step into the dark alley, trying to shake the eerie feeling from inside the party. But soon, footsteps echo behind you...",
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
            text: "Run deeper into the alley",
            nextScene: "ritual-chamber",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-chamber",
            },
          },
        ],
      },
      confrontation: {
        text: "The stranger appears behind you. 'There's no escape,' they say, their eyes glowing red as they move closer. You feel a strange sensation in your veins...",
        background: "horror-base/backgrounds/vampire/ritual-chamber",
        choices: [
          {
            text: "Fight back",
            nextScene: "ritual-failure",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-failure",
            },
          },
          {
            text: "Submit to the transformation",
            nextScene: "vampire-bite",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-chamber",
            },
          },
        ],
      },
      "vampire-bite": {
        text: "The stranger sinks their fangs into your neck. You feel a burning sensation as your body begins to change. Fangs sprout from your mouth, and darkness consumes you—you are now a vampire...",
        background: "horror-base/backgrounds/vampire/vampire-transformation",
        choices: [
          {
            text: "Embrace your new power",
            nextScene: "vampire-transformation",
            imageEffects: {
              filter: "grayscale",
              backgroundImage:
                "horror-base/backgrounds/vampire/vampire-transformation",
            },
          },
          {
            text: "Resist the darkness",
            nextScene: "ritual-failure",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/vampire/ritual-failure",
            },
          },
        ],
      },
      "ritual-chamber": {
        text: "You are dragged into a dimly lit chamber. The stranger reveals themselves as a vampire, performing a ritual that will seal your fate as one of them...",
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
        text: "The ritual completes, and you feel your body change. Fangs emerge, and an overwhelming hunger fills you. You are now a vampire, bound to the darkness forever...",
        background: "horror-base/backgrounds/vampire/vampire-transformation",
        choices: [],
      },
      "ritual-failure": {
        text: "You fight against the transformation, but the ritual's power overwhelms you. Darkness consumes your soul as the vampire's curse takes hold...",
        background: "horror-base/backgrounds/vampire/ritual-failure",
        choices: [],
      },
    },
  },
  {
    id: "it-clown-terror",
    title: "The Terror of IT the Clown",
    description:
      "A seemingly normal day takes a dark turn when you stumble upon a cursed carnival. IT the Clown lurks in the shadows, waiting to claim your soul.",
    initialScene: "carnival-entrance",
    finalScene: "end",
    monsterTransformation: {
      scene: "it-transformation",
      monster: "mindless zombie under IT's control",
    },
    scenes: {
      "carnival-entrance": {
        text: "You arrive at a strange carnival that seems abandoned. The air is thick with dread, and you hear faint laughter echoing from deep within the park. Something feels terribly wrong.",
        background: "horror-base/backgrounds/it/carnival-entrance",
        choices: [
          {
            text: "Enter the carnival",
            nextScene: "main-midway",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/it/main-midway",
            },
          },
          {
            text: "Turn back and leave",
            nextScene: "parking-lot",
            imageEffects: {
              filter: "sepia",
              backgroundImage: "horror-base/backgrounds/it/parking-lot",
            },
          },
        ],
      },
      "parking-lot": {
        text: "As you turn to leave, the carnival gates slam shut behind you. There's no way out. Faint laughter echoes in the distance, and you feel something watching you.",
        background: "horror-base/backgrounds/it/parking-lot",
        choices: [
          {
            text: "Run back to the carnival",
            nextScene: "main-midway",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/main-midway",
            },
          },
          {
            text: "Search for another exit",
            nextScene: "carnival-back-alley",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/carnival-back-alley",
            },
          },
        ],
      },
      "main-midway": {
        text: "The carnival is deserted, but you can hear whispers and unsettling sounds. Suddenly, you spot a red balloon floating in the air ahead of you.",
        background: "horror-base/backgrounds/it/main-midway",
        choices: [
          {
            text: "Follow the balloon",
            nextScene: "balloon-chase",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/balloon-path",
            },
          },
          {
            text: "Ignore the balloon and explore",
            nextScene: "haunted-house",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/haunted-house",
            },
          },
        ],
      },
      "balloon-chase": {
        text: "You chase the balloon through winding paths, but it seems to stay just out of reach. Suddenly, the balloon pops, and IT the Clown appears in front of you with a menacing grin.",
        background: "horror-base/backgrounds/it/balloon-pop",
        choices: [
          {
            text: "Run back to the midway",
            nextScene: "main-midway",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/main-midway",
            },
          },
          {
            text: "Confront IT the Clown",
            nextScene: "clown-confrontation",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/clown-encounter",
            },
          },
        ],
      },
      "haunted-house": {
        text: "You find yourself in front of a dilapidated haunted house. The doors creak open, beckoning you inside. IT’s laughter echoes from within.",
        background: "horror-base/backgrounds/it/haunted-house",
        choices: [
          {
            text: "Enter the haunted house",
            nextScene: "it-lair",
            imageEffects: {
              filter: "sepia",
              backgroundImage: "horror-base/backgrounds/it/it-lair",
            },
          },
          {
            text: "Walk away and explore another area",
            nextScene: "carnival-back-alley",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/carnival-back-alley",
            },
          },
        ],
      },
      "carnival-back-alley": {
        text: "You wander into a narrow alley behind the carnival tents. It feels like something is moving in the shadows. You hear a soft voice calling your name.",
        background: "horror-base/backgrounds/it/carnival-back-alley",
        choices: [
          {
            text: "Investigate the voice",
            nextScene: "it-lair",
            imageEffects: {
              filter: "grayscale",
              backgroundImage: "horror-base/backgrounds/it/it-lair",
            },
          },
          {
            text: "Run in the opposite direction",
            nextScene: "escape-attempt",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/carnival-exit",
            },
          },
        ],
      },
      "clown-confrontation": {
        text: "IT the Clown’s terrifying grin stretches wide as it moves closer. You must either stand your ground or risk being dragged into the darkness...",
        background: "horror-base/backgrounds/it/clown-encounter",
        choices: [
          {
            text: "Fight back",
            nextScene: "fight-it",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/fight-it",
            },
          },
          {
            text: "Attempt to escape",
            nextScene: "escape-attempt",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/carnival-exit",
            },
          },
        ],
      },
      "it-lair": {
        text: "You step into IT’s lair, a dark and twisted place filled with floating red balloons and the faint whispers of its past victims. IT appears, watching you hungrily.",
        background: "horror-base/backgrounds/it/it-lair",
        choices: [
          {
            text: "Try to defeat IT",
            nextScene: "final-battle",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/final-battle",
            },
          },
          {
            text: "Submit to the terror",
            nextScene: "it-transformation",
            imageEffects: {
              backgroundImage:
                "horror-base/backgrounds/it/zombie-transformation",
            },
          },
        ],
      },
      "final-battle": {
        text: "Armed with your wits and sheer determination, you confront IT the Clown in a final, desperate battle. Can you overcome the terror and defeat this monster once and for all?",
        background: "horror-base/backgrounds/it/final-battle",
        choices: [
          {
            text: "Deliver the final blow",
            nextScene: "defeat-it",
            imageEffects: {
              backgroundImage: "horror-base/backgrounds/it/defeated-it",
            },
          },
          {
            text: "IT overpowers you",
            nextScene: "it-transformation",
            imageEffects: {
              backgroundImage:
                "horror-base/backgrounds/it/zombie-transformation",
            },
          },
        ],
      },
      "fight-it": {
        text: "You manage to land a hit on IT, but the monster's laughter grows louder as it looms over you. You feel your strength fading...",
        background: "horror-base/backgrounds/it/fight-it",
        choices: [
          {
            text: "Keep fighting",
            nextScene: "final-battle",
            imageEffects: {
              filter: "sepia",
              backgroundImage: "horror-base/backgrounds/it/final-battle",
            },
          },
          {
            text: "Succumb to IT",
            nextScene: "it-transformation",
            imageEffects: {
              backgroundImage:
                "horror-base/backgrounds/it/zombie-transformation",
            },
          },
        ],
      },
      "defeat-it": {
        text: "With a final strike, you manage to defeat IT the Clown. The air around you clears, and the cursed carnival fades away, leaving only silence. You've won... for now.",
        background: "horror-base/backgrounds/it/defeated-it",
        choices: [],
      },
      "escape-attempt": {
        text: "You run through the carnival, searching for an exit. But no matter how fast you go, IT is always right behind you, closer and closer...",
        background: "horror-base/backgrounds/it/carnival-exit",
        choices: [
          {
            text: "Try to escape one last time",
            nextScene: "final-battle",
            imageEffects: {
              filter: "sepia",
              backgroundImage: "horror-base/backgrounds/it/final-battle",
            },
          },
          {
            text: "Give up and let IT take you",
            nextScene: "it-transformation",
            imageEffects: {
              backgroundImage:
                "horror-base/backgrounds/it/zombie-transformation",
            },
          },
        ],
      },
      "it-transformation": {
        text: "IT wraps its grotesque hands around you, and you feel your will drain away. Your body goes limp as your mind slips into darkness. You've become one of IT’s mindless subjects, forever trapped under the clown’s control.",
        background: "horror-base/backgrounds/it/zombie-transformation",
        choices: [],
      },
    },
  },
];
