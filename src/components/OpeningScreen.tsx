import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ambientMusic } from '../utils/audio';

interface OpeningScreenProps {
  onOpenSurprise: () => void;
}

export default function OpeningScreen({ onOpenSurprise }: OpeningScreenProps) {
  // Step 0: "Some people enter your life by chance…"
  // Step 1: "…and somehow become family. ❤️"
  // Step 2: "KAJAL" + "Happy Birthday, Meri Pyaari Sister ✨" + "Open Your Surprise 🎁"
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 2800);

    const timer2 = setTimeout(() => {
      setStep(2);
    }, 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleOpen = () => {
    // Start ambient music on user gesture
    ambientMusic.start();

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#c084fc', '#60a5fa', '#ffffff'],
    });

    onOpenSurprise();
  };

  return (
    <motion.div
      id="opening-screen-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center bg-[#050611] overflow-hidden select-none"
    >
      {/* Dreamy radial glow backdrop */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-900/20 via-pink-600/15 to-amber-500/10 blur-3xl pointer-events-none animate-pulse" />

      {/* Floating subtle star sparkles */}
      <div className="absolute top-1/4 left-1/5 text-amber-200/40 animate-bounce">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute bottom-1/4 right-1/5 text-pink-300/40 animate-pulse">
        <Heart className="w-4 h-4 fill-pink-400/30" />
      </div>

      <div className="relative max-w-xl mx-auto w-full z-10 flex flex-col items-center min-h-[360px] justify-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/20 text-purple-300 text-xs tracking-wider uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                A Whisper To The Stars
              </div>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-200 font-light leading-relaxed tracking-wide">
                “Some people enter your life by chance…”
              </p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-200 font-light leading-relaxed mb-4">
                “…and somehow become family.”
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-pink-500 text-3xl"
              >
                ❤️
              </motion.div>
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm tracking-widest uppercase mb-4"
              >
                <span>✦</span>
                <span>NOT BY BLOOD • BUT BY HEART</span>
                <span>✦</span>
              </motion.div>

              <motion.h1
                initial={{ letterSpacing: '0.1em', opacity: 0 }}
                animate={{ letterSpacing: '0.22em', opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-200 via-pink-200 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,197,66,0.4)] my-2"
              >
                KAJAL
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.9 }}
                className="font-serif italic text-lg sm:text-2xl text-pink-200/90 font-light mt-2 mb-8 tracking-wide flex items-center gap-2"
              >
                <span>“Happy Birthday, Meri Pyaari Sister”</span>
                <span className="text-amber-300 not-italic">✨</span>
              </motion.p>

              <motion.button
                id="open-surprise-button"
                onClick={handleOpen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(244,114,182,0.6)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-medium text-base sm:text-lg shadow-[0_0_25px_rgba(236,72,153,0.45)] cursor-pointer overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Gift className="w-5 h-5 text-amber-200 animate-bounce" />
                <span className="relative z-10 font-semibold tracking-wide">Open Your Surprise 🎁</span>
                <ArrowRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button for fast preview or repeat visits */}
      {step < 2 && (
        <button
          id="skip-intro-btn"
          onClick={() => setStep(2)}
          className="absolute bottom-8 text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 tracking-widest transition-colors cursor-pointer"
        >
          Skip to surprise →
        </button>
      )}
    </motion.div>
  );
}
