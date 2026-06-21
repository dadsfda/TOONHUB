# TOONHUB Scroll Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the current TOONHUB single-page site into a lightweight scroll-driven channel-broadcast experience inspired by the pacing of `vanessadean.de`, without copying its assets or adding heavy animation dependencies.

**Architecture:** Keep the existing Vite + React + Tailwind single page and component split. Add one reusable IntersectionObserver hook, then apply CSS-driven reveal, signal, scan, and pulse classes to the existing sections. Avoid GSAP for this phase; use CSS animations plus scroll-triggered class changes.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, CSS animations, IntersectionObserver, local WebP assets.

---

## File Structure

Create:

- `src/hooks/useInView.ts`  
  Owns the reusable IntersectionObserver logic for one-time section reveal.

Modify:

- `src/components/HeroSection.tsx`  
  Adds first-load hero motion classes and active character text refresh animation.

- `src/components/UniverseIntro.tsx`  
  Adds section reveal and signal background layers.

- `src/components/SeasonSection.tsx`  
  Adds reveal flow and four channel color indicators.

- `src/components/CharacterChannels.tsx`  
  Adds staggered card reveal and active signal pulse.

- `src/components/ChannelMap.tsx`  
  Adds signal-field visuals and stronger tuned state.

- `src/components/FutureDrops.tsx`  
  Adds ending reveal, scan title, and loading signal background.

- `src/styles.css`  
  Adds reusable motion classes, signal backgrounds, keyframes, and reduced-motion handling.

Do not modify:

- `src/data/toonhub.ts`
- `src/components/CharacterDetailModal.tsx`
- package dependencies

Do not add:

- GSAP
- routing
- backend/API
- login
- shopping cart
- CMS/admin panel
- generated background images in this phase

## Shared Motion Conventions

Use these class names consistently:

- `motion-reveal`: element starts hidden/slightly shifted.
- `motion-reveal is-visible`: element is visible.
- `motion-delay-1`, `motion-delay-2`, `motion-delay-3`, `motion-delay-4`: stagger delays.
- `signal-scan`: low-opacity scanline overlay.
- `signal-field`: animated color field background.
- `signal-pulse`: active channel pulse.
- `scan-title`: title with subtle scan highlight.

All continuous animation must be disabled under `prefers-reduced-motion: reduce`.

## Task 1: Add Reusable In-View Hook

**Files:**

- Create: `src/hooks/useInView.ts`

- [ ] **Step 1: Create the hook file**

Create `src/hooks/useInView.ts` with:

```ts
import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useInView<T extends HTMLElement>({ rootMargin = '0px 0px -12% 0px', threshold = 0.2 }: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || isInView) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isInView, rootMargin, threshold]);

  return { ref, isInView };
}
```

- [ ] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

## Task 2: Add Global Motion CSS

**Files:**

- Modify: `src/styles.css`

- [ ] **Step 1: Append motion and signal CSS**

Append this block after the existing `button, a` rule:

```css
.motion-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 720ms ease,
    transform 720ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 720ms ease;
  will-change: opacity, transform, filter;
}

.motion-reveal.is-visible,
.is-visible .motion-reveal {
  opacity: 1;
  transform: translateY(0);
}

.motion-delay-1 {
  transition-delay: 90ms;
}

.motion-delay-2 {
  transition-delay: 180ms;
}

.motion-delay-3 {
  transition-delay: 270ms;
}

.motion-delay-4 {
  transition-delay: 360ms;
}

.hero-enter-title {
  animation: heroTitleIn 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-enter-character {
  animation: heroCharacterIn 950ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-enter-copy {
  animation: heroCopyIn 820ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-active-copy {
  animation: activeCopyRefresh 420ms ease both;
}

.signal-scan,
.signal-field {
  position: relative;
  overflow: hidden;
}

.signal-scan::before,
.signal-field::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.signal-scan::before {
  z-index: 0;
  opacity: 0.28;
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 9px);
  background-size: 180% 100%, 100% 12px;
  animation: signalScan 7s linear infinite;
}

.signal-field::before {
  z-index: 0;
  opacity: 0.34;
  background:
    radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.38), transparent 28%),
    radial-gradient(circle at 78% 68%, rgba(255, 255, 255, 0.18), transparent 34%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0 1px, transparent 1px 18px);
  animation: signalDrift 9s ease-in-out infinite alternate;
}

.signal-pulse {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.52),
    0 0 42px rgba(255, 255, 255, 0.22);
  animation: signalPulse 1800ms ease-in-out infinite;
}

.scan-title {
  position: relative;
  display: inline-block;
}

.scan-title::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(100deg, transparent 25%, rgba(255, 255, 255, 0.34) 48%, transparent 70%);
  mix-blend-mode: screen;
  transform: translateX(-120%);
  animation: titleScan 3200ms ease-in-out infinite;
}

.motion-content {
  position: relative;
  z-index: 1;
}

@keyframes heroTitleIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(18px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes heroCharacterIn {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translateX(-50%) scale(1.82);
  }

  to {
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes heroCopyIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes activeCopyRefresh {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes signalScan {
  from {
    background-position: 180% 0, 0 0;
  }

  to {
    background-position: -180% 0, 0 96px;
  }
}

@keyframes signalDrift {
  from {
    transform: translate3d(-2%, -1%, 0) scale(1);
  }

  to {
    transform: translate3d(2%, 1%, 0) scale(1.04);
  }
}

@keyframes signalPulse {
  0%,
  100% {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.44),
      0 0 30px rgba(255, 255, 255, 0.16);
  }

  50% {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.7),
      0 0 58px rgba(255, 255, 255, 0.32);
  }
}

@keyframes titleScan {
  0%,
  42% {
    transform: translateX(-120%);
  }

  72%,
  100% {
    transform: translateX(120%);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }

  .motion-reveal {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

## Task 3: Add Hero Entrance Motion

**Files:**

- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Add hero motion classes**

Update the hero title wrapper `div` that currently has `className="uppercase text-white"` to:

```tsx
className="hero-enter-title uppercase text-white"
```

Update the mapped character wrapper `div` class by adding:

```tsx
className={getRole(index) === 'center' ? 'hero-enter-character' : undefined}
```

Keep the existing inline `style` object unchanged.

- [ ] **Step 2: Add active copy animation key**

Update the left text block:

```tsx
<div
  key={activeItem.code}
  className="hero-active-copy"
  style={{ zIndex: 60, maxWidth: 320, textShadow: readableTextShadow, pointerEvents: 'none' }}
>
```

The wrapping absolute positioning must remain on the same element. If adding `key` directly to that element causes a TypeScript or layout issue, wrap the inner text content in a child:

```tsx
<div key={activeItem.code} className="hero-active-copy">
  {/* existing active character text */}
</div>
```

- [ ] **Step 3: Add discover button entrance class**

Update the `DISCOVER IT` button class list to include:

```tsx
hero-enter-copy motion-delay-3
```

The full class should remain an absolute positioned transparent text button.

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

- [ ] **Step 5: Browser verify hero**

Open `http://127.0.0.1:5174/` and verify:

- Hero still fills the first viewport.
- `TOONHUB` is visible.
- Current character image is visible.
- Clicking side characters still changes active character.
- `DISCOVER IT` still opens the detail modal.
- Console has no error or warn entries.

## Task 4: Animate Universe Intro

**Files:**

- Modify: `src/components/UniverseIntro.tsx`

- [ ] **Step 1: Import hook**

At the top of the file, add:

```ts
import { useInView } from '../hooks/useInView';
```

- [ ] **Step 2: Use the hook**

Inside `UniverseIntro`, before the return statement, add:

```ts
const { ref, isInView } = useInView<HTMLElement>();
```

- [ ] **Step 3: Update the section**

Change the section opening tag to:

```tsx
<section
  ref={ref}
  className={`signal-scan bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28 ${isInView ? 'is-visible' : ''}`}
>
```

Change the inner wrapper to:

```tsx
<div className="motion-content mx-auto grid max-w-6xl gap-10 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
```

Add motion classes:

```tsx
<p className="motion-reveal text-xs font-bold uppercase tracking-[0.28em] text-white/50">Universe Signal</p>
```

```tsx
<h2 className="motion-reveal motion-delay-1 max-w-4xl uppercase" ...>
```

```tsx
<div className="motion-reveal motion-delay-2 sm:col-start-2">
```

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

## Task 5: Animate Season File

**Files:**

- Modify: `src/components/SeasonSection.tsx`

- [ ] **Step 1: Import hook**

At the top of the file, add:

```ts
import { useInView } from '../hooks/useInView';
```

- [ ] **Step 2: Use the hook**

Inside `SeasonSection`, before the return statement, add:

```ts
const { ref, isInView } = useInView<HTMLElement>();
```

- [ ] **Step 3: Update section and existing content classes**

Change the section opening tag to:

```tsx
<section
  ref={ref}
  className={`bg-white px-5 py-20 text-neutral-950 sm:px-10 sm:py-28 ${isInView ? 'is-visible' : ''}`}
>
```

Change the label to:

```tsx
<p className="motion-reveal mb-5 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">Season File</p>
```

Change the heading to:

```tsx
<h2 className="motion-reveal motion-delay-1 uppercase" ...>
```

Change the body paragraph to:

```tsx
<p className="motion-reveal motion-delay-2 max-w-xl text-lg leading-8 text-neutral-600">{copy}</p>
```

- [ ] **Step 4: Add channel indicator row**

After the paragraph, add:

```tsx
<div className="motion-reveal motion-delay-3 mt-8 grid grid-cols-4 gap-2">
  {['#F4845F', '#6BBF7A', '#E882B4', '#6EB5FF'].map((color, index) => (
    <span
      key={color}
      className="h-2 rounded-full"
      style={{ backgroundColor: color, transitionDelay: `${360 + index * 80}ms` }}
    />
  ))}
</div>
```

- [ ] **Step 5: Run build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

## Task 6: Animate Character Channels

**Files:**

- Modify: `src/components/CharacterChannels.tsx`

- [ ] **Step 1: Import hook**

Add below the existing type import:

```ts
import { useInView } from '../hooks/useInView';
```

- [ ] **Step 2: Use the hook**

Inside `CharacterChannels`, before the return statement, add:

```ts
const { ref, isInView } = useInView<HTMLElement>();
```

- [ ] **Step 3: Update section and heading content**

Change the section opening tag to:

```tsx
<section
  ref={ref}
  className={`bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28 ${isInView ? 'is-visible' : ''}`}
>
```

Add `motion-reveal` classes to the label, heading, and intro paragraph:

```tsx
<p className="motion-reveal mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Character Channels</p>
```

```tsx
<h2 className="motion-reveal motion-delay-1 uppercase" ...>
```

```tsx
<p className="motion-reveal motion-delay-2 max-w-md text-sm leading-7 text-white/58">
```

- [ ] **Step 4: Add stagger and pulse to cards**

Update each channel card button class to:

```tsx
className={`motion-reveal min-h-[310px] rounded-[8px] border p-5 text-left text-white transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
  activeIndex === index ? 'signal-pulse border-white/45' : 'border-white/12'
}`}
```

Add this inline style:

```tsx
style={{ backgroundColor: character.bg, transitionDelay: `${index * 90}ms` }}
```

Remove the previous `style={{ backgroundColor: character.bg }}` from the same button.

- [ ] **Step 5: Run build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

## Task 7: Animate Channel Map

**Files:**

- Modify: `src/components/ChannelMap.tsx`

- [ ] **Step 1: Import hook**

Add below the existing type import:

```ts
import { useInView } from '../hooks/useInView';
```

- [ ] **Step 2: Use the hook**

Inside `ChannelMap`, before the return statement, add:

```ts
const { ref, isInView } = useInView<HTMLElement>();
```

- [ ] **Step 3: Update section and heading classes**

Change the section opening tag to:

```tsx
<section
  ref={ref}
  className={`bg-white px-5 py-20 text-neutral-950 sm:px-10 sm:py-28 ${isInView ? 'is-visible' : ''}`}
>
```

Add motion classes to label, heading, and paragraph:

```tsx
<p className="motion-reveal mb-3 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">Channel Map</p>
```

```tsx
<h2 className="motion-reveal motion-delay-1 uppercase" ...>
```

```tsx
<p className="motion-reveal motion-delay-2 max-w-xl text-base leading-8 text-neutral-600">
```

- [ ] **Step 4: Update map wrapper and fields**

Change the map wrapper class to:

```tsx
<div className="motion-reveal motion-delay-3 grid min-h-[520px] overflow-hidden rounded-[8px] border border-neutral-200 sm:grid-cols-2">
```

Update each map button class to:

```tsx
className={`signal-field relative min-h-[220px] overflow-hidden p-6 text-left text-white transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 ${
  activeIndex === index ? 'signal-pulse' : ''
}`}
```

Wrap the existing button content in:

```tsx
<div className="motion-content">
  {/* existing p, h3, origin p, tuned span */}
</div>
```

Keep the origin paragraph absolutely positioned. If wrapping breaks absolute positioning, keep `motion-content` on individual text nodes instead.

- [ ] **Step 5: Run build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

## Task 8: Animate Future Drops

**Files:**

- Modify: `src/components/FutureDrops.tsx`

- [ ] **Step 1: Import hook**

At the top of the file, add:

```ts
import { useInView } from '../hooks/useInView';
```

- [ ] **Step 2: Use hook**

Inside `FutureDrops`, before the return statement, add:

```ts
const { ref, isInView } = useInView<HTMLElement>();
```

- [ ] **Step 3: Update section**

Change the section opening tag to:

```tsx
<section
  ref={ref}
  className={`signal-scan bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28 ${isInView ? 'is-visible' : ''}`}
>
```

Change the inner wrapper to:

```tsx
<div className="motion-content mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1fr_1fr] sm:items-end">
```

- [ ] **Step 4: Add reveal and scan classes**

Update:

```tsx
<p className="motion-reveal mb-4 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Future Drops</p>
```

```tsx
<h2 className="motion-reveal motion-delay-1 scan-title uppercase" ...>
```

```tsx
<p className="motion-reveal motion-delay-2 mb-8 max-w-lg text-lg leading-8 text-white/70">
```

Update the status grid:

```tsx
<div className="grid gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white/55">
  {['Follow the broadcast', 'New characters pending', 'Season 02 offline'].map((label, index) => (
    <span key={label} className={`motion-reveal motion-delay-${index + 2}`}>
      {label}
    </span>
  ))}
</div>
```

- [ ] **Step 5: Run build**

Run:

```bash
npm run build
```

Expected: build exits with code 0.

## Task 9: Full Acceptance Verification

**Files:**

- No code changes unless verification reveals a defect.

- [ ] **Step 1: Production build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build exit with code 0.

- [ ] **Step 2: Desktop browser verification**

Open `http://127.0.0.1:5174/` and verify at desktop width:

- Hero fills first viewport.
- Hero entry classes do not hide the title, character, left text, or `DISCOVER IT`.
- Clicking side characters changes active hero.
- `DISCOVER IT` opens the detail modal.
- Detail modal closes.
- Universe Intro, Season File, Character Channels, Channel Map, and Future Drops all appear while scrolling.
- Character channel cards reveal and keep click behavior.
- Channel Map click updates active state and `Tuned`.
- Page has no horizontal overflow.
- Console has no error or warn entries.

- [ ] **Step 3: Mobile browser verification**

Use a mobile viewport around `390x844` and verify:

- Hero text and `DISCOVER IT` do not overlap incoherently.
- Page has no horizontal overflow.
- Sections stack vertically.
- Cards and map buttons remain tappable.
- Detail modal opens and closes.
- Console has no error or warn entries.

- [ ] **Step 4: Reduced motion inspection**

Inspect `src/styles.css` and confirm the `@media (prefers-reduced-motion: reduce)` rule:

- disables long animation durations,
- prevents repeated continuous animation,
- leaves `.motion-reveal` content visible.

- [ ] **Step 5: Scope check**

Run:

```bash
rg -n "gsap|ScrollTrigger|react-router|router|login|cart|checkout|api|backend|cms|admin|three|webgl" src package.json
```

Expected: no matches.

## Plan Self-Review

Spec coverage:

- Hero entrance motion: Task 3.
- Scroll-triggered section reveal: Tasks 4-8.
- Character Channels stagger and pulse: Task 6.
- Channel Map signal field and tuned state: Task 7.
- Future Drops loading signal: Task 8.
- Reduced motion: Task 2 and Task 9.
- Build and desktop/mobile verification: Task 9.

Placeholder scan:

- No `TODO`, `TBD`, or undefined future steps are intentionally left in this plan.

Type consistency:

- `useInView<T extends HTMLElement>` returns `{ ref, isInView }`.
- All section components use `useInView<HTMLElement>()`.
- Existing `characters`, `activeIndex`, and `onSelect` props remain unchanged.

Commit note:

- The project instructions require explicit user confirmation before commits. Do not commit during execution unless the user explicitly says to commit.
