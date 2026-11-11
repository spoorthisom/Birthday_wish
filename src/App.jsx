import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { FLOW, UNLOCK, photos } from './config';
import { sfx, setSfxMuted } from './sfx';
import { Background, SoundToggle, fire, buzz } from './ui';
import Locked from './screens/Locked';
import GiftBox from './screens/GiftBox';
import Welcome from './screens/Welcome';
import Cake from './screens/Cake';
import Note from './screens/Note';
import Slideshow from './screens/Slideshow';
import Scratch from './screens/Scratch';
import Finale from './screens/Finale';

// 🎵 Put music1.mp3 + music2.mp3 in /public. Track 1 → start & photos 1-6, track 2 → photo 7 onward.
export default function App() {
  const [locked, setLocked] = useState(() => !!UNLOCK && Date.now() < +new Date(UNLOCK));
  const [step, setStep] = useState(0);
  const [slide, setSlide] = useState(0);
  const [muted, setMuted] = useState(false);
  const audio1 = useRef(null);
  const audio2 = useRef(null);
  const current = FLOW[step];

  useEffect(() => { setSfxMuted(muted); }, [muted]);
  useEffect(() => { photos.forEach(p => { new Image().src = p.url; }); }, []);

  useEffect(() => {
    const active =
      current === 'box' ? 0
      : current === 'welcome' || current === 'cake' ? 1
      : current === 'slideshow' ? (slide < 6 ? 1 : 2)
      : 2;
    [audio1.current, audio2.current].forEach((t, i) => {
      if (!t) return;
      t.muted = muted;
      if (i + 1 === active) { t.volume = 0.6; t.play()?.catch(() => {}); }
      else t.pause();
    });
  }, [current, slide, muted]);

  const advance = useCallback(() => { buzz(); setStep(s => Math.min(s + 1, FLOW.length - 1)); }, []);
  const go = useCallback(() => { sfx.tap(); advance(); }, [advance]);
  const nextSlide = () => { if (slide < photos.length - 1) { sfx.tap(); setSlide(slide + 1); } else go(); };
  const prevSlide = useCallback(() => { sfx.tap(); setSlide(s => Math.max(0, s - 1)); }, []);
  const replay = () => { setStep(0); setSlide(0); };

  const openBox = () => {
    sfx.horn();
    fire({ particleCount: 240, spread: 130, origin: { y: 0.5 }, startVelocity: 55 });
    const end = Date.now() + 2200;
    const sides = () => {
      fire({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } });
      fire({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } });
      if (Date.now() < end) requestAnimationFrame(sides);
    };
    sides();
    [audio1, audio2].forEach(r => r.current?.play().then(() => r.current.pause()).catch(() => {}));
    advance();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen text-ink font-sans overflow-hidden">
        <Background />
        <audio ref={audio1} src="/music1.mp3" loop preload="auto" />
        <audio ref={audio2} src="/music2.mp3" loop preload="auto" />
        <SoundToggle muted={muted} onToggle={() => setMuted(m => !m)} />

        {locked ? <Locked onDone={() => setLocked(false)} /> : (
          <AnimatePresence mode="wait">
            {current === 'box' && <GiftBox key="box" onOpen={openBox} />}
            {current === 'welcome' && <Welcome key="welcome" onNext={go} />}
            {current === 'cake' && <Cake key="cake" onNext={go} />}
            {current === 'note' && <Note key="note" onNext={go} />}
            {current === 'slideshow' && <Slideshow key={`s-${slide}`} photo={photos[slide]} index={slide} onNext={nextSlide} onPrev={prevSlide} />}
            {current === 'scratch' && <Scratch key="scratch" onNext={go} />}
            {current === 'finale' && <Finale key="finale" onReplay={replay} />}
          </AnimatePresence>
        )}
      </div>
    </MotionConfig>
  );
}
