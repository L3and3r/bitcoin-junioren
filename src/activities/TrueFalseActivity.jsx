import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Confetti from "../components/Confetti";
import ProgressDots from "../components/ProgressDots";
import { S } from "../styles/shared";

export default function TrueFalseActivity({ activity, color, onComplete }) {
  const { t } = useLanguage();
  const tf = t?.ui?.truefalse || {};
  const c = t?.ui?.common || {};

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);
  const st = activity.statements[idx];

  const answer = (val) => {
    if (feedback) return;
    const correct = val === st.answer;
    if (correct) setScore(s => s + 1);
    setFeedback({ correct, explanation: st.explanation });
  };
  const next = () => {
    if (idx === activity.statements.length - 1) setDone(true);
    else { setIdx(i => i + 1); setFeedback(null); }
  };

  if (done) {
    const scoreStr = (tf.score || c.score || "{score} / {total} correct")
      .replace("{score}", score).replace("{total}", activity.statements.length);
    return (
      <div style={{ textAlign: "center", padding: 16 }}>
        <Confetti active={score === activity.statements.length} />
        <div style={{ fontSize: 56, marginBottom: 8 }}>{score === activity.statements.length ? "🏆" : "⭐"}</div>
        <h3 style={{ ...S.heading, fontSize: 24, color: "#1a1a2e" }}>{scoreStr}</h3>
        <button onClick={onComplete} style={{ ...S.btn("#F7931A"), marginTop: 16 }}>{c.continue || "Continue →"}</button>
      </div>
    );
  }

  return (
    <div>
      <ProgressDots total={activity.statements.length} current={idx} color={color} />
      <div style={{ ...S.card(), textAlign: "center", margin: "16px 0" }}>
        <p style={{ ...S.heading, fontSize: 22, color: "#1a1a2e" }}>{st.text}</p>
      </div>
      {!feedback ? (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => answer(true)} style={{
            ...S.btn("#22C55E", 18), padding: "18px 32px", borderRadius: 18, flex: 1, maxWidth: 160,
          }}>{tf.public || "🌍 Public"}</button>
          <button onClick={() => answer(false)} style={{
            ...S.btn("#DC2626", 18), padding: "18px 32px", borderRadius: 18, flex: 1, maxWidth: 160,
          }}>{tf.private || "🔐 Private"}</button>
        </div>
      ) : (
        <div style={{
          padding: 16, borderRadius: 16, animation: "slideUp 0.25s ease",
          background: feedback.correct ? "#F0FDF4" : "#FEF2F2",
        }}>
          <p style={{ ...S.body, fontSize: 15 }}>
            {feedback.correct ? (c.correct || "✅ Correct! ") : (c.wrong || "❌ Not quite. ")}{feedback.explanation}
          </p>
          <button onClick={next} style={{ ...S.btn(color, 15), marginTop: 10 }}>{c.next || "Next →"}</button>
        </div>
      )}
    </div>
  );
}
