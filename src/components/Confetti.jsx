export default function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} style={{
          position: "absolute", left: `${Math.random() * 100}%`, top: -10,
          width: 6 + Math.random() * 10, height: 6 + Math.random() * 10,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          backgroundColor: ["#F7931A","#0D9488","#7C3AED","#DC2626","#FBBF24","#2DD4BF"][i % 6],
          animation: `confFall ${1.2 + Math.random() * 1}s ${Math.random() * 0.5}s ease-out forwards`,
        }} />
      ))}
    </div>
  );
}
