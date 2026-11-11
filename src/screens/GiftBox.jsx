import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chip, fade } from '../ui';
import { sfx } from '../sfx';

const variants = {
  idle: { y: [0, -16, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } },
  shake: { rotate: [0, -9, 9, -9, 9, -5, 0], transition: { duration: 0.6 } },
  burst: { scale: [1, 1.3, 0], opacity: [1, 1, 0], transition: { duration: 0.7, ease: 'easeIn' } },
};

export default function GiftBox({ onOpen }) {
  const [phase, setPhase] = useState('idle');
  const click = () => {
    if (phase !== 'idle') return;
    sfx.shake();
    setPhase('shake');
    setTimeout(() => { sfx.pop(); setPhase('burst'); }, 600);
    setTimeout(() => { setPhase('done'); onOpen(); }, 1300);
  };
  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-16 select-none" {...fade} transition={{ duration: 0.6 }}>
          <motion.div onClick={click} variants={variants} animate={phase}
            whileHover={phase === 'idle' ? { scale: 1.06 } : undefined}
            className="relative cursor-pointer w-44 h-44 md:w-56 md:h-56 mt-10" style={{ touchAction: 'manipulation' }}>
            <div className="absolute bottom-0 inset-x-0 h-[66%] rounded-2xl bg-[#FF4D8D] border-4 border-ink shadow-[8px_8px_0_0_#1B1B3A]" />
            <div className="absolute top-[14%] -inset-x-2 h-[28%] rounded-xl bg-[#3A86FF] border-4 border-ink" />
            <div className="absolute top-[14%] bottom-0 left-1/2 -translate-x-1/2 w-9 md:w-11 bg-[#FFD23F] border-x-4 border-ink z-10" />
            <div className="absolute top-[3%] left-1/2 -translate-x-[115%] w-12 h-10 rounded-full bg-[#FF8A00] border-4 border-ink -rotate-[25deg] z-20" />
            <div className="absolute top-[3%] left-1/2 translate-x-[15%] w-12 h-10 rounded-full bg-[#FF8A00] border-4 border-ink rotate-[25deg] z-20" />
            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FFD23F] border-4 border-ink z-30" />
          </motion.div>
          <motion.p className={`${chip} -rotate-2`} initial={{ opacity: 0 }} animate={{ opacity: phase === 'idle' ? 1 : 0 }} transition={{ delay: 0.3 }}>
            Tap to open 🎁
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
