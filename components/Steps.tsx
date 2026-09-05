"use client";
import { useEffect, useRef, useState } from "react";
import { steps } from "../app/data";
import { onRafScroll } from "./ui";
import SafeImage from "./SafeImage";

// Процесс — белый benefits-pin эталона: залипшая колода со скруглённым верхом,
// сверху стопка картинок, снизу сменяющиеся панели шагов с прогресс-баром.
// Ноль ре-рендеров React при скролле, кроме смены активного шага (4 раза за 300vh).
export default function Steps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const curRef = useRef(0);
  curRef.current = cur;
  const n = steps.length;
  const tallest = steps.reduce((a, b) => (a.text.length >= b.text.length ? a : b));

  useEffect(() => {
    if (!containerRef.current) return;
    const unsub = onRafScroll(() => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / total));
      const nextCur = Math.min(n - 1, Math.floor(p * n));
      const frac = p * n - nextCur;

      containerRef.current.style.setProperty("--step-frac", `${Math.max(8, frac * 100).toFixed(1)}%`);

      if (nextCur !== curRef.current) {
        setCur(nextCur);
      }
    });
    return unsub;
  }, [n]);

  return (
    <div ref={containerRef} id="steps" className="steps-pin-wrap relative" style={{ height: "300vh" }}>
      <section className="mp5-benefits-pin sticky top-0 grid h-screen w-full grid-rows-[1fr_auto] overflow-hidden rounded-t-[2.5em] bg-[#FBF9F5] text-[#2A211D]">
        <div className="relative w-full overflow-hidden">
          {steps.map((s, i) => (
            <div
              key={s.img}
              className="absolute inset-0"
              style={{
                opacity: i === cur ? 1 : 0,
                transform: `scale(${i === cur ? 1 : 1.06})`,
                transition: "opacity .5s ease, transform .6s ease",
                willChange: "opacity,transform",
              }}
            >
              <SafeImage src={s.img} alt={s.title} className="absolute h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          ))}
        </div>
        <div className="relative w-full overflow-hidden border-t border-[#2A211D]/8 bg-[#FBF9F5]">
          {/* сайзер — самая высокая панель, чтобы остальные не обрезались */}
          <div className="invisible" aria-hidden>
            <Panel s={tallest} i={0} barStyle={{ width: "8%" }} />
          </div>
          {steps.map((s, i) => (
            <div
              key={s.no}
              data-step-panel
              className="absolute inset-0"
              style={{
                opacity: i === cur ? 1 : 0,
                transform: i === cur ? "none" : "translateY(12px)",
                pointerEvents: i === cur ? "auto" : "none",
              }}
            >
              <Panel
                s={s}
                i={i}
                barStyle={
                  i === cur
                    ? { width: "var(--step-frac, 8%)" }
                    : i < cur
                    ? { width: "100%" }
                    : { width: "8%" }
                }
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Panel({
  s,
  i,
  barStyle,
}: {
  s: (typeof steps)[number];
  i: number;
  barStyle: React.CSSProperties;
}) {
  return (
    <div className="mx-auto grid w-full max-w-[1408px] grid-cols-1 items-start gap-6 px-6 py-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-12">
      <div className="flex flex-col gap-3 lg:col-span-4">
        <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#2A211D]/60">{s.no}</span>
        <h3 className="text-[22px] font-normal leading-[1.1] tracking-[-0.6px] text-[#2A211D] lg:text-[32px]">{s.title}</h3>
        <span className="block h-[2px] w-16 bg-[#2A211D]/15">
          <span data-step-bar className="block h-full bg-[var(--accent)]" style={barStyle} />
        </span>
      </div>
      <p className="max-w-[760px] text-base leading-[1.5] text-[#2A211D]/75 lg:col-span-8 lg:text-lg">{s.text}</p>
      <span className="sr-only">Шаг {i + 1}</span>
    </div>
  );
}
