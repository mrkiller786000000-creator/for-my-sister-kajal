import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ambientMusic } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    const status = ambientMusic.getStatus();
    setIsPlaying(status.isPlaying && !status.isMuted);
  }, []);

  const handleToggle = () => {
    setHasInteracted(true);
    const active = ambientMusic.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40">
      <button
        id="music-toggle-btn"
        onClick={handleToggle}
        title={isPlaying ? 'Mute Background Melody' : 'Play Background Melody'}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel border border-amber-400/25 hover:border-amber-400/60 shadow-[0_0_20px_rgba(245,197,66,0.15)] hover:shadow-[0_0_25px_rgba(245,197,66,0.35)] transition-all duration-300 text-slate-200 cursor-pointer text-xs sm:text-sm font-medium"
      >
        <span className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-amber-400' : 'bg-slate-500'}`}></span>
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-300" />
        ) : (
          <VolumeX className="w-4 h-4 text-slate-400" />
        )}

        <span className="hidden sm:inline tracking-wider font-mono text-[11px] text-amber-200/90">
          {isPlaying ? 'MUSIC ON' : 'MUSIC OFF'}
        </span>

        {/* Animated equalizer bars when playing */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-full bg-pink-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 h-3.5 bg-purple-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
          </div>
        )}

        {!hasInteracted && !isPlaying && (
          <span className="absolute -bottom-7 right-0 text-[10px] text-amber-300/80 font-sans whitespace-nowrap flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md border border-amber-500/20">
            <Sparkles className="w-2.5 h-2.5" /> Tap for ambient melody
          </span>
        )}
      </button>
    </div>
  );
}
