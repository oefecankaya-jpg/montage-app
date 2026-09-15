import type { MouseEvent } from "react";
import { SHOTS } from "../data";
import type { Montage } from "../useMontage";
import { AccentButton, NeutralButton } from "../components/Buttons";

const ACCENT = "#b68235";
const LIT = "#c9954a";

export default function Cut({ m }: { m: Montage }) {
  const { state, total, cur, curLen, acc, look, go, tc, togglePlay, scrubTo, pickShot, reroll, trim, hold, drop } = m;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => tc(total * f));
  const playPct = Math.round(state.playhead * 100) + "%";
  const playTc = tc(state.playhead * total) + " / " + tc(total);
  const beatLabel = state.music > 55 ? "CUTS SNAPPED TO BEAT" : "CUTS RIDE FREE";
  const showCaptions = state.captions && cur[4] !== "";

  const onScrub = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    scrubTo((e.clientX - r.left) / r.width);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 22px 12px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
        <div>
          <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".18em", color: "#b68235" }}>
            STEP FOUR · {SHOTS.length} SHOTS
          </span>
          <h2 style={{ margin: "8px 0 0", fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 27, lineHeight: 1.05 }}>
            The assembly
          </h2>
        </div>
        <span style={{ font: "400 11px/1 ui-monospace,Menlo,monospace", color: "#c9954a", fontVariantNumeric: "tabular-nums" }}>
          {playTc}
        </span>
      </div>

      <div
        style={{
          margin: "0 22px",
          border: "1px solid rgba(243,242,242,0.14)",
          borderRadius: 2,
          background: "repeating-linear-gradient(135deg,#242220 0 5px,#1e1c1b 5px 10px)",
          aspectRatio: "9/6",
          position: "relative",
          overflow: "hidden",
          filter: look[2],
        }}
      >
        <span style={{ position: "absolute", inset: 6, border: "1px solid rgba(243,242,242,0.1)" }} />
        <span style={{ position: "absolute", left: 12, top: 12, font: "400 9px/1.5 ui-monospace,Menlo,monospace", color: "rgba(243,242,242,0.45)" }}>
          SHOT {"0" + (state.shot + 1)} — {cur[0]}
        </span>
        <span
          style={{
            position: "absolute",
            left: 12,
            bottom: 12,
            font: "400 9px/1 ui-monospace,Menlo,monospace",
            color: "rgba(243,242,242,0.4)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {cur[1]} · {curLen.toFixed(1)}s · {state.grade}
        </span>
        <span
          onClick={togglePlay}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 46,
            height: 46,
            border: "1px solid #b68235",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "rgba(23,22,21,0.55)",
          }}
        >
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#c9954a", letterSpacing: ".06em" }}>
            {state.playing ? "II" : "▶"}
          </span>
        </span>
        {showCaptions && (
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 30,
              textAlign: "center",
              fontSize: 11,
              color: "#f3f2f2",
              textShadow: "0 1px 3px rgba(0,0,0,.8)",
            }}
          >
            {cur[4]}
          </span>
        )}
      </div>

      <div style={{ padding: "13px 22px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            font: "400 8.5px/1 ui-monospace,Menlo,monospace",
            color: "#7d7979",
            marginBottom: 5,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {ticks.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
        <div onClick={onScrub} style={{ position: "relative", display: "flex", gap: 2, height: 42, cursor: "pointer" }}>
          {SHOTS.map((s, i) => {
            const on = i === state.shot;
            return (
              <span
                key={i}
                onClick={() => pickShot(i)}
                style={{
                  position: "relative",
                  flex: s[2],
                  minWidth: 0,
                  borderRadius: 1,
                  background: "repeating-linear-gradient(90deg,#332f2b 0 3px,#282523 3px 6px)",
                  borderTop: `1px solid ${on ? ACCENT : "rgba(243,242,242,0.16)"}`,
                  borderBottom: `1px solid ${on ? ACCENT : "rgba(243,242,242,0.16)"}`,
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 2,
                    top: 2,
                    font: "400 7.5px/1 ui-monospace,Menlo,monospace",
                    color: on ? LIT : "rgba(243,242,242,0.45)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {"0" + (i + 1)}
                </span>
              </span>
            );
          })}
          <span style={{ position: "absolute", top: -5, bottom: -5, width: 1, background: "#c9954a", left: playPct }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 7,
            font: "400 8.5px/1 ui-monospace,Menlo,monospace",
            letterSpacing: ".1em",
            color: "#7d7979",
          }}
        >
          <span>A1 — Slow Bloom, 92 BPM</span>
          <span>{beatLabel}</span>
        </div>
        <div style={{ display: "flex", gap: 2, height: 11, marginTop: 4 }}>
          {Array.from({ length: 24 }, (_, i) => (
            <span
              key={i}
              style={{ flex: 1, borderLeft: `1px solid ${i % 4 === 0 ? "rgba(201,149,74,0.8)" : "rgba(243,242,242,0.18)"}` }}
            />
          ))}
        </div>
      </div>

      <div className="scrollarea" style={{ flex: 1, overflow: "auto", padding: "14px 22px 10px" }}>
        <div style={{ borderTop: "1px solid rgba(243,242,242,0.14)", paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 16, color: "#f3f2f2" }}>
              Shot {"0" + (state.shot + 1)} — {cur[0]}
            </span>
            <span style={{ font: "400 10px/1 ui-monospace,Menlo,monospace", color: "#c9954a", fontVariantNumeric: "tabular-nums" }}>
              {tc(acc)} — {tc(acc + curLen)}
            </span>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 12.5, lineHeight: 1.65, color: "#9b9797", textAlign: "justify" }}>
            <em style={{ color: "#c9954a", fontStyle: "italic" }}>Why it's here — </em>
            {cur[3]}
          </p>
          <div style={{ display: "flex", gap: 7, marginTop: 12, flexWrap: "wrap" }}>
            <AccentButton onClick={reroll} style={{ fontSize: 12.5, padding: "10px 12px" }}>
              Re-roll
            </AccentButton>
            <NeutralButton onClick={trim} style={{ fontSize: 12.5, padding: "10px 12px" }}>
              Trim 0.4s
            </NeutralButton>
            <NeutralButton onClick={hold} style={{ fontSize: 12.5, padding: "10px 12px" }}>
              Hold longer
            </NeutralButton>
            <NeutralButton onClick={drop} style={{ fontSize: 12.5, padding: "10px 12px" }}>
              Drop
            </NeutralButton>
          </div>
          <p style={{ margin: "12px 0 0", font: "400 10px/1.6 ui-monospace,Menlo,monospace", color: "#605d5d" }}>
            {state.log || "No manual changes yet. Every shot here is the AI’s call — override any of them."}
          </p>
        </div>
      </div>

      <div style={{ flex: "none", padding: "12px 22px 0", borderTop: "1px solid rgba(243,242,242,0.14)", display: "flex", gap: 10 }}>
        <NeutralButton onClick={() => go("terms")} style={{ padding: "12px 13px" }}>
          Terms
        </NeutralButton>
        <AccentButton onClick={() => go("print")} style={{ flex: 1 }}>
          Print it →
        </AccentButton>
      </div>
    </div>
  );
}
