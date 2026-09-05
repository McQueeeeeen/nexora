import { stats } from "../app/data";
import { wrap, Reveal } from "./ui";

// Статы — мятные карточки: giant mono-число tabular-nums, подпись mt-auto.
export default function Stats() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-48">
      <div className={`${wrap} relative`}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.top}>
              <div className="flex min-h-[150px] flex-col gap-4 rounded-2xl px-6 py-7 text-white lg:min-h-[360px] lg:px-8 lg:py-12" style={{ backgroundColor: "var(--brand)" }}>
                <span className="font-mono text-[11px] uppercase tracking-[1px] text-white/70">{s.top}</span>
                <span className="whitespace-nowrap font-mono leading-[1] tabular-nums" style={{ fontSize: "clamp(40px,11vw,54px)", letterSpacing: "-2.5px" }}>{s.mid}</span>
                <span className="mt-auto text-[15px] text-white/80 lg:text-[17px]">{s.bot}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
