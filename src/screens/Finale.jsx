import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAME, FROM } from '../config';
import { Rainbow, chip, pop, fade, fire } from '../ui';
import { sfx } from '../sfx';

export default function Finale({ onReplay }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const burst = () => {
      fire({ particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: 0.8 } });
      fire({ particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: 0.8 } });
    };
    burst(); sfx.horn(); sfx.wish();
    const id = setInterval(burst, 2500);
    return () => clearInterval(id);
  }, []);

  const share = async () => {
    const data = { title: 'Happy Birthday!', text: `A birthday surprise for ${NAME} 🎉`, url: location.href };
    if (navigator.share) return navigator.share(data).catch(() => {});
    await navigator.clipboard?.writeText(location.href);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div className="fixed inset-0 z-40 flex items-center justify-center p-6 overflow-y-auto" {...fade} transition={{ duration: 1 }}>
      <div className="max-w-3xl text-center my-auto py-8 flex flex-col items-center">
        {/* ✏️ CONCLUSION */}
        <p className={`bg-white rounded-3xl px-6 py-5 md:px-10 md:py-7 text-lg md:text-2xl font-medium leading-relaxed ${pop}`}>Whatever you become, Swaroo, you are already enough for the people who love you. May this year bring you the success, peace and happiness you deserve. We are always proud of you, and always right behind you.

The big “Happy Birthday once again, Swaroo!”</p>
        <motion.h2 className="font-display font-bold text-5xl md:text-7xl leading-tight mt-12"
          initial={{ scale: 0.7, opacity: 0, rotate: -4 }} animate={{ scale: 1, opacity: 1, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 120, damping: 11, delay: 0.4 }}>
          <Rainbow text={`Happy Birthday once again, ${NAME}!`} />
        </motion.h2>
        <p className={`${chip} mt-10 rotate-2 !text-xl md:!text-2xl`}>— {FROM} 💛</p>
        <div className="flex gap-4 mt-10">
          <button onClick={share} className={`${chip} hover:-rotate-2 transition-transform`}>{copied ? '✅ Link copied' : '📤 Share'}</button>
          <button onClick={onReplay} className={`${chip} hover:rotate-2 transition-transform`}>🔁 Replay</button>
        </div>
      </div>
    </motion.div>
  );
}
