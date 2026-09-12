/**
 * Ambient Peaceful Melody & Chime Synthesizer using Web Audio API
 * Provides ethereal, calming music loop and celebration chimes without external audio dependencies.
 */

class AmbientMusicService {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private timer: number | null = null;
  private gainNode: GainNode | null = null;
  private volume: number = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Ethereal Pentatonic scales for a dreamy, emotional, soothing atmosphere (Db Major / Eb Pentatonic)
  private notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00  // A5
  ];

  // Warm chord pads (frequencies)
  private chordProgression = [
    [261.63, 329.63, 392.00, 523.25], // Cmaj7/9
    [220.00, 261.63, 329.63, 440.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00]  // Gsus4 -> G
  ];

  private chordIndex = 0;

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', decay: number = 3.5, gainMult: number = 0.15) {
    if (!this.ctx || !this.gainNode || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft attack, gentle exponential decay
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(this.volume * gainMult, now + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.00001, now + duration + decay);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + duration + decay);
    } catch {
      // Audio context might be suspended or closed
    }
  }

  private stepMelody = () => {
    if (!this.isPlaying) return;

    // Pick 1-2 soothing notes from pentatonic scale
    const note = this.notes[Math.floor(Math.random() * this.notes.length)];
    this.playTone(note, 1.8, 'sine', 3.0, 0.18);

    // Occasionally play a soft harmonic overtone
    if (Math.random() > 0.4) {
      setTimeout(() => {
        if (!this.isPlaying) return;
        const secondNote = this.notes[Math.floor(Math.random() * this.notes.length)];
        this.playTone(secondNote, 1.2, 'triangle', 2.5, 0.08);
      }, 450);
    }

    // Every few steps, voice a gentle chord pad
    if (Math.random() > 0.6) {
      const chord = this.chordProgression[this.chordIndex % this.chordProgression.length];
      this.chordIndex++;
      chord.forEach(f => {
        this.playTone(f, 2.5, 'sine', 4.0, 0.05);
      });
    }

    // Schedule next random peaceful interval (800ms - 2200ms)
    const nextInterval = 900 + Math.random() * 1200;
    this.timer = window.setTimeout(this.stepMelody, nextInterval);
  };

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.stepMelody();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying && !this.isMuted) {
      this.isMuted = true;
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      return false;
    } else {
      this.isMuted = false;
      this.initContext();
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      }
      if (!this.isPlaying) {
        this.start();
      }
      return true;
    }
  }

  public getStatus(): { isPlaying: boolean; isMuted: boolean } {
    return {
      isPlaying: this.isPlaying && !this.isMuted,
      isMuted: this.isMuted || !this.isPlaying
    };
  }

  // Play celestial chime when user makes a wish or clicks celebration
  public playWishChime() {
    this.initContext();
    if (this.isMuted) return;

    const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5 - E5 - G5 - C6 - E6
    chimeNotes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 0.8, 'sine', 2.5, 0.25);
      }, idx * 110);
    });
  }
}

export const ambientMusic = new AmbientMusicService();
