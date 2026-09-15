export type Screen = "shelf" | "footage" | "terms" | "looks" | "render" | "cut" | "print";

export interface Clip {
  id: number;
  label: string;
  dur: string;
  secs: number;
}

const RAW_CLIPS: [string, string][] = [
  ["IMG_4471", "0:12"], ["IMG_4472", "0:31"], ["IMG_4478", "0:08"], ["IMG_4480", "1:04"],
  ["IMG_4482", "0:19"], ["IMG_4485", "0:26"], ["IMG_4491", "0:47"], ["IMG_4493", "0:14"],
  ["IMG_4495", "0:09"], ["IMG_4498", "0:38"], ["IMG_4501", "0:22"], ["IMG_4503", "0:16"],
  ["IMG_4507", "0:55"], ["IMG_4509", "0:11"], ["IMG_4512", "0:29"], ["IMG_4514", "0:07"],
  ["IMG_4518", "0:41"], ["IMG_4520", "0:18"], ["IMG_4522", "0:13"], ["IMG_4526", "0:34"],
  ["IMG_4529", "0:24"], ["IMG_4533", "0:16"], ["IMG_4536", "0:21"], ["IMG_4540", "0:09"],
];

export const CLIPS: Clip[] = RAW_CLIPS.map(([label, dur], i) => ({
  id: i,
  label,
  dur,
  secs: (+dur.split(":")[0]) * 60 + (+dur.split(":")[1]),
}));

export const STEPS: [string, string][] = [
  ["Reading the footage", "Twenty clips, frame by frame, on the phone."],
  ["Finding the best moments", "Sharpness, exposure, faces, horizon lines."],
  ["Marking beats in the music bed", "Ninety-two to the minute; every second bar."],
  ["Choosing the cold open", "The strongest frame goes first, not the earliest."],
  ["Grading to the look", "Exposure matched shot to shot before the stock."],
  ["Laying the cut", "Nine shots, motion matched across the joins."],
  ["Print ready", "Project file kept — nothing is baked in."],
];

export const SHOTS: [string, string, number, string, string][] = [
  ["Rooftop, wide", "IMG_4480", 2.4, "Strongest first frame in the roll — the horizon lands dead centre and the exposure is already close to the grade.", "We got up there before anyone else did."],
  ["Hands, macro", "IMG_4495", 1.2, "Cuts the wide before it settles. Short enough to read as a beat, not a shot.", ""],
  ["Street, tracking", "IMG_4491", 3.1, "Camera moves left, so it carries the eye into the next shot without needing a transition.", "Six blocks, no plan."],
  ["Face, close", "IMG_4472", 2.0, "The only frame where you look up into the light. Held two beats longer than the rest.", ""],
  ["Water, slow", "IMG_4507", 3.6, "Breath after the close-up. Ramped to 0.6× so it sits under the chorus.", "Then the tide came in."],
  ["Sign, static", "IMG_4518", 1.1, "Reads in under a second and names the place, so nothing has to say it out loud.", ""],
  ["Crowd, pan", "IMG_4498", 2.7, "Motion direction matches the tracking shot three shots earlier — the pair bookends the middle.", ""],
  ["Window, silhouette", "IMG_4526", 2.2, "Darkest frame in the cut; it buys contrast for the last shot.", ""],
  ["Horizon, last light", "IMG_4485", 3.4, "Ends on the warmest frame you shot. Holds twelve frames past the final beat.", "Same hour, second time lucky."],
];

export const LOOKS: [string, string, string][] = [
  ["Kodak 2383", "Print stock warmth, deep blacks.", "sepia(0.28) saturate(0.9) contrast(1.08)"],
  ["Bleach bypass", "Silver retained — harsh and metallic.", "saturate(0.35) contrast(1.35) brightness(1.05)"],
  ["Cold night", "Blue shadows, clean highlights.", "hue-rotate(-18deg) saturate(1.1) brightness(0.92)"],
  ["Faded 16mm", "Lifted blacks, milky grain.", "sepia(0.18) saturate(0.7) contrast(0.88) brightness(1.08)"],
  ["Golden hour", "Everything an hour before dusk.", "sepia(0.4) saturate(1.15) contrast(1.05)"],
  ["Portra 400", "Neutral skin, soft roll-off.", "sepia(0.12) saturate(0.95) contrast(0.98)"],
  ["Tungsten", "Interior amber, held warm.", "sepia(0.45) saturate(0.8) brightness(0.95)"],
  ["Monochrome", "No colour to hide behind.", "grayscale(1) contrast(1.15)"],
];

export const PACING = ["Languid", "Measured", "Quick", "Frenetic"] as const;
export const ASPECTS = ["9:16", "4:5", "1:1", "2.39:1"] as const;
export const TRANS = ["Hard cuts", "Whip pan", "Dissolve", "Match cut"] as const;
export const HOOKS = ["Cold open", "Best frame first", "Question", "Slow build"] as const;

export const REELS: [string, string, string, string][] = [
  ["Golden Hour, Twice Over", "9 shots · 00:32 · 9:16", "Printed yesterday", "#7d7979"],
  ["Six Blocks, No Plan", "14 shots · 00:48 · 4:5", "Draft — 3 shots overridden", "#c9954a"],
  ["The Long Way Round", "7 shots · 00:21 · 9:16", "Printed last week", "#7d7979"],
];

export const DELIV_ROWS: [string, string, number][] = [
  ["Reels / TikTok master", "9:16 · 1080p60", 48],
  ["Feed crop", "4:5 · 1080p30", 31],
  ["Captions sidecar", ".SRT", 0.004],
  ["Project file", ".MONT", 2],
];

export const DESTINATIONS = ["Reels · drafts", "TikTok · with caption", "Camera roll", "Private review link"];

export const ACCENT = "#b68235";
export const NARRATION_SPEED = 850;

export function fmtDur(s: number): string {
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return m + ":" + (r < 10 ? "0" : "") + r;
}

export function tc(s: number): string {
  const t = Math.round(s);
  const m = Math.floor(t / 60);
  const r = t % 60;
  return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
}
