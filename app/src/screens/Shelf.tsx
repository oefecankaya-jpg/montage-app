import { REELS } from "../data";
import type { Montage } from "../useMontage";
import { AccentButton } from "../components/Buttons";

export default function Shelf({ m }: { m: Montage }) {
  const { go } = m;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "22px 22px 16px" }}>
        <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".18em", color: "#b68235" }}>
          THE SHELF
        </span>
        <h2
          style={{
            margin: "9px 0 7px",
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 400,
            fontSize: 33,
            lineHeight: 1.04,
          }}
        >
          Three reels,
          <br />
          one still cutting
        </h2>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: "#9b9797" }}>
          1,284 clips on this phone — 17 of them shot this week and never looked at again.
        </p>
      </div>
      <div className="scrollarea" style={{ flex: 1, overflow: "auto", padding: "0 22px 12px" }}>
        {REELS.map(([title, meta, state, stateCol], i) => (
          <div
            key={i}
            onClick={() => go("cut")}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              padding: "15px 0",
              borderTop: "1px solid rgba(243,242,242,0.12)",
              cursor: "pointer",
            }}
          >
            <span
              className="stripe-thumb"
              style={{
                flex: "none",
                width: 52,
                aspectRatio: "9/16",
                border: "4px solid #242220",
                outline: "1px solid rgba(243,242,242,0.12)",
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 600,
                  fontSize: 16.5,
                  lineHeight: 1.2,
                  color: "#f3f2f2",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginTop: 5,
                  font: "400 9.5px/1.5 ui-monospace,Menlo,monospace",
                  letterSpacing: ".06em",
                  color: "#7d7979",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {meta}
              </div>
              <div style={{ marginTop: 4, fontSize: 11.5, lineHeight: 1.5, color: stateCol }}>{state}</div>
            </div>
            <span style={{ flex: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#b68235" }}>
              →
            </span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(243,242,242,0.12)", paddingTop: 15 }}>
          <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: "#605d5d", textAlign: "justify" }}>
            Nothing is uploaded. Footage is read on the phone; only the edit decisions travel.
          </p>
        </div>
      </div>
      <div style={{ flex: "none", padding: "12px 22px 0", borderTop: "1px solid rgba(243,242,242,0.14)" }}>
        <AccentButton onClick={() => go("footage")} style={{ width: "100%", fontSize: 15, padding: 14, letterSpacing: ".02em" }}>
          Start a new reel
        </AccentButton>
      </div>
    </div>
  );
}
