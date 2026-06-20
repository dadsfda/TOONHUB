import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ToonhubCharacter } from '../data/toonhub';
import { CharacterDetailModal } from './CharacterDetailModal';

type HeroSectionProps = {
  characters: ToonhubCharacter[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

type Role = 'center' | 'left' | 'right' | 'back';

const transition = '650ms cubic-bezier(0.4,0,0.2,1)';
const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";
const readableTextShadow = '0 2px 14px rgba(88, 36, 20, 0.32)';

export function HeroSection({ characters, activeIndex, onActiveIndexChange }: HeroSectionProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const activeItem = characters[activeIndex];

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 640);

    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const roles = useMemo(
    () => ({
      center: activeIndex,
      left: (activeIndex + characters.length - 1) % characters.length,
      right: (activeIndex + 1) % characters.length,
      back: (activeIndex + 2) % characters.length,
    }),
    [activeIndex, characters.length],
  );

  const navigateTo = useCallback(
    (index: number) => {
      if (isAnimating || isDetailOpen || index === activeIndex) return;

      setIsAnimating(true);
      setIsDetailOpen(false);
      onActiveIndexChange(index);

      window.setTimeout(() => setIsAnimating(false), 650);
    },
    [activeIndex, isAnimating, isDetailOpen, onActiveIndexChange],
  );

  const getRole = (index: number): Role => {
    if (index === roles.center) return 'center';
    if (index === roles.left) return 'left';
    if (index === roles.right) return 'right';
    return 'back';
  };

  const getItemStyle = (role: Role): CSSProperties => {
    const sideHeight = isMobile ? '16%' : '28%';
    const sideBottom = isMobile ? '32%' : '12%';

    const shared: CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      transition: `transform ${transition}, filter ${transition}, opacity ${transition}, left ${transition}`,
      willChange: 'transform, filter, opacity',
    };

    if (role === 'center') {
      return {
        ...shared,
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : 0,
      };
    }

    if (role === 'left' || role === 'right') {
      return {
        ...shared,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: role === 'left' ? (isMobile ? '20%' : '30%') : isMobile ? '80%' : '70%',
        height: sideHeight,
        bottom: sideBottom,
      };
    }

    return {
      ...shared,
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(4px)',
      opacity: 1,
      zIndex: 5,
      left: '50%',
      height: isMobile ? '13%' : '22%',
      bottom: sideBottom,
    };
  };

  return (
    <section
      aria-label="TOONHUB signal carousel"
      className="relative w-full overflow-hidden"
      style={{
        height: '100vh',
        backgroundColor: activeItem.bg,
        transition: `background-color ${transition}`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 50,
          opacity: 0.4,
          backgroundImage: grainSvg,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      <div
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 2, top: isMobile ? '8%' : '4%' }}
      >
        <div
          className="uppercase text-white"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: isMobile ? 'clamp(82px, 38vw, 180px)' : 'clamp(120px, 24vw, 300px)',
            fontWeight: 900,
            opacity: 1,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          TOONHUB
        </div>
      </div>

      <div
        className="absolute top-6 left-4 text-xs font-semibold uppercase text-white sm:left-8"
        style={{ zIndex: 60, opacity: 0.9, letterSpacing: '0.18em' }}
      >
        TOONHUB
      </div>

      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {characters.map((character, index) => (
          <div
            key={character.src}
            onClick={() => navigateTo(index)}
            style={{
              ...getItemStyle(getRole(index)),
              cursor: !isMobile && getRole(index) !== 'center' ? 'pointer' : 'default',
              pointerEvents: getRole(index) === 'center' ? 'none' : 'auto',
            }}
          >
            <img
              src={character.src}
              alt=""
              draggable={false}
              decoding="async"
              fetchPriority={getRole(index) === 'center' ? 'high' : 'auto'}
              loading={getRole(index) === 'center' ? 'eager' : 'lazy'}
              className="block"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center',
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
        style={{ zIndex: 60, maxWidth: 320, textShadow: readableTextShadow, pointerEvents: 'none' }}
      >
        <p
          className="mb-2 text-base font-bold uppercase tracking-widest text-white sm:mb-3 sm:text-[22px]"
          style={{ opacity: 0.95, letterSpacing: '0.02em' }}
        >
          {activeItem.name}
        </p>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/85 sm:mb-3">
          {activeItem.channel} / {activeItem.signal}
        </p>
        <p className="mb-4 hidden text-xs text-white sm:mb-5 sm:block sm:text-sm" style={{ opacity: 0.85, lineHeight: 1.6 }}>
          {activeItem.concept}
        </p>
        <div className="mb-4 hidden items-center gap-2 text-[10px] font-bold uppercase text-white/85 sm:flex">
          <span>{activeItem.type}</span>
          <span className="h-1 w-1 rounded-full bg-white/70" />
          <span>{activeItem.year}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsDetailOpen(true)}
        className="absolute bottom-6 right-4 flex items-center border-0 bg-transparent p-0 uppercase text-white transition-opacity duration-200 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:bottom-20 sm:right-10"
        style={{
          zIndex: 60,
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(20px, 4vw, 56px)',
          fontWeight: 400,
          opacity: 0.95,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        <span>DISCOVER IT</span>
        <ArrowRight className="ml-2 h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
      </button>

      {isDetailOpen && <CharacterDetailModal character={activeItem} onClose={() => setIsDetailOpen(false)} />}
    </section>
  );
}
