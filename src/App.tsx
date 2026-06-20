import { useState } from 'react';
import { ChannelMap } from './components/ChannelMap';
import { CharacterChannels } from './components/CharacterChannels';
import { FutureDrops } from './components/FutureDrops';
import { HeroSection } from './components/HeroSection';
import { SeasonSection } from './components/SeasonSection';
import { UniverseIntro } from './components/UniverseIntro';
import { characters, seasonCopy, seasonTitle, universeIntro } from './data/toonhub';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <HeroSection characters={characters} activeIndex={activeIndex} onActiveIndexChange={setActiveIndex} />
      <UniverseIntro copy={universeIntro} />
      <SeasonSection title={seasonTitle} copy={seasonCopy} />
      <CharacterChannels characters={characters} activeIndex={activeIndex} onSelect={setActiveIndex} />
      <ChannelMap characters={characters} activeIndex={activeIndex} onSelect={setActiveIndex} />
      <FutureDrops />
    </div>
  );
}

export default App;
