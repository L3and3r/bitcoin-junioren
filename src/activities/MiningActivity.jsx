import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Confetti from "../components/Confetti";
import { S } from "../styles/shared";

const SYMBOLS = ["⛏️","🔗","🪙","🔑","🛡️","📦","⚡","🌐"];

export default function MiningActivity({ activity, color, onComplete }) {
  const { t } = useLanguage();
  const ui = t?.ui?.mining || {};

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards([...SYMBOLS, ...SYMBOLS].sort(() => Math.random() - 0.5).map((s, i) => ({ id: i, sym: s })));
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
        <span>⛏️ {ui.mined || "Mined"}: {matched.length / 2}/{SYMBOLS.length}</span>
        <span>🎯 {ui.attempts || "Attempts"}: {moves}</span>
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
          <p style={{ ...S.heading, fontSize: 22, color: "#22C55E" }}>
            🏆 {(ui.done || "Block completed in {moves} attempts!").replace("{moves}", moves)}
          </p>
          <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 10 }}>{ui.next || "Continue →"}</button>
        </div>
      )}
    </div>
  );
}
