"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { onRafScroll } from "./ui";

const TEXT = "Поступление без случайностей — проверенные требования, один куратор, каждый документ под контролем.";

// Стейтмент: слова появляются одно за другим по мере скролла —
// каждое всплывает снизу, наливается цветом, фронт подсвечен свечением.
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const words = TEXT.split(" ");
  const n = words.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(1); return; }
    return onRafScroll(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Медленно и поздно: старт, когда секция вошла на четверть,
      // финиш — когда почти ушла вверх. Волну видно весь проход.
      const start = vh * 0.85;
      const total = start + r.height * 0.5;
      setP(Math.max(0, Math.min(1, (start - r.top) / total)));
    });
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-[160px] lg:py-[260px]">
      <div className="mx-auto flex max-w-[1408px] flex-col items-center px-6 lg:px-12">
        <h2 className="max-w-[1100px] text-balance text-center text-[min(3.25em,9.7vw)] font-normal leading-[1.08] tracking-[-0.02em] lg:text-[80px] lg:tracking-[-3px]">
          {words.map((w, i) => {
            const local = Math.max(0, Math.min(1, p * n - i));
            const live = local > 0 && local < 1;
            return (
              <Fragment key={i}>
                <span
                  className="inline-block"
                  style={{
                    whiteSpace: "nowrap",
                    opacity: 0.13 + local * 0.87,
                    color: local >= 1 ? "var(--ink)" : local > 0 ? "var(--brand)" : "rgba(16,20,24,0.5)",
                    transform: `translateY(${((1 - local) * 18).toFixed(1)}px)`,
                    textShadow: live ? "0 0 22px rgba(11,138,118,0.55)" : "none",
                    willChange: "opacity,transform,color",
                  }}
                >
                  {w}
                </span>
                {i < n - 1 ? " " : ""}
              </Fragment>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
