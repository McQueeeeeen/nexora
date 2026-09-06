"use client";
import { Fragment, useEffect, useRef } from "react";
import { onRafScroll } from "./ui";

const TEXT = "Поступление без случайностей — проверенные требования, один куратор, каждый документ под контролем.";

// Statement — sticky pin (220vh) с посимвольной янтарной подсветкой как у эталона.
// Текст держится в центре экрана, пока скролл плавно подсвечивает буквы
// янтарным свечением и заливает их в глубокий эспрессо.
export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = TEXT.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chars = Array.from(container.querySelectorAll<HTMLElement>(".statement-char"));
    const total = chars.length;
    if (!total) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((c) => {
        c.style.color = "#2A211D";
        c.style.textShadow = "none";
      });
      return;
    }

    let lastP = -1;
    const BAND = 0.07;

    return onRafScroll(() => {
      const r = container.getBoundingClientRect();
      const totalH = r.height - window.innerHeight;
      const p = totalH <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / totalH));

      if (Math.abs(p - lastP) < 0.001) return;
      lastP = p;

      // Анимация завершается на 75% скролла пина, оставляя 25% буфера
      // с полностью завершённым текстом перед отпусканием пина.
      const animP = Math.max(0, Math.min(1, p / 0.75));

      for (let k = 0; k < total; k++) {
        const el = chars[k];
        if (!el) continue;
        const t = k / total;
        let col: string;
        let shadow: string;

        if (animP >= 1 || t < animP - BAND) {
          col = "#2A211D";
          shadow = "none";
        } else if (animP > 0 && t <= animP) {
          col = "var(--accent)";
          shadow = "0 0 24px var(--accent-glow), 0 0 42px rgba(200, 130, 66, 0.4)";
        } else {
          col = "rgba(42, 33, 29, 0.16)";
          shadow = "none";
        }

        if (el.style.color !== col) el.style.color = col;
        if (el.style.textShadow !== shadow) el.style.textShadow = shadow;
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "220vh" }}>
      <section className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#FBF9F5]">
        <div className="mx-auto flex w-full max-w-[1408px] flex-col items-center px-6 lg:px-12">
          <h2 className="max-w-[1140px] text-balance text-center text-[min(3.25em,9.5vw)] font-normal leading-[1.08] tracking-[-0.025em] text-[#2A211D] lg:text-[76px] lg:tracking-[-2.5px]">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block whitespace-nowrap">
                  {w.split("").map((ch, c) => (
                    <span
                      key={c}
                      className="statement-char"
                      style={{
                        color: "rgba(42, 33, 29, 0.16)",
                        willChange: "color, text-shadow",
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {i < words.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h2>
        </div>
      </section>
    </div>
  );
}


