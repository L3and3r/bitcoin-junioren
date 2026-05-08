import { useState, useEffect } from "react";
import { MODULES } from "./data/modules";
import { loadProgress, saveProgress } from "./utils/storage";
import { S } from "./styles/shared";
import BadgeUnlock from "./components/BadgeUnlock";
import ModuleView from "./views/ModuleView";

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

  const totalActs = MODULES.reduce((s, m) => s + m.activities.length, 0);
  const done = progress.completed.length;

  const saveName = () => {
    if (!nameInput.trim()) return;
    const np = { ...progress, name: nameInput.trim() };
    setProgress(np); saveProgress(np); setShowName(false);
  };

  const newPlayer = () => {
    if (window.confirm("Nieuwe speler starten? De huidige voortgang wordt gewist.")) {
      const np = { completed: [], badges: [], name: "" };
      setProgress(np); saveProgress(np);
      setNameInput(""); setShowName(true);
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
        <Fonts />
        <ModuleView
          module={MODULES[activeModule]}
          progress={progress}
          setProgress={setProgress}
          onBack={() => setActiveModule(null)}
          onBadgeEarned={setNewBadge}
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

        {progress.badges.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18, justifyContent: "center" }}>
            {progress.badges.map((b, i) => (
              <span key={i} style={{
                ...S.body, fontSize: 11, fontWeight: 700, color: "#FBBF24",
                background: "rgba(251,191,36,0.12)", borderRadius: 10, padding: "4px 10px",
                border: "1px solid rgba(251,191,36,0.2)",
              }}>{b}</span>
            ))}
          </div>
        )}

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

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button onClick={newPlayer} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10, padding: "8px 16px", ...S.body, fontSize: 13,
            color: "rgba(255,255,255,0.4)", cursor: "pointer",
          }}>Nieuwe speler starten</button>
        </div>

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
