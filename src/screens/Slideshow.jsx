import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { photos, SLIDE_BG, INK } from '../config';
import { pop, hint, fade, buzz } from '../ui';

export default function Slideshow({ photo, index, onNext, onPrev }) {
  const auto = !photo.note;
  const cb = useRef({});
  useEffect(() => { cb.current = { onNext, onPrev }; });

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => cb.current.onNext(), 3000);
    return () => clearTimeout(t);
  }, [auto, index]);

  useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowRight' || e.key === ' ') cb.current.onNext();
      else if (e.key === 'ArrowLeft') cb.current.onPrev();
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);

  const tilt = photo.id % 2 ? -3 : 3;

  return (
    <motion.div className="fixed inset-0 z-30 flex flex-col items-center justify-center cursor-pointer overflow-hidden select-none"
      style={{ background: SLIDE_BG[index % SLIDE_BG.length] }} {...fade} transition={{ duration: 0.5 }}
      onTap={(_, i) => { buzz(); (i.point.x < innerWidth * 0.3 ? onPrev : onNext)(); }}>
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: `radial-gradient(${INK} 2px, transparent 2px)`, backgroundSize: '26px 26px' }} />

      <div className="absolute top-0 inset-x-0 z-20 flex gap-1.5 px-4 pt-5 md:px-8">
        {photos.map((p, i) => (
          <div key={p.id} className="h-2.5 flex-1 rounded-full bg-white/60 border-2 border-ink overflow-hidden">
            {i < index || (i === index && !auto) ? <div className="h-full w-full bg-ink" />
              : i === index ? <motion.div className="h-full bg-ink" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} /> : null}
          </div>
        ))}
      </div>

      <motion.div drag="x" dragSnapToOrigin dragElastic={0.5} dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, i) => { if (i.offset.x < -80) onNext(); else if (i.offset.x > 80) onPrev(); }}
        className={`relative z-10 bg-white p-3 md:p-4 rounded-2xl cursor-grab active:cursor-grabbing ${pop} ${
          photo.id === 1 ? 'w-[88vw] max-w-[640px] aspect-video' : 'w-[68vw] max-w-[340px] aspect-[3/4] max-h-[52vh]'}`}
        initial={{ y: 60, opacity: 0, scale: 0.8, rotate: tilt * 3 }} animate={{ y: 0, opacity: 1, scale: 1, rotate: tilt }}
        transition={{ type: 'spring', stiffness: 130, damping: 12 }}>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-3 w-20 h-7 bg-[#FF4D8D] border-2 border-ink z-10" />
        <img src={photo.url} alt="Memory" draggable={false} className="w-full h-full object-cover rounded-lg bg-ink/10 pointer-events-none" />
      </motion.div>

      {photo.note && (
        <motion.div className="absolute bottom-6 md:bottom-10 inset-x-0 z-20 px-5 flex flex-col items-center gap-3 pointer-events-none"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, type: 'spring' }}>
          <div className={`relative max-w-2xl w-full text-center bg-white rounded-3xl px-6 py-4 md:px-10 md:py-6 ${pop}`}>
            <span className="absolute -top-5 -right-2 text-3xl rotate-12">✨</span>
            <p className="font-display font-medium text-xl md:text-3xl leading-snug">“{photo.note}”</p>
          </div>
          <p className={hint}>Tap · swipe to browse</p>
        </motion.div>
      )}
    </motion.div>
  );
}
