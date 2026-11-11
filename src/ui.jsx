/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RAINBOW, CONFETTI, INK } from './config';

export const pop = 'border-4 border-ink shadow-[6px_6px_0_0_#1B1B3A]';
export const chip = `inline-block bg-white rounded-full px-5 py-2 font-display font-semibold text-sm md:text-base tracking-wide ${pop}`;
export const hint = 'font-display font-medium text-xs md:text-sm tracking-[0.25em] uppercase text-ink/60 animate-pulse';
export const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

export const fire = o => confetti({ colors: CONFETTI, zIndex: 9999, disableForReducedMotion: true, ...o });
export const buzz = (ms = 15) => navigator.vibrate?.(ms);

export const useCountUp = (to, ms = 2000) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf; const t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / ms, 1);
      setV(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return v;
};

export const Rainbow = ({ text, className = '' }) => (
  <span className={className}>
    {[...text].map((ch, i) =>
      ch === ' ' ? ' ' : (
        <span key={i} className="inline-block" style={{
          color: RAINBOW[i % RAINBOW.length],
          textShadow: `3px 3px 0 ${INK}, -1.5px -1.5px 0 ${INK}, 1.5px -1.5px 0 ${INK}, -1.5px 1.5px 0 ${INK}, 1.5px 1.5px 0 ${INK}`,
        }}>{ch}</span>
      )
    )}
  </span>
);

const floaters = [
  ['🎈', '6%', '12%', 9], ['⭐', '88%', '10%', 7], ['🎉', '80%', '72%', 8], ['🎁', '10%', '75%', 10],
  ['✨', '48%', '6%', 6], ['🎈', '92%', '42%', 11], ['🪩', '4%', '45%', 8], ['🎊', '60%', '88%', 9],
  ['⭐', '30%', '88%', 7], ['🎂', '70%', '28%', 12],
];
export const Background = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none bg-gradient-to-br from-[#FFF3B0] via-[#FFD6E8] to-[#BDE0FF]">
    <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#06D6A0]/40" />
    <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-[#8338EC]/25" />
    <div className="absolute top-1/3 -right-16 w-52 h-52 rounded-full bg-[#FF8A00]/30" />
    <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `radial-gradient(${INK} 1.5px, transparent 1.5px)`, backgroundSize: '28px 28px' }} />
    {floaters.map(([e, left, top, d], i) => (
      <motion.span key={i} className="absolute text-3xl md:text-5xl" style={{ left, top }}
        animate={{ y: [0, -26, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}>{e}</motion.span>
    ))}
  </div>
);

export const SoundToggle = ({ muted, onToggle }) => (
  <button onClick={onToggle} aria-label={muted ? 'Unmute' : 'Mute'}
    className="fixed top-10 right-4 z-[70] w-12 h-12 rounded-full bg-white text-xl border-4 border-ink shadow-[3px_3px_0_0_#1B1B3A] active:translate-y-0.5">
    {muted ? '🔇' : '🔊'}
  </button>
);
