import { useState, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Confetti from "../components/Confetti";
import { S } from "../styles/shared";

export default function MatchActivity({ activity, color, onComplete }) {
  const { t } = useLanguage();
  const m_ = t?.ui?.match || {};
  const c = t?.ui?.common || {};

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
      <p style={{ ...S.heading, fontSize: 14, textAlign: "center", color: "#888", marginBottom: 10 }}>
        {(m_.instruction || "Click OLD first, then NEW")} ({matched.length}/{activity.pairs.length})
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <p style={{ ...S.heading, fontSize: 14, textAlign: "center", color: "#92400E", marginBottom: 6 }}>{m_.old || "🏛️ Old"}</p>
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
          <p style={{ ...S.heading, fontSize: 14, textAlign: "center", color: "#1E40AF", marginBottom: 6 }}>{m_.new || "🚀 New"}</p>
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
          <p style={{ ...S.heading, fontSize: 22, color: "#22C55E" }}>{m_.allDone || "🎉 All matched!"}</p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 8 }}>{c.continue || "Continue →"}</button>
        </div>
      )}
    </div>
  );
}
