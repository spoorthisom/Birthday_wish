// ══════════════════════════════════════════════════════════════════════════════
// ⚙️  ALL CUSTOMIZATION LIVES HERE
// Personalize by link too:  yoursite.com/?name=Rahul&from=Spoo
// ══════════════════════════════════════════════════════════════════════════════
const q = new URLSearchParams(location.search);
export const NAME = (q.get('name') || 'Swaroo').slice(0, 30);
export const FROM = (q.get('from') || '[Akka,Daddy,Amma]').slice(0, 30);

// 🔀 Order of screens: box · welcome · cake · note · slideshow · scratch · finale
export const FLOW = ['box', 'welcome', 'cake', 'note', 'slideshow', 'scratch', 'finale'];

export const DOB = '2007-11-25';      // e.g. '2002-05-14' → shows "N days of being awesome"
export const UNLOCK = null;   // e.g. '2026-12-01T00:00:00' → shows a countdown until then

export const SCRATCH = { title: '🎁 Akka\'s gift!', text: 'One treat of your choice, on me. No arguments!' };

// 📸 Photos 1-6 wait for a tap · Photos 7-8 have no note and auto-advance (3s)
const notes = [
  'Where it all began. My irritating Tom, so tiny back then.',
  'Daddy’s muddu, always.',
  'Amma’s maga, doing his own thing as usual.',
  'Akka tried to guide you. You never listened. 😄',
  'Still the same Swaroo, still doing it your way.',
  'And somehow, we love you more every year.',
  'Amma, Daddy, Akka and you. The best family anyone could ask for.',
  'Whatever happens, Swaroo, we are always together.',
];
export const photos = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, url: `/photos/${i + 1}.jpg`, note: notes[i] || '' }));

export const RAINBOW = ['#FF4D8D', '#FF8A00', '#FFD23F', '#06D6A0', '#3A86FF', '#8338EC'];
export const SLIDE_BG = ['#FFD23F', '#FF8FB8', '#7DB8FF', '#7CF2C9', '#FFB066', '#C3A1FF'];
export const CONFETTI = [...RAINBOW, '#ffffff'];
export const INK = '#1B1B3A';

// 🖼️ Put your brother's picture at public/swaroo.jpg (or change this path/URL)
export const PORTRAIT = '/swaroo.jpg';
