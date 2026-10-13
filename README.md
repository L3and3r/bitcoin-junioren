# Bitcoin for Juniors ₿

[Nederlandse versie](README.nl.md)

An interactive web app that teaches kids aged 8 to 14 about money, value, and Bitcoin through play. Available in **42 languages**.

**🌐 Live:** https://L3and3r.github.io/bitcoin-junioren
**📦 Gittr:** https://gittr.space/npub152rm3l97pzc3pjmg8l33v6vcuf027s540tprzymtcv4rnxlqrecqkn6k8c/bitcoin-junioren

---

## For parents, teachers, and mentors

The app is designed for kids encountering basic economic concepts and Bitcoin for the first time. No technical knowledge is needed to use it.

### How does it work?

1. Open the app on your phone, tablet, or computer
2. Pick the desired language in the top right
3. Enter a name — progress is saved automatically
4. Choose a module and start an activity

Each module has a clear theme and consists of short 5–10 minute activities. After completing all the activities in a module, the player earns a badge.

The **"Start new player"** button at the bottom clears everything, so the next kid can start right away.

### Modules

| # | Topic | What you learn |
|---|-------|-----------------|
| 1 | Exchange, Value & Price | Why bartering is hard, what makes something valuable, and how money solves that |
| 2 | Time, Energy & Reward | The difference between work, rest, and play; patience and time preference |
| 3 | Analog versus Digital | How technology evolves and what Bitcoin has in common with old means of exchange |
| 4 | Security & Privacy | What's private, how encryption works, cracking secret codes |
| 5 | Money Matters | Saving, investing, budgeting, and fair rules |
| 6 | Bitcoin Basics | Satoshi Nakamoto, mining, blockchain, and scarcity |

### Activity types

The app includes eight kinds of activities to keep things varied:

- **Quiz** — multiple-choice questions with an explanation for each answer
- **Sort** — put items in order
- **Match** — match old ↔ new
- **True or false** — decide quickly
- **Categorize** — drag items into the right group
- **Crack the cipher** — decode secret words with a cipher wheel
- **Mining game** — Bitcoin memory
- **Word scramble** — unscramble jumbled words

### Language support

The app is available in 42 languages, including Arabic, Bahasa Indonesia, Bengali, Bulgarian, Chinese, Czech, Deutsch, English, Español, Français, Gujarati, Hausa, Hebrew, Hindi, Hungarian, isiXhosa, Italiano, Japanese, Korean, Malay, Marathi, Nederlands, Punjabi, Polish, Português, Romanian, Russian, Serbian, Swahili, Swedish, Tagalog, Tamil, Telugu, Tajik, Thai, Turkish, Ukrainian, Urdu, and Vietnamese.

Right-to-left languages (Arabic, Farsi, Hebrew, Urdu) are mirrored automatically.

---

## For developers

### Tech stack

- **React 19** (Vite, tests with Vitest)
- **i18n** via dynamic imports — each language loads as a separate chunk (~8 kB gzip)
- **localStorage** for progress and name
- **GitHub Pages** for hosting (`gh-pages` branch)
- No backend, no database, no dependencies outside React

### Running locally

```bash
git clone https://github.com/L3and3r/bitcoin-junioren.git
cd bitcoin-junioren
npm install
npm start
```

Open [http://localhost:3000/bitcoin-junioren/](http://localhost:3000/bitcoin-junioren/).

### Project structure

```
src/
  activities/          # One component per activity type
    QuizActivity.jsx
    SortActivity.jsx
    MatchActivity.jsx
    CipherActivity.jsx
    MiningActivity.jsx
    TrueFalseActivity.jsx
    CategorizeActivity.jsx
    ScrambleActivity.jsx
    ActivityView.jsx   # Router that loads the right type
  components/
    BadgeUnlock.jsx    # Badge-earned animation
    Confetti.jsx
    DonateButton.jsx   # Lightning LNURL donation + QR
    LanguageSelector.jsx
    ProgressDots.jsx
  contexts/
    LanguageContext.jsx  # Language state, RTL, document.title
  i18n/
    nl.json            # Source file (Dutch)
    en.json            # English
    ar.json            # Arabic
    ...                # 42 files total
  views/
    ModuleView.jsx     # Module overview and activity flow
  styles/shared.js     # Shared style objects
  utils/storage.js     # localStorage helpers
  BitcoinVoorJunioren.jsx  # Root component
scripts/
  translate.js         # Generates language files via the Claude API
  patch-translations.js  # Adds missing keys to existing files
```

### Adding or changing language files

`src/i18n/nl.json` is the source file. All other languages are derived from it.

**Adding a new language:**

```bash
ANTHROPIC_API_KEY=sk-ant-... node scripts/translate.js [language-code]
```

Without a language code, all 42 languages are (re)generated. Existing files are skipped.

**Patching missing keys** (e.g. after expanding nl.json):

```bash
ANTHROPIC_API_KEY=sk-ant-... node scripts/patch-translations.js
```

This compares each language file against nl.json and translates only the missing keys.

**Language codes** match the folders in the [My First Bitcoin curriculum](https://github.com/MyFirstBitcoin/mfb-curriculum/tree/main/programs/bitcoin-for-juniors).

### Editing content

All quiz questions, module titles, badges, and activities live in the translation files (`src/i18n/*.json`). Edit `nl.json`, then run `patch-translations.js` to propagate the change to all languages.

### Deploying

```bash
npm run deploy
```

Builds the app and pushes it to the `gh-pages` branch. The path the app is served from is set in `vite.config.mjs` via the `base` option.

### PWA

The app is installable as a Progressive Web App. On Android/iOS: open the app in the browser → "Add to home screen". The app icon and splash screen color are set in `public/manifest.json`.

---

## Donate

Find the app valuable? Donate via Lightning:

**LNURL:** `LNURL1DP68GURN8GHJ7MR9V9HXGETJ9ESH57NPD4HJUMN9WSHKCMN4WFK8QT6VTFD8GNZG88AEN3`

Or tap "⚡ Donate sats" at the bottom of the app.

---

## License

Based on learning materials from [My First Bitcoin](https://myfirstbitcoin.io/) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
