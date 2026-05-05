import { useState, useEffect, useCallback, useRef } from "react";

const MODULES = [
  {
    id: 1,
    title: "Uitwisseling, Waarde & Prijs",
    icon: "⚖️",
    color: "#E8A838",
    description: "Ontdek hoe ruilen werkt en wat dingen waard zijn!",
    emoji: "🏝️",
    activities: [
      {
        type: "quiz",
        title: "Wat is meer waard?",
        intro: "Stel je voor: je bent gestrand op een onbewoond eiland. Wat heb je het hardst nodig?",
        questions: [
          {
            q: "Je hebt dorst en honger. Wat is op het eiland meer waard?",
            options: ["💎 Een diamant", "🥥 Een kokosnoot", "📱 Een telefoon (geen bereik)", "👟 Nieuwe sneakers"],
            correct: 1,
            explanation: "Op een eiland zonder winkels is een kokosnoot veel meer waard dan een diamant! Waarde hangt af van wat je nodig hebt."
          },
          {
            q: "Waarom gebruiken mensen geld in plaats van ruilen?",
            options: ["Omdat het mooier is", "Omdat je niet altijd vindt wat je zoekt bij de ander", "Omdat de koning het zegt", "Omdat het sneller slijt"],
            correct: 1,
            explanation: "Bij ruilen moet je iemand vinden die precies wil wat jij hebt. Dat is het 'samenvallen van behoeften' probleem!"
          },
          {
            q: "Schelpen werden vroeger als geld gebruikt. Waarom?",
            options: ["Ze waren mooi", "Iedereen vond ze waardevol, ze waren schaars en makkelijk mee te nemen", "De regering zei het", "Ze smaakten lekker"],
            correct: 1,
            explanation: "Goed geld moet schaars zijn, makkelijk mee te nemen, en door iedereen geaccepteerd worden."
          },
          {
            q: "Een ijsje kost €2 en een fiets kost €200. Wat vertelt de prijs ons?",
            options: ["De fiets is lekkerder", "Hoeveel geld je ervoor moet betalen", "Dat ijsjes slecht zijn", "Niets nuttigs"],
            correct: 1,
            explanation: "Prijs vertelt hoeveel geld iets kost. Maar let op: prijs en waarde zijn niet hetzelfde!"
          }
        ]
      },
      {
        type: "sort",
        title: "Prijslijn!",
        intro: "Sleep de voorwerpen naar de juiste plek op de prijslijn: van goedkoop naar duur!",
        items: [
          { name: "🍎 Appel", value: 1 },
          { name: "📚 Boek", value: 2 },
          { name: "👟 Sneakers", value: 3 },
          { name: "📱 Telefoon", value: 4 },
          { name: "🚗 Auto", value: 5 },
          { name: "🏠 Huis", value: 6 },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Tijd, Energie & Beloning",
    icon: "⏰",
    color: "#4ECDC4",
    description: "Leer hoe je tijd en energie slim gebruikt!",
    emoji: "⚡",
    activities: [
      {
        type: "quiz",
        title: "Werk, Rust of Spel?",
        intro: "Kun jij bepalen of iets werk, rust of spel is?",
        questions: [
          {
            q: "Huiswerk maken is een voorbeeld van...",
            options: ["🎮 Spel", "💼 Werk", "😴 Rust", "🎵 Muziek"],
            correct: 1,
            explanation: "Huiswerk is werk — het kost energie, maar helpt je leren!"
          },
          {
            q: "Wat betekent 'tijdvoorkeur'?",
            options: ["Altijd haast hebben", "Kiezen tussen iets nu of iets beters later", "Nooit spelen", "De klok vooruit zetten"],
            correct: 1,
            explanation: "Tijdvoorkeur gaat over de keuze: wil je iets makkelijks nu, of wacht je op iets beters later?"
          },
          {
            q: "In het verhaal van De drie biggetjes, welk huis was het sterkst?",
            options: ["🌾 Stro", "🪵 Hout", "🧱 Baksteen", "🏕️ Een tent"],
            correct: 2,
            explanation: "Het bakstenen huis kostte de meeste tijd en moeite, maar het was het sterkst. Lage tijdvoorkeur = betere resultaten!"
          },
          {
            q: "Wat gebeurt er als je al je energie 's ochtends opmaakt?",
            options: ["Je wordt sterker", "Je hebt geen energie meer voor de rest van de dag", "Niets", "Je krijgt superkrachten"],
            correct: 1,
            explanation: "Energie is beperkt! Slim verdelen over de dag is belangrijk."
          }
        ]
      },
      {
        type: "energy",
        title: "Energie-Tracker",
        intro: "Hoe verandert jouw energie door de dag? Klik op de activiteiten!",
      }
    ]
  },
  {
    id: 3,
    title: "Analoog versus Digitaal",
    icon: "💻",
    color: "#A855F7",
    description: "Van typemachine tot tablet — technologie verandert!",
    emoji: "🔄",
    activities: [
      {
        type: "match",
        title: "Koppel Oud aan Nieuw!",
        intro: "Welke oude technologie hoort bij welke nieuwe?",
        pairs: [
          { old: "📝 Brief", new: "📧 E-mail" },
          { old: "📞 Draaitelefoon", new: "📱 Smartphone" },
          { old: "📺 Buizen-TV", new: "🖥️ Smart TV" },
          { old: "📷 Filmcamera", new: "📸 Digitale camera" },
          { old: "🗺️ Papieren kaart", new: "📍 GPS Navigatie" },
          { old: "💰 Munten", new: "₿ Bitcoin" },
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Veiligheid & Privacy",
    icon: "🔒",
    color: "#EF4444",
    description: "Leer over geheime codes en privacy!",
    emoji: "🛡️",
    activities: [
      {
        type: "quiz",
        title: "Openbaar of Privé?",
        intro: "Bepaal of informatie openbaar of privé is!",
        questions: [
          {
            q: "Je wachtwoord is...",
            options: ["🌍 Openbaar", "🔐 Privé"],
            correct: 1,
            explanation: "Een wachtwoord is altijd privé! Deel het nooit met anderen."
          },
          {
            q: "De kleur van je ogen is...",
            options: ["🌍 Openbaar", "🔐 Privé"],
            correct: 0,
            explanation: "Iedereen kan je oogkleur zien — het is openbare informatie."
          },
          {
            q: "Je pincode van de bank is...",
            options: ["🌍 Openbaar", "🔐 Privé"],
            correct: 1,
            explanation: "Je pincode is geheim! Dat beschermt je geld."
          },
          {
            q: "Je naam is...",
            options: ["🌍 Openbaar", "🔐 Privé", "🤔 Dat hangt ervan af"],
            correct: 2,
            explanation: "Je naam kan openbaar zijn, maar soms kies je ervoor om anoniem te blijven. Jij bepaalt wat je deelt!"
          }
        ]
      },
      {
        type: "cipher",
        title: "Geheime Code!",
        intro: "Gebruik het cijferwiel om geheime berichten te ontcijferen!",
      }
    ]
  },
  {
    id: 5,
    title: "Geldzaken",
    icon: "💰",
    color: "#F59E0B",
    description: "Leer over verdienen, sparen en uitgeven!",
    emoji: "🏦",
    activities: [
      {
        type: "quiz",
        title: "Slimme Geldzaken",
        intro: "Wat weet jij over geld?",
        questions: [
          {
            q: "Wat is sparen?",
            options: ["Geld uitgeven aan snoep", "Geld opzij leggen voor later", "Geld weggooien", "Geld uitlenen aan vrienden"],
            correct: 1,
            explanation: "Sparen betekent geld bewaren voor later. Zo kun je grotere dingen kopen!"
          },
          {
            q: "Wat is investeren?",
            options: ["Geld verstoppen onder je bed", "Je geld ergens insteken zodat het kan groeien", "Alles vandaag uitgeven", "Geld verbranden"],
            correct: 1,
            explanation: "Investeren is je geld of tijd ergens in steken zodat het later meer waard wordt."
          },
          {
            q: "Je hebt 10 gouden munten. Een boek kost 3 en een schild kost 8. Kun je allebei kopen?",
            options: ["Ja, makkelijk!", "Nee, je hebt maar 10 munten", "Alleen als je leent", "Munten zijn oneindig"],
            correct: 1,
            explanation: "3 + 8 = 11, maar je hebt maar 10 munten. Je moet kiezen! Dat is budgetteren."
          },
          {
            q: "Waarom zijn regels bij geld belangrijk?",
            options: ["Ze zijn niet belangrijk", "Zodat iedereen eerlijk behandeld wordt", "Alleen voor volwassenen", "Om het moeilijker te maken"],
            correct: 1,
            explanation: "Eerlijke regels zorgen ervoor dat iedereen dezelfde kans heeft."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Basisprincipes van Bitcoin",
    icon: "₿",
    color: "#F7931A",
    description: "Ontdek hoe Bitcoin werkt!",
    emoji: "⛏️",
    activities: [
      {
        type: "quiz",
        title: "Bitcoin Ontdekker",
        intro: "Test je kennis over Bitcoin!",
        questions: [
          {
            q: "Wie heeft Bitcoin bedacht?",
            options: ["Elon Musk", "Satoshi Nakamoto", "De bank", "Een computer"],
            correct: 1,
            explanation: "Satoshi Nakamoto schreef een white paper en startte Bitcoin. Niemand weet wie Satoshi echt is!"
          },
          {
            q: "Wat is de Genesis Block?",
            options: ["Een computerspel", "Het allereerste blok van Bitcoin", "Een soort steen", "Een geheim wachtwoord"],
            correct: 1,
            explanation: "De Genesis Block is het eerste blok dat ooit is gemaakt in Bitcoin. Alles begon daar!"
          },
          {
            q: "Wat betekent 'minen' bij Bitcoin?",
            options: ["Graven in de grond", "Puzzels oplossen om transacties te bevestigen", "Bitcoin kopen in de winkel", "Bitcoins tekenen"],
            correct: 1,
            explanation: "Miners lossen puzzels op met computers. Als ze de oplossing vinden, mogen ze transacties bevestigen en worden beloond."
          },
          {
            q: "Waarom is Bitcoin bijzonder?",
            options: [
              "Het is gratis",
              "Niemand kan er meer van maken dan de regels toestaan",
              "Je kunt het aanraken",
              "Alleen rijke mensen mogen het gebruiken"
            ],
            correct: 1,
            explanation: "Er zullen nooit meer dan 21 miljoen bitcoins bestaan. Die schaarste maakt het bijzonder!"
          },
          {
            q: "Wat is Proof of Work?",
            options: [
              "Een rapport van school",
              "Bewijs dat je moeite hebt gedaan om iets te verdienen",
              "Een wachtwoord",
              "Een soort betaalkaart"
            ],
            correct: 1,
            explanation: "Proof of Work betekent dat je echt moeite hebt gedaan. Net als het dobbelsteenspel: iedereen heeft dezelfde kans!"
          }
        ]
      },
      {
        type: "mining",
        title: "Bitcoin Minen!",
        intro: "Vind gelijke paren om blokken te minen!",
      }
    ]
  }
];

// ===== COMPONENTS =====

function Confetti({ active }) {
  if (!active) return null;
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ["#F7931A", "#4ECDC4", "#E8A838", "#A855F7", "#EF4444", "#F59E0B"][i % 6],
    size: 6 + Math.random() * 8,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: -20,
          width: p.size,
          height: p.size,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          backgroundColor: p.color,
          animation: `confettiFall 1.5s ${p.delay}s ease-out forwards`,
        }} />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{
      width: "100%", height: 18, borderRadius: 12,
      background: "rgba(0,0,0,0.15)", overflow: "hidden", position: "relative",
    }}>
      <div style={{
        height: "100%", width: `${pct}%`, borderRadius: 12,
        background: "linear-gradient(90deg, #F7931A, #FFCF44)",
        transition: "width 0.5s ease",
      }} />
      <span style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff",
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
      }}>{pct}%</span>
    </div>
  );
}

// ----- Quiz Activity -----
function QuizActivity({ activity, onComplete }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const question = activity.questions[qIdx];
  const isLast = qIdx === activity.questions.length - 1;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.correct) {
      setScore(s => s + 1);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1600);
    }
  };

  const handleNext = () => {
    if (isLast) {
      setShowResult(true);
    } else {
      setQIdx(i => i + 1);
      setSelected(null);
    }
  };

  if (showResult) {
    const perfect = score === activity.questions.length;
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <Confetti active={perfect} />
        <div style={{ fontSize: 64, marginBottom: 16 }}>{perfect ? "🏆" : score >= activity.questions.length / 2 ? "⭐" : "💪"}</div>
        <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, margin: "0 0 8px" }}>
          {perfect ? "Perfect!" : score >= activity.questions.length / 2 ? "Goed gedaan!" : "Blijf oefenen!"}
        </h3>
        <p style={{ fontSize: 20, fontFamily: "'Nunito', sans-serif", margin: "0 0 24px" }}>
          {score} van {activity.questions.length} goed
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {Array.from({ length: activity.questions.length }, (_, i) => (
            <div key={i} style={{
              width: 32, height: 32, borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 16,
              background: i < score ? "#4ECDC4" : "#EF4444",
              color: "#fff", fontWeight: 700,
            }}>{i < score ? "✓" : "✗"}</div>
          ))}
        </div>
        <button onClick={onComplete} style={{
          marginTop: 24, padding: "12px 32px", borderRadius: 16,
          border: "none", background: "#F7931A", color: "#fff",
          fontSize: 18, fontWeight: 700, cursor: "pointer",
          fontFamily: "'Fredoka', sans-serif",
          boxShadow: "0 4px 12px rgba(247,147,26,0.4)",
        }}>Terug naar de kaart</button>
      </div>
    );
  }

  return (
    <div>
      <Confetti active={confetti} />
      <ProgressBar current={qIdx + 1} total={activity.questions.length} />
      <p style={{
        fontFamily: "'Nunito', sans-serif", fontSize: 13, textAlign: "center",
        margin: "8px 0 0", color: "rgba(0,0,0,0.5)",
      }}>Vraag {qIdx + 1} van {activity.questions.length}</p>
      <div style={{
        background: "rgba(255,255,255,0.7)", borderRadius: 20, padding: 24,
        margin: "16px 0", backdropFilter: "blur(8px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <p style={{
          fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 600,
          margin: 0, lineHeight: 1.4, color: "#1a1a2e",
        }}>{question.q}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.options.map((opt, i) => {
          let bg = "rgba(255,255,255,0.85)";
          let border = "2px solid rgba(0,0,0,0.08)";
          let scale = "scale(1)";
          if (selected !== null) {
            if (i === question.correct) {
              bg = "#d4edda"; border = "2px solid #28a745";
              scale = "scale(1.02)";
            } else if (i === selected) {
              bg = "#f8d7da"; border = "2px solid #dc3545";
            }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{
              padding: "14px 18px", borderRadius: 14, border,
              background: bg, cursor: selected !== null ? "default" : "pointer",
              fontSize: 17, fontFamily: "'Nunito', sans-serif", fontWeight: 600,
              textAlign: "left", transition: "all 0.2s", transform: scale,
              color: "#1a1a2e",
            }}>{opt}</button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{
          marginTop: 16, padding: 16, borderRadius: 14,
          background: selected === question.correct
            ? "linear-gradient(135deg, #d4edda, #c3e6cb)"
            : "linear-gradient(135deg, #f8d7da, #f1c0c0)",
          animation: "slideUp 0.3s ease",
        }}>
          <p style={{
            margin: 0, fontFamily: "'Nunito', sans-serif", fontSize: 15,
            lineHeight: 1.5, color: "#1a1a2e",
          }}>
            {selected === question.correct ? "✅ " : "❌ "}
            {question.explanation}
          </p>
          <button onClick={handleNext} style={{
            marginTop: 12, padding: "10px 28px", borderRadius: 12,
            border: "none", background: "#F7931A", color: "#fff",
            fontSize: 16, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Fredoka', sans-serif",
          }}>{isLast ? "Bekijk resultaat" : "Volgende →"}</button>
        </div>
      )}
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

// ----- Sort Activity (Price Line) -----
function SortActivity({ activity, onComplete }) {
  const [items, setItems] = useState(() =>
    [...activity.items].sort(() => Math.random() - 0.5)
  );
  const [dragIdx, setDragIdx] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleDragStart = (idx) => setDragIdx(idx);
  const handleDrop = (targetIdx) => {
    if (dragIdx === null || dragIdx === targetIdx) return;
    const newItems = [...items];
    const [moved] = newItems.splice(dragIdx, 1);
    newItems.splice(targetIdx, 0, moved);
    setItems(newItems);
    setDragIdx(null);
    setChecked(false);
  };

  const moveItem = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= items.length) return;
    const newItems = [...items];
    [newItems[idx], newItems[newIdx]] = [newItems[newIdx], newItems[idx]];
    setItems(newItems);
    setChecked(false);
  };

  const checkOrder = () => {
    const isCorrect = items.every((item, i) => item.value === i + 1);
    setCorrect(isCorrect);
    setChecked(true);
  };

  return (
    <div>
      <p style={{
        fontFamily: "'Fredoka', sans-serif", fontSize: 18, textAlign: "center",
        margin: "0 0 8px", color: "#1a1a2e",
      }}>Zet in volgorde: goedkoop → duur</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13, fontFamily: "'Nunito', sans-serif", color: "rgba(0,0,0,0.5)" }}>
        <span>💰 Goedkoop</span>
        <span>💎 Duur</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={item.name}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(i)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 16px", borderRadius: 14,
              background: checked
                ? (item.value === i + 1 ? "#d4edda" : "#f8d7da")
                : dragIdx === i ? "rgba(247,147,26,0.15)" : "rgba(255,255,255,0.85)",
              border: checked
                ? (item.value === i + 1 ? "2px solid #28a745" : "2px solid #dc3545")
                : "2px solid rgba(0,0,0,0.08)",
              cursor: "grab", transition: "all 0.2s",
              fontFamily: "'Nunito', sans-serif", fontSize: 18, fontWeight: 600,
            }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <button onClick={() => moveItem(i, -1)} style={{
                border: "none", background: "none", cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1,
              }}>▲</button>
              <button onClick={() => moveItem(i, 1)} style={{
                border: "none", background: "none", cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1,
              }}>▼</button>
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "center" }}>
        <button onClick={checkOrder} style={{
          padding: "12px 28px", borderRadius: 14, border: "none",
          background: "#4ECDC4", color: "#fff", fontSize: 16,
          fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif",
        }}>Controleer!</button>
        {checked && (
          <button onClick={onComplete} style={{
            padding: "12px 28px", borderRadius: 14, border: "none",
            background: "#F7931A", color: "#fff", fontSize: 16,
            fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif",
          }}>Terug naar de kaart</button>
        )}
      </div>
      {checked && (
        <p style={{
          textAlign: "center", marginTop: 12, fontSize: 18,
          fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
          color: correct ? "#28a745" : "#dc3545",
        }}>
          {correct ? "🎉 Perfect! Je hebt alles goed geplaatst!" : "Bijna! Probeer de volgorde aan te passen."}
        </p>
      )}
    </div>
  );
}

// ----- Match Activity -----
function MatchActivity({ activity, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [confetti, setConfetti] = useState(false);

  const shuffledNew = useRef(
    [...activity.pairs].sort(() => Math.random() - 0.5)
  ).current;

  const handleOldClick = (idx) => {
    if (matched.includes(idx)) return;
    setSelected(idx);
    setWrong(null);
  };

  const handleNewClick = (newIdx) => {
    if (selected === null) return;
    const oldPair = activity.pairs[selected];
    const newPair = shuffledNew[newIdx];
    if (oldPair.new === newPair.new) {
      setMatched(m => [...m, selected]);
      setSelected(null);
      if (matched.length + 1 === activity.pairs.length) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 2000);
      }
    } else {
      setWrong(newIdx);
      setTimeout(() => setWrong(null), 600);
    }
  };

  const allDone = matched.length === activity.pairs.length;

  return (
    <div>
      <Confetti active={confetti} />
      <p style={{
        fontFamily: "'Fredoka', sans-serif", fontSize: 18, textAlign: "center",
        margin: "0 0 16px", color: "#1a1a2e",
      }}>Klik eerst op OUD, dan op NIEUW</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <p style={{
            textAlign: "center", fontFamily: "'Fredoka', sans-serif",
            fontSize: 15, fontWeight: 700, color: "#8B4513", margin: "0 0 8px",
          }}>🏛️ OUD</p>
          {activity.pairs.map((p, i) => (
            <button key={i} onClick={() => handleOldClick(i)} style={{
              width: "100%", padding: "12px 10px", marginBottom: 8,
              borderRadius: 12, border: matched.includes(i) ? "2px solid #28a745"
                : selected === i ? "2px solid #F7931A" : "2px solid rgba(0,0,0,0.1)",
              background: matched.includes(i) ? "#d4edda"
                : selected === i ? "rgba(247,147,26,0.15)" : "rgba(255,255,255,0.8)",
              fontSize: 16, fontFamily: "'Nunito', sans-serif", fontWeight: 600,
              cursor: matched.includes(i) ? "default" : "pointer",
              opacity: matched.includes(i) ? 0.6 : 1, transition: "all 0.2s",
            }}>{p.old}</button>
          ))}
        </div>
        <div>
          <p style={{
            textAlign: "center", fontFamily: "'Fredoka', sans-serif",
            fontSize: 15, fontWeight: 700, color: "#1e40af", margin: "0 0 8px",
          }}>🚀 NIEUW</p>
          {shuffledNew.map((p, i) => {
            const isMatched = matched.some(mIdx => activity.pairs[mIdx].new === p.new);
            return (
              <button key={i} onClick={() => handleNewClick(i)} style={{
                width: "100%", padding: "12px 10px", marginBottom: 8,
                borderRadius: 12,
                border: isMatched ? "2px solid #28a745"
                  : wrong === i ? "2px solid #dc3545" : "2px solid rgba(0,0,0,0.1)",
                background: isMatched ? "#d4edda"
                  : wrong === i ? "#f8d7da" : "rgba(255,255,255,0.8)",
                fontSize: 16, fontFamily: "'Nunito', sans-serif", fontWeight: 600,
                cursor: isMatched ? "default" : "pointer",
                opacity: isMatched ? 0.6 : 1, transition: "all 0.2s",
                animation: wrong === i ? "shake 0.4s ease" : "none",
              }}>{p.new}</button>
            );
          })}
        </div>
      </div>
      {allDone && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <p style={{ fontSize: 22, fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}>
            🎉 Alles gekoppeld!
          </p>
          <button onClick={onComplete} style={{
            padding: "12px 28px", borderRadius: 14, border: "none",
            background: "#F7931A", color: "#fff", fontSize: 16,
            fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif",
          }}>Terug naar de kaart</button>
        </div>
      )}
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`}</style>
    </div>
  );
}

// ----- Cipher Activity -----
function CipherActivity({ activity, onComplete }) {
  const [shift, setShift] = useState(3);
  const [input, setInput] = useState("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const encode = (text) => {
    return text.toUpperCase().split("").map(c => {
      const idx = alphabet.indexOf(c);
      if (idx === -1) return c;
      return alphabet[(idx + shift) % 26];
    }).join("");
  };

  const decode = (text) => {
    return text.toUpperCase().split("").map(c => {
      const idx = alphabet.indexOf(c);
      if (idx === -1) return c;
      return alphabet[(idx - shift + 26) % 26];
    }).join("");
  };

  const challenges = [
    { encoded: encode("BITCOIN"), hint: "Een digitale munt" },
    { encoded: encode("SATOSHI"), hint: "De mysterieuze bedenker" },
    { encoded: encode("SCHAARS"), hint: "Er is niet veel van" },
    { encoded: encode("SLEUTEL"), hint: "Opent een slot" },
  ];

  const [challengeIdx, setChallengeIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState([]);

  const currentChallenge = challenges[challengeIdx];
  const checkAnswer = () => {
    const decoded = decode(currentChallenge.encoded);
    if (guess.toUpperCase().trim() === decoded) {
      setSolved(s => [...s, challengeIdx]);
      if (challengeIdx < challenges.length - 1) {
        setChallengeIdx(i => i + 1);
        setGuess("");
      }
    }
  };

  const allSolved = solved.length === challenges.length;

  return (
    <div>
      <div style={{
        background: "rgba(255,255,255,0.8)", borderRadius: 16, padding: 16,
        marginBottom: 16,
      }}>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, margin: "0 0 10px", textAlign: "center" }}>
          🔄 Cijferwiel — verschuiving: <strong>{shift}</strong>
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
          {alphabet.split("").map((c, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              width: 22, fontSize: 12, fontFamily: "monospace",
            }}>
              <span style={{ color: "#1e40af", fontWeight: 700 }}>{c}</span>
              <span style={{ color: "#dc3545", fontSize: 10 }}>↓</span>
              <span style={{ color: "#dc3545", fontWeight: 700 }}>{alphabet[(i + shift) % 26]}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <button onClick={() => setShift(s => (s - 1 + 26) % 26)} style={{
            width: 36, height: 36, borderRadius: "50%", border: "2px solid #F7931A",
            background: "#fff", fontSize: 18, cursor: "pointer",
          }}>←</button>
          <button onClick={() => setShift(s => (s + 1) % 26)} style={{
            width: 36, height: 36, borderRadius: "50%", border: "2px solid #F7931A",
            background: "#fff", fontSize: 18, cursor: "pointer",
          }}>→</button>
        </div>
      </div>

      {!allSolved ? (
        <div style={{
          background: "rgba(255,255,255,0.8)", borderRadius: 16, padding: 20,
        }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, margin: "0 0 4px", color: "rgba(0,0,0,0.5)" }}>
            Opdracht {challengeIdx + 1} van {challenges.length} — Hint: {currentChallenge.hint}
          </p>
          <p style={{
            fontFamily: "monospace", fontSize: 28, fontWeight: 700,
            letterSpacing: 6, textAlign: "center", margin: "12px 0",
            color: "#dc3545",
          }}>{currentChallenge.encoded}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={guess}
              onChange={e => setGuess(e.target.value)}
              placeholder="Typ het geheime woord..."
              onKeyDown={e => e.key === "Enter" && checkAnswer()}
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 12,
                border: "2px solid rgba(0,0,0,0.1)", fontSize: 18,
                fontFamily: "monospace", textTransform: "uppercase",
                letterSpacing: 3,
              }}
            />
            <button onClick={checkAnswer} style={{
              padding: "10px 20px", borderRadius: 12, border: "none",
              background: "#4ECDC4", color: "#fff", fontSize: 16,
              fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif",
            }}>Check</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 20 }}>
          <p style={{ fontSize: 48 }}>🔓</p>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 700 }}>
            Alle codes gekraakt!
          </p>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16 }}>
            Je bent een echte Cypherpunk!
          </p>
          <button onClick={onComplete} style={{
            marginTop: 12, padding: "12px 28px", borderRadius: 14, border: "none",
            background: "#F7931A", color: "#fff", fontSize: 16,
            fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif",
          }}>Terug naar de kaart</button>
        </div>
      )}
    </div>
  );
}

// ----- Mining Game -----
function MiningActivity({ activity, onComplete }) {
  const symbols = ["⛏️", "🔗", "🪙", "🔑", "🛡️", "📦", "⚡", "🌐"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [mined, setMined] = useState(0);

  useEffect(() => {
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((s, i) => ({ id: i, symbol: s }));
    setCards(deck);
  }, []);

  const handleFlip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setMoves(m => m + 1);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (cards[a].symbol === cards[b].symbol) {
        setMatched(m => [...m, a, b]);
        setMined(m => m + 1);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  const allDone = matched.length === cards.length && cards.length > 0;

  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", marginBottom: 12,
        fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 600,
      }}>
        <span>⛏️ Gemined: {mined}/{symbols.length}</span>
        <span>🎯 Pogingen: {moves}</span>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
      }}>
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <button key={card.id} onClick={() => handleFlip(card.id)} style={{
              aspectRatio: "1", borderRadius: 14, border: "none",
              background: matched.includes(card.id)
                ? "linear-gradient(135deg, #d4edda, #c3e6cb)"
                : isFlipped ? "#fff" : "linear-gradient(135deg, #F7931A, #E8A838)",
              fontSize: 28, cursor: isFlipped ? "default" : "pointer",
              transition: "all 0.3s",
              transform: isFlipped ? "rotateY(0deg)" : "rotateY(0deg)",
              boxShadow: matched.includes(card.id) ? "none" : "0 2px 8px rgba(0,0,0,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {isFlipped ? card.symbol : "₿"}
            </button>
          );
        })}
      </div>
      {allDone && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Confetti active={true} />
          <p style={{ fontSize: 48 }}>🏆</p>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 700 }}>
            Blok voltooid in {moves} pogingen!
          </p>
          <button onClick={onComplete} style={{
            marginTop: 12, padding: "12px 28px", borderRadius: 14, border: "none",
            background: "#F7931A", color: "#fff", fontSize: 16,
            fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif",
          }}>Terug naar de kaart</button>
        </div>
      )}
    </div>
  );
}

// ----- Energy Tracker -----
function EnergyActivity({ activity, onComplete }) {
  const dayActivities = [
    { time: "07:00", name: "🌅 Opstaan", energy: 3 },
    { time: "07:30", name: "🥣 Ontbijt", energy: 5 },
    { time: "08:30", name: "🏫 School", energy: -2 },
    { time: "10:00", name: "📝 Toets", energy: -4 },
    { time: "10:30", name: "🏃 Pauze buiten", energy: 3 },
    { time: "12:00", name: "🍎 Lunch", energy: 4 },
    { time: "13:30", name: "📚 Huiswerk", energy: -3 },
    { time: "15:00", name: "⚽ Sporten", energy: 2 },
    { time: "17:00", name: "🎮 Gamen", energy: 1 },
    { time: "18:30", name: "🍽️ Avondeten", energy: 3 },
    { time: "20:00", name: "📖 Lezen", energy: -1 },
    { time: "21:00", name: "😴 Slapen", energy: 5 },
  ];

  const [active, setActive] = useState([]);
  const toggleActivity = (i) => {
    setActive(a => a.includes(i) ? a.filter(x => x !== i) : [...a, i].sort((x, y) => x - y));
  };

  let runningEnergy = 5;
  const energyLine = active.map(i => {
    runningEnergy = Math.max(0, Math.min(10, runningEnergy + dayActivities[i].energy));
    return { idx: i, level: runningEnergy, activity: dayActivities[i] };
  });

  return (
    <div>
      <p style={{
        fontFamily: "'Fredoka', sans-serif", fontSize: 16, textAlign: "center",
        margin: "0 0 12px", color: "#1a1a2e",
      }}>Klik op activiteiten om je dagelijkse energie te zien!</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 16 }}>
        {dayActivities.map((a, i) => (
          <button key={i} onClick={() => toggleActivity(i)} style={{
            padding: "8px 10px", borderRadius: 10,
            border: active.includes(i) ? "2px solid #4ECDC4" : "2px solid rgba(0,0,0,0.08)",
            background: active.includes(i) ? "#d4edda" : "rgba(255,255,255,0.8)",
            fontSize: 13, fontFamily: "'Nunito', sans-serif", fontWeight: 600,
            cursor: "pointer", textAlign: "left", transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 11, color: "rgba(0,0,0,0.4)" }}>{a.time}</span>
            <br />{a.name}
            <span style={{ float: "right", color: a.energy > 0 ? "#28a745" : "#dc3545" }}>
              {a.energy > 0 ? `+${a.energy}` : a.energy}
            </span>
          </button>
        ))}
      </div>
      {active.length > 0 && (
        <div style={{
          background: "rgba(255,255,255,0.8)", borderRadius: 14, padding: 16,
        }}>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 15, margin: "0 0 10px", textAlign: "center" }}>
            ⚡ Jouw energieverloop
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120, justifyContent: "center" }}>
            {energyLine.map((e, i) => (
              <div key={i} style={{
                width: Math.max(20, 200 / energyLine.length),
                height: `${e.level * 12}px`,
                background: e.level > 6 ? "#28a745" : e.level > 3 ? "#F59E0B" : "#dc3545",
                borderRadius: "6px 6px 0 0", transition: "height 0.3s",
                display: "flex", alignItems: "flex-start", justifyContent: "center",
                fontSize: 10, color: "#fff", fontWeight: 700, paddingTop: 2,
                minHeight: 16,
              }}>{e.level}</div>
            ))}
          </div>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={onComplete} style={{
          padding: "12px 28px", borderRadius: 14, border: "none",
          background: "#F7931A", color: "#fff", fontSize: 16,
          fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif",
        }}>Terug naar de kaart</button>
      </div>
    </div>
  );
}

// ===== Activity Router =====
function ActivityView({ activity, onComplete }) {
  switch (activity.type) {
    case "quiz": return <QuizActivity activity={activity} onComplete={onComplete} />;
    case "sort": return <SortActivity activity={activity} onComplete={onComplete} />;
    case "match": return <MatchActivity activity={activity} onComplete={onComplete} />;
    case "cipher": return <CipherActivity activity={activity} onComplete={onComplete} />;
    case "mining": return <MiningActivity activity={activity} onComplete={onComplete} />;
    case "energy": return <EnergyActivity activity={activity} onComplete={onComplete} />;
    default: return <p>Activiteit niet gevonden</p>;
  }
}

// ===== MODULE VIEW =====
function ModuleView({ module, onBack, completedActivities, setCompletedActivities }) {
  const [activeActivity, setActiveActivity] = useState(null);

  const handleComplete = () => {
    if (activeActivity !== null) {
      const key = `${module.id}-${activeActivity}`;
      if (!completedActivities.includes(key)) {
        setCompletedActivities(c => [...c, key]);
      }
    }
    setActiveActivity(null);
  };

  if (activeActivity !== null) {
    return (
      <div style={{
        minHeight: "100vh", padding: "20px 16px",
        background: `linear-gradient(180deg, ${module.color}22 0%, #FFF8F0 100%)`,
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <button onClick={() => setActiveActivity(null)} style={{
            background: "none", border: "none", fontSize: 16,
            cursor: "pointer", fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, color: module.color, marginBottom: 8,
          }}>← Terug</button>
          <h2 style={{
            fontFamily: "'Fredoka', sans-serif", fontSize: 24, margin: "0 0 4px",
            color: "#1a1a2e",
          }}>{module.activities[activeActivity].title}</h2>
          <p style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 15, margin: "0 0 16px",
            color: "rgba(0,0,0,0.6)",
          }}>{module.activities[activeActivity].intro}</p>
          <ActivityView
            activity={module.activities[activeActivity]}
            onComplete={handleComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", padding: "20px 16px",
      background: `linear-gradient(180deg, ${module.color}22 0%, #FFF8F0 100%)`,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", fontSize: 16,
          cursor: "pointer", fontFamily: "'Nunito', sans-serif",
          fontWeight: 700, color: module.color, marginBottom: 8,
        }}>← Schatkaart</button>
        <div style={{
          background: `linear-gradient(135deg, ${module.color}, ${module.color}CC)`,
          borderRadius: 24, padding: "32px 24px", textAlign: "center",
          color: "#fff", marginBottom: 24,
          boxShadow: `0 8px 32px ${module.color}44`,
        }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>{module.icon}</div>
          <h1 style={{
            fontFamily: "'Fredoka', sans-serif", fontSize: 26,
            margin: "0 0 8px", lineHeight: 1.2,
          }}>Module {module.id}: {module.title}</h1>
          <p style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 16,
            margin: 0, opacity: 0.9,
          }}>{module.description}</p>
        </div>

        <h3 style={{
          fontFamily: "'Fredoka', sans-serif", fontSize: 20,
          margin: "0 0 12px", color: "#1a1a2e",
        }}>Activiteiten</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {module.activities.map((act, i) => {
            const key = `${module.id}-${i}`;
            const done = completedActivities.includes(key);
            return (
              <button key={i} onClick={() => setActiveActivity(i)} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px", borderRadius: 16,
                border: done ? `2px solid #28a745` : `2px solid ${module.color}44`,
                background: done ? "#d4edda" : "rgba(255,255,255,0.85)",
                cursor: "pointer", textAlign: "left", transition: "all 0.2s",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: done ? "#28a745" : module.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: "#fff", flexShrink: 0,
                }}>
                  {done ? "✓" : act.type === "quiz" ? "❓" : act.type === "sort" ? "↕️" : act.type === "match" ? "🔗" : act.type === "cipher" ? "🔐" : act.type === "mining" ? "⛏️" : "⚡"}
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Fredoka', sans-serif", fontSize: 17,
                    fontWeight: 600, margin: 0, color: "#1a1a2e",
                  }}>{act.title}</p>
                  <p style={{
                    fontFamily: "'Nunito', sans-serif", fontSize: 13,
                    margin: "2px 0 0", color: "rgba(0,0,0,0.5)",
                  }}>{act.type === "quiz" ? "Quiz" : act.type === "sort" ? "Sorteren" : act.type === "match" ? "Koppelen" : act.type === "cipher" ? "Codes kraken" : act.type === "mining" ? "Memory spel" : "Tracker"}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const totalActivities = MODULES.reduce((sum, m) => sum + m.activities.length, 0);
  const progress = completedActivities.length;

  if (activeModule !== null) {
    return (
      <ModuleView
        module={MODULES[activeModule]}
        onBack={() => setActiveModule(null)}
        completedActivities={completedActivities}
        setCompletedActivities={setCompletedActivities}
      />
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0d1b2a 0%, #1b2838 30%, #1a3a4a 60%, #2d6a4f 80%, #40916c 100%)",
      padding: "20px 16px 40px",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Stars */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 35}%`,
            width: 2 + Math.random() * 2,
            height: 2 + Math.random() * 2,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.3 + Math.random() * 0.5,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 540, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 24,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.6s ease",
        }}>
          <div style={{ fontSize: 48, marginBottom: 4 }}>₿</div>
          <h1 style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: 32, fontWeight: 700,
            background: "linear-gradient(135deg, #F7931A, #FFCF44)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "0 0 4px", lineHeight: 1.1,
          }}>Bitcoin voor Junioren</h1>
          <p style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 15,
            color: "rgba(255,255,255,0.7)", margin: "0 0 16px",
          }}>Ontdek de wereld van geld, waarde en Bitcoin!</p>

          {/* Progress */}
          <div style={{
            background: "rgba(255,255,255,0.1)", borderRadius: 16,
            padding: "10px 16px", backdropFilter: "blur(8px)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{
                fontFamily: "'Nunito', sans-serif", fontSize: 13,
                color: "rgba(255,255,255,0.7)", fontWeight: 600,
              }}>Voortgang</span>
              <span style={{
                fontFamily: "'Nunito', sans-serif", fontSize: 13,
                color: "#FFCF44", fontWeight: 700,
              }}>{progress}/{totalActivities} activiteiten</span>
            </div>
            <ProgressBar current={progress} total={totalActivities} />
          </div>
        </div>

        {/* Module Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {MODULES.map((mod, i) => {
            const modCompleted = mod.activities.filter((_, ai) =>
              completedActivities.includes(`${mod.id}-${ai}`)
            ).length;
            const allDone = modCompleted === mod.activities.length;

            return (
              <button key={mod.id} onClick={() => setActiveModule(i)} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "18px 18px", borderRadius: 20,
                border: allDone ? "2px solid #28a745" : "2px solid rgba(255,255,255,0.1)",
                background: allDone
                  ? "rgba(40,167,69,0.15)"
                  : "rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.3s ease",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 0.08}s`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `linear-gradient(135deg, ${mod.color}, ${mod.color}BB)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, flexShrink: 0,
                  boxShadow: `0 4px 16px ${mod.color}44`,
                }}>{mod.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "'Fredoka', sans-serif", fontSize: 17,
                    fontWeight: 600, margin: 0, color: "#fff",
                    lineHeight: 1.2,
                  }}>
                    {mod.id}. {mod.title}
                    {allDone && <span style={{ marginLeft: 6 }}>✅</span>}
                  </p>
                  <p style={{
                    fontFamily: "'Nunito', sans-serif", fontSize: 13,
                    margin: "3px 0 0", color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.3,
                  }}>{mod.description}</p>
                  {mod.activities.length > 0 && (
                    <div style={{
                      display: "flex", gap: 4, marginTop: 6,
                    }}>
                      {mod.activities.map((_, ai) => (
                        <div key={ai} style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: completedActivities.includes(`${mod.id}-${ai}`)
                            ? "#28a745" : "rgba(255,255,255,0.2)",
                          transition: "background 0.3s",
                        }} />
                      ))}
                    </div>
                  )}
                </div>
                <div style={{
                  color: "rgba(255,255,255,0.3)", fontSize: 20,
                }}>›</div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 32, padding: "16px 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          <p style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 12,
            color: "rgba(255,255,255,0.3)", margin: 0,
          }}>
            Gebaseerd op Bitcoin voor Junioren van My First Bitcoin
          </p>
          <p style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 11,
            color: "rgba(255,255,255,0.2)", margin: "4px 0 0",
          }}>
            CC BY-SA 4.0
          </p>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        * { box-sizing: border-box; }
        button:hover { filter: brightness(1.05); }
      `}</style>
    </div>
  );
}
