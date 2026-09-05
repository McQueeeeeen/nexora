"use client";
import { useState, useMemo } from "react";
import { faqs, faqCats } from "../app/data";
import { wrap, Reveal } from "./ui";

interface FaqItem {
  q: string;
  a: string;
  cat?: string;
}

interface FaqProps {
  items?: FaqItem[];
  title?: string;
  cats?: boolean;
  more?: string;
  fullWidth?: boolean;
}

// FAQ — премиальные изолированные карточки с тактильной кнопкой плюса,
// как у эталона goat-moving.vercel.app/faq.
export default function Faq({
  items = faqs,
  title = "Часто задаваемые вопросы",
  cats = false,
  more = "",
  fullWidth = false,
}: FaqProps) {
  const [open, setOpen] = useState<number | null>(null);
  const [cat, setCat] = useState<string>("Все");
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    let res = items;
    if (cats && cat !== "Все") {
      res = res.filter((f) => f.cat === cat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }
    return res;
  }, [items, cats, cat, search]);

  const pick = (c: string) => {
    setCat(c);
    setOpen(null);
  };

  const renderCardList = () => (
    <div className="flex w-full flex-col gap-3 lg:gap-4">
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#101418]/15 bg-white/40 p-8 text-center text-[#101418]/60">
          По запросу «{search}» ничего не найдено. Напишите нам в Telegram — ответим за 10 минут.
        </div>
      ) : (
        filtered.map((f, i) => (
          <div
            key={f.q}
            className="faq-item group w-full overflow-hidden rounded-xl border border-[#101418]/8 bg-white/75 backdrop-blur-sm shadow-[0_2px_8px_rgba(16,20,24,0.02)] transition-all duration-300 hover:border-[#101418]/15 hover:bg-white/95 hover:shadow-[0_4px_20px_rgba(16,20,24,0.04)] lg:rounded-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition-colors lg:p-6"
            >
              <span className="flex-1 text-[17px] font-medium leading-[1.3] tracking-[-0.4px] text-[#101418] transition-colors group-hover:text-[var(--brand)] lg:text-[21px] lg:tracking-[-0.5px]">
                {f.q}
              </span>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#101418]/5 text-[#101418] shadow-sm transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-[var(--brand)] group-hover:text-white lg:h-11 lg:w-11 lg:rounded-xl">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(45deg)" : "none" }}
                >
                  <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[15px] font-normal leading-[1.65] text-[#101418]/70 lg:px-6 lg:pb-6 lg:text-[17px]">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      {more !== "" && (
        <a
          href={more}
          className="hover-underline mt-4 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[1px] text-[var(--brand)] transition"
        >
          Смотреть все вопросы в FAQ ↗
        </a>
      )}
    </div>
  );

  return (
    <section id="faq" className="py-[60px] lg:py-[100px]">
      {fullWidth ? (
        <Reveal className={`${wrap} flex flex-col gap-8 lg:gap-10`}>
          {cats && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-hide lg:flex-wrap lg:gap-3 lg:overflow-x-visible lg:pb-0">
                {faqCats
                  .filter((c) => c === "Все" || items.some((f) => f.cat === c))
                  .map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => pick(c)}
                      className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[-0.2px] transition-all duration-200 lg:rounded-xl lg:px-5 lg:py-3 lg:text-sm ${
                        cat === c
                          ? "bg-[var(--brand)] text-white shadow-sm"
                          : "border border-[#101418]/10 bg-white/60 text-[#101418]/60 hover:bg-white hover:text-[#101418]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
              </div>
              <div className="relative max-w-[420px]">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск по вопросам (грант, виза, язык)..."
                  className="h-11 w-full rounded-xl border border-[#101418]/10 bg-white/80 px-4 text-sm text-[#101418] placeholder:text-[#101418]/40 outline-none transition focus:border-[var(--brand)] focus:bg-white"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#101418]/40 hover:text-[#101418]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
          {renderCardList()}
        </Reveal>
      ) : (
        <Reveal className={`${wrap} flex flex-col gap-12 lg:flex-row lg:gap-24`}>
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-medium tracking-tight lg:sticky lg:top-32 lg:text-5xl">
              {title}
            </h2>
          </div>
          <div className="w-full lg:w-2/3">
            {renderCardList()}
          </div>
        </Reveal>
      )}
    </section>
  );
}

