import { LOOKS } from "../data";
import type { Montage } from "../useMontage";
import { AccentButton } from "../components/Buttons";

export default function Looks({ m }: { m: Montage }) {
  const { state, setField, go } = m;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "18px 22px 12px" }}>
        <span style={{ font: "400 9.5px/1 ui-monospace,Menlo,monospace", letterSpacing: ".18em", color: "#b68235" }}>
          THE LOOK BOOK
        </span>
        <h2 style={{ margin: "8px 0 6px", fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 29, lineHeight: 1.05 }}>
          Eight grades
        </h2>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "#9b9797" }}>
          Each one is a film stock, not a filter — exposure and contrast are matched per shot before it lands.
        </p>
      </div>
      <div className="scrollarea" style={{ flex: 1, overflow: "auto", padding: "0 22px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12 }}>
          {LOOKS.map(([name, note, filter]) => {
            const active = state.grade === name;
            return (
              <div
                key={name}
                onClick={() => setField("grade", name)}
                style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 7 }}
              >
                <span
                  className="stripe-thumb-2"
                  style={{
                    aspectRatio: "4/3",
                    border: "4px solid #242220",
                    outline: `1px solid ${active ? "#b68235" : "rgba(243,242,242,0.12)"}`,
                    filter,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: active ? "#c9954a" : "#f3f2f2",
                  }}
                >
                  {name}
                </span>
                <span style={{ fontSize: 10.5, lineHeight: 1.5, color: "#7d7979", marginTop: -4 }}>{note}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ flex: "none", padding: "12px 22px 0", borderTop: "1px solid rgba(243,242,242,0.14)" }}>
        <AccentButton onClick={() => go("terms")} style={{ width: "100%", fontSize: 14 }}>
          Use {state.grade}
        </AccentButton>
      </div>
    </div>
  );
}
