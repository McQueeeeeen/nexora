"use client";
import { useEffect, useState } from "react";
import { wrap, Tag, Reveal, Btn } from "./ui";

// Счётчик до дедлайна Stipendium Hungaricum (15 января, Будапешт).
// Год перекатывается сам: если дедлайн прошёл — считаем до следующего.
function nextDeadline(now: Date): Date {
  const y = now.getFullYear();
  const thisYear = new Date(`${y}-01-15T23:59:00+01:00`);
  return now.getTime() > thisYear.getTime() ? new Date(`${y + 1}-01-15T23:59:00+01:00`) : thisYear;
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Deadline() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = nextDeadline(new Date(now));
  const p = parts(target.getTime() - now);
  const year = target.getFullYear();

  return (
    <section className={`${wrap} py-12 lg:py-16`}>
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-[#101418] px-6 py-10 text-white lg:rounded-3xl lg:px-12 lg:py-14">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(55% 90% at 90% 10%, rgba(94,234,212,0.14), transparent 65%)" }} />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <Tag dark>Дедлайн</Tag>
              <h2 className="mt-3 max-w-[560px] text-balance text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl">
                До закрытия Stipendium Hungaricum {year} осталось:
              </h2>
            </div>
            <div className="flex items-center gap-5 lg:gap-8">
              <div className="flex gap-3 font-mono tabular-nums sm:gap-4" role="timer" aria-label={`Осталось ${p.d} дней ${p.h} часов ${p.m} минут`}>
                {[
                  [pad(p.d), "дн"],
                  [pad(p.h), "час"],
                  [pad(p.m), "мин"],
                  [pad(p.s), "сек"],
                ].map(([v, label]) => (
                  <div key={label} className="flex flex-col items-center">
                    <span className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--brand-bright)" }}>{v}</span>
                    <span className="mt-1 text-[11px] uppercase tracking-[1px] text-white/50">{label}</span>
                  </div>
                ))}
              </div>
              <Btn href="#contact" className="hidden h-14 shrink-0 rounded-xl px-8 text-base sm:inline-flex">Успеть подать</Btn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
