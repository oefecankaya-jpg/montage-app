import type { Montage } from "../useMontage";
import type { Screen } from "../data";

const STOPS: [string, Screen][] = [
  ["Shelf", "shelf"],
  ["Footage", "footage"],
  ["Terms", "terms"],
  ["Cut", "cut"],
  ["Print", "print"],
];

export default function Stepper({ m }: { m: Montage }) {
  const { state, go } = m;
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        padding: "13px 22px calc(env(safe-area-inset-bottom) + 10px)",
        borderTop: "1px solid rgba(243,242,242,0.14)",
      }}
    >
      {STOPS.map(([label, screen]) => {
        const active = state.screen === screen;
        return (
          <span
            key={screen}
            onClick={() => go(screen)}
            style={{ flex: 1, cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}
          >
            <span style={{ height: 1, background: active ? "#b68235" : "rgba(243,242,242,0.16)" }} />
            <span
              style={{
                font: "400 8.5px/1 ui-monospace,Menlo,monospace",
                letterSpacing: ".1em",
                color: active ? "#c9954a" : "#605d5d",
              }}
            >
              {label.toUpperCase()}
            </span>
          </span>
        );
      })}
    </div>
  );
}
