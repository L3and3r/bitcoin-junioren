import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { S } from "../styles/shared";

export default function SortActivity({ activity, color, onComplete }) {
  const { t } = useLanguage();
  const s_ = t?.ui?.sort || {};
  const c = t?.ui?.common || {};

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
        <span>{s_.cheap || "💰 Cheap"}</span>
        <span>{s_.expensive || "💎 Expensive"}</span>
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
        <button onClick={() => setChecked(true)} style={S.btn(color)}>{s_.check || "Check"}</button>
        {checked && <button onClick={onComplete} style={S.btn("#F7931A")}>{c.continue || "Continue →"}</button>}
      </div>
      {checked && (
        <p style={{ ...S.heading, textAlign: "center", marginTop: 10, fontSize: 18, color: correct ? "#22C55E" : "#EF4444" }}>
          {correct ? (s_.perfect || "🎉 Perfect!") : (s_.almost || "Almost! Adjust the order.")}
        </p>
      )}
    </div>
  );
}
