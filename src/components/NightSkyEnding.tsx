import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ambientMusic } from '../utils/audio';

interface NightSkyEndingProps {
  onMakeWish: () => void;
  onReplayOpening: () => void;
}

export default function NightSkyEnding({ onMakeWish, onReplayOpening }: NightSkyEndingProps) {
  const [wished, setWished] = useState<boolean>(false);
  const [wishCount, setWishCount] = useState<number>(0);

  const handleMakeWish = () => {
    setWished(true);
    setWishCount((prev) => prev + 1);

    // Play chime sound
    ambientMusic.playWishChime();

    // Trigger external shooting star
    onMakeWish();

    // Release glowing confetti particles
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#fbbf24', '#f472b6', '#c084fc', '#ffffff', '#60a5fa'],
    });
  };

  return (
    <footer id="final-nightsky-section" className="relative pt-24 pb-20 px-4 sm:px-6 text-center overflow-hidden">
      {/* Deep celestial gradient aura */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020308] via-[#080a1c] to-transparent pointer-events-none -z-10" />

      {/* Radiant Golden Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-t from-amber-500/10 via-pink-600/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Heart icon badge */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-12 rounded-full glass-panel border border-amber-400/40 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(245,197,66,0.25)]"
        >
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400/80" />
        </motion.div>

        {/* The 3 emotional paused statements */}
        <div className="space-y-6 mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-2xl sm:text-3xl text-slate-300 font-light"
          >
            “Some sisters are given by birth.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif italic text-2xl sm:text-3xl text-slate-200 font-light"
          >
            “Some are given by life.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.8 }}
            className="pt-2"
          >
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-pink-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(244,114,182,0.4)] leading-snug">
              “And you&apos;re one of the best gifts life gave me.” ❤️
            </p>
          </motion.div>
        </div>

        {/* 2026 Celebration Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mb-10"
        >
          <p className="font-display tracking-widest text-lg sm:text-2xl text-amber-300/90 font-semibold uppercase">
            Happy Birthday, Kajal — 2026 ✨
          </p>
          <p className="text-xs text-pink-300/70 tracking-widest uppercase mt-1 font-mono">
            Chosen by the Heart • Cherished for Life
          </p>
        </motion.div>

        {/* Glowing Make a Wish Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col items-center"
        >
          <button
            id="make-a-wish-btn"
            onClick={handleMakeWish}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(245,197,66,0.6)] hover:shadow-[0_0_50px_rgba(245,197,66,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <Star className="w-5 h-5 text-slate-950 fill-slate-950 group-hover:rotate-45 transition-transform" />
            <span className="font-display tracking-wide">Make a Wish ⭐</span>
            <Sparkles className="w-4 h-4 text-slate-950 animate-bounce" />
          </button>

          {/* Wish Confirmation message */}
          <AnimatePresence>
            {wished && (
              <motion.div
                key={`wish-notif-${wishCount}`}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 p-4 rounded-2xl glass-panel border border-amber-400/50 shadow-[0_0_30px_rgba(245,197,66,0.3)] inline-flex flex-col items-center gap-1.5"
              >
                <div className="flex items-center gap-2 text-amber-300 font-serif text-lg font-medium">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Wish sent to the universe… ✨</span>
                </div>
                <p className="text-xs text-pink-200/90 font-light">
                  A shooting star has crossed the sky carrying your secret wish.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Replay Opening & Surprise Experience */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1">
            <span>Made with unconditional love for sister Kajal</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          </p>

          <button
            id="replay-experience-btn"
            onClick={onReplayOpening}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel-subtle hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
            <span>Replay Opening Experience ↺</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
