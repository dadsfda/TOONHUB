# TOONHUB Universe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build TOONHUB into a single-page original character IP site for `Season 01 / Color Signals`, with a hero channel carousel, universe intro, character channels, channel map, lore archive, and future-drops ending.

**Architecture:** Keep the app as a Vite + React single-page experience. Move character/world content into a dedicated data module, then split the page into focused section components so each section owns one visual and content responsibility. Preserve the current carousel and detail modal behavior while expanding the page below the hero.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, lucide-react, local WebP assets in `public/figurines`.

---

## File Structure

Create:

- `src/data/toonhub.ts`  
  Owns all TOONHUB content: characters, channel metadata, universe copy, season copy, and future-drops copy.

- `src/components/HeroSection.tsx`  
  Owns the current full-screen hero carousel, character positioning, click-to-select behavior, and detail modal wiring.

- `src/components/CharacterDetailModal.tsx`  
  Owns the archive/detail card shown by `DISCOVER IT`.

- `src/components/UniverseIntro.tsx`  
  Owns the short brand-world introduction after the hero.

- `src/components/SeasonSection.tsx`  
  Owns the `Season 01 / Color Signals` explanation.

- `src/components/CharacterChannels.tsx`  
  Owns four channel cards and click-to-focus behavior.

- `src/components/ChannelMap.tsx`  
  Owns the abstract four-color channel map and click-to-focus behavior.

- `src/components/FutureDrops.tsx`  
  Owns the final `Next Signal Loading` section.

Modify:

- `src/App.tsx`  
  Becomes the page composer. It stores the active character index and passes data/callbacks to sections.

- `src/styles.css`  
  Adds global scroll behavior and any small shared page-level styles that are not practical as Tailwind classes.

Do not create:

- Routing
- Login
- Shopping cart
- Backend/API
- CMS/admin panel
- Complex 3D viewer

## Shared Data Shape

Use this TypeScript shape in `src/data/toonhub.ts`:

```ts
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
```

Character data should include:

```ts
export const characters: ToonhubCharacter[] = [
  {
    src: '/figurines/figurine-1.webp',
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
    src: '/figurines/figurine-2.webp',
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
    src: '/figurines/figurine-3.webp',
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
    src: '/figurines/figurine-4.webp',
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
```

Also export:

```ts
export const universeIntro =
  'TOONHUB is a broadcast universe for toy-like 3D characters. Every figure carries a color signal, a mood, and a tiny legend from its own channel.';

export const seasonTitle = 'Season 01: Color Signals';

export const seasonCopy =
  'The first TOONHUB season opens four base channels: orange, mint, pink, and sky. Each signal introduces a different personality, role, and color rhythm inside the same character universe.';
```

## Task 1: Extract TOONHUB Data

**Files:**

- Create: `src/data/toonhub.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the data module**

Create `src/data/toonhub.ts` with the `ToonhubCharacter` type, `characters`, `universeIntro`, `seasonTitle`, and `seasonCopy` exactly as described in the Shared Data Shape section.

- [ ] **Step 2: Import data into `App.tsx`**

In `src/App.tsx`, remove the local `IMAGES` constant and import:

```ts
import { characters } from './data/toonhub';
```

Replace all `IMAGES` references with `characters`.

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build complete with exit code 0.

- [ ] **Step 4: Browser verify**

Open `http://127.0.0.1:5174/`, refresh, and verify:

- The hero still renders.
- Clicking a side character still switches the active character.
- `DISCOVER IT` still opens the detail card.
- The console has no error or warn entries.

## Task 2: Split Hero and Detail Modal

**Files:**

- Create: `src/components/HeroSection.tsx`
- Create: `src/components/CharacterDetailModal.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `CharacterDetailModal.tsx`**

Move the current detail modal JSX into `src/components/CharacterDetailModal.tsx`.

Use this component signature:

```ts
import { X } from 'lucide-react';
import type { ToonhubCharacter } from '../data/toonhub';

type CharacterDetailModalProps = {
  character: ToonhubCharacter;
  onClose: () => void;
};

export function CharacterDetailModal({ character, onClose }: CharacterDetailModalProps) {
  return <section aria-label={`${character.name} artwork details`}>{/* migrate the current detail card JSX here */}</section>;
}
```

The modal must display:

- `character.code`
- `character.channel`
- `character.signal`
- `character.name`
- `character.concept`
- `character.medium`
- `character.palette`
- `character.finish`
- `character.role`
- `character.origin`
- `character.quote`
- `character.notes`
- `character.keywords`

- [ ] **Step 2: Create `HeroSection.tsx`**

Move the hero carousel JSX into `src/components/HeroSection.tsx`.

Use this component signature:

```ts
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ToonhubCharacter } from '../data/toonhub';
import { CharacterDetailModal } from './CharacterDetailModal';

type HeroSectionProps = {
  characters: ToonhubCharacter[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

export function HeroSection({ characters, activeIndex, onActiveIndexChange }: HeroSectionProps) {
  return <section aria-label="TOONHUB signal carousel">{/* migrate the current hero carousel JSX here */}</section>;
}
```

Keep hero-local state:

- `isAnimating`
- `isMobile`
- `isDetailOpen`

Keep the current role calculation and character positioning behavior.

- [ ] **Step 3: Reduce `App.tsx` to page composition**

`App.tsx` should store:

```ts
const [activeIndex, setActiveIndex] = useState(0);
```

Render:

```tsx
<HeroSection
  characters={characters}
  activeIndex={activeIndex}
  onActiveIndexChange={setActiveIndex}
/>
```

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: build passes with exit code 0.

- [ ] **Step 5: Browser verify**

Verify:

- Hero visual matches before the split.
- Character switching still works.
- Detail modal opens and closes.
- Detail modal right column can scroll to the final keyword.
- Console has no error or warn entries.

## Task 3: Add Universe Intro and Season Section

**Files:**

- Create: `src/components/UniverseIntro.tsx`
- Create: `src/components/SeasonSection.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Create `UniverseIntro.tsx`**

Create a full-width section immediately after the hero.

Component signature:

```ts
type UniverseIntroProps = {
  copy: string;
};

export function UniverseIntro({ copy }: UniverseIntroProps) {
  return (
    <section className="bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">Universe Signal</p>
        <h2
          className="max-w-4xl uppercase"
          style={{
            fontFamily: \"'Anton', sans-serif\",
            fontSize: 'clamp(44px, 8vw, 120px)',
            lineHeight: 0.95,
          }}
        >
          A broadcast universe for toy-like 3D characters.
        </h2>
        <div className="sm:col-start-2">
          <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-xl">{copy}</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `SeasonSection.tsx`**

Component signature:

```ts
type SeasonSectionProps = {
  title: string;
  copy: string;
};

export function SeasonSection({ title, copy }: SeasonSectionProps) {
  return (
    <section className="bg-white px-5 py-20 text-neutral-950 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">Season File</p>
        <div className="grid gap-8 sm:grid-cols-[0.95fr_1.05fr] sm:items-start">
          <h2
            className="uppercase"
            style={{
              fontFamily: \"'Anton', sans-serif\",
              fontSize: 'clamp(54px, 10vw, 150px)',
              lineHeight: 0.9,
            }}
          >
            {title}
          </h2>
          <p className="max-w-xl text-lg leading-8 text-neutral-600">{copy}</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Compose sections in `App.tsx`**

After `HeroSection`, render:

```tsx
<UniverseIntro copy={universeIntro} />
<SeasonSection title={seasonTitle} copy={seasonCopy} />
```

Import these from `src/data/toonhub.ts`:

```ts
import { characters, seasonCopy, seasonTitle, universeIntro } from './data/toonhub';
```

- [ ] **Step 4: Update `src/styles.css`**

Change body scrolling from hidden to normal:

```css
body {
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  text-wrap: pretty;
}
```

Add:

```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 5: Run build and browser verify**

Run:

```bash
npm run build
```

Expected: build passes.

Browser checks:

- User can scroll below the hero.
- Universe Intro appears directly after hero.
- Season section appears after Universe Intro.
- Hero still fills the first viewport.
- No text overlaps on mobile-width and desktop-width viewports.

## Task 4: Add Character Channels Section

**Files:**

- Create: `src/components/CharacterChannels.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `CharacterChannels.tsx`**

Component signature:

```ts
import type { ToonhubCharacter } from '../data/toonhub';

type CharacterChannelsProps = {
  characters: ToonhubCharacter[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CharacterChannels({ characters, activeIndex, onSelect }: CharacterChannelsProps) {
  return (
    <section className="bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Character Channels</p>
            <h2
              className="uppercase"
              style={{
                fontFamily: \"'Anton', sans-serif\",
                fontSize: 'clamp(48px, 8vw, 112px)',
                lineHeight: 0.92,
              }}
            >
              Four signals online
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/58">
            Each channel carries a different color, personality, and role inside the first TOONHUB season.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character, index) => (
            <button
              key={character.code}
              type="button"
              onClick={() => onSelect(index)}
              className="min-h-[310px] rounded-[8px] border border-white/12 p-5 text-left transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: character.bg }}
            >
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white/75">{character.channel}</p>
              <h3
                className="mb-4 uppercase text-white"
                style={{
                  fontFamily: \"'Anton', sans-serif\",
                  fontSize: 'clamp(36px, 5vw, 58px)',
                  lineHeight: 0.9,
                }}
              >
                {character.name}
              </h3>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-white/80">{character.signal}</p>
              <p className="text-sm leading-6 text-white/82">{character.role}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {character.personality.map((trait) => (
                  <span key={trait} className="rounded-full border border-white/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    {trait}
                  </span>
                ))}
              </div>
              {activeIndex === index && (
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Current signal</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Compose section in `App.tsx`**

Render after `SeasonSection`:

```tsx
<CharacterChannels
  characters={characters}
  activeIndex={activeIndex}
  onSelect={setActiveIndex}
/>
```

- [ ] **Step 3: Run build and browser verify**

Run:

```bash
npm run build
```

Browser checks:

- Four channel cards render.
- Clicking a card updates the active hero character if the user scrolls back to the hero.
- Cards fit without horizontal overflow on mobile and desktop.
- Console has no error or warn entries.

## Task 5: Add Channel Map

**Files:**

- Create: `src/components/ChannelMap.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `ChannelMap.tsx`**

Component signature:

```ts
import type { ToonhubCharacter } from '../data/toonhub';

type ChannelMapProps = {
  characters: ToonhubCharacter[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ChannelMap({ characters, activeIndex, onSelect }: ChannelMapProps) {
  return (
    <section className="bg-white px-5 py-20 text-neutral-950 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">Channel Map</p>
            <h2
              className="uppercase"
              style={{
                fontFamily: \"'Anton', sans-serif\",
                fontSize: 'clamp(48px, 8vw, 112px)',
                lineHeight: 0.92,
              }}
            >
              Signal network
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-neutral-600">
            The first TOONHUB universe is mapped as four color frequencies. Select a field to tune into its character.
          </p>
        </div>
        <div className="grid min-h-[520px] overflow-hidden rounded-[8px] border border-neutral-200 sm:grid-cols-2">
          {characters.map((character, index) => (
            <button
              key={character.code}
              type="button"
              onClick={() => onSelect(index)}
              className="relative min-h-[220px] overflow-hidden p-6 text-left text-white transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
              style={{ backgroundColor: character.bg }}
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-white/70">{character.channel}</p>
              <h3
                className="uppercase"
                style={{
                  fontFamily: \"'Anton', sans-serif\",
                  fontSize: 'clamp(42px, 7vw, 92px)',
                  lineHeight: 0.88,
                }}
              >
                {character.signal}
              </h3>
              <p className="absolute bottom-6 left-6 max-w-xs text-sm leading-6 text-white/75">{character.origin}</p>
              {activeIndex === index && (
                <span className="absolute right-6 top-6 rounded-full border border-white/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Tuned
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Compose section in `App.tsx`**

Render after `CharacterChannels`:

```tsx
<ChannelMap
  characters={characters}
  activeIndex={activeIndex}
  onSelect={setActiveIndex}
/>
```

- [ ] **Step 3: Run build and browser verify**

Run:

```bash
npm run build
```

Browser checks:

- Channel map displays four color fields.
- Clicking a field updates active character state.
- No visible text overflows its color field on mobile or desktop.
- Console has no error or warn entries.

## Task 6: Upgrade Detail Modal Lore Fields

**Files:**

- Modify: `src/components/CharacterDetailModal.tsx`

- [ ] **Step 1: Add lore fields to the modal body**

In the detail modal specification grid, include:

```tsx
['Channel', `${character.channel} / ${character.signal}`],
['Origin', character.origin],
['Role', character.role],
['Finish', character.finish],
```

Below `Design Notes`, add a quote block:

```tsx
<blockquote className="mt-8 border-l-4 border-neutral-950 pl-5 text-xl font-semibold leading-8 text-neutral-950">
  “{character.quote}”
</blockquote>
```

- [ ] **Step 2: Preserve current archive content**

Keep the current archive elements:

- hero image
- code label
- heading
- concept
- medium
- palette
- notes
- keywords
- close button

- [ ] **Step 3: Run build and browser verify**

Run:

```bash
npm run build
```

Browser checks:

- Detail modal opens for each character.
- Modal displays channel, origin, role, quote, and keywords.
- Right panel scrolls to bottom.
- Close button closes modal.
- Console has no error or warn entries.

## Task 7: Add Future Drops Ending

**Files:**

- Create: `src/components/FutureDrops.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `FutureDrops.tsx`**

Component:

```ts
export function FutureDrops() {
  return (
    <section className="bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1fr_1fr] sm:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Future Drops</p>
          <h2
            className="uppercase"
            style={{
              fontFamily: \"'Anton', sans-serif\",
              fontSize: 'clamp(56px, 11vw, 170px)',
              lineHeight: 0.88,
            }}
          >
            Next signal loading
          </h2>
        </div>
        <div>
          <p className="mb-8 max-w-lg text-lg leading-8 text-white/70">
            New channels will open soon. The first four signals are only the beginning of the TOONHUB universe.
          </p>
          <div className="grid gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white/55">
            <span>Follow the broadcast</span>
            <span>New characters pending</span>
            <span>Season 02 offline</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Compose section in `App.tsx`**

Render after `ChannelMap`:

```tsx
<FutureDrops />
```

- [ ] **Step 3: Run build and browser verify**

Run:

```bash
npm run build
```

Browser checks:

- Future Drops appears at the bottom.
- The page can scroll from hero to ending.
- No mobile text overlap.
- Console has no error or warn entries.

## Task 8: Full Acceptance Verification

**Files:**

- No code changes unless verification reveals a defect.

- [ ] **Step 1: Production build**

Run:

```bash
npm run build
```

Expected: exit code 0.

- [ ] **Step 2: Desktop browser verification**

Open the local dev or preview URL and verify at desktop width:

- Hero fills first viewport.
- Clicking side characters changes active hero.
- `DISCOVER IT` opens the correct character detail.
- Detail modal scrolls to bottom.
- Universe Intro appears.
- Season section appears.
- Character Channels appears.
- Channel Map appears.
- Future Drops appears.
- No incoherent text overlap.
- Console has no error or warn entries.

- [ ] **Step 3: Mobile browser verification**

Use a mobile-width viewport and verify:

- Hero content remains readable.
- Character art is not cropped in a broken way.
- Sections stack vertically.
- Cards do not overflow horizontally.
- Detail modal content can scroll.
- Buttons are tappable.
- Console has no error or warn entries.

- [ ] **Step 4: Scope check**

Confirm the implementation did not add:

- Routing
- Login
- Shopping cart
- Backend/API
- CMS/admin panel
- Complex 3D viewer

## Plan Self-Review

Spec coverage:

- Hero / Signal Carousel: Task 2
- Universe Intro: Task 3
- Season 01 / Color Signals: Task 3
- Character Channels: Task 4
- Channel Map: Task 5
- Archive / Lore Cards: Task 6
- Future Drops: Task 7
- Full acceptance verification: Task 8

Red-flag scan:

- No unfinished feature sections are intentionally left in this plan.

Type consistency:

- Character data type is defined once as `ToonhubCharacter`.
- Components consistently accept `ToonhubCharacter[]`, `activeIndex`, and `onSelect` or `onActiveIndexChange`.
- The detail modal consistently receives one `ToonhubCharacter`.
