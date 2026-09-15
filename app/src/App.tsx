import Header from "./components/Header";
import Stepper from "./components/Stepper";
import Shelf from "./screens/Shelf";
import Footage from "./screens/Footage";
import Terms from "./screens/Terms";
import Looks from "./screens/Looks";
import Render from "./screens/Render";
import Cut from "./screens/Cut";
import Print from "./screens/Print";
import { useMontage } from "./useMontage";

export default function App() {
  const m = useMontage();

  let screen;
  switch (m.state.screen) {
    case "shelf":
      screen = <Shelf m={m} />;
      break;
    case "footage":
      screen = <Footage m={m} />;
      break;
    case "terms":
      screen = <Terms m={m} />;
      break;
    case "looks":
      screen = <Looks m={m} />;
      break;
    case "render":
      screen = <Render m={m} />;
      break;
    case "cut":
      screen = <Cut m={m} />;
      break;
    case "print":
      screen = <Print m={m} />;
      break;
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          minHeight: "100dvh",
          background: "var(--screen-bg)",
          color: "var(--text)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Header m={m} />
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>{screen}</main>
        <Stepper m={m} />
        <div className="grain-overlay" />
      </div>
    </div>
  );
}
