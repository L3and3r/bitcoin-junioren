# Bitcoin voor Junioren

Interactieve web-app waarmee kinderen (8–14 jaar) spelenderwijs leren over geld, waarde en Bitcoin. Gebouwd voor gebruik op school, in een club, of thuis.

**Live:** https://L3and3r.github.io/bitcoin-junioren

---

## Wat zit erin?

6 modules, elk met 1–3 activiteiten:

| # | Module | Thema |
|---|--------|-------|
| 1 | Uitwisseling, Waarde & Prijs | Ruilen, schaarste, prijs vs. waarde |
| 2 | Tijd, Energie & Beloning | Werk/rust/spel, tijdvoorkeur, geduld |
| 3 | Analoog versus Digitaal | Technologie door de tijd, innovatie |
| 4 | Veiligheid & Privacy | Openbaar vs. privé, encryptie, geheime codes |
| 5 | Geldzaken | Sparen, investeren, budgetteren |
| 6 | Basisprincipes van Bitcoin | Satoshi, mining, blockchain, schaarste |

**Activiteittypen:** quiz (met gerandomiseerde antwoordvolgorde), sorteren, koppelen, waar/niet waar, categoriseren, cijfercode kraken, mining-spel, woordkraker.

Voortgang en badges worden opgeslagen in `localStorage`. Elke speler voert bij de start een naam in. Met "Nieuwe speler starten" wordt alles gewist zodat het volgende kind meteen kan beginnen.

---

## Lokaal draaien

```bash
npm install
npm start
```

Open http://localhost:3000 in de browser.

## Deployen naar GitHub Pages

```bash
npm run deploy
```

Dit bouwt de app en pusht naar de `gh-pages`-branch. De live URL staat ingesteld in `package.json` via de `homepage`-sleutel.

---

## Projectstructuur

```
src/
  data/modules.js          # Alle content: vragen, antwoorden, activiteiten
  activities/              # QuizActivity, SortActivity, MatchActivity, ...
  components/              # Confetti, BadgeUnlock, ProgressDots
  views/ModuleView.jsx     # Module-navigatie en activiteiten-flow
  utils/storage.js         # localStorage helpers
  styles/shared.js         # Gedeelde stijlen
  BitcoinVoorJunioren.jsx  # Root component
```

Nieuwe vragen of modules toevoegen? Pas alleen `src/data/modules.js` aan — geen andere bestanden nodig.

---

## Licentie

Gebaseerd op het lesmateriaal van [My First Bitcoin](https://myfirstbitcoin.io/) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
