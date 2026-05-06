export default function ProgressDots({ total, current, color }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "8px 0" }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 24 : 10, height: 10, borderRadius: 5,
          background: i < current ? color : i === current ? color : "rgba(0,0,0,0.12)",
          opacity: i < current ? 0.5 : 1, transition: "all 0.3s",
        }} />
      ))}
    </div>
  );
}
