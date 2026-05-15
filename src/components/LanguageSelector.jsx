import { useState } from "react";
import { useLanguage, LANG_NAMES } from "../contexts/LanguageContext";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const langs = Object.entries(LANG_NAMES);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 10,
          padding: "6px 12px",
          color: "#fff",
          fontSize: 13,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "inherit",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: 11, opacity: 0.6 }}>🌐</span>
        <span>{LANG_NAMES[lang]}</span>
        <span style={{ fontSize: 9, opacity: 0.6 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 99 }}
          />
          <div style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "#1A2744",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: 10,
            zIndex: 100,
            width: 280,
            maxHeight: "70vh",
            overflowY: "auto",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
            }}>
              {langs.map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); setOpen(false); }}
                  style={{
                    background: code === lang ? "rgba(247,147,26,0.2)" : "rgba(255,255,255,0.04)",
                    border: code === lang ? "1px solid rgba(247,147,26,0.4)" : "1px solid transparent",
                    borderRadius: 8,
                    padding: "7px 10px",
                    color: code === lang ? "#F7931A" : "rgba(255,255,255,0.75)",
                    fontSize: 12,
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: code === lang ? 700 : 400,
                    fontFamily: "inherit",
                    lineHeight: 1.3,
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ display: "block", fontSize: 10, opacity: 0.5, marginBottom: 1 }}>{code}</span>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
