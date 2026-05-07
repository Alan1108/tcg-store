import type { CSSProperties } from "react";

const CARD_COUNT = 42;

type CardSpec = {
  id: number;
  leftPct: number;
  delayS: number;
  durationS: number;
  widthPx: number;
  driftPx: number;
  rotDeg: number;
  blurPx: number;
  y0Vh: number;
  fallVh: number;
  opacityStart: number;
};

function buildCardSpecs(): CardSpec[] {
  return Array.from({ length: CARD_COUNT }, (_, i) => {
    const band = i % 3;
    const y0Vh =
      band === 0
        ? -8 + ((i * 11) % 26)
        : band === 1
          ? 10 + ((i * 17) % 32)
          : 28 + ((i * 13) % 34);
    const fallVh = 118 + (i % 5) * 6;
    const opacityStart = y0Vh < 2 ? 0.32 : 0.4 + (i % 4) * 0.04;

    return {
      id: i,
      leftPct: ((i * 23.7 + 5) % 96) + 2,
      delayS: (i * 0.41) % 10.5,
      durationS: 6.2 + (i % 9) * 0.75,
      widthPx: Math.round(15 + (i % 7) * 2.8),
      driftPx: -42 + ((i * 17) % 85),
      rotDeg: (i * 41) % 360,
      blurPx: i % 7 === 0 ? 1.1 : i % 7 === 4 ? 0.55 : 0,
      y0Vh,
      fallVh,
      opacityStart,
    };
  });
}

const SPECS = buildCardSpecs();

export type AmbientCardRainVariant = "dark" | "light";

type AmbientCardRainProps = {
  variant?: AmbientCardRainVariant;
};

export function AmbientCardRain({ variant = "dark" }: AmbientCardRainProps) {
  const isDark = variant === "dark";
  const wrapClass = isDark ? "coming-soon-card-rain" : "store-ambient-card-rain";
  const itemClass = isDark ? "coming-soon-card-rain-item" : "store-ambient-card-rain-item";

  return (
    <div className={wrapClass} aria-hidden>
      {SPECS.map((c) => (
        <span
          key={c.id}
          className={itemClass}
          style={
            {
              left: `${c.leftPct}%`,
              width: c.widthPx,
              height: Math.round(c.widthPx * 1.38),
              animationDelay: `${c.delayS}s`,
              animationDuration: `${c.durationS}s`,
              "--card-drift": `${c.driftPx}px`,
              "--card-rot": `${c.rotDeg}deg`,
              "--card-blur": c.blurPx > 0 ? `${c.blurPx}px` : "0px",
              "--card-y-0": `${c.y0Vh}vh`,
              "--card-fall": `${c.fallVh}vh`,
              "--card-opacity-start": String(c.opacityStart),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
