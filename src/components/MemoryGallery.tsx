import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Eye, X, Plus, Sparkles, Heart, Edit3 } from 'lucide-react';
import { MemoryPhoto } from '../types';

// High quality, dreamy, atmospheric initial placeholder photos
const initialMemories: MemoryPhoto[] = [
  {
    id: 'mem-1',
    title: 'That Unforgettable Moment',
    caption: '“That unforgettable moment ❤️”',
    imageUrl: https://github.com/mrkiller786000000-creator/for-my-sister-kajal/blob/main/WhatsApp%20Image%202026-09-11%20at%201.03.02%20PM%20(1).jpeg,
    tag: 'Golden Hour',
  },
  {
    id: 'mem-2',
    title: 'Pure Joy & Laughter',
    caption: '“The laughter we couldn&apos;t stop”',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tag: 'Smiles Forever',
  },
  {
    id: 'mem-3',
    title: 'A Cherished Conversation',
    caption: '“One of my favorite memories”',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    tag: 'Heart to Heart',
  },
  {
    id: 'mem-4',
    title: 'Timeless Sisterhood',
    caption: '“A moment worth keeping forever”',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    tag: 'Treasured',
  },
  {
    id: 'mem-5',
    title: 'Pure Candid Vibes',
    caption: '“Just us being us ✨”',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    tag: 'Unfiltered Joy',
  },
];

export default function MemoryGallery() {
  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('kajal_memories_2026');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Local storage fallback
    }
    return initialMemories;
  });

  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetUploadId, setTargetUploadId] = useState<string | null>(null);

  const saveMemories = (newList: MemoryPhoto[]) => {
    setMemories(newList);
    try {
      localStorage.setItem('kajal_memories_2026', JSON.stringify(newList));
    } catch {
      // Storage quota or restricted
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetUploadId) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const updated = memories.map((m) =>
        m.id === targetUploadId ? { ...m, imageUrl: base64 } : m
      );
      saveMemories(updated);
      setTargetUploadId(null);
    };
    reader.readAsDataURL(file);
    // Reset file input value
    e.target.value = '';
  };

  const triggerUploadFor = (id: string) => {
    setTargetUploadId(id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditCaption = (photo: MemoryPhoto) => {
    setEditingCardId(photo.id);
    setEditCaption(photo.caption);
  };

  const saveEditedCaption = (id: string) => {
    const updated = memories.map((m) =>
      m.id === id ? { ...m, caption: editCaption } : m
    );
    saveMemories(updated);
    setEditingCardId(null);
  };

  const handleAddNewPhoto = () => {
    const newId = `mem-${Date.now()}`;
    const newPhoto: MemoryPhoto = {
      id: newId,
      title: 'A Special Sister Moment',
      caption: '“New memory with Kajal ❤️”',
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      tag: 'Cherished',
    };
    const updated = [...memories, newPhoto];
    saveMemories(updated);
    triggerUploadFor(newId);
  };

  return (
    <section id="memory-section" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Hidden file input for custom photo uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/40 border border-pink-400/25 text-pink-200 text-xs tracking-widest uppercase mb-3">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          Treasured Snapshots
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Little Memories, <span className="bg-gradient-to-r from-pink-300 via-amber-200 to-pink-300 bg-clip-text text-transparent">Big Smiles 📸</span>
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base font-light mt-3 max-w-xl mx-auto">
          Every snapshot holds a story, every laugh echoes a blessing. Tap any photo to view full-size or upload your own pictures of Kajal anytime.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {memories.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative rounded-2xl glass-panel border border-white/10 hover:border-pink-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.2)] transition-all duration-500 overflow-hidden flex flex-col"
          >
            {/* Photo Container with soft hover zoom */}
            <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-900 cursor-pointer">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onClick={() => setActivePhoto(photo)}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f24] via-transparent to-black/30 pointer-events-none" />

              {/* Tag chip */}
              {photo.tag && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-amber-200">
                  {photo.tag}
                </div>
              )}

              {/* Quick action buttons on hover */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerUploadFor(photo.id);
                  }}
                  title="Upload / replace with your real photo"
                  className="p-2 rounded-full bg-black/70 hover:bg-pink-600 border border-white/20 text-white transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhoto(photo);
                  }}
                  title="View full image"
                  className="p-2 rounded-full bg-black/70 hover:bg-purple-600 border border-white/20 text-white transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Caption & Details Footer */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-[#0e1026]/70">
              <div>
                {editingCardId === photo.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-black/60 border border-pink-400 text-white focus:outline-none"
                    />
                    <button
                      onClick={() => saveEditedCaption(photo.id)}
                      className="self-end px-2.5 py-1 rounded bg-pink-600 text-[11px] text-white font-medium"
                    >
                      Save Caption
                    </button>
                  </div>
                ) : (
                  <p className="font-serif italic text-base sm:text-lg text-pink-200 font-normal leading-relaxed">
                    {photo.caption}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => triggerUploadFor(photo.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-300/80 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Replace Photo</span>
                </button>

                <button
                  onClick={() => handleEditCaption(photo)}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title="Edit custom caption"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Note</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom helper action */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <button
          id="add-custom-photo-btn"
          onClick={handleAddNewPhoto}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Add Another Picture of Kajal 📸</span>
        </button>

        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-pink-400" />
          Photos you upload stay saved in your browser
        </span>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full rounded-2xl glass-panel overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-[#0e1026] text-center">
                <p className="font-serif italic text-xl text-pink-200 font-light mb-2">
                  {activePhoto.caption}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-amber-300">
                  <Heart className="w-3.5 h-3.5 fill-amber-300/40" />
                  <span>Cherished Sister Memory • Kajal 2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
