import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Copy, Check, Feather } from 'lucide-react';

export default function LetterSection() {
  const [copied, setCopied] = useState<boolean>(false);

  const fullLetterText = `Dear Kajal,

“Life has a funny way of introducing us to people who slowly become impossible to imagine life without.

You aren't my sister because we share the same blood.

You're my sister because of every laugh, every conversation, every memory, every little moment, and every time you made life a little brighter.

Maybe the world calls us unrelated…

but my heart never did.

For me, you're family. ❤️

On your birthday, I just want you to know that you'll always have a special place in my heart.

May this new year of your life bring you endless happiness, beautiful memories, success, peace, and everything your heart wishes for.

Keep smiling, keep shining, and never forget how special you are.

Happy Birthday, Kajal. ❤️🎂

— From someone who is lucky to call you his sister.”`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullLetterText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="letter-section" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/20 text-pink-300 text-xs tracking-widest uppercase mb-3">
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          Words From The Soul
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          A Letter For <span className="text-pink-300 italic">Kajal</span>
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base font-light mt-2 max-w-md mx-auto">
          Every word written from the deepest corner of my heart.
        </p>
      </div>

      {/* Handwritten Letter Envelope/Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative rounded-3xl p-6 sm:p-10 md:p-14 glass-panel border border-amber-400/30 shadow-[0_15px_50px_rgba(236,72,153,0.15)] overflow-hidden"
      >
        {/* Subtle decorative background watermark */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-bl from-amber-500/10 via-pink-500/10 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-transparent blur-2xl pointer-events-none" />

        {/* Vintage Top Ribbon & Wax Seal */}
        <div className="flex items-center justify-between border-b border-amber-300/15 pb-6 mb-8">
          <div className="flex items-center gap-3">
            {/* Wax Seal */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-red-800 via-rose-700 to-amber-600 shadow-[0_0_15px_rgba(225,29,72,0.4)] border border-amber-300/40 flex items-center justify-center">
              <Heart className="w-6 h-6 text-amber-200 fill-amber-200/90" />
            </div>
            <div>
              <p className="font-display text-xs tracking-widest text-amber-300 uppercase">Special Bond</p>
              <p className="font-serif italic text-sm text-pink-200/80">Sister by Choice & Heart</p>
            </div>
          </div>

          {/* Quick copy letter button */}
          <button
            id="copy-letter-btn"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
            title="Copy letter to send or save"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Saved to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Letter</span>
              </>
            )}
          </button>
        </div>

        {/* The Letter Body */}
        <div className="space-y-6 text-slate-200 leading-relaxed font-sans sm:text-lg">
          <p className="font-script text-3xl sm:text-4xl text-amber-200 font-semibold tracking-wide">
            Dear Kajal,
          </p>

          <p className="font-serif italic text-slate-100 text-lg sm:text-xl font-light leading-relaxed border-l-2 border-pink-400/50 pl-4 py-1">
            “Life has a funny way of introducing us to people who slowly become impossible to imagine life without.”
          </p>

          <p className="text-slate-200/90 font-light">
            You aren&apos;t my sister because we share the same blood.
          </p>

          <p className="text-slate-100 font-normal">
            You&apos;re my sister because of every laugh, every conversation, every memory, every little moment, and every time you made life a little brighter.
          </p>

          <div className="py-2">
            <p className="text-pink-300/90 font-medium">
              Maybe the world calls us unrelated…
            </p>
            <p className="font-serif italic text-xl sm:text-2xl text-amber-200 mt-1 font-normal">
              but my heart never did.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/15 border border-pink-400/30 text-pink-200 font-serif font-medium text-lg">
            <span>For me, you&apos;re family.</span>
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
          </div>

          <p className="text-slate-200/90 font-light">
            On your birthday, I just want you to know that you&apos;ll always have a special place in my heart.
          </p>

          <p className="text-slate-200/90 font-light">
            May this new year of your life bring you endless happiness, beautiful memories, success, peace, and everything your heart wishes for.
          </p>

          <p className="text-amber-200/90 font-medium">
            Keep smiling, keep shining, and never forget how special you are.
          </p>

          <div className="pt-4 border-t border-amber-300/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-serif text-xl sm:text-2xl text-pink-300 font-semibold flex items-center gap-2">
              <span>Happy Birthday, Kajal.</span>
              <span>❤️🎂</span>
            </p>
            <p className="font-script text-xl sm:text-2xl text-amber-300/90 font-normal">
              — From someone who is lucky to call you his sister.
            </p>
          </div>
        </div>

        {/* Decorative corner stars */}
        <Sparkles className="absolute bottom-4 right-4 w-5 h-5 text-amber-400/20" />
      </motion.div>
    </section>
  );
}
