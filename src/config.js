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
export const photos = [
  { id: 1, url: 'Insert URL for Photo 1', note: 'Where it all began. My irritating Tom, so tiny back then.' },
  { id: 2, url: 'Insert URL for Photo 2', note: 'Daddy’s muddu, always.' },
  { id: 3, url: 'Insert URL for Photo 3', note: 'Amma’s maga, doing his own thing as usual.' },
  { id: 4, url: 'Insert URL for Photo 4', note: 'Akka tried to guide you. You never listened. 😄' },
  { id: 5, url: 'Insert URL for Photo 5', note: 'Still the same Swaroo, still doing it your way.' },
  { id: 6, url: 'Insert URL for Photo 6', note: 'And somehow, we love you more every year.' },
  { id: 7, url: 'Insert URL for Photo 7', note: 'Amma, Daddy, Akka and you. The best family anyone could ask for.' },
  { id: 8, url: 'Insert URL for Photo 8', note: 'Whatever happens, Swaroo, we are always together.' },
];

export const RAINBOW = ['#FF4D8D', '#FF8A00', '#FFD23F', '#06D6A0', '#3A86FF', '#8338EC'];
export const SLIDE_BG = ['#FFD23F', '#FF8FB8', '#7DB8FF', '#7CF2C9', '#FFB066', '#C3A1FF'];
export const CONFETTI = [...RAINBOW, '#ffffff'];
export const INK = '#1B1B3A';
