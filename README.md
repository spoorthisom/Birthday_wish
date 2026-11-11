# 🎂 Birthday Surprise

A bright, colorful, interactive birthday surprise for a brother, son and friend. It's a single-page web experience: tap a gift box, blow out the candles, flip through photos, play voice messages from family, scratch a surprise card, and finish with a "Happy Birthday" song and confetti.

## ✨ Experience

The default order (change it in `FLOW` in `src/config.js`):

| # | Screen | What happens |
|---|--------|--------------|
| 1 | **Gift box** | Tap to open, with confetti and a party horn |
| 2 | **Welcome** | Big rainbow name and an intro message |
| 3 | **Cake** | Blow into the mic (or tap the candles) to put them out and make a wish |
| 4 | **Note** | A heartfelt message with three short paragraphs |
| 5 | **Slideshow** | Polaroid-style photos with captions; swipe, tap or use arrow keys |
| 6 | **Voice messages** | WhatsApp-style cards to play recordings from loved ones |
| 7 | **Scratch card** | Scratch to reveal a surprise |
| 8 | **Finale** | Confetti, a closing wish, a "Happy Birthday" tune, Share and Replay buttons |

Extras: background music with a mute button, generated sound effects, vibration on taps, reduced-motion support, personalised links (`?name=Swaroo&from=Akka`), an optional countdown lock until the birthday, and an optional "days of being awesome" counter.

## 🛠️ Tech Stack

React 19, Vite, Tailwind CSS 3, Framer Motion, canvas-confetti. No backend. The sound effects and the "Happy Birthday" tune are generated in the browser with the Web Audio API.

## 📁 Project Structure

```
src/
├── config.js        # ⚙️ all customization: name, photos, order, toggles
├── App.jsx          # screen flow + background music
├── ui.jsx           # shared styles, background, rainbow text, helpers
├── sfx.js           # generated sound effects and the birthday tune
└── screens/         # GiftBox, Welcome, Cake, Note, Slideshow,
                     # Voices, Scratch, Finale, Locked
public/
├── music1.mp3       # background music (start and photos 1-6)
├── music2.mp3       # background music (photo 7 onward)
├── photos/          # your pictures
└── voice/           # voice messages (.mp3 or .m4a)
```

## 🎨 Customize

Search the project for `✏️` to jump to the text spots.

**`src/config.js`**
- `NAME` and `FROM`: names shown on the page (or use the link `?name=...&from=...`)
- `photos`: image `url` and caption `note` for each photo. Photos with `note: ''` move on by themselves after 3 seconds
- `SCRATCH`: title and text of the scratch card
- `VOICES`: names and file paths of the voice messages (empty list skips the screen)
- `FINALE_SONG`: path to your own song file; leave empty for the built-in tune
- `FLOW`: order of the screens
- `DOB` and `UNLOCK`: optional, leave as `null` to turn off

**Screen text**
- `src/screens/Welcome.jsx`: intro message
- `src/screens/Note.jsx`: heading and paragraphs
- `src/screens/Finale.jsx`: closing paragraph

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Build for production with `npm run build` (output goes to `dist/`).

## 🌐 Deploy

The site is fully static.

- **Vercel:** import the GitHub repo, keep the Vite defaults (build `npm run build`, output `dist`) and click Deploy.
- **Netlify:** link the repo with the same settings, or drag the `dist` folder into Netlify Drop.

The microphone on the cake screen only works on `https` or `localhost`, so test it on the deployed link rather than a local network address. Anyone who has the link can open the page and its photos, so share it only with people you trust.

## 📝 Notes

- iPhones and Safari can't play `.opus` or `.ogg` voice notes; convert recordings to `.mp3` or `.m4a`.
- Browsers only start audio after a tap, which is why the experience begins with the gift box.
- Keep individual files under 100 MB for GitHub.

## 📄 License

Built from an open-source birthday template released under the MIT License. See the `License` file.