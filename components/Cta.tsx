"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Btn, onRafScroll } from "./ui";

// CTA-пин на весь экран — раскладка эталона: eyebrow, гигантское слово-фон
// с параллаксом, заголовок, кнопка. Обёртка 200vh: пин держится экран,
// потом отпускает и уезжает. Ноль ре-рендеров React при скролле.
export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const bgWordRef = useRef<HTMLSpanElement>(null);
  const pre = usePathname() === "/" ? "" : "/";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastV = -1;
    return onRafScroll(() => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const v = Math.max(0, Math.min(1, (window.innerHeight - r.top) / window.innerHeight));
      if (Math.abs(v - lastV) < 0.002) return;
      lastV = v;

      if (eyebrowRef.current) {
        eyebrowRef.current.style.opacity = String(Math.min(1, v * 1.6).toFixed(3));
      }
      if (bgWordRef.current) {
        bgWordRef.current.style.transform = `translateY(${((1 - v) * 130).toFixed(1)}px)`;
      }
    });
  }, []);

  return (
    <div className="relative" style={{ height: "200vh" }}>
      <section ref={sectionRef} className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden" style={{ background: "var(--brand)" }}>
        <div className="relative mx-auto flex w-full max-w-[1408px] flex-col items-center gap-6 px-6 text-center lg:px-12">
          <span ref={eyebrowRef} className="font-mono text-[11px] uppercase tracking-[1px] text-white/70" style={{ opacity: 0, willChange: "opacity" }}>
            Готовы, когда вы готовы
          </span>
          <div className="relative flex w-full items-center justify-center">
            <h2 className="max-w-[1100px] text-[40px] font-normal leading-[0.96] tracking-[-1.4px] text-white sm:text-[64px] lg:text-[112px]">
              Следующий шаг — самый лёгкий.
            </h2>
            <span ref={bgWordRef} aria-hidden className="absolute inline-block text-[120px] font-normal leading-none tracking-[-4px] text-white sm:text-[200px] lg:text-[320px] lg:tracking-[-12px]"
              style={{ transform: "translateY(130px)", opacity: 0.14, willChange: "transform" }}>
              NEXORA®
            </span>
          </div>
          <Btn href={`${pre}#contact`} className="mt-2 h-16 rounded-xl px-8 text-base" style={{ background: "#000", color: "#fff" }}>
            Получить консультацию за €10
          </Btn>
        </div>
      </section>
    </div>
  );
}
