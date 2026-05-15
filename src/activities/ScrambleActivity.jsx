import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Confetti from "../components/Confetti";
import ProgressDots from "../components/ProgressDots";
import { S } from "../styles/shared";

export default function ScrambleActivity({ activity, color, onComplete }) {
  const { t } = useLanguage();
  const s_ = t?.ui?.scramble || {};
  const c = t?.ui?.common || {};

  const [wi, setWi] = useState(0);
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState([]);
  const [wrong, setWrong] = useState(false);
  const w = activity.words[wi];
  const allDone = solved.length === activity.words.length;

  const check = () => {
    if (guess.toUpperCase().trim() === w.answer.toUpperCase()) {
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
            {s_.hint || "Hint"}: {w.hint}
          </p>
          <div style={{
            display: "flex", gap: 8, justifyContent: "center", margin: "16px 0",
            animation: wrong ? "shake 0.35s ease" : "none",
          }}>
            {w.scrambled.split("").map((c_, i) => (
              <div key={i} style={{
                width: 40, height: 48, borderRadius: 10,
                background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                border: `2px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                ...S.heading, fontSize: 22, color: color,
              }}>{c_}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <input value={guess} onChange={e => setGuess(e.target.value)}
              onKeyDown={e => e.key === "Enter" && check()}
              placeholder={s_.placeholder || "Type the word..."}
              style={{ flex: 1, padding: "10px 12px", borderRadius: 12, border: "2px solid rgba(0,0,0,0.08)", fontSize: 17, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 3 }}
            />
            <button onClick={check} style={S.btn(color, 15)}>{s_.check || "Check"}</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 16 }}>
          <Confetti active={true} />
          <p style={{ fontSize: 48 }}>🧩</p>
          <p style={{ ...S.heading, fontSize: 22, color: "#22C55E" }}>{s_.allDone || "All words found!"}</p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 12 }}>{c.continue || "Continue →"}</button>
        </div>
      )}
    </div>
  );
}
