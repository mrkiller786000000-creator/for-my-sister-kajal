import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import StarfieldCanvas from './components/StarfieldCanvas';
import OpeningScreen from './components/OpeningScreen';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import LetterSection from './components/LetterSection';
import BondTimeline from './components/BondTimeline';
import MemoryGallery from './components/MemoryGallery';
import SurpriseModal from './components/SurpriseModal';
import NightSkyEnding from './components/NightSkyEnding';

export default function App() {
  const [showOpening, setShowOpening] = useState<boolean>(true);
  const [shootingStarTrigger, setShootingStarTrigger] = useState<number>(0);

  const handleOpenSurprise = () => {
    setShowOpening(false);
  };

  const handleReplayOpening = () => {
    setShowOpening(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMakeWish = () => {
    setShootingStarTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-[#050611] text-slate-100 overflow-x-hidden font-sans">
      {/* Background Starfield & Floating Particles Canvas */}
      <StarfieldCanvas shootingStarTrigger={shootingStarTrigger} />

      {/* Opening Screen Overlay */}
      <AnimatePresence>
        {showOpening && (
          <OpeningScreen onOpenSurprise={handleOpenSurprise} />
        )}
      </AnimatePresence>

      {/* Main Website Experience */}
      {!showOpening && (
        <motion.div
          id="main-birthday-experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 flex flex-col"
        >
          {/* Floating Ambient Music Controller */}
          <MusicPlayer />

          {/* Hero Section */}
          <HeroSection onWishTrigger={handleMakeWish} />

          {/* Emotional Message Letter Section */}
          <LetterSection />

          {/* "Our Bond" Milestone Timeline */}
          <BondTimeline />

          {/* Memories & Photo Gallery Section */}
          <MemoryGallery />

          {/* Birthday Surprise Reveal Button & Modal */}
          <SurpriseModal />

          {/* Final Night-Sky Ending & "Make a Wish" Section */}
          <NightSkyEnding
            onMakeWish={handleMakeWish}
            onReplayOpening={handleReplayOpening}
          />
        </motion.div>
      )}
    </div>
  );
}
