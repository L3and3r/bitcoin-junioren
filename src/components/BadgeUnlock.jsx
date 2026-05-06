import { S } from "../styles/shared";

export default function BadgeUnlock({ badge, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9998, backdropFilter: "blur(6px)",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 28, padding: "40px 32px",
        textAlign: "center", maxWidth: 320,
        animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🎖️</div>
        <h2 style={{ ...S.heading, fontSize: 24, color: "#1a1a2e", marginBottom: 4 }}>Badge Verdiend!</h2>
        <p style={{ ...S.body, fontSize: 22, fontWeight: 700, color: "#F7931A", marginBottom: 16 }}>{badge}</p>
        <p style={{ ...S.body, fontSize: 15, color: "#666", marginBottom: 20 }}>
          Je hebt alle activiteiten in deze module afgerond!
        </p>
        <button onClick={onClose} style={S.btn("#F7931A", 17)}>Geweldig!</button>
      </div>
    </div>
  );
}
