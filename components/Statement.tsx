"use client";
import { Fragment, useEffect, useRef } from "react";
import { onRafScroll } from "./ui";

const TEXT = "Поступление без случайностей — проверенные требования, один куратор, каждый документ под контролем.";

// Единый эталон заливки текста (как в sticky-шагах): только цвет,
// фронт подсвечен брендом со свечением. Ноль ре-рендеров React при скролле.
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const words = TEXT.split(" ");

  useEffect(() => {
    const chars = charsRef.current;
    const total = chars.length;
    if (!total) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((c) => {
        c.style.color = "var(--ink)";
        c.style.textShadow = "none";
      });
      return;
    }

    const BAND = Math.max(0.04, 5 / total);
    let lastP = -1;

    return onRafScroll(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.20;
      const span = start - end;
      const p = Math.max(0, Math.min(1, (start - r.top) / span));

      if (Math.abs(p - lastP) < 0.002) return;
      lastP = p;

      for (let k = 0; k < total; k++) {
        const el = chars[k];
        if (!el) continue;
        const t = k / total;
        let col: string;
        let shadow: string;

        if (p >= 1 || t < p - BAND) {
          col = "var(--ink)";
          shadow = "none";
        } else if (p > 0 && t <= p) {
          col = "var(--accent)";
          shadow = "0 0 24px var(--accent-glow)";
        } else {
          col = "rgba(42,33,29,0.18)";
          shadow = "none";
        }

        if (el.style.color !== col) el.style.color = col;
        if (el.style.textShadow !== shadow) el.style.textShadow = shadow;
      }
    });
  }, []);

  let idx = 0;

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-[160px] lg:py-[260px]">
      <div className="mx-auto flex max-w-[1408px] flex-col items-center px-6 lg:px-12">
        <h2 className="max-w-[1100px] text-balance text-center text-[min(3.25em,9.7vw)] font-normal leading-[1.08] tracking-[-0.02em] lg:text-[80px] lg:tracking-[-3px]">
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="inline-block" style={{ whiteSpace: "nowrap" }}>
                {w.split("").map((ch, c) => {
                  const currIdx = idx++;
                  return (
                    <span
                      key={c}
                      ref={(el) => {
                        if (el) charsRef.current[currIdx] = el;
                      }}
                      className="sticky-steps__char"
                      style={{
                        color: "rgba(42,33,29,0.18)",
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

