"use client";
import { useEffect, useRef, useState } from "react";
import { onRafScroll } from "./ui";

const TEXT = "Поступление без случайностей — проверенные требования, один куратор, каждый документ под контролем.";

// Стейтмент как у эталона: заливка тянется за скроллом сплошной волной —
// три слоя одного текста (тусклый + чернила с клипом + размытое свечение
// узкой полосой у фронта). Без дискретных переключений по словам.
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(1); return; }
    return onRafScroll(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Заливка идёт весь проход секции: старт — низ секции коснулся низа
      // экрана, финиш — секция почти ушла вверх. Анимацию видно, пока скроллишь.
      const start = vh * 0.95;
      const total = start + r.height * 0.45;
      setP(Math.max(0, Math.min(1, (start - r.top) / total)));
    });
  }, []);

  const edge = (1 - p) * 100; // правый край заливки, %
  const bandL = Math.max(0, (p - 0.09) * 100); // светящаяся полоса тянется следом

  const h2 = "max-w-[1100px] text-balance text-center text-[min(3.25em,9.7vw)] font-normal leading-[1.08] tracking-[-0.02em] lg:text-[80px] lg:tracking-[-3px]";

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-[160px] lg:py-[260px]">
      <div className="mx-auto flex max-w-[1408px] flex-col items-center px-6 lg:px-12">
        <div className="relative max-w-[1100px]">
          <h2 className={h2} style={{ color: "rgba(16,20,24,0.14)" }}>{TEXT}</h2>
          <h2 aria-hidden className={`${h2} absolute inset-0`} style={{ color: "var(--ink)", clipPath: `inset(0 ${edge.toFixed(2)}% 0 0)`, willChange: "clip-path" }}>{TEXT}</h2>
          <h2 aria-hidden className={`${h2} absolute inset-0`} style={{
            color: "var(--brand)", filter: "blur(7px)",
            clipPath: `inset(0 ${edge.toFixed(2)}% 0 ${bandL.toFixed(2)}%)`,
            opacity: p <= 0 || p >= 1 ? 0 : 1, willChange: "clip-path",
          }}>{TEXT}</h2>
        </div>
      </div>
    </section>
  );
}
