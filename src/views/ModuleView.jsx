import { useState } from "react";
import ActivityView from "../activities/ActivityView";
import { S } from "../styles/shared";
import { saveProgress } from "../utils/storage";

const TYPE_LABEL = { quiz: "Quiz", sort: "Sorteren", match: "Koppelen", cipher: "Codes kraken", mining: "Memory", truefalse: "Openbaar/Privé", categorize: "Categoriseren", scramble: "Woordkraker" };
const TYPE_ICON  = { quiz: "❓", sort: "↕️", match: "🔗", cipher: "🔐", mining: "⛏️", truefalse: "⚖️", categorize: "📂", scramble: "🧩" };

export default function ModuleView({ module, progress, setProgress, onBack, onBadgeEarned }) {
  const [actIdx, setActIdx] = useState(null);

  const handleComplete = () => {
    if (actIdx !== null) {
      const key = `${module.id}-${actIdx}`;
      if (!progress.completed.includes(key)) {
        const np = { ...progress, completed: [...progress.completed, key] };
        const modDone = module.activities.every((_, ai) => np.completed.includes(`${module.id}-${ai}`));
        if (modDone && !np.badges.includes(module.badge)) {
          np.badges = [...np.badges, module.badge];
          onBadgeEarned(module.badge);
        }
        setProgress(np);
        saveProgress(np);
      }
    }
    setActIdx(null);
  };

  const modCompleted = module.activities.filter((_, ai) => progress.completed.includes(`${module.id}-${ai}`)).length;
  const allDone = modCompleted === module.activities.length;

  if (actIdx !== null) {
    return (
      <div style={{ minHeight: "100vh", padding: "16px 14px", background: `linear-gradient(180deg, ${module.bg} 0%, #FFFBF5 100%)` }}>
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
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", ...S.heading, fontSize: 15,
          cursor: "pointer", color: module.color, marginBottom: 6,
        }}>← Schatkaart</button>

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

        <div style={{ ...S.card(), marginBottom: 16, border: `2px solid ${module.color}22` }}>
          <p style={{ ...S.heading, fontSize: 14, color: module.color, marginBottom: 4 }}>💡 Kernidee</p>
          <p style={{ ...S.body, fontSize: 14, color: "#555" }}>{module.summary}</p>
        </div>

        <h3 style={{ ...S.heading, fontSize: 18, color: "#1a1a2e", marginBottom: 10 }}>Activiteiten</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {module.activities.map((act, i) => {
            const done = progress.completed.includes(`${module.id}-${i}`);
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
                }}>{done ? "✓" : TYPE_ICON[act.type]}</div>
                <div>
                  <p style={{ ...S.heading, fontSize: 16, color: "#1a1a2e" }}>{act.title}</p>
                  <p style={{ ...S.body, fontSize: 12, color: "#888" }}>{TYPE_LABEL[act.type]}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
