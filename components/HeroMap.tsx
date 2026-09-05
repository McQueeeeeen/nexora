import { memo, type RefObject } from "react";

const ROUTE = "M 180,480 C 320,480 440,430 580,390 C 700,350 780,300 860,250";

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
// Верхний левый угол карты (x: 0..550, y: 0..460) намеренно оставлен свободным от меток,
// чтобы заголовок никогда не соприкасался с названиями городов.
const HeroMap = memo(function HeroMap({ narrow, pathRef, drawA, drawB, budaRef, cursorRef }: Props) {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio={narrow ? "xMidYMid meet" : "xMidYMid slice"}
      className="h-full w-full" role="img" aria-label="Карта маршрута Вена — Будапешт">
      <defs>
        <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(42,33,29,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1000" height="700" fill="url(#hero-grid)" />
      <g fill="none" stroke="rgba(42,33,29,0.08)" strokeWidth="1.5">
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
      <g fill="none" stroke="rgba(42,33,29,0.3)" strokeWidth="1.5">
        <path className="street-flow" d="M 60,120 C 220,100 420,140 620,110 S 900,90 1040,120" />
        <path className="street-flow" d="M -20,560 C 200,540 420,580 640,550 S 900,530 1030,560" />
      </g>
      {/* Дунай (Danube River): плавное русло от Австрии к Будапешту */}
      <path d="M -20,500 C 180,480 360,460 560,405 S 840,230 1020,280"
        fill="none" stroke="#2A211D" strokeOpacity="0.18" strokeWidth="10" strokeLinecap="round" />
      {/* Университетские города Австрии и Венгрии (размещены вне зоны заголовка) */}
      {(
        [
          { cx: 70, cy: 500, name: "Линц", lx: 70, ly: 530, anchor: "middle" },
          { cx: 60, cy: 620, name: "Инсбрук", lx: 60, ly: 645, anchor: "middle" },
          { cx: 260, cy: 620, name: "Грац", lx: 260, ly: 645, anchor: "middle" },
          { cx: 620, cy: 570, name: "Печ", lx: 620, ly: 595, anchor: "middle" },
          { cx: 780, cy: 540, name: "Сегед", lx: 780, ly: 565, anchor: "middle" },
          { cx: 920, cy: 390, name: "Дебрецен", lx: 920, ly: 415, anchor: "middle" },
          { cx: 890, cy: 150, name: "Мишкольц", lx: 890, ly: 175, anchor: "middle" },
        ] as { cx: number; cy: number; name: string; lx: number; ly: number; anchor?: "middle" }[]
      ).map(({ cx, cy, name, lx, ly, anchor }) => (
        <g key={name}>
          <circle cx={cx} cy={cy} r="4" fill="rgba(42,33,29,0.3)" />
          <text x={lx} y={ly} textAnchor={anchor} fill="rgba(42,33,29,0.55)"
            fontSize="14" letterSpacing="1" fontFamily="var(--font-mono), monospace">{name}</text>
        </g>
      ))}
      <path ref={pathRef} d={ROUTE} fill="none" stroke="rgba(42,33,29,0.15)" strokeWidth="2" />
      <path ref={drawA} d={ROUTE} fill="none" stroke="var(--brand)" strokeOpacity="0.2" strokeWidth="12" strokeLinecap="round"
        pathLength={100} style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
      <path ref={drawB} d={ROUTE} fill="none" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round"
        pathLength={100} style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
      {/* Промежуточный студенческий город маршрута — Дьёр (Венгрия) */}
      <g>
        <circle cx={580} cy={390} r="5" fill="#FBF9F5" stroke="rgba(42,33,29,0.5)" strokeWidth="2" />
        <text x={580} y={365} textAnchor="middle" fill="rgba(42,33,29,0.7)"
          fontSize="15" letterSpacing="1" fontFamily="var(--font-mono), monospace">Дьёр</text>
      </g>
      {/* Вена — столица программ в Австрии */}
      <circle cx="180" cy="480" r="7" fill="var(--brand)">
        <animate attributeName="r" values="7;30" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="180" cy="480" r="7" fill="var(--brand)" />
      <text x="180" y="525" textAnchor="middle" fill="rgba(42,33,29,0.9)"
        fontSize="22" letterSpacing="2.5" fontFamily="var(--font-mono), monospace">ВЕНА</text>
      {/* Будапешт — столица программ в Венгрии */}
      <g ref={budaRef} style={{ opacity: 0 }}>
        <circle cx="860" cy="250" r="7" fill="var(--brand)">
          <animate attributeName="r" values="7;30" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="860" cy="250" r="7" fill="var(--brand)" />
        <text x="860" y="210" textAnchor="middle" fill="rgba(42,33,29,0.9)"
          fontSize="22" letterSpacing="2.5" fontFamily="var(--font-mono), monospace">БУДАПЕШТ</text>
      </g>
      <g ref={cursorRef} transform="translate(180,480)">
        <circle r="17" fill="none" stroke="var(--brand)" strokeWidth="3" />
        <path d="M11,0 L-7,-8 L-3,0 L-7,8 Z" fill="var(--brand)" />
      </g>
    </svg>
  );
});

export default HeroMap;
