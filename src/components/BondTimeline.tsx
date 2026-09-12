import { useState } from 'react';
import { motion } from 'motion/react';
import { Milestone } from '../types';
import { Sparkles, Heart } from 'lucide-react';

const milestones: Milestone[] = [
  {
    id: 'beginning',
    title: 'The Beginning',
    icon: '🌱',
    quote: '“Two strangers, one unexpected connection.”',
    description: 'We started off with simple words and chance meetings. Neither of us knew that a casual conversation was planting the seeds of an unbreakable lifelong bond.',
    highlightColor: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'friendship',
    title: 'The Friendship',
    icon: '🤝',
    quote: '“Somewhere along the way, you became more than just a person I knew.”',
    description: 'Shared jokes, late-night advice, endless comfort on tough days, and unconditional support. You became my safest confidante and greatest cheerleader.',
    highlightColor: 'from-amber-400 to-rose-400',
  },
  {
    id: 'family',
    title: 'The Family',
    icon: '❤️',
    quote: '“Without realizing it, you became my sister.”',
    description: 'There was no specific announcement. My heart simply realized: your smiles matter to me as much as family, your tears hurt me like family, and protecting your happiness became second nature.',
    highlightColor: 'from-pink-500 to-purple-500',
  },
  {
    id: 'forever',
    title: 'Forever',
    icon: '✨',
    quote: '“Some bonds don&apos;t need a family tree. They simply need a heart.”',
    description: 'No matter the distance, the changing years, or where life leads us in 2026 and beyond, you will always be my beloved sister.',
    highlightColor: 'from-purple-400 to-amber-300',
  },
];

export default function BondTimeline() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="bond-timeline-section" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-400/25 text-purple-200 text-xs tracking-widest uppercase mb-3">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40" />
          Our Emotional Journey
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          A Bond That <span className="bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">Doesn&apos;t Need Blood</span>
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base font-light mt-3 max-w-lg mx-auto">
          Not measured by calendar dates, but by moments when two souls recognized each other as family.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central glowing vertical line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-400 via-pink-400 to-amber-400 opacity-30 pointer-events-none" />

        <div className="space-y-12 sm:space-y-16">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = activeId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node icon */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass-panel border border-amber-300/40 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(244,114,182,0.3)] z-10 cursor-pointer transition-transform duration-300 hover:scale-115"
                  onClick={() => setActiveId(isExpanded ? null : item.id)}
                  title="Click to view story"
                >
                  <span>{item.icon}</span>
                </div>

                {/* Content Card */}
                <div className="ml-16 md:ml-0 md:w-1/2">
                  <div
                    onClick={() => setActiveId(isExpanded ? null : item.id)}
                    className={`group relative rounded-2xl p-6 glass-panel border transition-all duration-300 cursor-pointer ${
                      isExpanded
                        ? 'border-amber-400/60 shadow-[0_0_30px_rgba(245,197,66,0.25)] bg-[#191535]/80'
                        : 'border-white/10 hover:border-pink-400/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.icon}</span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {isExpanded ? 'Fold ↑' : 'Reflect ↓'}
                      </span>
                    </div>

                    <p className="font-serif italic text-base sm:text-lg text-pink-200/90 font-light my-2 leading-relaxed">
                      {item.quote}
                    </p>

                    <p className="text-slate-300/80 text-sm leading-relaxed mt-3 border-t border-white/5 pt-3">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-300/70 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Sisterhood Chosen By Heart</span>
                    </div>
                  </div>
                </div>

                {/* Spacer for desktop two-column balance */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
