import { memo, type RefObject } from "react";

const ROUTE = "M 150,430 C 300,410 380,330 520,320 C 660,310 740,300 860,270";

interface Props {
  narrow: boolean;
  pathRef: RefObject<SVGPathElement | null>;
  drawA: RefObject<SVGPathElement | null>;
  drawB: RefObject<SVGPathElement | null>;
  budaRef: RefObject<SVGGElement | null>;
  cursorRef: RefObject<SVGGElement | null>;
}

// Презентационная SVG-карта hero. Вся анимация — снаружи через ref'ы,
// поэтому memo: ре-рендер только при смене narrow.
const HeroMap = memo(function HeroMap({ narrow, pathRef, drawA, drawB, budaRef, cursorRef }: Props) {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio={narrow ? "xMidYMid meet" : "xMidYMid slice"}
      className="h-full w-full" role="img" aria-label="Карта маршрута Вена — Будапешт">
      <defs>
        <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(16,20,24,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1000" height="700" fill="url(#hero-grid)" />
      <g fill="none" stroke="rgba(16,20,24,0.1)" strokeWidth="1.5">
        <path d="M 60,120 C 220,100 420,140 620,110 S 900,90 1040,120" />
        <path d="M -20,560 C 200,540 420,580 640,550 S 900,530 1030,560" />
        <path d="M 420,-20 C 410,150 430,350 415,520 S 405,650 410,720" />
        <path d="M 700,-20 C 690,180 710,380 695,550 S 688,660 692,720" />
        <path d="M 200,430 C 350,470 500,455 660,480" strokeOpacity="0.6" />
        <path d="M 520,320 C 640,340 760,330 900,350" strokeOpacity="0.6" />
        <path d="M 150,250 C 300,230 480,250 640,230" strokeOpacity="0.5" />
        <path d="M 850,-20 C 845,120 855,300 848,460" strokeOpacity="0.5" />
        <path d="M -20,80 C 180,60 400,90 600,70 S 880,50 1030,80" strokeOpacity="0.45" />
        <path d="M -20,620 C 220,600 460,630 700,610 S 920,595 1040,615" strokeOpacity="0.45" />
        <path d="M 250,-20 C 260,160 245,340 255,520 S 260,660 258,720" strokeOpacity="0.4" />
        <path d="M 560,-20 C 555,140 568,320 560,500 S 556,650 560,720" strokeOpacity="0.4" />
        <path d="M 60,360 C 240,340 420,360 600,345 S 820,330 1010,350" strokeOpacity="0.5" />
        <path d="M 950,80 C 940,240 955,420 945,600" strokeOpacity="0.4" />
      </g>
      <g fill="none" stroke="rgba(11,138,118,0.4)" strokeWidth="1.5">
        <path className="street-flow" d="M 60,120 C 220,100 420,140 620,110 S 900,90 1040,120" />
        <path className="street-flow" d="M -20,560 C 200,540 420,580 640,550 S 900,530 1030,560" />
      </g>
      <path d="M -20,470 C 180,450 320,470 500,440 S 800,380 1020,400"
        fill="none" stroke="#2D9CDB" strokeOpacity="0.25" strokeWidth="10" strokeLinecap="round" />
      {(
        [
          { cx: 120, cy: 300, name: "Линц", lx: 132, ly: 305 },
          { cx: 60, cy: 470, name: "Инсбрук", lx: 60, ly: 498, anchor: "middle" },
          { cx: 330, cy: 540, name: "Грац", lx: 342, ly: 545 },
          { cx: 800, cy: 540, name: "Сегед", lx: 812, ly: 545 },
          { cx: 880, cy: 430, name: "Дебрецен", lx: 830, ly: 462 },
          { cx: 700, cy: 580, name: "Печ", lx: 712, ly: 585 },
        ] as { cx: number; cy: number; name: string; lx: number; ly: number; anchor?: "middle" }[]
      ).map(({ cx, cy, name, lx, ly, anchor }) => (
        <g key={name}>
          <circle cx={cx} cy={cy} r="4" fill="rgba(16,20,24,0.3)" />
          <text x={lx} y={ly} textAnchor={anchor} fill="rgba(16,20,24,0.45)"
            fontSize="15" letterSpacing="1" fontFamily="var(--font-mono), monospace">{name}</text>
        </g>
      ))}
      <path ref={pathRef} d={ROUTE} fill="none" stroke="rgba(16,20,24,0.15)" strokeWidth="2" />
      <path ref={drawA} d={ROUTE} fill="none" stroke="var(--brand)" strokeOpacity="0.25" strokeWidth="12" strokeLinecap="round"
        pathLength={100} style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
      <path ref={drawB} d={ROUTE} fill="none" stroke="var(--brand)" strokeWidth="5" strokeLinecap="round"
        pathLength={100} style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
      {[
        [284, 394, "Братислава"], [615, 312, "Дьёр"],
      ].map(([cx, cy, name]) => (
        <g key={name as string}>
          <circle cx={cx as number} cy={cy as number} r="5" fill="#F7F5EF" stroke="rgba(16,20,24,0.5)" strokeWidth="2" />
          <text x={cx as number} y={(cy as number) - 15} textAnchor="middle" fill="rgba(16,20,24,0.6)"
            fontSize="15" letterSpacing="1" fontFamily="var(--font-mono), monospace">{name}</text>
        </g>
      ))}
      <circle cx="150" cy="430" r="7" fill="var(--brand)">
        <animate attributeName="r" values="7;30" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="430" r="7" fill="var(--brand)" />
      <text x="150" y="474" textAnchor="middle" fill="rgba(16,20,24,0.85)"
        fontSize="22" letterSpacing="2.5" fontFamily="var(--font-mono), monospace">ВЕНА</text>
      <g ref={budaRef} style={{ opacity: 0 }}>
        <circle cx="860" cy="270" r="7" fill="var(--brand)">
          <animate attributeName="r" values="7;30" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="860" cy="270" r="7" fill="var(--brand)" />
        <text x="860" y="232" textAnchor="middle" fill="rgba(16,20,24,0.85)"
          fontSize="22" letterSpacing="2.5" fontFamily="var(--font-mono), monospace">БУДАПЕШТ</text>
      </g>
      <g ref={cursorRef} transform="translate(150,430)">
        <circle r="17" fill="none" stroke="var(--brand)" strokeWidth="3" />
        <path d="M11,0 L-7,-8 L-3,0 L-7,8 Z" fill="var(--brand)" />
      </g>
    </svg>
  );
});

export default HeroMap;
