import type { Montage } from "../useMontage";
import type { Screen } from "../data";

const TAGS: Record<Screen, string> = {
  shelf: "III",
  footage: "01",
  terms: "02",
  looks: "02",
  render: "03",
  cut: "04",
  print: "05",
};

export default function Header({ m }: { m: Montage }) {
  const { state, go } = m;
  const backCol = state.screen === "shelf" ? "rgba(243,242,242,0.18)" : "#f3f2f2";
  const back = () => go(state.screen === "shelf" ? "shelf" : state.prev);

  return (
    <>
      <div
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "calc(env(safe-area-inset-top) + 14px) 22px 11px",
        }}
      >
        <span
          onClick={back}
          style={{
            flex: "none",
            width: 26,
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 18,
            color: backCol,
            cursor: "pointer",
          }}
        >
          ←
        </span>
        <span
          style={{
            flex: 1,
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: ".18em",
            textAlign: "center",
            color: "#f3f2f2",
          }}
        >
          MONTAGE
        </span>
        <span
          style={{
            flex: "none",
            width: 26,
            textAlign: "right",
            font: "400 9px/1.4 ui-monospace,Menlo,monospace",
            letterSpacing: ".06em",
            color: "#b68235",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {TAGS[state.screen]}
        </span>
      </div>
      <div style={{ flex: "none", height: 1, background: "rgba(243,242,242,0.14)", margin: "0 22px" }} />
    </>
  );
}
