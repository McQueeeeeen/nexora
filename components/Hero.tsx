"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { heroPhrases } from "../app/data";
import { useScrollProgress, Btn, onRafScroll } from "./ui";

// Hero как у эталона: тёмная карта, линия маршрута рисуется скроллом,
// точка едет по пути (getPointAtLength), фразы кроссфейдятся с дрейфом.
const ROUTE = "M 150,430 C 300,410 380,330 520,320 C 660,310 740,300 860,270";

const pos = [
  "top:14%;left:5%;text-align:left;max-width:min(720px,90vw)",
  "top:13%;left:5%;text-align:left;max-width:min(900px,66vw)",
  "bottom:12%;left:50%;text-align:center;max-width:min(1000px,92vw)",
] as const;

const CENTERED = 2; // фраза по центру (нужен translateX(-50%))

function css(s: string): React.CSSProperties {
  const o: Record<string, string> = {};
  s.split(";").forEach((kv) => {
    const i = kv.indexOf(":");
    if (i > 0) {
      const key = kv.slice(0, i).trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      o[key] = kv.slice(i + 1).trim();
    }
  });
  return o as React.CSSProperties;
}

export default function Hero() {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  const pre = usePathname() === "/" ? "" : "/";
  const n = heroPhrases.length;
  const x = p * Math.max(1, n - 1); // 0..n-1, центры фраз в целых точках
  const active = Math.min(n - 1, Math.round(x));

  // Точка на маршруте: двигаем напрямую в DOM, без ре-рендеров.
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const pRef = useRef(0);
  pRef.current = p;
  useEffect(() => onRafScroll(() => {
    const path = pathRef.current, dot = dotRef.current, halo = haloRef.current;
    if (!path || !dot || !halo) return;
    try {
      const len = path.getTotalLength();
      const pt = path.getPointAtLength(len * Math.max(0, Math.min(1, pRef.current)));
      dot.setAttribute("cx", pt.x.toFixed(1)); dot.setAttribute("cy", pt.y.toFixed(1));
      halo.setAttribute("cx", pt.x.toFixed(1)); halo.setAttribute("cy", pt.y.toFixed(1));
    } catch { /* SVG ещё не готов */ }
  }), []);

  // На узких экранах карту показываем целиком, на широких — кинематографичный кроп.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const f = () => setNarrow(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  const budapest = Math.max(0, Math.min(1, (p - 0.45) / 0.25)); // второй хаб проявляется к концу

  return (
    <div ref={ref} data-hero-region className="relative w-full" style={{ height: "320vh" }}>
      <section className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <svg viewBox="0 0 1000 700" preserveAspectRatio={narrow ? "xMidYMid meet" : "xMidYMid slice"}
          className="absolute inset-0 h-full w-full" role="img" aria-label="Карта маршрута Вена — Будапешт">
          <defs>
            <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="700" fill="url(#hero-grid)" />
          <path d="M -20,470 C 180,450 320,470 500,440 S 800,380 1020,400"
            fill="none" stroke="#7DD3FC" strokeOpacity="0.12" strokeWidth="10" strokeLinecap="round" />
          {[
            [120, 300, "Линц"], [60, 470, "Инсбрук"], [330, 540, "Грац"],
            [800, 540, "Сегед"], [880, 430, "Дебрецен"], [700, 580, "Печ"],
          ].map(([cx, cy, name]) => (
            <g key={name as string}>
              <circle cx={cx as number} cy={cy as number} r="4" fill="rgba(255,255,255,0.3)" />
              <text x={(cx as number) + 12} y={(cy as number) + 5} fill="rgba(255,255,255,0.38)"
                fontSize="15" letterSpacing="2" fontFamily="var(--font-mono), monospace">{name}</text>
            </g>
          ))}
          <path ref={pathRef} d={ROUTE} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
          <path d={ROUTE} fill="none" stroke="var(--brand-bright)" strokeWidth="3.5" strokeLinecap="round"
            pathLength={100} className="route-glow"
            style={{ strokeDasharray: 100, strokeDashoffset: 100 - p * 100 }} />
          {[
            [284, 394, "Братислава"], [615, 312, "Дьёр"],
          ].map(([cx, cy, name]) => (
            <g key={name as string}>
              <circle cx={cx as number} cy={cy as number} r="5" fill="#000" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
              <text x={cx as number} y={(cy as number) - 15} textAnchor="middle" fill="rgba(255,255,255,0.6)"
                fontSize="15" letterSpacing="2" fontFamily="var(--font-mono), monospace">{name}</text>
            </g>
          ))}
          <circle cx="150" cy="430" r="7" fill="var(--brand-bright)">
            <animate attributeName="r" values="7;30" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="430" r="7" fill="var(--brand-bright)" />
          <text x="150" y="474" textAnchor="middle" fill="rgba(255,255,255,0.85)"
            fontSize="22" letterSpacing="4" fontFamily="var(--font-mono), monospace">ВЕНА</text>
          <g style={{ opacity: budapest < 0.02 ? 0 : budapest }}>
            <circle cx="860" cy="270" r="7" fill="var(--brand-bright)">
              <animate attributeName="r" values="7;30" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="860" cy="270" r="7" fill="var(--brand-bright)" />
            <text x="860" y="232" textAnchor="middle" fill="rgba(255,255,255,0.85)"
              fontSize="22" letterSpacing="4" fontFamily="var(--font-mono), monospace">БУДАПЕШТ</text>
          </g>
          <circle ref={haloRef} cx="150" cy="430" r="14" fill="var(--brand-bright)" opacity="0.35" />
          <circle ref={dotRef} cx="150" cy="430" r="7" fill="#fff" />
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        <div className="pointer-events-none absolute inset-0 px-6 lg:px-12">
          {heroPhrases.map((t, i) => {
            const d = x - i; // <0 — фраза ещё впереди, >0 — уже ушла
            const opacity = Math.max(0, Math.min(1, 1 - Math.abs(d)));
            const drift = -d * 44; // входящая снизу (+), уходящая вверх (−)
            const transform = `${i === CENTERED ? "translateX(-50%) " : ""}translateY(${drift.toFixed(1)}px)`;
            const Tag = i === active ? "h1" : "div";
            return (
              <Tag
                key={t}
                data-hero-phrase
                aria-hidden={i === active ? undefined : true}
                className="font-normal text-white"
                style={{
                  position: "absolute",
                  fontSize: "clamp(29px,6.2vw,76px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.6)",
                  opacity: opacity < 0.01 ? 0 : opacity,
                  transform,
                  willChange: "opacity,transform",
                  ...css(pos[i]),
                }}
              >
                {t}
              </Tag>
            );
          })}
        </div>
        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-12">
          <div className="tv5-fade mx-auto flex w-full max-w-[1408px] flex-wrap items-center gap-4" style={{ animationDelay: "1.5s" }}>
            <span className="mr-auto hidden font-mono text-xs uppercase tracking-[2px] text-white/70 sm:inline">Приёмная кампания 2026/2027</span>
            <Btn href={`${pre}#contact`} className="h-14 rounded-xl px-8 text-base">Получить стратегию поступления</Btn>
            <Btn href="/austria" ghost className="h-14 rounded-xl px-8 text-base">Страны и вузы</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
