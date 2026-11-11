import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SCRATCH, RAINBOW, INK } from '../config';
import { chip, pop, hint, fade, fire } from '../ui';
import { sfx } from '../sfx';

const wide = matchMedia('(min-width: 768px)').matches;
const W = wide ? 460 : 300, H = wide ? 260 : 180;

export default function Scratch({ onNext }) {
  const ref = useRef();
  const down = useRef(false);
  const last = useRef(null);
  const snd = useRef(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const c = ref.current, x = c.getContext('2d'), d = devicePixelRatio || 1;
    c.width = W * d; c.height = H * d; x.scale(d, d);
    const g = x.createLinearGradient(0, 0, W, H);
    RAINBOW.forEach((col, i) => g.addColorStop(i / (RAINBOW.length - 1), col));
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = 'rgba(255,255,255,.35)';
    for (let i = 0; i < 60; i++) { x.beginPath(); x.arc(Math.random() * W, Math.random() * H, 2 + Math.random() * 4, 0, 7); x.fill(); }
    x.fillStyle = INK; x.font = '700 26px Fredoka, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText('✨ SCRATCH HERE ✨', W / 2, H / 2);
  }, []);

  const pt = e => { const r = ref.current.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const draw = e => {
    const n = performance.now();
    if (n - snd.current > 90) { snd.current = n; sfx.scratch(); }
    const x = ref.current.getContext('2d'), [px, py] = pt(e), [lx, ly] = last.current || [px, py];
    x.globalCompositeOperation = 'destination-out'; x.lineWidth = 44; x.lineCap = 'round';
    x.beginPath(); x.moveTo(lx, ly); x.lineTo(px, py); x.stroke();
    last.current = [px, py];
  };
  const check = () => {
    const c = ref.current, { data } = c.getContext('2d').getImageData(0, 0, c.width, c.height);
    let clear = 0, tot = 0;
    for (let i = 3; i < data.length; i += 64) { tot++; if (!data[i]) clear++; }
    if (clear / tot > 0.5) { setDone(true); sfx.wish(); fire({ particleCount: 160, spread: 100, origin: { y: 0.6 } }); }
  };

  return (
    <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 p-6 text-center" {...fade}
      style={{ cursor: done ? 'pointer' : 'default' }} onClick={done ? onNext : undefined}>
      <span className={`${chip} -rotate-2`}>🎟️ Scratch for a surprise</span>
      <div className={`relative rounded-3xl overflow-hidden ${pop}`} style={{ width: W + 8, height: H + 8 }}>
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-5">
          <p className="font-display font-bold text-2xl md:text-4xl">{SCRATCH.title}</p>
          <p className="mt-2 font-medium md:text-xl">{SCRATCH.text}</p>
        </div>
        <canvas ref={ref} style={{ width: W, height: H, touchAction: 'none' }}
          className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ${done ? 'opacity-0 pointer-events-none' : ''}`}
          onPointerDown={e => { down.current = true; e.currentTarget.setPointerCapture(e.pointerId); draw(e); }}
          onPointerMove={e => down.current && draw(e)}
          onPointerUp={() => { down.current = false; last.current = null; check(); }} />
      </div>
      {done ? <p className={hint}>Tap anywhere to continue</p> : <button onClick={onNext} className={`${hint} underline`}>skip</button>}
    </motion.div>
  );
}
