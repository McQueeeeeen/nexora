"use client";
import { useState } from "react";
import { faqs, faqCats } from "../app/data";
import { wrap, Reveal } from "./ui";

interface FaqItem { q: string; a: string; cat?: string }

// FAQ — hairline-строки. На странице /faq — табы категорий как у эталона,
// на главной — первые 6 + ссылка на все вопросы.
export default function Faq({ items = faqs, title = "Часто задаваемые вопросы", cats = false, more = "" }: {
  items?: FaqItem[]; title?: string; cats?: boolean; more?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [cat, setCat] = useState<string>("Все");
  const list = cats && cat !== "Все" ? items.filter((f) => f.cat === cat) : items;
  const pick = (c: string) => { setCat(c); setOpen(null); };

  return (
    <section id="faq" className="py-[60px] lg:py-[100px]">
      <Reveal className={`${wrap} flex flex-col gap-12 lg:flex-row lg:gap-32`}>
        <h2 className="max-w-[480px] text-3xl font-medium tracking-tight lg:flex-1 lg:text-5xl">{title}</h2>
        <div className="faq-list w-full lg:flex-1">
          {cats && (
            <div className="mb-6 flex flex-wrap gap-2">
              {faqCats.filter((c) => c === "Все" || items.some((f) => f.cat === c)).map((c) => (
                <button
                  key={c}
                  onClick={() => pick(c)}
                  className={`rounded-full border px-4 py-2 font-mono text-xs font-bold uppercase tracking-[1px] transition ${cat === c
                    ? "border-transparent text-white"
                    : "border-[#101418]/15 text-[#101418]/60 hover:border-[#101418]/30 hover:text-[#101418]"}`}
                  style={cat === c ? { background: "var(--brand)" } : undefined}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          {list.map((f, i) => (
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
          {more !== "" && (
            <a href={more} className="hover-underline mt-6 inline-block w-fit text-base font-medium transition hover:text-[var(--brand)]">
              Смотреть все вопросы
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
