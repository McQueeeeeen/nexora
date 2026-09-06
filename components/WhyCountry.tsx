"use client";
import { useEffect, useRef } from "react";
import type { CountryInfo } from "../app/data";
import { wrap, Tag, Reveal, onRafScroll } from "./ui";
import SafeImage from "./SafeImage";

// «Почему страна» — полноэкранный фон с параллаксом и оверлеем, как у эталона.
// Ноль ре-рендеров React при скролле.
export default function WhyCountry({ c }: { c: CountryInfo }) {
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = -999999;
    return onRafScroll(() => {
      if (!ref.current || !bgRef.current) return;
      const r = ref.current.getBoundingClientRect();
      const d = r.top + r.height / 2 - window.innerHeight / 2;
      const v = Math.max(-120, Math.min(120, Math.round(-d * 0.12)));
      if (v === lastY) return;
      lastY = v;
      bgRef.current.style.transform = `translate3d(0, ${v}px, 0)`;
    });
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[720px] items-stretch overflow-hidden py-[40px] lg:min-h-[860px] lg:py-[60px]">
      <div ref={bgRef} className="absolute inset-x-0 -bottom-[200px] -top-[200px] will-change-transform" style={{ transform: "translate3d(0, 0, 0)" }}>
        <SafeImage src={c.whyImg} alt={c.name} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#120D0B]/85 via-[#120D0B]/70 to-[#120D0B]/90" />
      <div className={`${wrap} relative flex w-full flex-col justify-between gap-10 lg:gap-16`}>
        <Reveal className="flex flex-col gap-6 lg:gap-8">
          <div className="border-b border-white/10 pb-4">
            <Tag dark>{c.whyTag}</Tag>
          </div>
          <h2 className="text-balance text-[32px] font-medium leading-[1.08] tracking-[-1.2px] text-[#FBF9F5] sm:text-[52px] lg:text-[60px] lg:tracking-[-2px]">{c.whyHeading}</h2>
          <p className="max-w-[620px] text-base font-normal leading-relaxed text-[#FBF9F5]/85 lg:text-lg">{c.whyText}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.whyPoints.map((pt, i) => (
            <Reveal key={pt.title}>
              <div className="flex items-center gap-3.5 lg:gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#1D1613] font-mono text-base font-semibold text-[#E5B87A] lg:h-14 lg:w-14" aria-hidden>
                  0{i + 1}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-base font-medium leading-[1.2] tracking-tight text-white lg:text-lg">{pt.title}</h3>
                  <p className="text-sm font-normal leading-snug text-white/70 lg:text-base">{pt.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
