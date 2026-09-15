import { DELIV_ROWS, DESTINATIONS } from "../data";
import type { Montage } from "../useMontage";
import { AccentButton, NeutralButton } from "../components/Buttons";

const ACCENT = "#b68235";
const LIT = "#c9954a";

export default function Print({ m }: { m: Montage }) {
  const { state, kept, total, go, tc, flipDeliv, doExport } = m;

  const delivKeys = Object.keys(state.deliv).map(Number);
  const delivCount = delivKeys.length;
  const delivSize = delivKeys.reduce((a, k) => a + DELIV_ROWS[k][2], 0).toFixed(0) + " MB · ~" + (12 + delivKeys.length * 9) + "s";
  const exportNote = state.exported
    ? "Printed. The master is in your camera roll and the project file is on the shelf — reopen it and every shot is still overridable."
    : "Printing keeps the project file, so the cut stays editable after it leaves the app. Captions are transcribed on device.";
  const exportCta = state.exported ? "Printed ✓" : "Print " + delivKeys.length + " files";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div className="scrollarea" style={{ flex: 1, overflow: "auto", padding: "18px 22px 12px" }}>
        <div style={{ border: "1px solid rgba(243,242,242,0.16)", padding: "26px 20px", textAlign: "center", background: "#1c1a19", position: "relative", overflow: "hidden" }}>
          <span
            style={{
              position: "absolute",
              right: -14,
              bottom: -40,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: 150,
              lineHeight: 0.8,
              color: "rgba(182,130,53,0.1)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            01
          </span>
          <span style={{ font: "400 9px/1 ui-monospace,Menlo,monospace", letterSpacing: ".2em", color: "#b68235" }}>
            MONTAGE / CUT 01
          </span>
          <h2 style={{ margin: "16px 0 2px", fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 36, lineHeight: 1.02, color: "#f3f2f2" }}>
            Golden Hour,
            <br />
            Twice Over
          </h2>
          <div style={{ height: 1, background: "rgba(182,130,53,0.5)", width: 56, margin: "16px auto" }} />
          <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.8, color: "#9b9797", position: "relative", fontVariantNumeric: "tabular-nums" }}>
            9 shots from {kept.length} clips
            <br />
            {tc(total)} · {state.aspect} · {state.grade}
            <br />
            Slow Bloom, 92 BPM
          </p>
        </div>

        <div style={{ marginTop: 18 }}>
          <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".18em", color: "#b68235" }}>
            DELIVERABLES
          </span>
          {DELIV_ROWS.map(([label, spec], i) => {
            const on = !!state.deliv[i];
            return (
              <div
                key={i}
                onClick={() => flipDeliv(i)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: "1px solid rgba(243,242,242,0.1)", cursor: "pointer" }}
              >
                <span
                  style={{
                    flex: "none",
                    width: 15,
                    height: 15,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    border: `1px solid ${on ? ACCENT : "rgba(243,242,242,0.22)"}`,
                    color: on ? LIT : "transparent",
                  }}
                >
                  ✓
                </span>
                <span style={{ flex: 1, fontSize: 12.5, color: "#f3f2f2" }}>{label}</span>
                <span style={{ flex: "none", font: "400 9.5px/1 ui-monospace,Menlo,monospace", color: "#7d7979", fontVariantNumeric: "tabular-nums" }}>
                  {spec}
                </span>
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "13px 0",
              font: "400 10px/1 ui-monospace,Menlo,monospace",
              letterSpacing: ".1em",
              color: "#c9954a",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span>{delivCount} SELECTED</span>
            <span>{delivSize}</span>
          </div>
        </div>

        {state.exported && (
          <div style={{ borderTop: "1px solid rgba(243,242,242,0.14)", paddingTop: 14 }}>
            <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".18em", color: "#b68235" }}>
              SEND IT
            </span>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
              {DESTINATIONS.map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: "1px solid rgba(243,242,242,0.1)", cursor: "pointer" }}>
                  <span style={{ flex: "none", width: 24, height: 24, border: "1px solid rgba(243,242,242,0.24)", borderRadius: 2 }} />
                  <span style={{ flex: 1, fontSize: 12.5, color: "#f3f2f2" }}>{t}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#c9954a" }}>→</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <p style={{ margin: "15px 0 0", fontSize: 11.5, lineHeight: 1.7, color: "#7d7979", textAlign: "justify" }}>{exportNote}</p>
      </div>
      <div style={{ flex: "none", padding: "12px 22px 0", borderTop: "1px solid rgba(243,242,242,0.14)", display: "flex", gap: 10 }}>
        <NeutralButton onClick={() => go("cut")} style={{ padding: "12px 13px" }}>
          Cut
        </NeutralButton>
        <AccentButton onClick={doExport} style={{ flex: 1 }}>
          {exportCta}
        </AccentButton>
      </div>
    </div>
  );
}
