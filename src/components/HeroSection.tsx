import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Flame, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ambientMusic } from '../utils/audio';

interface HeroSectionProps {
  onWishTrigger?: () => void;
}

export default function HeroSection({ onWishTrigger }: HeroSectionProps) {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [blownCount, setBlownCount] = useState<number>(0);

  const handleBlowCandles = () => {
    if (!candlesLit) {
      setCandlesLit(true);
      return;
    }

    setCandlesLit(false);
    setBlownCount(prev => prev + 1);

    // Audio chime
    ambientMusic.playWishChime();

    // Trigger celebratory confetti
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 60,
      origin: { x: 0.3, y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#c084fc'],
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 60,
      origin: { x: 0.7, y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#60a5fa'],
    });

    if (onWishTrigger) {
      onWishTrigger();
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 text-center overflow-hidden"
    >
      {/* Background ambient lighting orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-br from-pink-600/15 via-purple-600/20 to-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* 2026 Live Celebration Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-medium tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(245,197,66,0.2)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span className="text-amber-300 font-display">✦ 2026 SPECIAL CELEBRATION ✦</span>
        <span className="text-pink-300 font-sans text-[11px] hidden sm:inline border-l border-white/20 pl-2">
          Sister of My Heart
        </span>
      </motion.div>

      {/* Hero Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          <span>Happy Birthday, </span>
          <span className="block mt-2 font-display bg-gradient-to-r from-amber-200 via-pink-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(244,114,182,0.45)]">
            Kajal 🎂✨
          </span>
        </h1>

        {/* Subtitle Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-serif italic text-lg sm:text-2xl md:text-3xl text-pink-100/90 font-light max-w-2xl mx-auto leading-relaxed mt-4 mb-10"
        >
          “You may not be my sister by blood,
          <br />
          <span className="text-amber-200 font-normal">
            but you will always be my sister by heart.”
          </span>
        </motion.p>
      </motion.div>

      {/* Interactive 3D-styled Birthday Cake */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.7 }}
        className="relative my-4 flex flex-col items-center select-none"
      >
        {/* Cake container */}
        <div className="relative w-64 sm:w-72 h-52 sm:h-56 flex flex-col items-center justify-end">
          {/* Candles */}
          <div className="absolute top-2 flex items-end justify-center gap-6 sm:gap-8 z-20">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame */}
                {candlesLit ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 0.95, 1.05, 1],
                      rotate: [0, 2, -2, 1, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2 + i * 0.2,
                      ease: 'easeInOut',
                    }}
                    className="relative cursor-pointer"
                    onClick={handleBlowCandles}
                    title="Click to blow out candles!"
                  >
                    <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_15px_#f59e0b,0_0_28px_#fbbf24] animate-flame" />
                    <div className="absolute inset-0 w-2 h-3 mx-auto mt-1 rounded-full bg-blue-300/60 blur-[1px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1.5 }}
                    className="w-1.5 h-4 bg-slate-400/40 rounded-full blur-[2px]"
                  />
                )}

                {/* Candle Stick */}
                <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-b from-amber-200 via-pink-300 to-purple-400 border-x border-amber-300/40 shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Tier */}
          <div className="relative z-10 w-40 sm:w-44 h-16 rounded-t-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 shadow-[0_4px_25px_rgba(244,114,182,0.4)] border-t border-x border-pink-300/40 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-amber-100 via-pink-100 to-amber-100 rounded-b-xl opacity-90 shadow-sm" />
            <span className="font-display font-semibold text-xs tracking-widest text-white/95 drop-shadow-md pt-2">
              KAJAL
            </span>
          </div>

          {/* Middle Decorative Ring */}
          <div className="w-48 sm:w-52 h-2 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 rounded-full shadow-md z-15" />

          {/* Bottom Tier */}
          <div className="relative w-56 sm:w-64 h-22 rounded-t-2xl bg-gradient-to-r from-purple-800 via-pink-700 to-purple-900 border-t border-x border-pink-400/30 shadow-[0_12px_35px_rgba(15,8,30,0.8)] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 rounded-b-xl opacity-80" />
            <div className="flex items-center gap-3 pt-3 text-amber-200/90 text-xs font-serif italic">
              <span>✦</span>
              <span>2026 Special Year</span>
              <span>✦</span>
            </div>
          </div>

          {/* Cake Stand Base */}
          <div className="w-64 sm:w-72 h-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 shadow-[0_10px_30px_rgba(245,197,66,0.35)] border border-amber-300/50" />
          <div className="w-24 h-3 bg-gradient-to-b from-amber-300/90 to-amber-600/90 rounded-b-md" />
        </div>

        {/* Blow / Relight Interactive Button */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <button
            id="blow-candles-btn"
            onClick={handleBlowCandles}
            className={`group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
              candlesLit
                ? 'bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 hover:from-amber-500/40 hover:to-pink-500/40 border border-amber-400/50 text-amber-200 shadow-[0_0_20px_rgba(245,197,66,0.2)]'
                : 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-pink-400/50 text-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
            }`}
          >
            {candlesLit ? (
              <>
                <Flame className="w-4 h-4 text-amber-400 group-hover:scale-125 transition-transform" />
                <span>Make a Wish & Blow Candles 🎂</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-pink-300 group-hover:rotate-180 transition-transform duration-500" />
                <span>Candles Blown! Tap to Re-light 🔥</span>
              </>
            )}
          </button>

          {!candlesLit && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-amber-300/90 font-serif italic tracking-wide"
            >
              “Candles blown! May every wish in Kajal&apos;s heart come true this year.” ✨
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-12 text-slate-400/60 text-xs tracking-widest uppercase flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[10px]">Scroll For Your Letter</span>
        <div className="w-4 h-7 rounded-full border border-slate-500/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-pink-400 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
