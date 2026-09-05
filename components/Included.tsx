"use client";
import { useEffect, useRef } from "react";
import type { CountryInfo } from "../app/data";
import { wrap, Tag, Reveal, onRafScroll } from "./ui";

// «Что включено» — тёмные карточки с жёлтой иконкой. На мобильных —
// снэп-карусель, на десктопе — горизонтальный пин, как у эталона.
// Ноль ре-рендеров React при скролле.
export default function Included({ c }: { c: CountryInfo }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let max = 0;
    const measure = () => {
      if (trackRef.current) max = Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 96);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });

    let lastX = -999999;
    const unsub = onRafScroll(() => {
      if (!pinRef.current || !trackRef.current) return;
      const r = pinRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / total));
      const x = -p * max;
      if (Math.abs(x - lastX) < 0.5) return;
      lastX = x;
      trackRef.current.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    });

    return () => {
      window.removeEventListener("resize", measure);
      unsub();
    };
  }, []);

  return (
    <section className="pb-[60px] pt-[60px] lg:pb-[80px] lg:pt-[100px]">
      <div className={wrap}>
        <Reveal>
          <div className="border-b border-[#2A211D]/10 pb-4 lg:pb-6">
            <Tag>Что включено</Tag>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="mt-6 max-w-[900px] text-balance text-[32px] font-bold leading-[1.2] tracking-[-0.96px] text-[#2A211D] lg:text-[64px] lg:tracking-[-2.56px]">{c.includedTitle}</h2>
          <p className="mt-4 max-w-[640px] text-[#2A211D]/70">{c.includedIntro}</p>
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
            style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}>
            {c.included.map((it, i) => <Card key={it.title} n={i + 1} title={it.title} desc={it.desc} className="w-[380px] shrink-0" />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ n, title, desc, className = "" }: { n: number; title: string; desc: string; className?: string }) {
  return (
    <div className={`relative flex min-h-[320px] flex-col justify-between gap-6 overflow-hidden border border-[#2A211D]/10 bg-white p-8 lg:min-h-[460px] ${className}`}>
      <span className="flex items-center justify-center font-mono text-xl font-bold text-[#FBF9F5]"
        style={{ width: 72, height: 72, borderRadius: 16, backgroundColor: "#2A211D" }} aria-hidden>
        {String(n).padStart(2, "0")}
      </span>
      <div className="relative z-10 flex flex-col gap-3">
        <h3 style={{ fontWeight: 600, fontSize: 26, lineHeight: 1.2, letterSpacing: "-0.6px", color: "#2A211D", margin: 0 }}>{title}</h3>
        <p style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.5, letterSpacing: "-0.3px", color: "rgba(42,33,29,0.7)", margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}
