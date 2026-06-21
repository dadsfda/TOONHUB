import { useEffect, useRef, type CSSProperties } from 'react';

type CursorState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scale: number;
  targetScale: number;
};

const trailCount = 7;

export function CursorSignal() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const stateRef = useRef<CursorState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    scale: 0.85,
    targetScale: 0.85,
  });

  useEffect(() => {
    const element = cursorRef.current;
    const trail = trailRef.current;
    const trailElements = trailRefs.current.filter((trailElement): trailElement is HTMLSpanElement => Boolean(trailElement));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (!element || !trail || prefersReducedMotion || isCoarsePointer) return;

    let frame = 0;

    const setActiveTarget = (target: EventTarget | null) => {
      const interactiveElement = target instanceof Element ? target.closest<HTMLElement>('[data-cursor]') : null;
      const color = interactiveElement?.dataset.cursorColor || 'rgba(255,255,255,0.86)';

      stateRef.current.targetScale = interactiveElement ? 1.55 : 0.85;
      element.style.setProperty('--cursor-color', color);
      trail.style.setProperty('--cursor-color', color);
      element.dataset.active = interactiveElement ? 'true' : 'false';
      trail.dataset.active = interactiveElement ? 'true' : 'false';
    };

    const handlePointerMove = (event: PointerEvent) => {
      stateRef.current.targetX = event.clientX;
      stateRef.current.targetY = event.clientY;
      setActiveTarget(event.target);
      element.dataset.visible = 'true';
    };

    const handlePointerLeave = () => {
      element.dataset.visible = 'false';
      element.dataset.active = 'false';
      trail.dataset.active = 'false';
    };

    const animate = () => {
      const state = stateRef.current;

      state.x += (state.targetX - state.x) * 0.18;
      state.y += (state.targetY - state.y) * 0.18;
      state.scale += (state.targetScale - state.scale) * 0.16;

      element.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.scale})`;

      let followX = state.x;
      let followY = state.y;

      trailElements.forEach((trailElement, index) => {
        const speed = 0.2 - index * 0.015;
        const currentX = Number(trailElement.dataset.x || followX);
        const currentY = Number(trailElement.dataset.y || followY);
        const nextX = currentX + (followX - currentX) * speed;
        const nextY = currentY + (followY - currentY) * speed;
        const scale = 1 - index * 0.095;

        trailElement.dataset.x = String(nextX);
        trailElement.dataset.y = String(nextY);
        trailElement.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate(-50%, -50%) scale(${scale})`;
        followX = nextX;
        followY = nextY;
      });

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="cursor-trail" aria-hidden="true">
        {Array.from({ length: trailCount }, (_, index) => (
          <span
            key={index}
            ref={(element) => {
              trailRefs.current[index] = element;
            }}
            style={{ '--trail-index': index } as CSSProperties & Record<string, number>}
          />
        ))}
      </div>
      <div ref={cursorRef} className="cursor-signal" aria-hidden="true" />
    </>
  );
}
