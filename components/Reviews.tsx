"use client";
import { useState } from "react";
import { quotes } from "../app/data";
import { Y, ArrowIcon, Stars } from "./ui";

// Отзывы на бумаге: заголовок, звёзды, аватар с инициалами, стрелки и дотсы.
export default function Reviews({ title, detailed = false }: { title?: string; detailed?: boolean }) {
  const [i, setI] = useState(0);
  const q = quotes[i];
  const initials = q.author.split(" ").map((w) => w[0]).join("");

  return (
    <section id="reviews" className="relative flex min-h-[80vh] items-center overflow-hidden py-24 lg:min-h-[100vh] lg:py-40">
      <div className="relative mx-auto w-full max-w-[1100px] px-6 text-center lg:px-12">
        <span className="inline-block rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[2px] text-white" style={{ background: Y }}>Отзывы</span>
        {title && <h2 className="mx-auto mt-6 max-w-[800px] text-balance text-3xl font-medium tracking-[-0.02em] lg:text-5xl">{title}</h2>}
        {detailed && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono text-xl font-bold">4.9/5</span>
            <span style={{ color: Y }}><Stars /></span>
            <span className="font-mono text-xs uppercase tracking-[-0.48px] text-[#101418]/50">312+ отличных отзывов</span>
          </div>
        )}
        <blockquote key={i} className="tv5-fade mx-auto flex min-h-[200px] items-center justify-center text-balance text-[24px] leading-snug sm:text-[36px] lg:min-h-[300px] lg:text-[56px]">
          {q.text}
        </blockquote>
        <div className="mt-8 flex flex-col items-center gap-2 lg:mt-12">
          {detailed && (
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#101418]/10 bg-[var(--brand)]/10 font-mono text-lg font-bold" aria-hidden>
              {initials}
            </span>
          )}
          <span className="text-[22px] font-medium sm:text-[26px] lg:text-[32px]">{q.author}</span>
          <span className="font-mono text-[12px] uppercase tracking-[2.5px] text-[#101418]/60 lg:text-[13px]">{q.role}</span>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => setI((i - 1 + quotes.length) % quotes.length)} aria-label="Предыдущий отзыв"
            className="hidden h-14 w-14 items-center justify-center rounded-full border border-[#101418]/10 bg-white transition-all duration-200 lg:flex"
            style={i === 0 ? { opacity: 0.4, cursor: "default" } : undefined}>
            <span aria-hidden><ArrowIcon className="h-5 w-5 rotate-180" /></span>
          </button>
          <div className="flex items-center gap-2">
          {quotes.map((_, d) => (
            <button
              key={d}
              onClick={() => setI(d)}
              aria-label={`Отзыв ${d + 1}`}
              className="h-2 rounded transition-all duration-300"
              style={d === i
                ? { width: 28, background: Y }
                : { width: 8, background: "rgba(16,20,24,0.15)" }}
            />
          ))}
          </div>
          <button onClick={() => setI((i + 1) % quotes.length)} aria-label="Следующий отзыв"
            className="hidden h-14 w-14 items-center justify-center rounded-full border border-[#101418]/10 bg-white transition-all duration-200 hover:scale-110 lg:flex">
            <span aria-hidden><ArrowIcon className="h-5 w-5" /></span>
          </button>
        </div>
      </div>
    </section>
  );
}
