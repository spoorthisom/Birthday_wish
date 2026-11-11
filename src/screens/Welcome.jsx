import { useState } from 'react';
import { motion } from 'framer-motion';
import { NAME, DOB } from '../config';
import { Rainbow, useCountUp, chip, pop, hint, fade } from '../ui';

export default function Welcome({ onNext }) {
  const [total] = useState(() => (DOB ? Math.floor((Date.now() - +new Date(DOB)) / 864e5) : 0));
  const days = useCountUp(total);
  return (
    <motion.div className="fixed inset-0 z-40 flex items-center justify-center p-6 cursor-pointer" {...fade} transition={{ duration: 0.8 }} onClick={onNext}>
      <div className="max-w-4xl text-center flex flex-col items-center">
        <motion.span className={`${chip} -rotate-3`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
          🎉 Wish You many more happy returns of the day 🎉
        </motion.span>
        <motion.h1 className="font-display font-bold text-6xl md:text-9xl leading-none mt-8"
          initial={{ opacity: 0, scale: 0.6, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 120, damping: 11, delay: 0.4 }}>
          <Rainbow text={NAME} />
        </motion.h1>
        {DOB && <p className={`${chip} mt-6 rotate-1`}>🗓️ {days.toLocaleString()} days of being awesome</p>}
        <motion.p className={`mt-10 max-w-xl bg-white rounded-3xl px-6 py-5 text-lg md:text-2xl font-medium leading-relaxed ${pop}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          {/* ✏️ INTRO TEXT */}
It’s your day, Swaroo! I made this little surprise just for you. Ready? </motion.p>
        <motion.p className={`mt-12 ${hint}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>Tap anywhere to begin</motion.p>
      </div>
    </motion.div>
  );
}
