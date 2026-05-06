import { useState } from "react";
import { S } from "../styles/shared";

export default function CategorizeActivity({ activity, color, onComplete }) {
  const [remaining, setRemaining] = useState(() => [...activity.items].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState(activity.categories.map(() => []));
  const [checked, setChecked] = useState(false);

  const place = (catIdx) => {
    if (remaining.length === 0 || checked) return;
    const item = remaining[0];
    setPlaced(placed.map((arr, i) => i === catIdx ? [...arr, item] : arr));
    setRemaining(r => r.slice(1));
  };

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
