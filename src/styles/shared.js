export const S = {
  heading: { fontFamily: "'Baloo 2', cursive", margin: 0, lineHeight: 1.2 },
  body: { fontFamily: "'Quicksand', sans-serif", margin: 0, lineHeight: 1.5 },
  card: (bg = "rgba(255,255,255,0.92)") => ({
    background: bg, borderRadius: 20, padding: "20px 18px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
  }),
  btn: (bg, size = 16) => ({
    padding: `${size * 0.7}px ${size * 1.8}px`, borderRadius: 14,
    border: "none", background: bg, color: "#fff",
    fontSize: size, fontWeight: 700, cursor: "pointer",
    fontFamily: "'Baloo 2', cursive",
    boxShadow: `0 4px 14px ${bg}55`,
    transition: "transform 0.15s, box-shadow 0.15s",
  }),
};
