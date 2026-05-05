import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
// BITCOIN VOOR JUNIOREN — v2.0
// Interactieve leer-app voor kinderen (8-12 jaar)
// Gebaseerd op het My First Bitcoin curriculum (CC BY-SA 4.0)
// ═══════════════════════════════════════════════════════════

// ── PERSISTENCE ──
const STORAGE_KEY = "btc-junioren-v2";
const loadProgress = () => {
  try {
    const d = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return d || { completed: [], badges: [], name: "" };
  } catch { return { completed: [], badges: [], name: "" }; }
};
const saveProgress = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
};

// ── CONTENT DATA ──
const MODULES = [
  {
    id: 1, title: "Uitwisseling, Waarde & Prijs", icon: "⚓",
    color: "#D97706", bg: "#FEF3C7",
    summary: "Waarde hangt af van wat je nodig hebt. Prijs is hoeveel iets kost. Geld lost het ruilprobleem op.",
    description: "Ontdek waarom we geld gebruiken en wat dingen écht waard zijn!",
    badge: "🏝️ Eilandhandelaar",
    activities: [
      {
        type: "quiz", title: "Eiland Overleven", intro: "Je bent schipbreukeling op een onbewoond eiland!",
        questions: [
          { q: "Je spoelt aan op een verlaten eiland. Wat is het meest waard?", options: ["💎 Diamant", "🔪 Een kapmes", "📱 Smartphone", "💰 100 euro"], correct: 1, explanation: "Op een eiland kun je met een kapmes hout hakken, eten snijden en een schuilplaats bouwen. Geld en diamanten zijn daar nutteloos!" },
          { q: "Je hebt 5 hengels maar geen tent. Je buurman heeft 3 tenten maar geen hengel. Wat doen jullie?", options: ["Allebei wachten", "Ruilen: een hengel voor een tent!", "Niks, pech gehad", "Samen huilen"], correct: 1, explanation: "Ruilen is de oudste manier om handel te drijven! Je geeft wat je over hebt voor wat je nodig hebt." },
          { q: "Waarom is ruilen soms heel lastig?", options: ["Omdat het saai is", "Omdat je iemand moet vinden die precies wil wat jij hebt", "Omdat het verboden is", "Omdat spullen te zwaar zijn"], correct: 1, explanation: "Dit heet het 'samenvallen van behoeften'. Geld lost dit probleem op — iedereen accepteert geld!" },
          { q: "Schelpen werden vroeger als geld gebruikt. Wat maakt iets goed geld?", options: ["Het moet mooi zijn", "Het moet schaars, draagbaar en door iedereen geaccepteerd zijn", "Het moet eetbaar zijn", "Het moet van de overheid komen"], correct: 1, explanation: "Goed geld is schaars (niet eindeloos te vinden), makkelijk mee te nemen, en iedereen moet het als betaling accepteren." },
          { q: "Een flesje water kost €1 in de supermarkt. In de woestijn biedt iemand je €100 voor hetzelfde flesje. Waarom?", options: ["De winkel was duurder", "Omdat water in de woestijn veel schaarser en belangrijker is", "Het is ander water", "De woestijn is ver weg"], correct: 1, explanation: "Schaarste verandert waarde! Hoe minder er van iets is en hoe harder je het nodig hebt, hoe meer het waard wordt." },
          { q: "Wat is het verschil tussen prijs en waarde?", options: ["Er is geen verschil", "Prijs is hoeveel iets kost, waarde is hoe belangrijk iets voor jou is", "Prijs is altijd hoger dan waarde", "Waarde gaat alleen over geld"], correct: 1, explanation: "Een tekening van je kind heeft misschien geen prijs maar enorme waarde. Prijs en waarde zijn niet hetzelfde!" },
        ]
      },
      {
        type: "sort", title: "Prijslijn", intro: "Zet de voorwerpen in de juiste volgorde van goedkoop naar duur!",
        items: [
          { name: "🍎 Appel", value: 1 }, { name: "📖 Boek", value: 2 },
          { name: "⚽ Voetbal", value: 3 }, { name: "📱 Telefoon", value: 4 },
          { name: "🛵 Scooter", value: 5 }, { name: "🏠 Huis", value: 6 },
        ]
      },
    ]
  },
  {
    id: 2, title: "Tijd, Energie & Beloning", icon: "⚡",
    color: "#0D9488", bg: "#CCFBF1",
    summary: "Energie is beperkt. Balans tussen werk, rust en spel is belangrijk. Geduld leidt tot betere resultaten.",
    description: "Hoe gebruik jij je tijd en energie? En waarom is wachten soms slimmer?",
    badge: "⏳ Tijdmeester",
    activities: [
      {
        type: "categorize", title: "Werk, Rust of Spel?", intro: "Sleep elke activiteit naar de juiste categorie!",
        categories: ["💼 Werk", "😴 Rust", "🎮 Spel"],
        items: [
          { name: "Huiswerk maken", cat: 0 }, { name: "Slapen", cat: 1 },
          { name: "Voetballen", cat: 2 }, { name: "Kamer opruimen", cat: 0 },
          { name: "Een boek lezen", cat: 1 }, { name: "Tekenen", cat: 2 },
          { name: "Tafel dekken", cat: 0 }, { name: "Dutje doen", cat: 1 },
          { name: "Gamen", cat: 2 }, { name: "Boodschappen doen", cat: 0 },
          { name: "Muziek luisteren", cat: 1 }, { name: "Naar het park", cat: 2 },
        ]
      },
      {
        type: "quiz", title: "Tijdvoorkeur", intro: "Kies jij voor NU of voor LATER?",
        questions: [
          { q: "In het verhaal van De drie biggetjes: welk huis bleef staan?", options: ["🌾 Stro (snel gebouwd)", "🪵 Hout (gemiddeld)", "🧱 Baksteen (kostte het meeste tijd)"], correct: 2, explanation: "Het bakstenen huis kostte de meeste tijd en moeite, maar was het enige dat bleef staan. Geduld loont!" },
          { q: "Wat betekent 'lage tijdvoorkeur'?", options: ["Je wilt alles NU", "Je bent bereid te wachten op iets beters", "Je hebt geen horloge", "Je slaapt veel"], correct: 1, explanation: "Lage tijdvoorkeur = bereid om te wachten voor een beter resultaat. Zoals de big die een stenen huis bouwde!" },
          { q: "Je krijgt 1 snoepje nu, of 3 snoepjes als je 10 minuten wacht. Wat is de slimste keuze?", options: ["1 snoepje NU!", "Wachten: 3 snoepjes > 1 snoepje", "Snoep is ongezond", "Wegrennen"], correct: 1, explanation: "Dit is de beroemde marshmallow-test! Kinderen die konden wachten hadden later vaak betere resultaten op school." },
          { q: "Je hebt een belangrijke toets morgen. Wat is lage tijdvoorkeur?", options: ["Nu gamen en morgen leren", "Vandaag studeren zodat je morgen goed scoort", "De toets overslaan", "Hopen op geluk"], correct: 1, explanation: "Nu iets moeilijks doen (studeren) zodat je later iets goeds krijgt (een goed cijfer) — dat is lage tijdvoorkeur." },
          { q: "Wat gebeurt er als je al je energie 's ochtends opmaakt?", options: ["Je wordt sterker", "Je hebt niks meer over voor de rest van de dag", "Je krijgt superkrachten", "Niks bijzonders"], correct: 1, explanation: "Energie is beperkt! Slim verdelen is belangrijk — net als geld." },
        ]
      },
    ]
  },
  {
    id: 3, title: "Analoog versus Digitaal", icon: "🔄",
    color: "#7C3AED", bg: "#EDE9FE",
    summary: "Technologie verandert steeds. Elke uitvinding lost een probleem op. Niet alles nieuw is automatisch beter.",
    description: "Van postduif tot internet — hoe technologie de wereld verandert!",
    badge: "🚀 Techpionier",
    activities: [
      {
        type: "match", title: "Oud ↔ Nieuw", intro: "Koppel elke oude technologie aan de moderne versie!",
        pairs: [
          { old: "✉️ Brief", new: "📧 E-mail" },
          { old: "📞 Draaitelefoon", new: "📱 Smartphone" },
          { old: "🗺️ Papieren kaart", new: "📍 GPS" },
          { old: "📷 Filmrolletje", new: "📸 Digitale camera" },
          { old: "📰 Krant", new: "🌐 Nieuwswebsite" },
          { old: "💰 Muntgeld", new: "₿ Bitcoin" },
        ]
      },
      {
        type: "quiz", title: "Bedenk de Toekomst", intro: "Hoe zou technologie er over 20 jaar uitzien?",
        questions: [
          { q: "Waarom veranderen technologieën door de tijd heen?", options: ["Omdat oude dingen stuk gaan", "Omdat mensen problemen oplossen met nieuwe uitvindingen", "Omdat de overheid het wil", "Zonder reden"], correct: 1, explanation: "Elke uitvinding lost een probleem op. De auto loste het probleem op dat paarden langzaam en moe worden!" },
          { q: "Is nieuwe technologie ALTIJD beter dan oude?", options: ["Ja, altijd", "Nee, soms is het oude beter of betrouwbaarder", "Nieuwe tech bestaat niet", "Alleen als het duurder is"], correct: 1, explanation: "Een papieren boek heeft geen batterij nodig! Soms zijn oude oplossingen nog steeds slim." },
          { q: "Bitcoin is digitaal geld. Wat heeft het gemeen met oude schelpen?", options: ["Allebei komen uit de zee", "Allebei zijn schaars en worden gebruikt als ruilmiddel", "Niks", "Allebei zijn ze gratis"], correct: 1, explanation: "Zowel schelpen als Bitcoin zijn schaars (er is een beperkte hoeveelheid) en worden als ruilmiddel gebruikt." },
          { q: "Wat is innovatie?", options: ["Iets nieuws kopen", "Een slimme verbetering of uitvinding die een probleem oplost", "Een moeilijk woord voor niks", "Alleen voor wetenschappers"], correct: 1, explanation: "Innovatie = een nieuwe of betere oplossing voor een bestaand probleem. Iedereen kan innoveren!" },
        ]
      },
    ]
  },
  {
    id: 4, title: "Veiligheid & Privacy", icon: "🛡️",
    color: "#DC2626", bg: "#FEE2E2",
    summary: "Jij bepaalt welke informatie je deelt. Codes beschermen berichten. Vertrouwen is niet altijd nodig als je encryptie hebt.",
    description: "Geheime codes, privacy en hoe je jezelf online beschermt!",
    badge: "🔐 Cypherpunk",
    activities: [
      {
        type: "truefalse", title: "Openbaar of Privé?", intro: "Is deze informatie openbaar of privé? Beslis snel!",
        statements: [
          { text: "Je wachtwoord", answer: false, label: "Privé!", explanation: "Een wachtwoord is altijd privé. Deel het nooit!" },
          { text: "Je naam op school", answer: true, label: "Openbaar", explanation: "Op school weet iedereen hoe je heet — dat is openbare informatie." },
          { text: "Je pincode", answer: false, label: "Privé!", explanation: "Je pincode is geheim — het beschermt je bankrekening." },
          { text: "Een park in de stad", answer: true, label: "Openbaar", explanation: "Een park is een openbare plek — iedereen mag er komen." },
          { text: "Je dagboek", answer: false, label: "Privé!", explanation: "Je dagboek is privé — alleen jij bepaalt wie het mag lezen." },
          { text: "De kleur van je fiets", answer: true, label: "Openbaar", explanation: "Iedereen kan zien welke kleur je fiets heeft." },
          { text: "Je thuisadres", answer: false, label: "Privé!", explanation: "Je adres deel je niet met vreemden — dat is privé-informatie." },
          { text: "Het weer vandaag", answer: true, label: "Openbaar", explanation: "Het weer is voor iedereen hetzelfde — volledig openbaar!" },
          { text: "Je Bitcoin-sleutel", answer: false, label: "Privé!", explanation: "Je privésleutel is het allerbelangrijkste geheim. Wie die heeft, heeft je bitcoin!" },
        ]
      },
      {
        type: "cipher", title: "Geheime Code", intro: "Kraak de geheime Bitcoin-woorden met het cijferwiel!",
      },
    ]
  },
  {
    id: 5, title: "Geldzaken", icon: "🏦",
    color: "#B45309", bg: "#FEF3C7",
    summary: "Geld kun je verdienen, sparen, investeren en uitgeven. Budgetteren is kiezen. Eerlijke regels zijn belangrijk.",
    description: "Verdienen, sparen, investeren — word een geldexpert!",
    badge: "💎 Geldwijze",
    activities: [
      {
        type: "quiz", title: "Slim met Geld", intro: "Test hoe slim jij bent met geldzaken!",
        questions: [
          { q: "Wat is sparen?", options: ["Geld direct uitgeven", "Geld opzij leggen voor later", "Geld weggooien", "Geld lenen van een vriend"], correct: 1, explanation: "Sparen = geld bewaren zodat je later iets groters of belangrijkers kunt kopen." },
          { q: "Wat is investeren?", options: ["Geld verstoppen", "Je geld of tijd ergens insteken zodat het later meer waard wordt", "Alles vandaag uitgeven", "Geld verbrandenderen"], correct: 1, explanation: "Investeren is je geld of tijd ergens in steken met de hoop dat het later meer waard wordt." },
          { q: "Je hebt 12 schelpen. Een tent kost 8 en een hengel kost 6. Kun je allebei kopen?", options: ["Ja!", "Nee, 8 + 6 = 14, en je hebt maar 12", "Alleen met korting", "Schelpen zijn geen geld"], correct: 1, explanation: "8 + 6 = 14, maar je hebt maar 12 schelpen. Je moet kiezen! Dat is budgetteren." },
          { q: "Bij een veiling gaat de prijs van een zeldzaam item steeds omhoog. Waarom?", options: ["De verkoper is gemeen", "Meerdere mensen willen het, maar er is er maar één (schaarste + vraag)", "Het item wordt steeds groter", "Omdat iemand vals speelt"], correct: 1, explanation: "Als veel mensen iets willen maar er weinig van is, stijgt de prijs. Dat is hoe vraag en aanbod werkt!" },
          { q: "Waarom zijn eerlijke regels bij geld belangrijk?", options: ["Dat zijn ze niet", "Zodat iedereen dezelfde kans krijgt", "Alleen voor kinderen", "Zodat het moeilijker wordt"], correct: 1, explanation: "Eerlijke regels zorgen dat niemand kan valsspelen en iedereen dezelfde kans heeft." },
          { q: "Wat is lenen?", options: ["Geld stelen", "Geld van iemand anders krijgen dat je later moet terugbetalen", "Geld sparen", "Geld verliezen"], correct: 1, explanation: "Lenen betekent dat je geld van iemand anders krijgt, maar het later moet terugbetalen — vaak met extra (rente)." },
        ]
      },
    ]
  },
  {
    id: 6, title: "Basisprincipes van Bitcoin", icon: "₿",
    color: "#EA580C", bg: "#FFF7ED",
    summary: "Bitcoin is schaars digitaal geld zonder tussenpersoon. Mining bevestigt transacties. Satoshi is anoniem gebleven.",
    description: "Het grote Bitcoin-avontuur: van Satoshi tot mining!",
    badge: "⛏️ Bitcoinminer",
    activities: [
      {
        type: "quiz", title: "Wie is Satoshi?", intro: "Ontdek het verhaal achter Bitcoin!",
        questions: [
          { q: "Wie heeft Bitcoin bedacht?", options: ["Elon Musk", "Satoshi Nakamoto", "De bank", "Google"], correct: 1, explanation: "Satoshi Nakamoto publiceerde in 2008 een 'white paper' met het idee voor Bitcoin. Niemand weet wie Satoshi echt is!" },
          { q: "Wat is een 'white paper'?", options: ["Een leeg blaadje", "Een document waarin je een nieuw idee uitlegt", "Een geheime brief", "Een schoolopdracht"], correct: 1, explanation: "Een white paper is een document waarin je een nieuw idee of oplossing presenteert aan de wereld." },
          { q: "Wat is de Genesis Block?", options: ["Een computerspel", "Het allereerste blok van Bitcoin", "Een soort steen", "Een geheim wachtwoord"], correct: 1, explanation: "Op 3 januari 2009 werd de Genesis Block gemaakt — het allereerste blok in de Bitcoin-blockchain." },
          { q: "Hoeveel bitcoins zullen er ooit bestaan?", options: ["Oneindig veel", "Maximaal 21 miljoen", "Precies 1 miljard", "Dat weet niemand"], correct: 1, explanation: "Er zullen nooit meer dan 21 miljoen bitcoins bestaan. Die schaarste is ingebouwd in de regels!" },
          { q: "Wat is 'minen' bij Bitcoin?", options: ["Graven in de grond", "Met computers puzzels oplossen om transacties te bevestigen", "Bitcoins printen", "Bitcoins tekenen"], correct: 1, explanation: "Miners gebruiken computers om wiskundige puzzels op te lossen. Als bewijs dat ze werk hebben gedaan, mogen ze transacties bevestigen." },
          { q: "Wat is Proof of Work?", options: ["Een rapport van school", "Bewijs dat iemand echt moeite heeft gedaan om iets te verdienen", "Een wachtwoord", "Een soort diploma"], correct: 1, explanation: "Proof of Work = bewijs van werk. Net als het dobbelsteenspel: iedereen volgt dezelfde regels en heeft dezelfde kans." },
          { q: "Waarom is Satoshi verdwenen?", options: ["Hij ging op vakantie", "Waarschijnlijk om Bitcoin echt van iedereen te laten zijn, zonder leider", "Hij werd boos", "Hij bestaat niet"], correct: 1, explanation: "Door te verdwijnen zorgde Satoshi ervoor dat Bitcoin niet van één persoon is. Het netwerk draait op regels, niet op een leider." },
        ]
      },
      {
        type: "mining", title: "Bitcoin Minen!", intro: "Vind gelijke paren om blokken te minen — net als echte miners!",
      },
      {
        type: "scramble", title: "Bitcoin Woordkraker", intro: "Ontwar de door-elkaar-gehusselde Bitcoin-woorden!",
        words: [
          { scrambled: "COINBIT", answer: "BITCOIN", hint: "Digitaal geld" },
          { scrambled: "SHATISO", answer: "SATOSHI", hint: "De mysterieuze uitvinder" },
          { scrambled: "KLOB", answer: "BLOK", hint: "Transacties zitten hierin" },
          { scrambled: "CHRAASS", answer: "SCHAARS", hint: "Er is niet veel van" },
          { scrambled: "NIJEM", answer: "MINEN", hint: "Puzzels oplossen met computers" },
          { scrambled: "TEWALL", answer: "WALLET", hint: "Hierin bewaar je bitcoin" },
        ]
      },
    ]
  },
];

// ═══════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════

const S = {
  heading: { fontFamily: "'Baloo 2', cursive", margin: 0, lineHeight: 1.2 },
  body: { fontFamily: "'Quicksand', sans-serif", margin: 0, lineHeight: 1.5 },
  card: (bg = "rgba(255,255,255,0.92)") => ({
    background: bg, borderRadius: 20, padding: "20px 18px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
  }),
  btn: (bg, size = 16) => ({
    padding: `${size * 0.7}px ${size * 1.8}px`, borderRadius: 14,
    border: "none", background: bg, color: "#fff",
    fontSize: size, fontWeight: 700, cursor: "pointer",
    fontFamily: "'Baloo 2', cursive",
    boxShadow: `0 4px 14px ${bg}55`,
    transition: "transform 0.15s, box-shadow 0.15s",
  }),
};

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} style={{
          position: "absolute", left: `${Math.random() * 100}%`, top: -10,
          width: 6 + Math.random() * 10, height: 6 + Math.random() * 10,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          backgroundColor: ["#F7931A","#0D9488","#7C3AED","#DC2626","#FBBF24","#2DD4BF"][i % 6],
          animation: `confFall ${1.2 + Math.random() * 1}s ${Math.random() * 0.5}s ease-out forwards`,
        }} />
      ))}
    </div>
  );
}

function ProgressDots({ total, current, color }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "8px 0" }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 24 : 10, height: 10, borderRadius: 5,
          background: i < current ? color : i === current ? color : "rgba(0,0,0,0.12)",
          opacity: i < current ? 0.5 : 1, transition: "all 0.3s",
        }} />
      ))}
    </div>
  );
}

function BadgeUnlock({ badge, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9998, backdropFilter: "blur(6px)",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 28, padding: "40px 32px",
        textAlign: "center", maxWidth: 320,
        animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🎖️</div>
        <h2 style={{ ...S.heading, fontSize: 24, color: "#1a1a2e", marginBottom: 4 }}>Badge Verdiend!</h2>
        <p style={{ ...S.body, fontSize: 22, fontWeight: 700, color: "#F7931A", marginBottom: 16 }}>{badge}</p>
        <p style={{ ...S.body, fontSize: 15, color: "#666", marginBottom: 20 }}>
          Je hebt alle activiteiten in deze module afgerond!
        </p>
        <button onClick={onClose} style={S.btn("#F7931A", 17)}>Geweldig!</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// ACTIVITY COMPONENTS
// ═══════════════════════════════════════

// ── QUIZ ──
function QuizActivity({ activity, color, onComplete }) {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [conf, setConf] = useState(false);
  const q = activity.questions[qi];

  const pick = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.correct) { setScore(s => s + 1); setConf(true); setTimeout(() => setConf(false), 1500); }
  };
  const next = () => {
    if (qi === activity.questions.length - 1) setDone(true);
    else { setQi(i => i + 1); setSel(null); }
  };

  if (done) {
    const pct = Math.round((score / activity.questions.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: 12 }}>
        <Confetti active={pct === 100} />
        <div style={{ fontSize: 56, marginBottom: 8 }}>{pct === 100 ? "🏆" : pct >= 60 ? "⭐" : "💪"}</div>
        <h3 style={{ ...S.heading, fontSize: 26, color: "#1a1a2e" }}>
          {pct === 100 ? "Alles goed!" : pct >= 60 ? "Goed bezig!" : "Blijf oefenen!"}
        </h3>
        <p style={{ ...S.body, fontSize: 20, fontWeight: 700, color, margin: "4px 0 20px" }}>
          {score} / {activity.questions.length} correct
        </p>
        <button onClick={onComplete} style={S.btn("#F7931A")}>Verder →</button>
      </div>
    );
  }

  return (
    <div>
      <Confetti active={conf} />
      <ProgressDots total={activity.questions.length} current={qi} color={color} />
      <div style={{ ...S.card(), margin: "12px 0" }}>
        <p style={{ ...S.heading, fontSize: 19, color: "#1a1a2e" }}>{q.q}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((o, i) => {
          let bg = "rgba(255,255,255,0.92)", brd = "2px solid rgba(0,0,0,0.06)";
          if (sel !== null) {
            if (i === q.correct) { bg = "#DCFCE7"; brd = "2px solid #22C55E"; }
            else if (i === sel) { bg = "#FEE2E2"; brd = "2px solid #EF4444"; }
          }
          return (
            <button key={i} onClick={() => pick(i)} style={{
              padding: "14px 16px", borderRadius: 14, border: brd, background: bg,
              cursor: sel !== null ? "default" : "pointer",
              fontSize: 16, ...S.body, fontWeight: 600, textAlign: "left",
              transition: "all 0.2s", color: "#1a1a2e",
            }}>{o}</button>
          );
        })}
      </div>
      {sel !== null && (
        <div style={{
          marginTop: 14, padding: 16, borderRadius: 16,
          background: sel === q.correct ? "#F0FDF4" : "#FEF2F2",
          animation: "slideUp 0.25s ease",
        }}>
          <p style={{ ...S.body, fontSize: 14, color: "#1a1a2e" }}>
            {sel === q.correct ? "✅ " : "❌ "}{q.explanation}
          </p>
          <button onClick={next} style={{ ...S.btn(color, 15), marginTop: 10 }}>
            {qi === activity.questions.length - 1 ? "Resultaat" : "Volgende →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── SORT ──
function SortActivity({ activity, color, onComplete }) {
  const [items, setItems] = useState(() => [...activity.items].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);
  const correct = items.every((it, i) => it.value === i + 1);

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const n = [...items]; [n[i], n[j]] = [n[j], n[i]]; setItems(n); setChecked(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", ...S.body, fontSize: 13, color: "#888", marginBottom: 10 }}>
        <span>💰 Goedkoop</span><span>💎 Duur</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((it, i) => (
          <div key={it.name} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 14px", borderRadius: 14,
            background: checked ? (it.value === i + 1 ? "#DCFCE7" : "#FEE2E2") : "rgba(255,255,255,0.9)",
            border: checked ? (it.value === i + 1 ? "2px solid #22C55E" : "2px solid #EF4444") : "2px solid rgba(0,0,0,0.06)",
            ...S.body, fontSize: 17, fontWeight: 600, transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <button onClick={() => move(i, -1)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 12, padding: 0 }}>▲</button>
              <button onClick={() => move(i, 1)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 12, padding: 0 }}>▼</button>
            </div>
            <span>{it.name}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center" }}>
        <button onClick={() => setChecked(true)} style={S.btn(color)}>Controleer</button>
        {checked && <button onClick={onComplete} style={S.btn("#F7931A")}>Verder →</button>}
      </div>
      {checked && <p style={{ ...S.heading, textAlign: "center", marginTop: 10, fontSize: 18, color: correct ? "#22C55E" : "#EF4444" }}>
        {correct ? "🎉 Perfect!" : "Bijna! Pas de volgorde aan."}
      </p>}
    </div>
  );
}

// ── MATCH ──
function MatchActivity({ activity, color, onComplete }) {
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);
  const shuffled = useRef([...activity.pairs].sort(() => Math.random() - 0.5)).current;
  const allDone = matched.length === activity.pairs.length;

  const clickOld = (i) => { if (!matched.includes(i)) { setSel(i); setWrong(null); } };
  const clickNew = (ni) => {
    if (sel === null) return;
    if (activity.pairs[sel].new === shuffled[ni].new) {
      setMatched(m => [...m, sel]); setSel(null);
    } else { setWrong(ni); setTimeout(() => setWrong(null), 500); }
  };

  return (
    <div>
      <p style={{ ...S.heading, fontSize: 16, textAlign: "center", color: "#888", marginBottom: 10 }}>
        Klik eerst OUD, dan NIEUW ({matched.length}/{activity.pairs.length})
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <p style={{ ...S.heading, fontSize: 14, textAlign: "center", color: "#92400E", marginBottom: 6 }}>🏛️ Oud</p>
          {activity.pairs.map((p, i) => {
            const done = matched.includes(i);
            return (
              <button key={i} onClick={() => clickOld(i)} style={{
                width: "100%", padding: "11px 8px", marginBottom: 6, borderRadius: 12,
                border: done ? "2px solid #22C55E" : sel === i ? `2px solid ${color}` : "2px solid rgba(0,0,0,0.06)",
                background: done ? "#DCFCE7" : sel === i ? `${color}15` : "rgba(255,255,255,0.85)",
                ...S.body, fontSize: 15, fontWeight: 600, cursor: done ? "default" : "pointer",
                opacity: done ? 0.5 : 1, transition: "all 0.2s",
              }}>{p.old}</button>
            );
          })}
        </div>
        <div>
          <p style={{ ...S.heading, fontSize: 14, textAlign: "center", color: "#1E40AF", marginBottom: 6 }}>🚀 Nieuw</p>
          {shuffled.map((p, i) => {
            const done = matched.some(mi => activity.pairs[mi].new === p.new);
            return (
              <button key={i} onClick={() => clickNew(i)} style={{
                width: "100%", padding: "11px 8px", marginBottom: 6, borderRadius: 12,
                border: done ? "2px solid #22C55E" : wrong === i ? "2px solid #EF4444" : "2px solid rgba(0,0,0,0.06)",
                background: done ? "#DCFCE7" : wrong === i ? "#FEE2E2" : "rgba(255,255,255,0.85)",
                ...S.body, fontSize: 15, fontWeight: 600, cursor: done ? "default" : "pointer",
                opacity: done ? 0.5 : 1, transition: "all 0.2s",
                animation: wrong === i ? "shake 0.35s ease" : "none",
              }}>{p.new}</button>
            );
          })}
        </div>
      </div>
      {allDone && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Confetti active={true} />
          <p style={{ ...S.heading, fontSize: 22, color: "#22C55E" }}>🎉 Alles gekoppeld!</p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 8 }}>Verder →</button>
        </div>
      )}
    </div>
  );
}

// ── TRUE/FALSE ──
function TrueFalseActivity({ activity, color, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);
  const st = activity.statements[idx];

  const answer = (val) => {
    if (feedback) return;
    const correct = val === st.answer;
    if (correct) setScore(s => s + 1);
    setFeedback({ correct, explanation: st.explanation });
  };
  const next = () => {
    if (idx === activity.statements.length - 1) setDone(true);
    else { setIdx(i => i + 1); setFeedback(null); }
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: 16 }}>
        <Confetti active={score === activity.statements.length} />
        <div style={{ fontSize: 56, marginBottom: 8 }}>{score === activity.statements.length ? "🏆" : "⭐"}</div>
        <h3 style={{ ...S.heading, fontSize: 24, color: "#1a1a2e" }}>{score} / {activity.statements.length} goed!</h3>
        <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 16 }}>Verder →</button>
      </div>
    );
  }

  return (
    <div>
      <ProgressDots total={activity.statements.length} current={idx} color={color} />
      <div style={{ ...S.card(), textAlign: "center", margin: "16px 0" }}>
        <p style={{ ...S.heading, fontSize: 22, color: "#1a1a2e" }}>{st.text}</p>
      </div>
      {!feedback ? (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => answer(true)} style={{
            ...S.btn("#22C55E", 18), padding: "18px 32px", borderRadius: 18, flex: 1, maxWidth: 160,
          }}>🌍 Openbaar</button>
          <button onClick={() => answer(false)} style={{
            ...S.btn("#DC2626", 18), padding: "18px 32px", borderRadius: 18, flex: 1, maxWidth: 160,
          }}>🔐 Privé</button>
        </div>
      ) : (
        <div style={{
          padding: 16, borderRadius: 16, animation: "slideUp 0.25s ease",
          background: feedback.correct ? "#F0FDF4" : "#FEF2F2",
        }}>
          <p style={{ ...S.body, fontSize: 15 }}>
            {feedback.correct ? "✅ Goed! " : "❌ Niet helemaal. "}{feedback.explanation}
          </p>
          <button onClick={next} style={{ ...S.btn(color, 15), marginTop: 10 }}>Volgende →</button>
        </div>
      )}
    </div>
  );
}

// ── CATEGORIZE ──
function CategorizeActivity({ activity, color, onComplete }) {
  const [remaining, setRemaining] = useState(() => [...activity.items].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState(activity.categories.map(() => []));
  const [checked, setChecked] = useState(false);

  const place = (catIdx) => {
    if (remaining.length === 0 || checked) return;
    const item = remaining[0];
    const newPlaced = placed.map((arr, i) => i === catIdx ? [...arr, item] : arr);
    setPlaced(newPlaced);
    setRemaining(r => r.slice(1));
  };

  const score = placed.flat().filter(it => it.cat === activity.categories.indexOf(
    activity.categories[placed.findIndex(arr => arr.includes(it))]
  )).length;

  const totalCorrect = placed.reduce((sum, arr, catIdx) =>
    sum + arr.filter(it => it.cat === catIdx).length, 0
  );

  return (
    <div>
      {remaining.length > 0 && !checked && (
        <div style={{ ...S.card(), textAlign: "center", marginBottom: 14 }}>
          <p style={{ ...S.body, fontSize: 13, color: "#888", marginBottom: 4 }}>
            Nog {remaining.length} over — waar hoort dit?
          </p>
          <p style={{ ...S.heading, fontSize: 20, color: "#1a1a2e" }}>{remaining[0].name}</p>
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        {activity.categories.map((cat, ci) => (
          <button key={ci} onClick={() => place(ci)} style={{
            flex: 1, padding: 10, borderRadius: 14, minHeight: 120,
            border: `2px solid ${["#D97706","#0D9488","#7C3AED"][ci]}33`,
            background: `${["#FEF3C7","#CCFBF1","#EDE9FE"][ci]}`,
            cursor: remaining.length > 0 && !checked ? "pointer" : "default",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            <p style={{ ...S.heading, fontSize: 13, color: "#1a1a2e", marginBottom: 6 }}>{cat}</p>
            {placed[ci].map((it, ii) => (
              <span key={ii} style={{
                ...S.body, fontSize: 11, fontWeight: 600,
                background: checked ? (it.cat === ci ? "#DCFCE7" : "#FEE2E2") : "#fff",
                padding: "3px 8px", borderRadius: 8, marginBottom: 3, display: "block",
                border: checked ? (it.cat === ci ? "1px solid #22C55E" : "1px solid #EF4444") : "1px solid rgba(0,0,0,0.06)",
              }}>{it.name}</span>
            ))}
          </button>
        ))}
      </div>
      {remaining.length === 0 && !checked && (
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <button onClick={() => setChecked(true)} style={S.btn(color)}>Controleer!</button>
        </div>
      )}
      {checked && (
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <p style={{ ...S.heading, fontSize: 20, color: totalCorrect === activity.items.length ? "#22C55E" : "#D97706" }}>
            {totalCorrect} / {activity.items.length} goed!
          </p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 8 }}>Verder →</button>
        </div>
      )}
    </div>
  );
}

// ── CIPHER ──
function CipherActivity({ activity, color, onComplete }) {
  const [shift, setShift] = useState(3);
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const encode = (t) => t.toUpperCase().split("").map(c => { const i = alpha.indexOf(c); return i === -1 ? c : alpha[(i + shift) % 26]; }).join("");
  const challenges = [
    { word: "BITCOIN", hint: "Digitaal geld" },
    { word: "SATOSHI", hint: "De mysterieuze bedenker" },
    { word: "SCHAARS", hint: "Er is niet veel van" },
    { word: "WALLET", hint: "Hierin bewaar je bitcoin" },
    { word: "BLOK", hint: "Transacties zitten hierin" },
  ];
  const [ci, setCi] = useState(0);
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState([]);
  const ch = challenges[ci];
  const allDone = solved.length === challenges.length;

  const check = () => {
    if (guess.toUpperCase().trim() === ch.word) {
      const ns = [...solved, ci]; setSolved(ns);
      if (ci < challenges.length - 1) { setCi(i => i + 1); setGuess(""); }
    }
  };

  return (
    <div>
      <div style={{ ...S.card(), marginBottom: 14, textAlign: "center" }}>
        <p style={{ ...S.heading, fontSize: 15, color: "#888", marginBottom: 6 }}>
          🔄 Cijferwiel — verschuiving: <strong>{shift}</strong>
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", marginBottom: 8 }}>
          {alpha.split("").map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, fontSize: 11, fontFamily: "monospace" }}>
              <span style={{ color: "#1E40AF", fontWeight: 700 }}>{c}</span>
              <span style={{ fontSize: 8, color: "#999" }}>↓</span>
              <span style={{ color: "#DC2626", fontWeight: 700 }}>{alpha[(i + shift) % 26]}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
          <button onClick={() => setShift(s => (s - 1 + 26) % 26)} style={{ width: 34, height: 34, borderRadius: "50%", border: `2px solid ${color}`, background: "#fff", fontSize: 16, cursor: "pointer" }}>←</button>
          <button onClick={() => setShift(s => (s + 1) % 26)} style={{ width: 34, height: 34, borderRadius: "50%", border: `2px solid ${color}`, background: "#fff", fontSize: 16, cursor: "pointer" }}>→</button>
        </div>
      </div>
      {!allDone ? (
        <div style={S.card()}>
          <p style={{ ...S.body, fontSize: 13, color: "#888", marginBottom: 2 }}>
            Opdracht {ci + 1}/{challenges.length} — Hint: {ch.hint}
          </p>
          <p style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 700, letterSpacing: 5, textAlign: "center", margin: "10px 0", color: "#DC2626" }}>
            {encode(ch.word)}
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            <input value={guess} onChange={e => setGuess(e.target.value)}
              onKeyDown={e => e.key === "Enter" && check()}
              placeholder="Typ het woord..."
              style={{ flex: 1, padding: "10px 12px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.08)", fontSize: 17, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 3 }}
            />
            <button onClick={check} style={S.btn(color, 15)}>Check</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 16 }}>
          <Confetti active={true} />
          <p style={{ fontSize: 48 }}>🔓</p>
          <p style={{ ...S.heading, fontSize: 22, color: "#22C55E" }}>Alle codes gekraakt!</p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 12 }}>Verder →</button>
        </div>
      )}
    </div>
  );
}

// ── MINING (MEMORY) ──
function MiningActivity({ activity, color, onComplete }) {
  const syms = ["⛏️","🔗","🪙","🔑","🛡️","📦","⚡","🌐"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards([...syms, ...syms].sort(() => Math.random() - 0.5).map((s, i) => ({ id: i, sym: s })));
  }, []);

  const flip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const nf = [...flipped, id]; setFlipped(nf); setMoves(m => m + 1);
    if (nf.length === 2) {
      if (cards[nf[0]].sym === cards[nf[1]].sym) { setMatched(m => [...m, ...nf]); setFlipped([]); }
      else setTimeout(() => setFlipped([]), 600);
    }
  };

  const done = matched.length === cards.length && cards.length > 0;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", ...S.body, fontSize: 14, fontWeight: 600, marginBottom: 10, color: "#666" }}>
        <span>⛏️ Gemined: {matched.length / 2}/{syms.length}</span>
        <span>🎯 Pogingen: {moves}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
        {cards.map(c => {
          const vis = flipped.includes(c.id) || matched.includes(c.id);
          return (
            <button key={c.id} onClick={() => flip(c.id)} style={{
              aspectRatio: "1", borderRadius: 14, border: "none",
              background: matched.includes(c.id) ? "#DCFCE7" : vis ? "#fff" : `linear-gradient(135deg, ${color}, ${color}CC)`,
              fontSize: 26, cursor: vis ? "default" : "pointer",
              boxShadow: matched.includes(c.id) ? "none" : "0 2px 8px rgba(0,0,0,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.25s",
            }}>{vis ? c.sym : "₿"}</button>
          );
        })}
      </div>
      {done && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Confetti active={true} />
          <p style={{ ...S.heading, fontSize: 22, color: "#22C55E" }}>🏆 Blok voltooid in {moves} pogingen!</p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 10 }}>Verder →</button>
        </div>
      )}
    </div>
  );
}

// ── WORD SCRAMBLE ──
function ScrambleActivity({ activity, color, onComplete }) {
  const [wi, setWi] = useState(0);
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState([]);
  const [wrong, setWrong] = useState(false);
  const w = activity.words[wi];
  const allDone = solved.length === activity.words.length;

  const check = () => {
    if (guess.toUpperCase().trim() === w.answer) {
      const ns = [...solved, wi]; setSolved(ns);
      setGuess("");
      if (wi < activity.words.length - 1) setWi(i => i + 1);
    } else { setWrong(true); setTimeout(() => setWrong(false), 500); }
  };

  return (
    <div>
      <ProgressDots total={activity.words.length} current={solved.length} color={color} />
      {!allDone ? (
        <div style={{ ...S.card(), textAlign: "center", margin: "12px 0" }}>
          <p style={{ ...S.body, fontSize: 13, color: "#888", marginBottom: 4 }}>
            Hint: {w.hint}
          </p>
          <div style={{
            display: "flex", gap: 8, justifyContent: "center", margin: "16px 0",
            animation: wrong ? "shake 0.35s ease" : "none",
          }}>
            {w.scrambled.split("").map((c, i) => (
              <div key={i} style={{
                width: 40, height: 48, borderRadius: 10,
                background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                border: `2px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                ...S.heading, fontSize: 22, color: color,
              }}>{c}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <input value={guess} onChange={e => setGuess(e.target.value)}
              onKeyDown={e => e.key === "Enter" && check()}
              placeholder="Typ het woord..."
              style={{ flex: 1, padding: "10px 12px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.08)", fontSize: 17, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 3 }}
            />
            <button onClick={check} style={S.btn(color, 15)}>Check</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 16 }}>
          <Confetti active={true} />
          <p style={{ fontSize: 48 }}>🧩</p>
          <p style={{ ...S.heading, fontSize: 22, color: "#22C55E" }}>Alle woorden gevonden!</p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 12 }}>Verder →</button>
        </div>
      )}
    </div>
  );
}

// ── Activity Router ──
function ActivityView({ activity, color, onComplete }) {
  const props = { activity, color, onComplete };
  switch (activity.type) {
    case "quiz": return <QuizActivity {...props} />;
    case "sort": return <SortActivity {...props} />;
    case "match": return <MatchActivity {...props} />;
    case "cipher": return <CipherActivity {...props} />;
    case "mining": return <MiningActivity {...props} />;
    case "truefalse": return <TrueFalseActivity {...props} />;
    case "categorize": return <CategorizeActivity {...props} />;
    case "scramble": return <ScrambleActivity {...props} />;
    default: return <p>Onbekende activiteit</p>;
  }
}

// ═══════════════════════════════════════
// MODULE VIEW
// ═══════════════════════════════════════

function ModuleView({ module, progress, setProgress, onBack }) {
  const [actIdx, setActIdx] = useState(null);

  const handleComplete = () => {
    if (actIdx !== null) {
      const key = `${module.id}-${actIdx}`;
      if (!progress.completed.includes(key)) {
        const np = { ...progress, completed: [...progress.completed, key] };
        // Check if module fully complete → earn badge
        const modDone = module.activities.every((_, ai) => np.completed.includes(`${module.id}-${ai}`));
        if (modDone && !np.badges.includes(module.badge)) {
          np.badges = [...np.badges, module.badge];
          np._newBadge = module.badge;
        }
        setProgress(np); saveProgress(np);
      }
    }
    setActIdx(null);
  };

  const modCompleted = module.activities.filter((_, ai) => progress.completed.includes(`${module.id}-${ai}`)).length;
  const allDone = modCompleted === module.activities.length;

  if (actIdx !== null) {
    return (
      <div style={{ minHeight: "100vh", padding: "16px 14px", background: `linear-gradient(180deg, ${module.bg} 0%, #FFFBF5 100%)` }}>
        <Fonts />
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <button onClick={() => setActIdx(null)} style={{
            background: "none", border: "none", ...S.heading, fontSize: 15,
            cursor: "pointer", color: module.color, marginBottom: 6,
          }}>← Terug</button>
          <h2 style={{ ...S.heading, fontSize: 22, color: "#1a1a2e", marginBottom: 2 }}>
            {module.activities[actIdx].title}
          </h2>
          <p style={{ ...S.body, fontSize: 14, color: "#888", marginBottom: 14 }}>
            {module.activities[actIdx].intro}
          </p>
          <ActivityView activity={module.activities[actIdx]} color={module.color} onComplete={handleComplete} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "16px 14px", background: `linear-gradient(180deg, ${module.bg} 0%, #FFFBF5 100%)` }}>
      <Fonts />
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", ...S.heading, fontSize: 15,
          cursor: "pointer", color: module.color, marginBottom: 6,
        }}>← Schatkaart</button>

        {/* Module header */}
        <div style={{
          background: `linear-gradient(135deg, ${module.color}, ${module.color}CC)`,
          borderRadius: 24, padding: "28px 22px", textAlign: "center", color: "#fff",
          marginBottom: 20, boxShadow: `0 8px 28px ${module.color}33`,
        }}>
          <div style={{ fontSize: 48, marginBottom: 4 }}>{module.icon}</div>
          <h1 style={{ ...S.heading, fontSize: 24 }}>Module {module.id}</h1>
          <p style={{ ...S.body, fontSize: 16, opacity: 0.9, marginTop: 4 }}>{module.title}</p>
          {allDone && <div style={{ marginTop: 10, fontSize: 14, background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "6px 12px", display: "inline-block" }}>🎖️ {module.badge}</div>}
        </div>

        {/* Summary card */}
        <div style={{ ...S.card(), marginBottom: 16, border: `2px solid ${module.color}22` }}>
          <p style={{ ...S.heading, fontSize: 14, color: module.color, marginBottom: 4 }}>💡 Kernidee</p>
          <p style={{ ...S.body, fontSize: 14, color: "#555" }}>{module.summary}</p>
        </div>

        {/* Activities */}
        <h3 style={{ ...S.heading, fontSize: 18, color: "#1a1a2e", marginBottom: 10 }}>Activiteiten</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {module.activities.map((act, i) => {
            const done = progress.completed.includes(`${module.id}-${i}`);
            const typeLabel = { quiz: "Quiz", sort: "Sorteren", match: "Koppelen", cipher: "Codes kraken", mining: "Memory", truefalse: "Openbaar/Privé", categorize: "Categoriseren", scramble: "Woordkraker" }[act.type];
            const typeIcon = { quiz: "❓", sort: "↕️", match: "🔗", cipher: "🔐", mining: "⛏️", truefalse: "⚖️", categorize: "📂", scramble: "🧩" }[act.type];
            return (
              <button key={i} onClick={() => setActIdx(i)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", borderRadius: 16,
                border: done ? "2px solid #22C55E" : `2px solid ${module.color}22`,
                background: done ? "#F0FDF4" : "rgba(255,255,255,0.9)",
                cursor: "pointer", textAlign: "left", transition: "all 0.2s",
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: done ? "#22C55E" : module.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, color: "#fff", flexShrink: 0,
                }}>{done ? "✓" : typeIcon}</div>
                <div>
                  <p style={{ ...S.heading, fontSize: 16, color: "#1a1a2e" }}>{act.title}</p>
                  <p style={{ ...S.body, fontSize: 12, color: "#888" }}>{typeLabel}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN APP — TREASURE MAP
// ═══════════════════════════════════════

function Fonts() {
  return <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />;
}

export default function BitcoinVoorJunioren() {
  const [progress, setProgress] = useState(loadProgress);
  const [activeModule, setActiveModule] = useState(null);
  const [newBadge, setNewBadge] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [showName, setShowName] = useState(!progress.name);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    if (progress._newBadge) {
      setNewBadge(progress._newBadge);
      const np = { ...progress }; delete np._newBadge;
      setProgress(np); saveProgress(np);
    }
  }, [progress]);

  const totalActs = MODULES.reduce((s, m) => s + m.activities.length, 0);
  const done = progress.completed.length;

  const saveName = () => {
    if (!nameInput.trim()) return;
    const np = { ...progress, name: nameInput.trim() };
    setProgress(np); saveProgress(np); setShowName(false);
  };

  const resetProgress = () => {
    if (window.confirm("Weet je zeker dat je opnieuw wilt beginnen? Alle voortgang wordt gewist.")) {
      const np = { completed: [], badges: [], name: progress.name };
      setProgress(np); saveProgress(np);
    }
  };

  if (showName) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(180deg, #0C1222 0%, #1A2744 50%, #234E52 100%)",
        padding: 20,
      }}>
        <Fonts />
        <div style={{ textAlign: "center", maxWidth: 360 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🏴‍☠️</div>
          <h1 style={{ ...S.heading, fontSize: 28, color: "#FBBF24", marginBottom: 8 }}>
            Ahoy, avonturier!
          </h1>
          <p style={{ ...S.body, fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>
            Hoe heet jij?
          </p>
          <input value={nameInput} onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && saveName()}
            placeholder="Jouw naam..."
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 14,
              border: "2px solid rgba(251,191,36,0.4)", background: "rgba(255,255,255,0.08)",
              fontSize: 20, textAlign: "center", color: "#fff",
              ...S.body, fontWeight: 600, marginBottom: 12,
              outline: "none",
            }}
          />
          <button onClick={saveName} style={S.btn("#F7931A", 18)}>Start het avontuur! 🚀</button>
        </div>
      </div>
    );
  }

  if (activeModule !== null) {
    return (
      <>
        <ModuleView
          module={MODULES[activeModule]}
          progress={progress}
          setProgress={setProgress}
          onBack={() => setActiveModule(null)}
        />
        {newBadge && <BadgeUnlock badge={newBadge} onClose={() => setNewBadge(null)} />}
      </>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", padding: "20px 16px 40px",
      background: "linear-gradient(180deg, #0C1222 0%, #152238 25%, #1A3A4A 55%, #234E52 75%, #2D6A4F 100%)",
      position: "relative", overflow: "hidden",
    }}>
      <Fonts />

      {/* Animated stars */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{
            position: "absolute", left: `${Math.random() * 100}%`, top: `${Math.random() * 40}%`,
            width: 1.5 + Math.random() * 2, height: 1.5 + Math.random() * 2,
            borderRadius: "50%", background: "#fff",
            opacity: 0.2 + Math.random() * 0.5,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 20,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(-16px)",
          transition: "all 0.5s ease",
        }}>
          <p style={{ ...S.body, fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>
            Ahoy, <span style={{ color: "#FBBF24", fontWeight: 700 }}>{progress.name}</span>! 🏴‍☠️
          </p>
          <h1 style={{
            ...S.heading, fontSize: 30,
            background: "linear-gradient(135deg, #F7931A, #FBBF24)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 4,
          }}>Bitcoin voor Junioren</h1>
          <p style={{ ...S.body, fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
            Ontdek de wereld van geld, waarde en Bitcoin!
          </p>
        </div>

        {/* Progress */}
        <div style={{
          background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "12px 16px",
          marginBottom: 6, backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", ...S.body, fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Voortgang</span>
            <span style={{ color: "#FBBF24", fontWeight: 700 }}>{done}/{totalActs}</span>
          </div>
          <div style={{ height: 14, borderRadius: 10, background: "rgba(0,0,0,0.2)", overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${(done / totalActs) * 100}%`, borderRadius: 10,
              background: "linear-gradient(90deg, #F7931A, #FBBF24)",
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>

        {/* Badges */}
        {progress.badges.length > 0 && (
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18, justifyContent: "center",
          }}>
            {progress.badges.map((b, i) => (
              <span key={i} style={{
                ...S.body, fontSize: 11, fontWeight: 700, color: "#FBBF24",
                background: "rgba(251,191,36,0.12)", borderRadius: 10, padding: "4px 10px",
                border: "1px solid rgba(251,191,36,0.2)",
              }}>{b}</span>
            ))}
          </div>
        )}

        {/* Module cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
          {MODULES.map((mod, i) => {
            const mc = mod.activities.filter((_, ai) => progress.completed.includes(`${mod.id}-${ai}`)).length;
            const ad = mc === mod.activities.length;
            return (
              <button key={mod.id} onClick={() => setActiveModule(i)} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 16px", borderRadius: 20,
                border: ad ? "2px solid #22C55E" : "1px solid rgba(255,255,255,0.08)",
                background: ad ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)",
                backdropFilter: "blur(6px)", cursor: "pointer", textAlign: "left",
                transition: "all 0.3s ease",
                opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)",
                transitionDelay: `${i * 0.06}s`,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `linear-gradient(135deg, ${mod.color}, ${mod.color}BB)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0, boxShadow: `0 4px 14px ${mod.color}33`,
                }}>{mod.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...S.heading, fontSize: 16, color: "#fff", marginBottom: 2 }}>
                    {mod.id}. {mod.title} {ad && "✅"}
                  </p>
                  <p style={{ ...S.body, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                    {mod.description}
                  </p>
                  <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
                    {mod.activities.map((_, ai) => (
                      <div key={ai} style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: progress.completed.includes(`${mod.id}-${ai}`) ? "#22C55E" : "rgba(255,255,255,0.15)",
                        transition: "background 0.3s",
                      }} />
                    ))}
                  </div>
                </div>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18 }}>›</span>
              </button>
            );
          })}
        </div>

        {/* Reset */}
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button onClick={resetProgress} style={{
            background: "none", border: "none", ...S.body, fontSize: 12,
            color: "rgba(255,255,255,0.2)", cursor: "pointer",
            textDecoration: "underline",
          }}>Voortgang resetten</button>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ ...S.body, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            Gebaseerd op Bitcoin voor Junioren van My First Bitcoin · CC BY-SA 4.0
          </p>
        </div>
      </div>

      {newBadge && <BadgeUnlock badge={newBadge} onClose={() => setNewBadge(null)} />}

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:0.7} }
        @keyframes confFall { 0%{transform:translateY(0) rotate(0);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        @keyframes slideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
        @keyframes popIn { 0%{opacity:0;transform:scale(0.7)} 100%{opacity:1;transform:scale(1)} }
        *{box-sizing:border-box} button:hover{filter:brightness(1.05)}
        input:focus{outline:2px solid #F7931A;outline-offset:0}
      `}</style>
    </div>
  );
}
