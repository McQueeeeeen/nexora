"use client";
import { usePathname } from "next/navigation";
import { Btn, useViewportProgress } from "./ui";

// CTA-пин на весь экран — раскладка эталона: eyebrow, гигантское слово-фон
// с параллаксом, заголовок, кнопка. Обёртка 200vh: пин держится экран,
// потом отпускает и уезжает (иначе sticky залип бы навсегда).
export default function Cta() {
  const [ref, v] = useViewportProgress<HTMLElement>();
  const pre = usePathname() === "/" ? "" : "/";

  return (
    <div className="relative" style={{ height: "200vh" }}>
      <section ref={ref} className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden" style={{ background: "var(--brand)" }}>
        <div className="relative mx-auto flex w-full max-w-[1408px] flex-col items-center gap-6 px-6 text-center lg:px-12">
          <span className="font-mono text-[11px] uppercase tracking-[1px] text-white/70" style={{ opacity: Math.min(1, v * 1.6), willChange: "opacity" }}>
            Готовы, когда вы готовы
          </span>
          <div className="relative flex w-full items-center justify-center">
            <h2 className="max-w-[1100px] text-[40px] font-normal leading-[0.96] tracking-[-1.4px] text-white sm:text-[64px] lg:text-[112px]">
              Следующий шаг — самый лёгкий.
            </h2>
            <span aria-hidden className="absolute inline-block text-[120px] font-normal leading-none tracking-[-4px] text-white sm:text-[200px] lg:text-[320px] lg:tracking-[-12px]"
              style={{ transform: `translateY(${(1 - v) * 130}px)`, opacity: 0.14, willChange: "transform" }}>
              NEXORA®
            </span>
          </div>
          <Btn href={`${pre}#contact`} className="mt-2 h-16 rounded-xl px-8 text-base" style={{ background: "#000", color: "#fff" }}>
            Получить бесплатный аудит
          </Btn>
        </div>
      </section>
    </div>
  );
}
