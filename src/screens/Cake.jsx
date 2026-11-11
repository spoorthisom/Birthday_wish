import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rainbow, chip, hint, fade, fire } from '../ui';
import { sfx } from '../sfx';

const N = 5;

export default function Cake({ onNext }) {
  const [lit, setLit] = useState(Array(N).fill(true));
  const [mic, setMic] = useState('idle'); // idle | on | denied
  const stop = useRef(() => {});
  const meter = useRef(null);
  const out = lit.every(v => !v);

  const snuff = i => { sfx.puff(); setLit(l => l.map((v, j) => (j === i ? false : v))); };
  const blowAll = () => lit.forEach((_, i) => setTimeout(() => snuff(i), i * 120));

  const startMic = async () => {
    if (!navigator.mediaDevices?.getUserMedia) return setMic('insecure');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      await ctx.resume();
      const an = ctx.createAnalyser(); an.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(an);
      const buf = new Uint8Array(an.fftSize);
      let raf, prev = performance.now(), floor = 0, n = 0, acc = 0;
      const tick = (now = performance.now()) => {
        an.getByteTimeDomainData(buf);
        const rms = Math.sqrt(buf.reduce((s, v) => s + ((v - 128) / 128) ** 2, 0) / buf.length);
        const dt = now - prev; prev = now;
        if (n < 20) { floor = (floor * n + rms) / (n + 1); n++; }
        else {
          const thr = floor + 0.04;
          if (meter.current) meter.current.style.width = Math.min(100, (rms / thr) * 100) + '%';
          acc = rms > thr ? acc + dt : Math.max(0, acc - dt);
          if (acc > 250) return blowAll();
        }
        raf = requestAnimationFrame(tick);
      };
      stop.current = () => { cancelAnimationFrame(raf); stream.getTracks().forEach(t => t.stop()); ctx.close(); };
      setMic('on'); tick();
    } catch { setMic('denied'); }
  };

  useEffect(() => () => stop.current(), []);
  useEffect(() => {
    if (!out) return;
    stop.current();
    sfx.wish();
    fire({ particleCount: 180, spread: 110, origin: { y: 0.6 } });
    const t = setTimeout(onNext, 3500);
    return () => clearTimeout(t);
  }, [out, onNext]);

  return (
    <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 p-6 text-center" {...fade} transition={{ duration: 0.8 }}>
      <h2 className="font-display font-bold text-4xl md:text-6xl">
        {out ? <Rainbow text="Wish made! 🤫" /> : <Rainbow text="Make a wish!" />}
      </h2>

      <div className="flex flex-col items-center">
        <div className="flex gap-4 md:gap-6 -mb-1 z-10">
          {lit.map((on, i) => (
            <button key={i} onClick={() => snuff(i)} className="relative flex flex-col items-center" aria-label="Blow out candle">
              <div className="h-6 flex items-end">
                {on
                  ? <motion.div className="w-3.5 h-6 rounded-full bg-[#FF8A00] border-2 border-ink origin-bottom"
                      animate={{ scaleY: [1, 1.25, 0.9, 1.15, 1], rotate: [-4, 4, -3, 3, -4] }} transition={{ duration: 0.8, repeat: Infinity }} />
                  : <motion.span initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -24 }} transition={{ duration: 1.2 }}>💨</motion.span>}
              </div>
              <div className="w-3 h-10 md:h-12 bg-[#3A86FF] border-2 border-ink rounded-sm" />
            </button>
          ))}
        </div>
        <div className="w-44 md:w-52 h-14 bg-[#FF4D8D] rounded-t-2xl border-4 border-ink" />
        <div className="w-56 md:w-72 h-16 bg-[#FFD23F] border-4 border-ink -mt-1" />
        <div className="w-72 md:w-96 h-16 bg-[#3A86FF] rounded-b-2xl border-4 border-ink -mt-1 shadow-[6px_6px_0_0_#1B1B3A]" />
      </div>

      {out ? <p className={hint}>Next up…</p> : (
        <div className="flex flex-col items-center gap-4">
          {mic === 'idle' && <button onClick={startMic} className={`${chip} hover:-rotate-2 transition-transform`}>🎤 Blow into the mic</button>}
          {mic === 'on' && (
            <>
              <p className={`${chip} animate-pulse`}>🌬️ Blow now!</p>
              <div className="w-48 h-3 rounded-full border-2 border-ink bg-white overflow-hidden"><div ref={meter} className="h-full w-0 bg-[#06D6A0]" /></div>
            </>
          )}
          {mic === 'denied' && <p className={chip}>Mic blocked — allow it via the 🔒 in the address bar, or tap the candles 👆</p>}
          {mic === 'insecure' && <p className={chip}>Mic needs https or localhost — tap the candles 👆</p>}
          <button onClick={onNext} className={`${hint} underline`}>skip</button>
        </div>
      )}
    </motion.div>
  );
}
