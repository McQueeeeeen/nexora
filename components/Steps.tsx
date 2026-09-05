"use client";
import { steps } from "../app/data";
import { useScrollProgress } from "./ui";

// Процесс — белый benefits-pin эталона: залипшая колода со скруглённым верхом,
// сверху стопка картинок, снизу сменяющиеся панели шагов с прогресс-баром.
export default function Steps() {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  const n = steps.length;
  const tallest = steps.reduce((a, b) => (a.text.length >= b.text.length ? a : b));
  const cur = Math.min(n - 1, Math.floor(p * n));
  const frac = p * n - cur;

  return (
    <div ref={ref} id="steps" className="steps-pin-wrap relative" style={{ height: "300vh" }}>
      <section className="mp5-benefits-pin sticky top-0 grid h-screen w-full grid-rows-[1fr_auto] overflow-hidden rounded-t-[2.5em] bg-white text-black">
        <div className="relative w-full overflow-hidden">
          {steps.map((s, i) => (
            <div key={s.img} className="absolute inset-0" style={{ opacity: i === cur ? 1 : 0, transform: `scale(${i === cur ? 1 : 1.06})`, transition: "opacity .5s ease, transform .6s ease", willChange: "opacity,transform" }}>
              <img src={s.img} alt={s.title} loading="lazy" decoding="async" className="absolute h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          ))}
        </div>
        <div className="relative w-full overflow-hidden bg-white">
          {/* сайзер — самая высокая панель, чтобы остальные не обрезались */}
          <div className="invisible" aria-hidden>
            <Panel s={tallest} i={0} />
          </div>
          {steps.map((s, i) => (
            <div key={s.no} data-step-panel className="absolute inset-0" style={{ opacity: i === cur ? 1 : 0, transform: i === cur ? "none" : "translateY(12px)", pointerEvents: i === cur ? "auto" : "none" }}>
              <Panel s={s} i={i} bar={i === cur ? frac : i < cur ? 1 : 0} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Panel({ s, i, bar = 0 }: { s: (typeof steps)[number]; i: number; bar?: number }) {
  return (
    <div className="mx-auto grid w-full max-w-[1408px] grid-cols-1 items-start gap-6 px-6 py-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-12">
      <div className="flex flex-col gap-3 lg:col-span-4">
        <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#101418]/60">{s.no}</span>
        <h3 className="text-[22px] font-normal leading-[1.1] tracking-[-0.6px] lg:text-[32px]">{s.title}</h3>
        <span className="block h-[2px] w-16 bg-black/10">
          <span data-step-bar className="block h-full bg-[var(--brand)]" style={{ width: `${Math.max(8, bar * 100)}%` }} />
        </span>
      </div>
      <p className="max-w-[760px] text-base leading-[1.5] lg:col-span-8 lg:text-lg">{s.text}</p>
      <span className="sr-only">Шаг {i + 1}</span>
    </div>
  );
}
