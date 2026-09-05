"use client";
import { useEffect, useRef, useState } from "react";
import { quotes } from "../app/data";
import { Y, Stars } from "./ui";

// Отзывы: дотсы + автопрокрутка 6.5с как у эталона (стрелки убраны).
export default function Reviews({ title, detailed = false }: { title?: string; detailed?: boolean }) {
  const [i, setI] = useState(0);
  const timer = useRef(0);
  const q = quotes[i];
  const initials = q.author.split(" ").map((w) => w[0]).join("");

  const go = (d: number) => {
    setI(d);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setI((v) => (v + 1) % quotes.length), 6500);
  };

  useEffect(() => {
    timer.current = window.setTimeout(() => setI((v) => (v + 1) % quotes.length), 6500);
    return () => window.clearTimeout(timer.current);
  }, []);

  return (
    <section id="reviews" className="relative flex min-h-[80vh] items-center overflow-hidden py-24 lg:min-h-[100vh] lg:py-40">
      <div className="relative mx-auto w-full max-w-[1100px] px-6 text-center lg:px-12">
        <span className="inline-block rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[1px] text-white" style={{ background: Y }}>Отзывы</span>
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
          <span className="font-mono text-[12px] uppercase tracking-[1px] text-[#101418]/60 lg:text-[13px]">{q.role}</span>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3">
          {quotes.map((_, d) => (
            <button
              key={d}
              onClick={() => go(d)}
              aria-label={`Отзыв ${d + 1}`}
              className="relative h-2 rounded transition-all duration-300 after:absolute after:-inset-3 after:content-['']"
              style={d === i
                ? { width: 28, background: Y }
                : { width: 8, background: "rgba(16,20,24,0.15)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
