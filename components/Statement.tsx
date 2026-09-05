"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { onRafScroll } from "./ui";

const TEXT = "Поступление без случайностей — проверенные требования, один куратор, каждый документ под контролем.";

// Единый эталон заливки текста (как в sticky-шагах): только цвет,
// фронт подсвечен брендом со свечением. Без прыжков и прозрачностей.
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
      const start = vh * 0.8;
      const span = start + r.height * 0.55;
      setP(Math.max(0, Math.min(1, (start - r.top) / span)));
    });
  }, []);

  let gi = 0;
  const BAND = 4 / total; // ширина светящегося фронта в долях текста

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-[160px] lg:py-[260px]">
      <div className="mx-auto flex max-w-[1408px] flex-col items-center px-6 lg:px-12">
        <h2 className="max-w-[1100px] text-balance text-center text-[min(3.25em,9.7vw)] font-normal leading-[1.08] tracking-[-0.02em] lg:text-[80px] lg:tracking-[-3px]">
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="inline-block" style={{ whiteSpace: "nowrap" }}>
                {w.split("").map((ch, c) => {
                  const t = gi++ / total;
                  const f = p;
                  const filled = t < f;
                  const frontier = !filled && f - t < BAND;
                  return (
                    <span
                      key={c}
                      className="sticky-steps__char"
                      style={{
                        color: filled ? "var(--ink)" : frontier ? "var(--brand)" : "rgba(16,20,24,0.16)",
                        textShadow: frontier ? "0 0 22px rgba(11,138,118,0.55)" : "none",
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
