import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, X, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ambientMusic } from '../utils/audio';

export default function SurpriseModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const openSurprise = () => {
    setIsOpen(true);
    setStep(0);
    ambientMusic.playWishChime();
  };

  const closeSurprise = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    // Automatic cinematic timing
    const timers = [
      setTimeout(() => setStep(1), 3200),
      setTimeout(() => setStep(2), 7000),
      setTimeout(() => {
        setStep(3);
        // Confetti burst on the grand reveal!
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#f472b6', '#a855f7', '#60a5fa', '#ffffff'],
        });
      }, 10800),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen]);

  const handleNext = () => {
    if (step < 3) {
      const nextStep = step + 1;
      setStep(nextStep);
      if (nextStep === 3) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#f472b6', '#c084fc'],
        });
      }
    }
  };

  const restartCinematic = () => {
    setStep(0);
  };

  return (
    <div id="surprise-section" className="py-16 px-4 text-center">
      {/* Large Glowing Trigger Button */}
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <motion.button
          id="trigger-surprise-btn"
          onClick={openSurprise}
          whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(245,197,66,0.6)' }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-semibold text-lg sm:text-xl shadow-[0_0_35px_rgba(236,72,153,0.5)] cursor-pointer overflow-hidden border border-amber-300/40"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <Mail className="w-6 h-6 text-amber-200 animate-pulse" />
          <span className="relative z-10 tracking-wide font-display">
            Kajal, There&apos;s One More Thing… 💌
          </span>
          <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
        </motion.button>
        <p className="mt-3 text-xs text-slate-400 font-serif italic">
          Click to reveal a special surprise prepared just for you
        </p>
      </div>

      {/* Cinematic Full-Screen Dim Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#04050d]/95 backdrop-blur-2xl"
          >
            {/* Close button */}
            <button
              onClick={closeSurprise}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer z-20"
              title="Close surprise"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Background glowing aura */}
            <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-purple-900/30 via-pink-600/20 to-amber-500/20 blur-3xl pointer-events-none" />

            <div className="relative max-w-2xl w-full mx-auto text-center px-4 flex flex-col items-center justify-center min-h-[420px]">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="cinematic-0"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 1.0, ease: 'easeOut' }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-amber-300 text-xs font-mono tracking-widest uppercase mb-4">
                      ✦ A WISH FROM THE HEART ✦
                    </span>
                    <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light leading-tight">
                      “If I could give you <br />
                      <span className="text-pink-300 font-normal italic">one gift…</span>”
                    </h3>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="cinematic-1"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 1.0, ease: 'easeOut' }}
                    className="flex flex-col items-center"
                  >
                    <p className="font-serif text-2xl sm:text-4xl md:text-5xl text-slate-100 font-light leading-snug">
                      “I&apos;d give you a box filled with{' '}
                      <span className="text-amber-300 font-normal">
                        every happy moment
                      </span>{' '}
                      we&apos;ve shared.”
                    </p>
                    <div className="mt-6 text-4xl">🎁✨</div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="cinematic-2"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 1.0, ease: 'easeOut' }}
                    className="flex flex-col items-center"
                  >
                    <p className="font-serif text-2xl sm:text-4xl md:text-5xl text-pink-200 font-light leading-snug">
                      “Because those memories are{' '}
                      <span className="text-amber-200 font-normal underline decoration-pink-500/50 underline-offset-8">
                        worth more than anything.
                      </span>”
                    </p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="mt-6 text-pink-500 text-4xl"
                    >
                      ❤️
                    </motion.div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="cinematic-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs tracking-widest uppercase mb-4">
                      <span>✦</span>
                      <span>CELEBRATING YOU IN 2026</span>
                      <span>✦</span>
                    </div>

                    <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-200 via-pink-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,114,182,0.45)] mb-6">
                      HAPPY BIRTHDAY KAJAL 🎂
                    </h2>

                    <div className="p-6 rounded-2xl glass-panel border border-pink-400/30 shadow-[0_0_30px_rgba(236,72,153,0.2)] max-w-lg">
                      <p className="font-serif italic text-2xl sm:text-3xl text-pink-100 leading-relaxed font-light">
                        “Stay happy. Stay crazy. <br />
                        <span className="text-amber-200 font-normal">
                          Stay exactly who you are.”
                        </span>
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-300">
                        <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                        <span>Always your brother by heart</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation controls */}
              <div className="mt-10 flex items-center gap-4">
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    <span>Next line</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={restartCinematic}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Replay Surprise</span>
                    </button>
                    <button
                      onClick={closeSurprise}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-medium shadow-md cursor-pointer hover:opacity-90"
                    >
                      <span>Return to Website ❤️</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
