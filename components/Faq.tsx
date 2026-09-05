"use client";
import { useState } from "react";
import { faqs } from "../app/data";
import { wrap, Reveal } from "./ui";

// FAQ — hairline-строки тёмного варианта эталона. На страницах стран — локальные вопросы.
export default function Faq({ items = faqs, title = "Часто задаваемые вопросы" }: {
  items?: { q: string; a: string }[]; title?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-[60px] lg:py-[100px]">
      <Reveal className={`${wrap} flex flex-col gap-12 lg:flex-row lg:gap-32`}>
        <h2 className="max-w-[480px] text-3xl font-medium tracking-tight lg:flex-1 lg:text-5xl">{title}</h2>
        <div className="faq-list w-full lg:flex-1">
          {items.map((f, i) => (
            <div key={f.q} className="faq-item">
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 py-6 text-left lg:py-[30px]">
                <span className="text-[18px] font-normal leading-[1.3] tracking-[-0.4px] lg:text-[24px] lg:tracking-[-0.6px]">{f.q}</span>
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center leading-none lg:h-[22px] lg:w-[22px]">
                  <svg viewBox="0 0 18 18" className="h-full w-full" style={{ transform: open === i ? "rotate(45deg)" : "none", transition: "transform .25s" }}>
                    <path d="M9 1v16M1 9h16" stroke="#101418" strokeWidth={1.8} strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="max-w-[720px] pb-6 text-[16px] leading-[1.55] tracking-[-0.2px] text-[#101418]/65 lg:pb-[30px] lg:text-[18px]">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
