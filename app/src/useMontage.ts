import { useCallback, useEffect, useRef, useState } from "react";
import {
  CLIPS,
  LOOKS,
  SHOTS,
  STEPS,
  NARRATION_SPEED,
  fmtDur,
  tc,
  type Screen,
} from "./data";

interface State {
  screen: Screen;
  prev: Screen;
  dropped: Record<number, boolean>;
  len: number;
  music: number;
  broll: number;
  grade: string;
  pacing: string;
  aspect: string;
  trans: string;
  hook: string;
  captions: boolean;
  camera: boolean;
  step: number;
  playing: boolean;
  playhead: number;
  shot: number;
  log: string;
  deliv: Record<number, boolean>;
  exported: boolean;
}

const initialState: State = {
  screen: "shelf",
  prev: "shelf",
  dropped: { 3: true, 8: true, 15: true, 19: true, 22: true },
  len: 32,
  music: 62,
  broll: 45,
  grade: "Kodak 2383",
  pacing: "Measured",
  aspect: "9:16",
  trans: "Hard cuts",
  hook: "Cold open",
  captions: true,
  camera: true,
  step: 0,
  playing: true,
  playhead: 0,
  shot: 0,
  log: "",
  deliv: { 0: true, 1: true },
  exported: false,
};

export function useMontage() {
  const [state, setState] = useState<State>(initialState);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);

  const patch = useCallback((p: Partial<State> | ((s: State) => Partial<State>)) => {
    setState((s) => ({ ...s, ...(typeof p === "function" ? p(s) : p) }));
  }, []);

  const go = useCallback((screen: Screen) => {
    clearInterval(timer.current);
    setState((s) => ({ ...s, screen, prev: s.screen }));
  }, []);

  const startRender = useCallback(() => {
    clearInterval(timer.current);
    setState((s) => ({ ...s, screen: "render", prev: s.screen, step: 0 }));
    timer.current = setInterval(() => {
      setState((s) => {
        if (s.step >= STEPS.length - 1) {
          clearInterval(timer.current);
          return { ...s, step: STEPS.length - 1 };
        }
        return { ...s, step: s.step + 1 };
      });
    }, NARRATION_SPEED);
  }, []);

  const kept = CLIPS.filter((c) => !state.dropped[c.id]);
  const raw = SHOTS.reduce((a, s) => a + s[2], 0);
  const scale = state.len / raw;
  const total = state.len;
  const cur = SHOTS[state.shot];
  const curLen = cur[2] * scale;
  let acc = 0;
  for (let i = 0; i < state.shot; i++) acc += SHOTS[i][2] * scale;
  const done = state.step === STEPS.length - 1;
  const look = LOOKS.find((l) => l[0] === state.grade) ?? LOOKS[0];

  const toggleClip = useCallback((id: number) => {
    patch((s) => {
      const d = { ...s.dropped };
      if (d[id]) delete d[id];
      else d[id] = true;
      return { dropped: d };
    });
  }, [patch]);

  const selectAll = useCallback(() => patch({ dropped: {} }), [patch]);

  const setField = useCallback(
    <K extends keyof State>(key: K, value: State[K]) => patch({ [key]: value } as Partial<State>),
    [patch]
  );

  const flip = useCallback(
    (key: "captions" | "camera") => patch((s) => ({ [key]: !s[key] } as Partial<State>)),
    [patch]
  );

  const togglePlay = useCallback(() => patch((s) => ({ playing: !s.playing })), [patch]);

  const scrubTo = useCallback((pct: number) => patch({ playhead: Math.min(1, Math.max(0, pct)) }), [patch]);

  const pickShot = useCallback(
    (i: number) => {
      let a = 0;
      for (let k = 0; k < i; k++) a += SHOTS[k][2];
      patch({ shot: i, playhead: a / raw });
    },
    [patch, raw]
  );

  const reroll = useCallback(
    () => patch({ log: "SHOT " + (state.shot + 1) + " RE-ROLLED — NEW TAKE PULLED FROM " + cur[1] + "." }),
    [patch, state.shot, cur]
  );
  const trim = useCallback(
    () => patch({ log: "SHOT " + (state.shot + 1) + " TRIMMED 0.4s OFF THE TAIL." }),
    [patch, state.shot]
  );
  const hold = useCallback(
    () => patch({ log: "SHOT " + (state.shot + 1) + " HELD ONE BEAT LONGER; THE CUT AFTER IT MOVED UP." }),
    [patch, state.shot]
  );
  const drop = useCallback(
    () => patch({ log: "SHOT " + (state.shot + 1) + " DROPPED — THE GAP CLOSED WITH A MATCH CUT." }),
    [patch, state.shot]
  );

  const flipDeliv = useCallback(
    (i: number) =>
      patch((s) => {
        const o = { ...s.deliv };
        if (o[i]) delete o[i];
        else o[i] = true;
        return { deliv: o };
      }),
    [patch]
  );

  const doExport = useCallback(() => patch({ exported: true }), [patch]);

  return {
    state,
    go,
    startRender,
    kept,
    raw,
    scale,
    total,
    cur,
    curLen,
    acc,
    done,
    look,
    toggleClip,
    selectAll,
    setField,
    flip,
    togglePlay,
    scrubTo,
    pickShot,
    reroll,
    trim,
    hold,
    drop,
    flipDeliv,
    doExport,
    fmtDur,
    tc,
  };
}

export type Montage = ReturnType<typeof useMontage>;
