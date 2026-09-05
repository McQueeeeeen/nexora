"use client";
import { useEffect, useRef, useState } from "react";
import type { CountryInfo } from "../app/data";
import { wrap, Tag, Reveal, useScrollProgress } from "./ui";

// «Что включено» — тёмные карточки с жёлтой иконкой. На мобильных —
// снэп-карусель, на десктопе — горизонтальный пин, как у эталона.
export default function Included({ c }: { c: CountryInfo }) {
  const [pinRef, p] = useScrollProgress<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setMax(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 96));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="pb-[60px] pt-[60px] lg:pb-[80px] lg:pt-[100px]">
      <div className={wrap}>
        <Reveal>
          <div className="border-b border-[#101418]/10 pb-4 lg:pb-6">
            <Tag>Что включено</Tag>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="mt-6 max-w-[900px] text-balance text-[32px] font-bold leading-[1.2] tracking-[-0.96px] lg:text-[64px] lg:tracking-[-2.56px]">{c.includedTitle}</h2>
          <p className="mt-4 max-w-[640px] text-[#101418]/60">{c.includedIntro}</p>
        </Reveal>
      </div>

      {/* Мобильная снэп-карусель */}
      <div className="mt-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
        <div className="flex w-max gap-3 px-6">
          {c.included.map((it, i) => <Card key={it.title} n={i + 1} title={it.title} desc={it.desc} className="w-[calc(100vw-70px)] snap-start" />)}
        </div>
      </div>

      {/* Десктопный горизонтальный пин */}
      <div ref={pinRef} className="relative hidden lg:block" style={{ height: "220vh" }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-5 pl-[max(48px,calc((100vw-1408px)/2+48px))]"
            style={{ transform: `translate3d(${(-p * max).toFixed(1)}px,0,0)`, willChange: "transform" }}>
            {c.included.map((it, i) => <Card key={it.title} n={i + 1} title={it.title} desc={it.desc} className="w-[380px] shrink-0" />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ n, title, desc, className = "" }: { n: number; title: string; desc: string; className?: string }) {
  return (
    <div className={`relative flex min-h-[320px] flex-col justify-between gap-6 overflow-hidden border border-[#101418]/10 bg-white p-8 lg:min-h-[460px] ${className}`}>
      <span className="flex items-center justify-center font-mono text-xl font-bold text-white"
        style={{ width: 72, height: 72, borderRadius: 16, backgroundColor: "var(--brand)" }} aria-hidden>
        {String(n).padStart(2, "0")}
      </span>
      <div className="relative z-10 flex flex-col gap-3">
        <h3 style={{ fontWeight: 600, fontSize: 26, lineHeight: 1.2, letterSpacing: "-0.6px", color: "var(--ink)", margin: 0 }}>{title}</h3>
        <p style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.5, letterSpacing: "-0.3px", color: "rgba(16,20,24,0.65)", margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}
