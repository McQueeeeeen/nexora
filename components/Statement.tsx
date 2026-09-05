"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { onRafScroll } from "./ui";

const TEXT = "Поступление без случайностей — проверенные требования, один куратор, каждый документ под контролем.";

// Стейтмент — эффект печати: буква за буквой, слово за словом.
// Без прыжков и подъёмов: только проявление цветом и свечение фронта.
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const words = TEXT.split(" ");
  const total = TEXT.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(1); return; }
    return onRafScroll(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Старт, когда секция уже хорошо видна; финиш — почти ушла вверх.
      const start = vh * 0.8;
      const span = start + r.height * 0.55;
      setP(Math.max(0, Math.min(1, (start - r.top) / span)));
    });
  }, []);

  let gi = 0;

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-[160px] lg:py-[260px]">
      <div className="mx-auto flex max-w-[1408px] flex-col items-center px-6 lg:px-12">
        <h2 className="max-w-[1100px] text-balance text-center text-[min(3.25em,9.7vw)] font-normal leading-[1.08] tracking-[-0.02em] lg:text-[80px] lg:tracking-[-3px]">
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="inline-block" style={{ whiteSpace: "nowrap" }}>
                {w.split("").map((ch, c) => {
                  const idx = gi++;
                  const local = Math.max(0, Math.min(1, p * total - idx));
                  const live = local > 0 && local < 1;
                  return (
                    <span
                      key={c}
                      style={{
                        opacity: 0.1 + local * 0.9,
                        color: local >= 1 ? "var(--ink)" : local > 0 ? "var(--brand)" : "rgba(16,20,24,0.45)",
                        textShadow: live ? "0 0 20px rgba(11,138,118,0.6)" : "none",
                        willChange: "opacity,color",
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h2>
      </div>
    </section>
  );
}
