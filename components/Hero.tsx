"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { heroPhrases } from "../app/data";
import HeroMap from "./HeroMap";
import { onRafScroll } from "./ui";
import { splitWords, buildHeroMetas, heroCharStyle, mixLight } from "./hero-anim";

// Hero: сначала полноэкранные фото (кроссфейд под фразы), затем поверх
// выезжает светлая карта с рисующейся линией и курсором. Фраза 1 —
// белая по фото, остальные — чернила по карте. Ноль ре-рендеров при скролле.
// Все три фразы зафиксированы в верхне-левой зоне чтения, не задевая города и линию карты.
const pos = [
  "top:15%;left:5%;text-align:left",
  "top:15%;left:5%;text-align:left",
  "top:15%;left:5%;text-align:left",
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

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cursorRef = useRef<SVGGElement>(null);
  const drawA = useRef<SVGPathElement>(null);
  const drawB = useRef<SVGPathElement>(null);
  const budaRef = useRef<SVGGElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const metas = useMemo(() => buildHeroMetas(heroPhrases), []);

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
    const photos = Array.from(region.querySelectorAll<HTMLElement>("[data-hero-photo]"));
    const map = mapRef.current;
    const veil = veilRef.current;
    const N = heroPhrases.length;
    // Без движения: фото 1 + фраза 1, карта скрыта.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((el, k) => {
        if (k < metas.length && metas[k].l === 0) {
          el.style.opacity = "1";
          el.style.color = "rgb(255,255,255)";
        }
      });
      return;
    }
    let raf = 0;
    let cur = -1;
    const compute = () => {
      const r = region.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / total));
    };
    const apply = (t: number) => {
      const x = t * Math.max(1, N - 1);
      for (let k = 0; k < chars.length && k < metas.length; k++) {
        const st = heroCharStyle(t, metas[k], N, metas[k].l === 0);
        chars[k].style.opacity = st.opacity;
        chars[k].style.color = st.color;
        if (chars[k].style.textShadow !== st.textShadow) {
          chars[k].style.textShadow = st.textShadow;
        }
      }
      // Карта выезжает поверх фото (smoothstep 0.22–0.42).
      const mq = Math.max(0, Math.min(1, (t - 0.22) / 0.2));
      const mapOp = mq * mq * (3 - 2 * mq);
      const mapGone = 1 - mapOp;
      photos.forEach((img, i) => {
        const op = Math.max(0, Math.min(1, 1 - Math.abs(x - i))) * mapGone;
        img.style.opacity = op < 0.01 ? "0" : op.toFixed(3);
      });
      if (map) {
        map.style.opacity = mapOp < 0.01 ? "0" : mapOp.toFixed(3);
        map.style.visibility = mapOp <= 0 ? "hidden" : "visible";
      }
      if (veil) veil.style.opacity = mapGone < 0.01 ? "0" : mapGone.toFixed(3);
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
          if (!cachedLen) cachedLen = path.getTotalLength();
          const len = cachedLen;
          const pt = path.getPointAtLength(len * t);
          const ahead = path.getPointAtLength(Math.min(len, len * t + 2));
          const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
          cursor.setAttribute("transform", `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
        } catch { /* SVG ещё не готов */ }
      }
    };
    let cachedLen = 0;
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
    const unsub = onRafScroll(() => { if (!raf) raf = requestAnimationFrame(tick); });
    tick();
    return () => {
      unsub();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [metas]);

  const renderWords = (text: string, phraseIdx: number) => {
    return splitWords(text).map((w, wi) => {
      if (w.length === 1 && w[0] === " ") {
        return <span key={wi} className="hero-char" style={{ opacity: phraseIdx === 0 ? 1 : 0 }}> </span>;
      }
      return (
        <span key={wi} className="hero-word">
          {w.map((ch, ci) => (
            <span
              key={ci}
              className="hero-char"
              style={{
                opacity: phraseIdx === 0 ? 1 : 0,
                color: phraseIdx === 0 ? "rgb(255,255,255)" : mixLight(0),
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <div ref={ref} data-hero-region className="relative w-full" style={{ height: "320vh" }}>
      <section className="sticky top-0 h-screen w-full overflow-hidden bg-[#15100E]">
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
        <div ref={mapRef} className="absolute inset-0 bg-[#15100E]" style={{ opacity: 0, visibility: "hidden" }}>
          <HeroMap
            narrow={narrow}
            pathRef={pathRef}
            drawA={drawA}
            drawB={drawB}
            budaRef={budaRef}
            cursorRef={cursorRef}
          />
        </div>
        <div ref={veilRef} className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
        <div className="pointer-events-none absolute inset-0 px-6 lg:px-12">
          {heroPhrases.map((ph, i) => {
            const Tag = i === 0 ? "h1" : "div";
            return (
              <Tag
                key={ph.t}
                data-hero-phrase
                aria-hidden={i === 0 ? undefined : true}
                className="font-normal max-w-[min(90vw,540px)] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[540px] text-white"
                style={{
                  position: "absolute",
                  fontSize: "clamp(28px,5.2vw,68px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.6)",
                  ...css(pos[i]),
                }}
              >
                {renderWords(ph.t, i)}
              </Tag>
            );
          })}
        </div>
      </section>
    </div>
  );
}
