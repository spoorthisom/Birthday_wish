import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAME, FROM, PORTRAIT } from '../config';
import { Rainbow, chip, pop, fade, fire } from '../ui';
import { sfx, birthday, BDAY_STARTS, BDAY_END } from '../sfx';

const LYRICS = ['Happy birthday to you', 'Happy birthday to you', `Happy birthday dear ${NAME}`, 'Happy birthday to you'];

export default function Finale({ onReplay }) {
  const [copied, setCopied] = useState(false);
  const [line, setLine] = useState(-1);

  useEffect(() => {
    const burst = () => {
      fire({ particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: 0.8 } });
      fire({ particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: 0.8 } });
    };
    burst(); sfx.horn(); sfx.wish();
    const id = setInterval(burst, 2500);
    const stop = birthday(1.8);
    const ids = [
      ...BDAY_STARTS.map((s, i) => setTimeout(() => setLine(i), (1.8 + s) * 1000)),
      setTimeout(() => setLine(-1), (1.8 + BDAY_END) * 1000),
    ];
    return () => { clearInterval(id); stop(); ids.forEach(clearTimeout); };
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
        <motion.img src={PORTRAIT} alt={NAME} onError={e => { e.currentTarget.style.display = 'none'; }}
          className={`w-40 h-40 md:w-56 md:h-56 rounded-3xl object-cover bg-white ${pop}`}
          initial={{ scale: 0, rotate: 8 }} animate={{ scale: 1, rotate: -3 }} transition={{ type: 'spring', delay: 0.2 }} />
        <div className="h-16 my-6 flex items-center">
          {line >= 0 && <p key={line} className={`${chip} !text-xl md:!text-2xl`}>🎂 {LYRICS[line]}</p>}
        </div>
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
