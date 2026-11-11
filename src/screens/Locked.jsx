import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UNLOCK } from '../config';
import { Rainbow, chip, pop, fade } from '../ui';

export default function Locked({ onDone }) {
  const [left, setLeft] = useState(() => +new Date(UNLOCK) - Date.now());
  useEffect(() => {
    const id = setInterval(() => {
      const l = +new Date(UNLOCK) - Date.now();
      l <= 0 ? onDone() : setLeft(l);
    }, 1000);
    return () => clearInterval(id);
  }, [onDone]);
  const s = Math.max(0, Math.floor(left / 1000));
  const t = [['d', 86400], ['h', 3600], ['m', 60], ['s', 1]].map(([u, n]) => `${String(Math.floor(s / n) % (u === 'd' ? 1e9 : u === 'h' ? 24 : 60)).padStart(2, '0')}${u}`).join(' ');
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 p-6 text-center" {...fade}>
      <span className={`${chip} -rotate-2`}>🔒 Not yet…</span>
      <h1 className="font-display font-bold text-5xl md:text-8xl"><Rainbow text={t} /></h1>
      <p className={`bg-white rounded-3xl px-6 py-4 text-lg md:text-2xl font-medium ${pop}`}>Come back on the big day 🎂</p>
    </motion.div>
  );
}
