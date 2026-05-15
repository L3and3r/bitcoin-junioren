import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Confetti from "../components/Confetti";
import { S } from "../styles/shared";

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const DEFAULT_CHALLENGES = [
  { word: "BITCOIN", hint: "Digital money" },
  { word: "SATOSHI", hint: "The mysterious inventor" },
  { word: "SCARCE", hint: "There is not much of it" },
  { word: "WALLET", hint: "Store your bitcoin here" },
  { word: "BLOCK", hint: "Transactions are stored here" },
];

function encode(text, shift) {
  return text.toUpperCase().split("").map(c => {
    const i = ALPHA.indexOf(c);
    return i === -1 ? c : ALPHA[(i + shift) % 26];
  }).join("");
}

export default function CipherActivity({ activity, color, onComplete }) {
  const { t } = useLanguage();
  const ui = t?.ui?.cipher || {};
  const challenges = activity.challenges || DEFAULT_CHALLENGES;

  const [shift, setShift] = useState(3);
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
          🔄 {ui.wheel || "Cipher wheel"} — {shift}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", marginBottom: 8 }}>
          {ALPHA.split("").map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, fontSize: 11, fontFamily: "monospace" }}>
              <span style={{ color: "#1E40AF", fontWeight: 700 }}>{c}</span>
              <span style={{ fontSize: 8, color: "#999" }}>↓</span>
              <span style={{ color: "#DC2626", fontWeight: 700 }}>{ALPHA[(i + shift) % 26]}</span>
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
            {ui.challenge || "Challenge"} {ci + 1}/{challenges.length} — {ui.hint || "Hint"}: {ch.hint}
          </p>
          <p style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 700, letterSpacing: 5, textAlign: "center", margin: "10px 0", color: "#DC2626" }}>
            {encode(ch.word, shift)}
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            <input value={guess} onChange={e => setGuess(e.target.value)}
              onKeyDown={e => e.key === "Enter" && check()}
              placeholder={ui.placeholder || "Type the word..."}
              style={{ flex: 1, padding: "10px 12px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.08)", fontSize: 17, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 3 }}
            />
            <button onClick={check} style={S.btn(color, 15)}>{ui.check || "Check"}</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 16 }}>
          <Confetti active={true} />
          <p style={{ fontSize: 48 }}>🔓</p>
          <p style={{ ...S.heading, fontSize: 22, color: "#22C55E" }}>{ui.allDone || "All codes cracked!"}</p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 12 }}>{ui.next || "Continue →"}</button>
        </div>
      )}
    </div>
  );
}
