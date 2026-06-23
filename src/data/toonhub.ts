import { publicAsset } from '../utils/assets';

export type ToonhubCharacter = {
  src: string;
  bg: string;
  panel: string;
  name: string;
  code: string;
  channel: string;
  signal: string;
  type: string;
  year: string;
  concept: string;
  personality: string[];
  role: string;
  origin: string;
  quote: string;
  medium: string;
  palette: string;
  finish: string;
  keywords: string[];
  notes: string[];
};

export const characters: ToonhubCharacter[] = [
  {
    src: publicAsset('/figurines/figurine-1.webp'),
    bg: '#F4845F',
    panel: '#F79B7F',
    name: 'Bubble Chief',
    code: 'TOON-001',
    channel: 'CHANNEL 001',
    signal: 'ORANGE SIGNAL',
    type: '3D Character',
    year: '2026',
    concept: 'A cheerful rounded character study built around soft volume, toy-like color, and oversized personality.',
    personality: ['Leader', 'Stubborn', 'Protective'],
    role: 'The first channel keeper who stabilizes the color broadcast.',
    origin: 'Born from the warm static of the Orange Signal.',
    quote: 'Keep the signal loud, soft, and impossible to ignore.',
    medium: 'Digital sculpt / character render',
    palette: 'Coral orange, cream white, denim blue',
    finish: 'Soft vinyl-inspired surface',
    keywords: ['soft sculpt', 'warm orange', 'collectible'],
    notes: [
      'Rounded silhouette keeps the character readable from a distance.',
      'Oversized pose and small facial details push the toy-like personality.',
      'Warm background color is matched to the figure for a single-piece poster feel.',
    ],
  },
  {
    src: publicAsset('/figurines/figurine-2.webp'),
    bg: '#6BBF7A',
    panel: '#85CC92',
    name: 'Mint Scout',
    code: 'TOON-002',
    channel: 'CHANNEL 002',
    signal: 'MINT SIGNAL',
    type: 'Concept Sculpt',
    year: '2026',
    concept: 'A compact explorer silhouette with candy-color surfaces and a calm, friendly display presence.',
    personality: ['Observer', 'Quiet', 'Curious'],
    role: 'A boundary scout who searches for new character frequencies.',
    origin: 'Found near the edge of the Mint Signal field.',
    quote: 'Small signals still know where the story begins.',
    medium: 'Concept sculpt / display render',
    palette: 'Mint green, soft white, clay red',
    finish: 'Matte collectible plastic',
    keywords: ['mint palette', 'friendly form', 'character set'],
    notes: [
      'Short proportions make the character feel steady and approachable.',
      'Low-contrast colors keep attention on the figure shape instead of surface noise.',
      'Designed as a quieter companion piece inside the four-character set.',
    ],
  },
  {
    src: publicAsset('/figurines/figurine-3.webp'),
    bg: '#E882B4',
    panel: '#ED9DC4',
    name: 'Pink Signal',
    code: 'TOON-003',
    channel: 'CHANNEL 003',
    signal: 'PINK SIGNAL',
    type: 'Art Toy Study',
    year: '2026',
    concept: 'A bright figure focused on playful contrast, glossy surfaces, and a poster-like color identity.',
    personality: ['Loud', 'Expressive', 'Unstable'],
    role: 'An emotion broadcaster who turns feelings into bright signal waves.',
    origin: 'Sparked out of a color surge inside the Pink Signal.',
    quote: 'If it flickers, it is probably saying something.',
    medium: 'Art toy study / color render',
    palette: 'Hot pink, powder rose, bright white',
    finish: 'Gloss-coated character surface',
    keywords: ['pink burst', 'gloss finish', 'toy design'],
    notes: [
      'The saturated field gives the figure a loud, gallery-poster presence.',
      'Gloss highlights separate the character from the flat color background.',
      'The pose is composed to feel like a collectible photographed for a launch card.',
    ],
  },
  {
    src: publicAsset('/figurines/figurine-4.webp'),
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    name: 'Sky Runner',
    code: 'TOON-004',
    channel: 'CHANNEL 004',
    signal: 'SKY SIGNAL',
    type: 'Motion Pose',
    year: '2026',
    concept: 'A light blue character pose made to feel quick, clean, and ready for a larger animated universe.',
    personality: ['Fast', 'Clean', 'Future-minded'],
    role: 'A channel courier who keeps the TOONHUB universe moving.',
    origin: 'Launched from the clean current of the Sky Signal.',
    quote: 'Every channel needs a path forward.',
    medium: 'Motion pose / character render',
    palette: 'Sky blue, deep navy, clean white',
    finish: 'Smooth animation maquette',
    keywords: ['blue field', 'dynamic pose', 'series hero'],
    notes: [
      'Forward-leaning body language suggests motion without needing a full animation.',
      'Blue-on-blue staging gives the piece a crisp sci-fi sports energy.',
      'The clean silhouette makes it work as a hero pose for the broader series.',
    ],
  },
];

export const universeIntro =
  'TOONHUB is a broadcast universe for toy-like 3D characters. Every figure carries a color signal, a mood, and a tiny legend from its own channel.';

export const seasonTitle = 'Season 01: Color Signals';

export const seasonCopy =
  'The first TOONHUB season opens four base channels: orange, mint, pink, and sky. Each signal introduces a different personality, role, and color rhythm inside the same character universe.';
