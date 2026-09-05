"use client";
import { useState } from "react";
import { quotes } from "../app/data";
import { Y, ArrowIcon } from "./ui";

// Отзывы: на главной — классика эталона (цитата + дотсы), на страницах стран —
// развёрнутая версия city page: заголовок, звёзды, аватар с инициалами.
export default function Reviews({ title, detailed = false }: { title?: string; detailed?: boolean }) {
  const [i, setI] = useState(0);
  const q = quotes[i];
  const initials = q.author.split(" ").map((w) => w[0]).join("");

  return (
    <section id="reviews" className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#0c0c0c] py-24 lg:min-h-[100vh] lg:py-40">
      <img
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=75"
        alt="" aria-hidden loading="lazy" decoding="async"
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 45%, transparent, #0c0c0ccc)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0c0c0c, transparent 18%, transparent 82%, #0c0c0c)" }} />
      <div className="relative mx-auto w-full max-w-[1100px] px-6 text-center lg:px-12">
        <span className="inline-block rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[2px] text-black" style={{ background: Y }}>Отзывы</span>
        {title && <h2 className="mx-auto mt-6 max-w-[800px] text-balance text-3xl font-medium tracking-[-0.02em] lg:text-5xl">{title}</h2>}
        {detailed && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono text-xl font-bold">4.9/5</span>
            <span className="tracking-[4px]" style={{ color: Y }} aria-label="5 из 5 звёзд">★★★★★</span>
            <span className="font-mono text-xs uppercase tracking-[-0.48px] text-white/50">312+ отличных отзывов</span>
          </div>
        )}
        <blockquote key={i} className="tv5-fade mx-auto flex min-h-[200px] items-center justify-center text-balance text-[24px] leading-snug text-white sm:text-[36px] lg:min-h-[300px] lg:text-[56px]">
          {q.text}
        </blockquote>
        <div className="mt-8 flex flex-col items-center gap-2 lg:mt-12">
          {detailed && (
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 font-mono text-lg font-bold backdrop-blur-md" aria-hidden>
              {initials}
            </span>
          )}
          <span className="text-[22px] font-medium text-white sm:text-[26px] lg:text-[32px]">{q.author}</span>
          <span className="font-mono text-[12px] uppercase tracking-[2.5px] text-white/80 lg:text-[13px]">{q.role}</span>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => setI((i - 1 + quotes.length) % quotes.length)} aria-label="Предыдущий отзыв"
            className="hidden h-14 w-14 items-center justify-center rounded-full transition-all duration-200 lg:flex"
            style={i === 0 ? { background: "#181818", cursor: "default" } : { background: "#242424" }}>
            <span style={{ opacity: i === 0 ? 0.3 : 1 }} aria-hidden><ArrowIcon className="h-5 w-5 rotate-180" /></span>
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
                : { width: 8, background: "rgba(255,255,255,0.2)" }}
            />
          ))}
          </div>
          <button onClick={() => setI((i + 1) % quotes.length)} aria-label="Следующий отзыв"
            className="hidden h-14 w-14 items-center justify-center rounded-full bg-[#242424] transition-all duration-200 hover:scale-110 hover:bg-[#303030] lg:flex">
            <span aria-hidden><ArrowIcon className="h-5 w-5" /></span>
          </button>
        </div>
      </div>
    </section>
  );
}
