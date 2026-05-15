import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { S } from "../styles/shared";

const LNURL = "LNURL1DP68GURN8GHJ7MR9V9HXGETJ9ESH57NPD4HJUMN9WSHKCMN4WFK8QT6VTFD8GNZG88AEN3";

export default function DonateButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(LNURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "1px solid rgba(247,147,26,0.3)",
          borderRadius: 10,
          padding: "7px 16px",
          color: "rgba(247,147,26,0.7)",
          fontSize: 13,
          cursor: "pointer",
          ...S.body,
          transition: "all 0.2s",
        }}
      >
        ⚡ Doneer sats
      </button>

      {open && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          background: "#fff",
          borderRadius: 16,
          padding: "20px 24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}>
          <QRCodeSVG
            value={LNURL}
            size={200}
            bgColor="#ffffff"
            fgColor="#0C1222"
            level="M"
          />
          <p style={{ ...S.body, fontSize: 12, color: "#888", textAlign: "center" }}>
            Scan met een Lightning wallet
          </p>
          <button
            onClick={copy}
            style={{
              ...S.body,
              fontSize: 13,
              fontWeight: 700,
              background: copied ? "#22C55E" : "#F7931A",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "8px 18px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            {copied ? "✓ Gekopieerd!" : "Kopieer LNURL"}
          </button>
        </div>
      )}
    </div>
  );
}
