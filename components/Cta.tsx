"use client";
import { Fragment, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Btn, onRafScroll } from "./ui";

const HEADING = "Следующий шаг — самый лёгкий.";

// CTA-пин (240vh) по эталону: кинематографичная посимвольная подсветка текста,
// параллакс водяного знака NEXORA®, дыхание янтарного свечения и мягкое всплытие кнопки.
export default function Cta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const bgWordRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const pre = usePathname() === "/" ? "" : "/";
  const words = HEADING.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chars = Array.from(container.querySelectorAll<HTMLElement>(".cta-char"));
    const total = chars.length;
    if (!total) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((c) => {
        c.style.color = "#FFFFFF";
        c.style.textShadow = "none";
      });
      if (eyebrowRef.current) eyebrowRef.current.style.opacity = "1";
      if (btnWrapRef.current) {
        btnWrapRef.current.style.opacity = "1";
        btnWrapRef.current.style.transform = "none";
      }
      return;
    }

    let lastP = -1;
    const BAND = 0.08;

    return onRafScroll(() => {
      const r = container.getBoundingClientRect();
      const totalH = r.height - window.innerHeight;
      const p = totalH <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / totalH));

      if (Math.abs(p - lastP) < 0.001) return;
      lastP = p;

      // 1. Eyebrow: плавное всплытие
      if (eyebrowRef.current) {
        const eyeP = Math.max(0, Math.min(1, p * 3.5));
        eyebrowRef.current.style.opacity = eyeP.toFixed(3);
        eyebrowRef.current.style.transform = `translateY(${((1 - eyeP) * 16).toFixed(1)}px)`;
      }

      // 2. Фоновый водяной знак NEXORA®
      if (bgWordRef.current) {
        const y = 80 - p * 160;
        const s = 0.94 + p * 0.12;
        const op = 0.07 + Math.sin(p * Math.PI) * 0.08;
        bgWordRef.current.style.transform = `translateY(${y.toFixed(1)}px) scale(${s.toFixed(3)})`;
        bgWordRef.current.style.opacity = op.toFixed(3);
      }

      // 3. Эмбиентное свечение
      if (glowRef.current) {
        const glowOp = 0.2 + Math.sin(p * Math.PI) * 0.55;
        glowRef.current.style.opacity = glowOp.toFixed(3);
      }

      // 4. Посимвольная подсветка текста (завершается на 70% скролла)
      const textP = Math.max(0, Math.min(1, (p - 0.05) / 0.65));
      for (let k = 0; k < total; k++) {
        const el = chars[k];
        if (!el) continue;
        const t = k / total;
        let col: string;
        let shadow: string;

        if (textP >= 1 || t < textP - BAND) {
          col = "#FFFFFF";
          shadow = "0 2px 20px rgba(0,0,0,0.6)";
        } else if (textP > 0 && t <= textP) {
          col = "#E5B87A";
          shadow = "0 0 24px rgba(229, 184, 122, 0.9), 0 0 48px rgba(200, 130, 66, 0.6)";
        } else {
          col = "rgba(251, 249, 245, 0.22)";
          shadow = "none";
        }

        if (el.style.color !== col) el.style.color = col;
        if (el.style.textShadow !== shadow) el.style.textShadow = shadow;
      }

      // 5. Кнопка
      if (btnWrapRef.current) {
        const btnP = Math.max(0, Math.min(1, (p - 0.25) / 0.45));
        btnWrapRef.current.style.opacity = btnP.toFixed(3);
        btnWrapRef.current.style.transform = `translateY(${((1 - btnP) * 20).toFixed(1)}px) scale(${(0.94 + btnP * 0.06).toFixed(3)})`;
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-10 -mt-10 lg:-mt-16" style={{ height: "240vh" }}>
      <section
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden rounded-t-[2.5rem] lg:rounded-t-[3.5rem] bg-[#2A211D] shadow-[0_-24px_80px_rgba(42,33,29,0.35)] border-t border-[#FBF9F5]/10"
      >
        {/* Мягкое радиальное янтарное свечение */}
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity"
          style={{
            background: "radial-gradient(55% 45% at 50% 50%, rgba(200, 130, 66, 0.18), transparent 70%)",
            opacity: 0.2,
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[1408px] flex-col items-center gap-6 px-6 text-center lg:px-12">
          <span
            ref={eyebrowRef}
            className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#FBF9F5]/70 will-change-transform"
            style={{ opacity: 0, transform: "translateY(16px)" }}
          >
            Готовы, когда вы готовы
          </span>

          <div className="relative flex w-full items-center justify-center">
            <h2 className="max-w-[1140px] text-balance text-center text-[40px] font-normal leading-[0.96] tracking-[-1.4px] text-[#FBF9F5] sm:text-[64px] lg:text-[112px] lg:tracking-[-3px]">
              {words.map((w, i) => (
                <Fragment key={i}>
                  <span className="inline-block whitespace-nowrap">
                    {w.split("").map((ch, c) => (
                      <span
                        key={c}
                        className="cta-char"
                        style={{
                          color: "rgba(251, 249, 245, 0.22)",
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

            <span
              ref={bgWordRef}
              aria-hidden
              className="pointer-events-none absolute inline-block select-none text-[120px] font-normal leading-none tracking-[-4px] text-[#FBF9F5] sm:text-[200px] lg:text-[320px] lg:tracking-[-12px] will-change-transform"
              style={{ transform: "translateY(80px) scale(0.94)", opacity: 0.07 }}
            >
              NEXORA®
            </span>
          </div>

          <div
            ref={btnWrapRef}
            className="will-change-transform"
            style={{ opacity: 0, transform: "translateY(20px) scale(0.94)" }}
          >
            <Btn href={`${pre}#contact`} light className="mt-2 h-16 rounded-xl px-9 text-base font-semibold shadow-lg">
              Получить консультацию за €10
            </Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

