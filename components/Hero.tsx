"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { onRafScroll } from "./ui";

// Hero «Две страны»: Хофбург (Вена) → шторкой Бастион (Будапешт).
// Только фото, типографика и скраб-анимация — без подписей-подсказок.
const SEGS = ["Австрия.", "Венгрия.", "Зачисление."];
const BTN = "Разбор кейса — €10";

// Dual-row flip: два ряда букв, верхний уезжает вверх, нижний встаёт на место.
function flipRow(hidden: boolean) {
  return (
    <span className="ds-btn__row" aria-hidden={hidden || undefined}>
      {[...BTN].map((c, i) => (
        <span key={i} className="ds-btn__ch" style={{ transitionDelay: `${i * 18}ms` }}>
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const phV = useRef<HTMLDivElement>(null);
  const buda = useRef<HTMLDivElement>(null);
  const giant = useRef<HTMLDivElement>(null);
  const gA = useRef<HTMLSpanElement>(null);
  const gB = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const region = ref.current;
    if (!region) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let cur = -1;
    const compute = () => {
      const r = region.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / total));
    };
    const apply = (p: number, vel: number, live: number) => {
      const grade = "sepia(.3) saturate(.92) contrast(1.03) brightness(1.01)";
      // Gate weave: дрожание кадра проектора, квантованное ~11fps. live=0 — кадр встаёт ровно.
      const now = performance.now();
      const s1 = Math.floor(now / 90);
      const f1 = Math.sin(s1 * 127.1) * 43758.5453;
      const f2 = Math.sin(s1 * 311.7 + 17.3) * 12543.123;
      const wx = (f1 - Math.floor(f1) - 0.5) * 5 * live;
      const wy = (f2 - Math.floor(f2) - 0.5) * 5 * live;
      // Velocity skew для гигантской строки.
      const skew = Math.max(-7, Math.min(7, vel * 60));
      if (phV.current) {
        phV.current.style.transform = `translate(${wx.toFixed(1)}px,${wy.toFixed(1)}px) scale(${(1 + p * 0.12).toFixed(4)})`;
        phV.current.style.filter = `${grade} blur(${(p * 4).toFixed(2)}px)`;
      }
      if (buda.current) {
        buda.current.style.transform = `translate(${wx.toFixed(1)}px,${wy.toFixed(1)}px) scale(${(1.22 - p * 0.17).toFixed(4)})`;
        buda.current.style.clipPath = `circle(${(p * 75).toFixed(2)}% at 50% 42%)`;
        buda.current.style.filter = `${grade} blur(${((1 - p) * 4).toFixed(2)}px)`;
      }
      if (giant.current)
        giant.current.style.transform = `translateX(${(-p * 38).toFixed(2)}vw) translate(${(wx * 1.6).toFixed(1)}px,${(wy * 1.6).toFixed(1)}px) skewX(${skew.toFixed(2)}deg)`;
      if (gA.current) gA.current.style.opacity = (1 - Math.min(1, p * 2.4)).toFixed(3);
      if (gB.current) gB.current.style.opacity = Math.max(0, Math.min(1, (p - 0.42) / 0.58)).toFixed(3);
      if (inner.current) {
        inner.current.style.transform = `translateY(${(-p * 26).toFixed(2)}vh)`;
        inner.current.style.opacity = Math.max(0, 1 - p * 1.4).toFixed(3);
      }
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const tick = () => {
      raf = 0;
      const goal = compute();
      const next = cur < 0 ? goal : cur + (goal - cur) * 0.12;
      const v = Math.abs(goal - next) < 0.0004 ? goal : next;
      if (v !== cur || v !== goal) {
        const vel = goal - cur;
        cur = v;
        apply(v, vel, v !== goal ? 1 : 0);
      }
      if (v !== goal) raf = requestAnimationFrame(tick);
    };
    const unsub = onRafScroll(() => { if (!raf) raf = requestAnimationFrame(tick); });
    tick();
    return () => {
      unsub();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  let n = 0;
  return (
    <div ref={ref} data-hero-region className="relative w-full" style={{ height: "280vh" }}>
      <section className="sticky top-0 w-full overflow-hidden bg-[var(--paper)]" style={{ height: "100dvh" }}>
        <div
          ref={phV}
          className="nx-hero-photo"
          style={{ backgroundImage: 'url("/images/hero-vienna.jpg")' }}
          role="img"
          aria-label="Хофбург, Вена"
        />
        <div
          ref={buda}
          className="nx-hero-photo"
          style={{
            backgroundImage: 'url("/images/hero-budapest.jpg")',
            clipPath: "circle(0% at 50% 42%)",
            animation: "none",
            opacity: 1,
          }}
          role="img"
          aria-label="Парламент через арки Рыбацкого бастиона, Будапешт"
        />
        <div className="nx-hero-veil" />
        <div ref={giant} className="nx-hero-giant" aria-hidden="true">
          <span className="nx-hero-track">
            <span ref={gA} className="nx-hero-city nx-hero-city--a">WIEN</span>
            <span ref={gB} className="nx-hero-city nx-hero-city--b">BUDAPEST</span>
          </span>
        </div>
        <div className="nx-hero-prog" aria-hidden="true">
          <i ref={bar} />
        </div>
        <div ref={inner} className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-10 lg:px-16 lg:pb-20">
          <h1 className="nx-hero-h1 nx-hero-mask">
            {SEGS.map((seg, si) => (
              <span key={seg} className="nx-hero-seg">
                {[...seg].map((c) => {
                  const el = (
                    <span key={n} className="nx-hero-ch" style={{ "--i": n } as CSSProperties}>
                      {c}
                    </span>
                  );
                  n += 1;
                  return el;
                })}
                {si < SEGS.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <div className="nx-hero-row">
            <a className="nx-hero-btn" href="#contact">
              <span className="ds-btn__flip">
                {flipRow(false)}
                {flipRow(true)}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </a>
            <div className="nx-hero-stats">
              <div><b>27</b><span>вузов</span></div>
              <div><b>98,4%</b><span>зачислений</span></div>
              <div><b>2</b><span>страны</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
