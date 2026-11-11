// 🔊 Sound effects generated in the browser (no files needed).
// Want your own? Put an mp3 in /public/sfx and use: new Audio('/sfx/pop.mp3').play()
let ctx, muted = false;
const ac = () => {
  ctx ||= new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
};
export const setSfxMuted = m => { muted = m; };

const tone = (f, at, dur, type = 'sine', vol = 0.2, to) => {
  const c = ac(), t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur);
};
const noise = (at, dur, vol = 0.15, freq = 1000, to) => {
  const c = ac(), t = c.currentTime + at, len = Math.floor(c.sampleRate * dur);
  const b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = b; f.type = 'bandpass'; f.frequency.setValueAtTime(freq, t);
  if (to) f.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  s.connect(f).connect(g).connect(c.destination); s.start(t);
};
const wrap = fn => () => { if (muted) return; try { fn(); } catch { /* audio unavailable */ } };

export const sfx = {
  tap: wrap(() => tone(520, 0, 0.09, 'triangle', 0.15, 880)),
  shake: wrap(() => { tone(90, 0, 0.6, 'sawtooth', 0.1, 60); noise(0, 0.6, 0.08, 400); }),
  pop: wrap(() => { tone(320, 0, 0.18, 'square', 0.18, 70); noise(0, 0.25, 0.25, 3000); }),
  horn: wrap(() => { tone(392, 0.05, 0.6, 'sawtooth', 0.1, 784); tone(587, 0.05, 0.6, 'sawtooth', 0.07, 1175); }),
  puff: wrap(() => noise(0, 0.3, 0.14, 900, 300)),
  scratch: wrap(() => noise(0, 0.08, 0.1, 4000)),
  wish: wrap(() => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.11, 0.55, 'triangle', 0.16))),
};
