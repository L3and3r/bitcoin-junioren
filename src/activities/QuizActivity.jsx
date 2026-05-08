import { useState, useMemo } from "react";
import Confetti from "../components/Confetti";
import ProgressDots from "../components/ProgressDots";
import { S } from "../styles/shared";

function shuffleQuestions(questions) {
  return questions.map(q => {
    const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    return { ...q, options: indexed.map(x => x.opt), correct: indexed.findIndex(x => x.isCorrect) };
  });
}

export default function QuizActivity({ activity, color, onComplete }) {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [conf, setConf] = useState(false);
  const questions = useMemo(() => shuffleQuestions(activity.questions), [activity.questions]);
  const q = questions[qi];

  const pick = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.correct) { setScore(s => s + 1); setConf(true); setTimeout(() => setConf(false), 1500); }
  };
  const next = () => {
    if (qi === questions.length - 1) setDone(true);
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
          {score} / {questions.length} correct
        </p>
        <button onClick={onComplete} style={S.btn("#F7931A")}>Verder →</button>
      </div>
    );
  }

  return (
    <div>
      <Confetti active={conf} />
      <ProgressDots total={questions.length} current={qi} color={color} />
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
            {qi === questions.length - 1 ? "Resultaat" : "Volgende →"}
          </button>
        </div>
      )}
    </div>
  );
}
