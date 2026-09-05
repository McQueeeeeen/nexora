"use client";
import { useEffect, useRef, useState } from "react";
import type { CountryInfo } from "../app/data";
import { wrap, Tag, Reveal, onRafScroll } from "./ui";

// «Почему страна» — полноэкранный фон с параллаксом и оверлеем, как у эталона.
export default function WhyCountry({ c }: { c: CountryInfo }) {
  const ref = useRef<HTMLElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => onRafScroll(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const d = r.top + r.height / 2 - window.innerHeight / 2;
    const v = Math.max(-120, Math.min(120, Math.round(-d * 0.12)));
    setY((prev) => (prev === v ? prev : v));
  }), []);

  return (
    <section ref={ref} className="relative flex min-h-[720px] items-stretch overflow-hidden py-[40px] lg:min-h-[860px] lg:py-[60px]">
      <div className="absolute inset-x-0 -bottom-[200px] -top-[200px] will-change-transform" style={{ transform: `translate3d(0, ${y}px, 0)` }}>
        <img src={c.whyImg} alt={c.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <div className={`${wrap} relative flex w-full flex-col justify-between gap-10 lg:gap-16`}>
        <Reveal className="flex flex-col gap-6 lg:gap-8">
          <div className="border-b border-white/10 pb-4">
            <Tag>{c.whyTag}</Tag>
          </div>
          <h2 className="text-balance text-[32px] font-bold leading-[1.05] tracking-[-1.5px] text-white sm:text-[56px] lg:text-[64px] lg:tracking-[-2px]">{c.whyHeading}</h2>
          <p className="max-w-[600px] text-base font-normal leading-[1.5] text-white/90 lg:text-lg">{c.whyText}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.whyPoints.map((pt, i) => (
            <Reveal key={pt.title}>
              <div className="flex items-center gap-3 lg:gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#242424] font-mono text-base font-bold text-[#FFE533] lg:h-14 lg:w-14 lg:rounded-xl" aria-hidden>
                  0{i + 1}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-base font-bold leading-[1.2] tracking-[-0.48px] text-white lg:text-lg">{pt.title}</h3>
                  <p className="text-sm font-normal leading-[1.3] text-white/70 lg:text-base">{pt.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
