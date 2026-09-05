"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { heroPhrases } from "../app/data";

// Hero: фото per-phrase кроссфейдом + живая карта (линия, курсор) +
// посимвольные фразы. Ноль ре-рендеров при скролле: один rAF-цикл
// пишет opacity/цвет/позиции напрямую в DOM.
const ROUTE = "M 150,430 C 300,410 380,330 520,320 C 660,310 740,300 860,270";

const pos = [
  "top:14%;left:5%;text-align:left;max-width:min(720px,90vw)",
  "top:13%;left:5%;text-align:left;max-width:min(900px,66vw)",
  "bottom:12%;left:50%;text-align:center;max-width:min(1000px,92vw)",
] as const;

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

const easeOut2 = (x: number) => 1 - (1 - x) * (1 - x);
const easeOut3 = (x: number) => 1 - (1 - x) * (1 - x) * (1 - x);
const easeIn2 = (x: number) => x * x;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const mixBrand = (t: number) => {
  const r = Math.round(94 + (255 - 94) * t);
  const g = Math.round(234 + (255 - 234) * t);
  const b = Math.round(212 + (255 - 212) * t);
  return `rgb(${r},${g},${b})`;
};

interface CharMeta { l: number; j: number; C: number; last: boolean }

// Плоский порядок символов = порядок в DOM (слова + пробелы-разделители).
function useCharMetas(): CharMeta[] {
  return useMemo(() => {
    const metas: CharMeta[] = [];
    const N = heroPhrases.length;
    heroPhrases.forEach((ph, l) => {
      const C = ph.t.length;
      let gi = 0;
      const words: string[][] = [];
      let acc: string[] = [];
      ph.t.split("").forEach((ch) => {
        if (ch === " ") { if (acc.length) { words.push(acc); acc = []; } words.push([" "]); }
        else acc.push(ch);
      });
      if (acc.length) words.push(acc);
      words.forEach((w) => {
        if (w.length === 1 && w[0] === " ") metas.push({ l, j: gi++, C, last: l === N - 1 });
        else w.forEach(() => { metas.push({ l, j: gi++, C, last: l === N - 1 }); });
      });
    });
    return metas;
  }, []);
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cursorRef = useRef<SVGGElement>(null);
  const drawA = useRef<SVGPathElement>(null);
  const drawB = useRef<SVGPathElement>(null);
  const budaRef = useRef<SVGGElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const metas = useCharMetas();

  // На узких экранах карту показываем целиком, на широких — кинематографичный кроп.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const f = () => setNarrow(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    const region = ref.current;
    if (!region) return;
    const chars = Array.from(region.querySelectorAll<HTMLElement>(".hero-char"));
    // Без движения: статичный первый кадр (фраза и фото 1, линия в начале).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((el, k) => {
        if (k < metas.length && metas[k].l === 0) {
          el.style.opacity = "1";
          el.style.color = "rgb(255,255,255)";
        }
      });
      return;
    }
    const photos = Array.from(region.querySelectorAll<HTMLElement>("[data-hero-photo]"));
    const N = heroPhrases.length;
    let raf = 0;
    let cur = -1;
    const compute = () => {
      const r = region.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / total));
    };
    const apply = (t: number) => {
      const x = t * Math.max(1, N - 1);
      // Карта выезжает поверх фото: сначала фотографии, потом карта.
      const mq = clamp01((t - 0.22) / 0.2);
      const mapOp = mq * mq * (3 - 2 * mq);
      const mapGone = 1 - mapOp;
      for (let k = 0; k < chars.length && k < metas.length; k++) {
        const el = chars[k];
        const m = metas[k];
        const e = 0.92 / N;
        const I = 0.55 * e, S = 0.2 * e, F = 0.25 * e;
        const h = 0.04 + m.l * e;
        const pd = (0.5 * I) / m.C;
        const fd = F / m.C;
        const oIn = easeOut2(clamp01((t - (h + m.j * pd)) / (8 * pd)));
        const cT = easeOut3(clamp01((t - (h + 3 * pd + m.j * pd)) / (14 * pd)));
        const oOut = !m.last ? easeIn2(clamp01((t - (h + I + S + m.j * fd)) / (4 * fd))) : 0;
        const op = oIn * (1 - oOut);
        el.style.opacity = op < 0.01 ? "0" : op.toFixed(3);
        el.style.color = mixBrand(cT);
      }
      photos.forEach((img, i) => {
        const op = Math.max(0, Math.min(1, 1 - Math.abs(x - i))) * mapGone;
        img.style.opacity = op < 0.01 ? "0" : op.toFixed(3);
      });
      const map = mapRef.current;
      if (map) {
        map.style.opacity = mapOp < 0.01 ? "0" : mapOp.toFixed(3);
        map.style.visibility = mapOp <= 0 ? "hidden" : "visible";
      }
      const off = String(100 - t * 100);
      if (drawA.current) drawA.current.style.strokeDashoffset = off;
      if (drawB.current) drawB.current.style.strokeDashoffset = off;
      const buda = budaRef.current;
      if (buda) {
        const v = Math.max(0, Math.min(1, (t - 0.45) / 0.25));
        buda.style.opacity = v < 0.02 ? "0" : v.toFixed(3);
      }
      const path = pathRef.current, cursor = cursorRef.current;
      if (path && cursor) {
        try {
          const len = path.getTotalLength();
          const pt = path.getPointAtLength(len * t);
          const ahead = path.getPointAtLength(Math.min(len, len * t + 2));
          const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
          cursor.setAttribute("transform", `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
        } catch { /* SVG ещё не готов */ }
      }
    };
    const tick = () => {
      raf = 0;
      const goal = compute();
      const next = cur < 0 ? goal : cur + (goal - cur) * 0.2;
      const v = Math.abs(goal - next) < 0.0004 ? goal : next;
      if (v !== cur) {
        cur = v;
        apply(v);
      }
      if (v !== goal) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [metas]);

  const renderWords = (text: string) => {
    const words: string[][] = [];
    let acc: string[] = [];
    text.split("").forEach((ch) => {
      if (ch === " ") { if (acc.length) { words.push(acc); acc = []; } words.push([" "]); }
      else acc.push(ch);
    });
    if (acc.length) words.push(acc);
    return words.map((w, wi) => {
      if (w.length === 1 && w[0] === " ") {
        return <span key={wi} className="hero-char" style={{ opacity: 0 }}> </span>;
      }
      return (
        <span key={wi} className="hero-word">
          {w.map((ch, ci) => (
            <span key={ci} className="hero-char" style={{ opacity: 0, color: mixBrand(0) }}>{ch}</span>
          ))}
        </span>
      );
    });
  };

  return (
    <div ref={ref} data-hero-region className="relative w-full" style={{ height: "320vh" }}>
      <section className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {heroPhrases.map((ph, i) => (
          <img
            key={ph.img}
            data-hero-photo
            src={ph.img}
            alt=""
            aria-hidden
            fetchPriority={i === 0 ? "high" : undefined}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
        <div ref={mapRef} className="absolute inset-0" style={{ opacity: 0, visibility: "hidden" }}>
        <svg viewBox="0 0 1000 700" preserveAspectRatio={narrow ? "xMidYMid meet" : "xMidYMid slice"}
          className="h-full w-full" role="img" aria-label="Карта маршрута Вена — Будапешт">
          <defs>
            <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="700" fill="url(#hero-grid)" />
          <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5">
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
          <g fill="none" stroke="rgba(94,234,212,0.35)" strokeWidth="1.5">
            <path className="street-flow" d="M 60,120 C 220,100 420,140 620,110 S 900,90 1040,120" />
            <path className="street-flow" d="M -20,560 C 200,540 420,580 640,550 S 900,530 1030,560" />
          </g>
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
          <path ref={drawA} d={ROUTE} fill="none" stroke="var(--brand-bright)" strokeOpacity="0.3" strokeWidth="12" strokeLinecap="round"
            pathLength={100} style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
          <path ref={drawB} d={ROUTE} fill="none" stroke="var(--brand-bright)" strokeWidth="5" strokeLinecap="round"
            pathLength={100} style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
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
          <g ref={budaRef} style={{ opacity: 0 }}>
            <circle cx="860" cy="270" r="7" fill="var(--brand-bright)">
              <animate attributeName="r" values="7;30" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="860" cy="270" r="7" fill="var(--brand-bright)" />
            <text x="860" y="232" textAnchor="middle" fill="rgba(255,255,255,0.85)"
              fontSize="22" letterSpacing="4" fontFamily="var(--font-mono), monospace">БУДАПЕШТ</text>
          </g>
          <g ref={cursorRef} transform="translate(150,430)">
            <circle r="17" fill="none" stroke="var(--brand-bright)" strokeWidth="3" />
            <path d="M11,0 L-7,-8 L-3,0 L-7,8 Z" fill="#fff" />
          </g>
        </svg>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
        <div className="pointer-events-none absolute inset-0 px-6 lg:px-12">
          {heroPhrases.map((ph, i) => {
            const Tag = i === 0 ? "h1" : "div";
            return (
              <Tag
                key={ph.t}
                data-hero-phrase
                aria-hidden={i === 0 ? undefined : true}
                className="font-normal text-white"
                style={{
                  position: "absolute",
                  fontSize: "clamp(29px,6.2vw,76px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  textShadow: "0 2px 18px rgba(0,0,0,0.9)",
                  ...(i === 2 ? { transform: "translateX(-50%)" } : {}),
                  ...css(pos[i]),
                }}
              >
                {renderWords(ph.t)}
              </Tag>
            );
          })}
        </div>
      </section>
    </div>
  );
}
