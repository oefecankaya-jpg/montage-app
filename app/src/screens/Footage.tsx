import { CLIPS } from "../data";
import type { Montage } from "../useMontage";
import { AccentButton, NeutralButton } from "../components/Buttons";

export default function Footage({ m }: { m: Montage }) {
  const { state, kept, toggleClip, selectAll, go, fmtDur } = m;
  const dropCount = CLIPS.length - kept.length;
  const selDur = fmtDur(kept.reduce((a, c) => a + c.secs, 0));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "18px 22px 12px" }}>
        <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".18em", color: "#b68235" }}>
          STEP ONE
        </span>
        <h2
          style={{
            margin: "8px 0 6px",
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 400,
            fontSize: 30,
            lineHeight: 1.05,
          }}
        >
          The footage
        </h2>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "#9b9797" }}>
          Everything from this week is in. Tap to drop what you don't want read.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          padding: "0 22px 11px",
          font: "400 10px/1 ui-monospace,Menlo,monospace",
          letterSpacing: ".1em",
          color: "#b68235",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>{kept.length} KEPT</span>
        <span style={{ color: "rgba(243,242,242,0.3)" }}>/</span>
        <span>{selDur} READ</span>
        <span style={{ color: "rgba(243,242,242,0.3)" }}>/</span>
        <span>{dropCount} DROPPED</span>
      </div>
      <div className="scrollarea" style={{ flex: 1, overflow: "auto", padding: "0 22px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 7 }}>
          {CLIPS.map((clip) => {
            const on = !state.dropped[clip.id];
            const n = on ? kept.indexOf(clip) + 1 : "";
            return (
              <div
                key={clip.id}
                onClick={() => toggleClip(clip.id)}
                className="stripe-thumb"
                style={{
                  position: "relative",
                  aspectRatio: "9/13",
                  cursor: "pointer",
                  border: "1px solid rgba(243,242,242,0.12)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 5,
                    bottom: 4,
                    font: "400 8px/1 ui-monospace,Menlo,monospace",
                    color: "rgba(243,242,242,0.5)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {clip.dur}
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 5,
                    font: "400 7.5px/1.3 ui-monospace,Menlo,monospace",
                    color: "rgba(243,242,242,0.34)",
                    maxWidth: "72%",
                  }}
                >
                  {clip.label}
                </span>
                {on && (
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid #b68235",
                      borderRadius: 2,
                      boxShadow: "inset 0 0 0 3px rgba(23,22,21,0.6)",
                    }}
                  />
                )}
                {on && (
                  <span
                    style={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                      width: 14,
                      height: 14,
                      border: "1px solid #b68235",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      font: "400 8px/1 ui-monospace,Menlo,monospace",
                      color: "#c9954a",
                      background: "rgba(23,22,21,0.7)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {n}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          flex: "none",
          padding: "12px 22px 0",
          borderTop: "1px solid rgba(243,242,242,0.14)",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <NeutralButton onClick={selectAll}>Keep all</NeutralButton>
        <AccentButton onClick={() => go("terms")} style={{ flex: 1 }}>
          Direct the cut →
        </AccentButton>
      </div>
    </div>
  );
}
