# Bitcoin voor Junioren ₿

Een interactieve web-app waarmee kinderen van 8 tot 14 jaar spelenderwijs leren over geld, waarde en Bitcoin. Beschikbaar in **42 talen**.

**🌐 Live:** https://L3and3r.github.io/bitcoin-junioren

---

## Voor ouders, leraren en begeleiders

De app is ontworpen voor kinderen die voor het eerst kennismaken met economische basisconcepten en Bitcoin. Je hebt geen technische kennis nodig om hem te gebruiken.

### Hoe werkt het?

1. Open de app op je telefoon, tablet of computer
2. Kies de gewenste taal rechtsboven
3. Voer een naam in — de voortgang wordt automatisch opgeslagen
4. Kies een module en start een activiteit

Elke module heeft een duidelijk thema en bestaat uit korte activiteiten van 5–10 minuten. Na het afronden van alle activiteiten in een module verdient de speler een badge.

Met de knop **"Nieuwe speler starten"** onderin wordt alles gewist, zodat het volgende kind meteen kan beginnen.

### Modules

| # | Onderwerp | Wat leer je? |
|---|-----------|--------------|
| 1 | Uitwisseling, Waarde & Prijs | Waarom ruilen lastig is, wat iets waard maakt, en hoe geld dat oplost |
| 2 | Tijd, Energie & Beloning | Het verschil tussen werk, rust en spel; geduld en tijdvoorkeur |
| 3 | Analoog versus Digitaal | Hoe technologie evolueert en wat Bitcoin gemeen heeft met oude ruilmiddelen |
| 4 | Veiligheid & Privacy | Wat privé is, hoe encryptie werkt, geheime codes kraken |
| 5 | Geldzaken | Sparen, investeren, budgetteren en eerlijke regels |
| 6 | Basisprincipes van Bitcoin | Satoshi Nakamoto, mining, blockchain en schaarste |

### Activiteittypen

De app bevat acht soorten activiteiten zodat het afwisselend blijft:

- **Quiz** — meerkeuzevragen met uitleg bij elk antwoord
- **Sorteren** — voorwerpen op volgorde zetten
- **Koppelen** — oud ↔ nieuw matchen
- **Waar of niet waar** — snel beslissen
- **Categoriseren** — items slepen naar de juiste groep
- **Cijfercode kraken** — geheime woorden ontcijferen met een schuifwiel
- **Mining-spel** — Bitcoin-memory
- **Woordkraker** — door-elkaar-gehusselde woorden ontwarren

### Taalondersteuning

De app is beschikbaar in 42 talen, waaronder Arabic, Bahasa Indonesia, Bengali, Bulgarian, Chinese, Czech, Deutsch, English, Español, Français, Gujarati, Hausa, Hebrew, Hindi, Hungarian, isiXhosa, Italiano, Japanese, Korean, Malay, Marathi, Nederlands, Punjabi, Polish, Português, Romanian, Russian, Serbian, Swahili, Swedish, Tagalog, Tamil, Telugu, Tajik, Thai, Turkish, Ukrainian, Urdu en Vietnamese.

Rechts-naar-links talen (Arabic, Farsi, Hebrew, Urdu) worden automatisch gespiegeld.

---

## Voor developers

### Technische stack

- **React 19** (Create React App)
- **i18n** via dynamische imports — elke taal laadt als apart chunk (~8 kB gzip)
- **localStorage** voor voortgang en naam
- **GitHub Pages** voor hosting (`gh-pages` branch)
- Geen backend, geen database, geen dependencies buiten React

### Lokaal draaien

```bash
git clone https://github.com/L3and3r/bitcoin-junioren.git
cd bitcoin-junioren
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Projectstructuur

```
src/
  activities/          # Een component per activiteitstype
    QuizActivity.jsx
    SortActivity.jsx
    MatchActivity.jsx
    CipherActivity.jsx
    MiningActivity.jsx
    TrueFalseActivity.jsx
    CategorizeActivity.jsx
    ScrambleActivity.jsx
    ActivityView.jsx   # Router die het juiste type laadt
  components/
    BadgeUnlock.jsx    # Animatie bij badge
    Confetti.jsx
    DonateButton.jsx   # Lightning LNURL donatie + QR
    LanguageSelector.jsx
    ProgressDots.jsx
  contexts/
    LanguageContext.jsx  # Taalstatus, RTL, document.title
  i18n/
    nl.json            # Bronbestand (Nederlands)
    en.json            # Engels
    ar.json            # Arabic
    ...                # 42 bestanden totaal
  views/
    ModuleView.jsx     # Module-overzicht en activiteiten-flow
  styles/shared.js     # Gedeelde stijlobjecten
  utils/storage.js     # localStorage helpers
  BitcoinVoorJunioren.jsx  # Root component
scripts/
  translate.js         # Genereert taalbestanden via Claude API
  patch-translations.js  # Voegt ontbrekende sleutels toe aan bestaande bestanden
```

### Taalbestanden aanpassen of toevoegen

`src/i18n/nl.json` is het bronbestand. Alle andere talen zijn daarvan afgeleid.

**Nieuwe taal toevoegen:**

```bash
ANTHROPIC_API_KEY=sk-ant-... node scripts/translate.js [taalcode]
```

Zonder taalcode worden alle 42 talen (opnieuw) gegenereerd. Al bestaande bestanden worden overgeslagen.

**Ontbrekende sleutels patchen** (bijv. na uitbreiding van nl.json):

```bash
ANTHROPIC_API_KEY=sk-ant-... node scripts/patch-translations.js
```

Dit vergelijkt elk taalbestand met nl.json en vertaalt alleen de ontbrekende sleutels.

**Taalcodes** komen overeen met de mappen in het [My First Bitcoin curriculum](https://github.com/MyFirstBitcoin/mfb-curriculum/tree/main/programs/bitcoin-for-juniors).

### Content aanpassen

Alle quizvragen, module-titels, badges en activiteiten staan in de vertaalbestanden (`src/i18n/*.json`). Pas `nl.json` aan en run daarna `patch-translations.js` om de wijziging door te zetten naar alle talen.

### Deployen

```bash
npm run deploy
```

Bouwt de app en pusht naar de `gh-pages` branch. De live URL staat ingesteld in `package.json` via de `homepage` sleutel.

### PWA

De app is installeerbaar als Progressive Web App. Op Android/iOS: open de app in de browser → "Voeg toe aan beginscherm". Het app-icoon en de laadschermkleur zijn ingesteld in `public/manifest.json`.

---

## Doneren

Vind je de app waardevol? Doneer via Lightning:

**LNURL:** `LNURL1DP68GURN8GHJ7MR9V9HXGETJ9ESH57NPD4HJUMN9WSHKCMN4WFK8QT6VTFD8GNZG88AEN3`

Of klik op "⚡ Doneer sats" onderin de app.

---

## Licentie

Gebaseerd op het lesmateriaal van [My First Bitcoin](https://myfirstbitcoin.io/) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
