"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { onRafScroll } from "./ui";

const TEXT = "Поступление без случайностей — проверенные требования, один куратор, каждый документ под контролем.";

// Стейтмент как у эталона: слова проявляются одно за другим по мере скролла,
// от приглушённого к полному белому — та же пословная заливка, что в шагах.
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
      setP(Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.55))));
    });
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-[160px] lg:py-[260px]">
      <div className="mx-auto flex max-w-[1408px] flex-col items-center px-6 lg:px-12">
        <h2 className="max-w-[1100px] text-balance text-center text-[min(3.25em,9.7vw)] font-normal leading-[1.08] tracking-[-0.02em] lg:text-[80px] lg:tracking-[-3px]">
          {words.map((w, i) => {
            const local = Math.max(0, Math.min(1, p * n - i));
            // Как у эталона: заливка идёт с цветным фронтом —
            // слово, которое проявляется прямо сейчас, подсвечено брендом.
            const color = local >= 1 ? "var(--ink)" : local > 0 ? "var(--brand)" : "rgba(16,20,24,0.14)";
            return (
              <Fragment key={i}>
                <span style={{ color, willChange: "color" }}>{w}</span>
                {i < n - 1 ? " " : ""}
              </Fragment>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
