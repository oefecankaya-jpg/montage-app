import { STEPS } from "../data";
import type { Montage } from "../useMontage";

const ACCENT = "#b68235";
const LIT = "#c9954a";

export default function Render({ m }: { m: Montage }) {
  const { state, done, go } = m;
  const pctNum = Math.round((state.step / (STEPS.length - 1)) * 100);
  const nowLine = done ? "The cut is ready." : STEPS[state.step][0] + "…";
  const renderCta = done ? "Open the cut →" : "Skip to the cut";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 22px", overflow: "hidden" }}>
      <div style={{ flex: "none", padding: "24px 0 16px", position: "relative" }}>
        <span
          style={{
            position: "absolute",
            right: -4,
            top: 2,
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: 112,
            lineHeight: 0.8,
            color: "rgba(182,130,53,0.16)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {pctNum}
        </span>
        <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".18em", color: "#b68235" }}>
          STEP THREE · ASSEMBLING
        </span>
        <h2
          style={{
            margin: "9px 0 0",
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 400,
            fontSize: 29,
            lineHeight: 1.08,
            maxWidth: "70%",
          }}
        >
          {nowLine}
        </h2>
      </div>

      <div style={{ flex: "none", height: 1, background: "rgba(243,242,242,0.14)", position: "relative" }}>
        <span style={{ position: "absolute", left: 0, top: 0, height: 1, background: "#b68235", width: pctNum + "%" }} />
      </div>

      <div className="scrollarea" style={{ flex: 1, overflow: "auto", padding: "4px 0 10px" }}>
        {STEPS.map(([t, sub], i) => {
          const past = i < state.step;
          const now = i === state.step;
          const col = past ? "#9b9797" : now ? "#f3f2f2" : "#4c4948";
          const num = past ? ACCENT : now ? LIT : "#4c4948";
          const mark = past ? "DONE" : now ? "···" : "";
          return (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid rgba(243,242,242,0.08)" }}>
              <span style={{ flex: "none", width: 22, font: "400 9.5px/1.6 ui-monospace,Menlo,monospace", color: num, fontVariantNumeric: "tabular-nums" }}>
                {"0" + (i + 1)}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: col }}>{t}</div>
                <div style={{ fontSize: 10.5, lineHeight: 1.5, color: "#605d5d" }}>{now ? sub : ""}</div>
              </div>
              <span style={{ flex: "none", font: "400 9px/1 ui-monospace,Menlo,monospace", letterSpacing: ".1em", color: num }}>{mark}</span>
            </div>
          );
        })}
      </div>

      <div style={{ flex: "none", padding: "10px 0 0", borderTop: "1px solid rgba(243,242,242,0.14)" }}>
        <button
          onClick={() => go("cut")}
          style={{
            width: "100%",
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 600,
            fontSize: 14,
            color: done ? LIT : "#f3f2f2",
            background: "transparent",
            border: `1px solid ${done ? ACCENT : "rgba(243,242,242,0.24)"}`,
            borderRadius: 4,
            padding: 13,
            cursor: "pointer",
          }}
        >
          {renderCta}
        </button>
      </div>
    </div>
  );
}
