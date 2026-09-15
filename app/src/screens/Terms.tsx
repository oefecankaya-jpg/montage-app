import type { CSSProperties, MouseEvent } from "react";
import { ASPECTS, HOOKS, LOOKS, PACING, TRANS } from "../data";
import type { Montage } from "../useMontage";
import { AccentButton, NeutralButton } from "../components/Buttons";

const ACCENT = "#b68235";
const LIT = "#c9954a";
const DIM = "rgba(243,242,242,0.2)";

interface SliderSpec {
  label: string;
  key: "len" | "music" | "broll";
  val: number;
  unit: string;
  note: string;
  min: number;
  max: number;
}

const SLIDERS: SliderSpec[] = [
  { label: "Length target", key: "len", val: 0, unit: "s", note: "The cut lands within a second of this. Everything that will not fit stays in the bin.", min: 10, max: 90 },
  { label: "Music intensity", key: "music", val: 0, unit: "%", note: "How hard the cut leans on the beat. Low lets shots run past the bar line.", min: 0, max: 100 },
  { label: "B-roll vs you", key: "broll", val: 0, unit: "% b-roll", note: "Scenery against frames you are in. Below thirty it becomes a talking-head piece.", min: 0, max: 100 },
];

const SEGMENTS: { label: string; hint: string; key: "pacing" | "aspect" | "trans" | "hook"; opts: readonly string[] }[] = [
  { label: "Pacing", hint: "CUTS / MIN", key: "pacing", opts: PACING },
  { label: "Aspect", hint: "DELIVERY", key: "aspect", opts: ASPECTS },
  { label: "Transitions", hint: "BETWEEN SHOTS", key: "trans", opts: TRANS },
  { label: "Hook", hint: "FIRST 3 SECONDS", key: "hook", opts: HOOKS },
];

const TOGGLES: { label: string; note: string; key: "captions" | "camera" }[] = [
  { label: "Burn in captions", note: "Transcribed on device, set in Lora, one line at a time.", key: "captions" },
  { label: "Simulate camera move", note: "Slow push on static frames — four percent over the shot.", key: "camera" },
];

export default function Terms({ m }: { m: Montage }) {
  const { state, kept, total, setField, go, startRender, tc } = m;

  const rowStyle: CSSProperties = { padding: "13px 0", borderTop: "1px solid rgba(243,242,242,0.12)" };

  const brief = (
    "THE BRIEF — " + kept.length + " CLIPS · " + tc(total) + " · " + state.pacing.toUpperCase() + " · " + state.grade.toUpperCase() + " · " + state.aspect
  ).toUpperCase();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "18px 22px 10px" }}>
        <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".18em", color: "#b68235" }}>
          STEP TWO · CALL SHEET
        </span>
        <h2 style={{ margin: "8px 0 0", fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 30, lineHeight: 1.05 }}>
          Terms of the cut
        </h2>
      </div>

      <div className="scrollarea" style={{ flex: 1, overflow: "auto", padding: "0 22px 14px" }}>
        {SLIDERS.map((s) => {
          const val = state[s.key];
          const pct = Math.round(((val - s.min) / (s.max - s.min)) * 100) + "%";
          const onSet = (e: MouseEvent<HTMLDivElement>) => {
            const r = e.currentTarget.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
            setField(s.key, Math.round(s.min + p * (s.max - s.min)));
          };
          return (
            <div key={s.key} style={rowStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 14.5, color: "#f3f2f2" }}>
                  {s.label}
                </span>
                <span style={{ font: "400 10.5px/1 ui-monospace,Menlo,monospace", color: "#c9954a", fontVariantNumeric: "tabular-nums" }}>
                  {val}
                  {s.unit}
                </span>
              </div>
              <div onClick={onSet} style={{ position: "relative", height: 24, display: "flex", alignItems: "center", cursor: "pointer" }}>
                <span style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(243,242,242,0.22)" }} />
                <span style={{ position: "absolute", left: 0, top: 11, height: 1, background: "#b68235", width: pct }} />
                <span style={{ position: "absolute", top: 5, width: 1, height: 14, background: "#c9954a", left: pct }} />
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 11, lineHeight: 1.55, color: "#7d7979" }}>{s.note}</p>
            </div>
          );
        })}

        <div style={rowStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 14.5, color: "#f3f2f2" }}>
              Colour grade
            </span>
            <span
              onClick={() => go("looks")}
              style={{
                font: "400 9.5px/1 ui-monospace,Menlo,monospace",
                letterSpacing: ".08em",
                color: "#c9954a",
                cursor: "pointer",
                borderBottom: "1px solid rgba(182,130,53,0.5)",
                paddingBottom: 2,
              }}
            >
              ALL {LOOKS.length} LOOKS
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {LOOKS.slice(0, 3).map(([name, , filter]) => {
              const active = state.grade === name;
              return (
                <span
                  key={name}
                  onClick={() => setField("grade", name)}
                  style={{ flex: 1, cursor: "pointer", display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <span
                    className="stripe-thumb"
                    style={{
                      aspectRatio: "3/2",
                      border: `1px solid ${active ? ACCENT : "rgba(243,242,242,0.14)"}`,
                      filter,
                    }}
                  />
                  <span style={{ fontSize: 10.5, lineHeight: 1.3, color: active ? LIT : "#9b9797" }}>{name}</span>
                </span>
              );
            })}
          </div>
        </div>

        {SEGMENTS.map((seg) => (
          <div key={seg.key} style={rowStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 14.5, color: "#f3f2f2" }}>
                {seg.label}
              </span>
              <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".1em", color: "#7d7979" }}>
                {seg.hint}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {seg.opts.map((opt) => {
                const active = state[seg.key] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setField(seg.key, opt)}
                    style={{
                      fontFamily: "'Lora',Georgia,serif",
                      fontSize: 11.5,
                      padding: "8px 11px",
                      borderRadius: 2,
                      background: "transparent",
                      cursor: "pointer",
                      border: `1px solid ${active ? ACCENT : DIM}`,
                      color: active ? LIT : "#9b9797",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ padding: "13px 0 0", borderTop: "1px solid rgba(243,242,242,0.12)", display: "flex", flexDirection: "column", gap: 12 }}>
          {TOGGLES.map((t) => {
            const active = state[t.key];
            return (
              <div
                key={t.key}
                onClick={() => m.flip(t.key)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, cursor: "pointer" }}
              >
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 14, color: "#f3f2f2" }}>
                    {t.label}
                  </div>
                  <div style={{ fontSize: 10.5, lineHeight: 1.5, color: "#7d7979" }}>{t.note}</div>
                </div>
                <span
                  style={{
                    flex: "none",
                    width: 34,
                    height: 18,
                    borderRadius: 9,
                    position: "relative",
                    border: `1px solid ${active ? ACCENT : "rgba(243,242,242,0.22)"}`,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      left: active ? 18 : 2,
                      background: active ? LIT : "rgba(243,242,242,0.35)",
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>
        <p style={{ margin: "16px 0 0", font: "400 10px/1.6 ui-monospace,Menlo,monospace", color: "#605d5d" }}>{brief}</p>
      </div>

      <div style={{ flex: "none", padding: "12px 22px 0", borderTop: "1px solid rgba(243,242,242,0.14)", display: "flex", gap: 10 }}>
        <NeutralButton onClick={() => go("footage")}>Footage</NeutralButton>
        <AccentButton onClick={startRender} style={{ flex: 1 }}>
          Assemble
        </AccentButton>
      </div>
    </div>
  );
}
