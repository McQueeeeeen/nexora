import { steps } from "../app/data";
import { wrap, Tag, Reveal } from "./ui";

// Простые шаги: слева залипший заголовок, справа стопка высоких карточек — как у эталона.
export default function StepsPlain() {
  return (
    <section id="steps" className="border-y border-[#2A211D]/10 py-24 lg:py-32">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[6fr_6fr] lg:gap-12`}>
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <Reveal>
            <div className="border-b border-[#2A211D]/10 pb-3 lg:pb-4">
              <Tag>Процесс зачисления</Tag>
            </div>
            <h2 className="mt-6 text-balance text-[32px] font-medium leading-[1.15] tracking-[-1.28px] text-[#2A211D] lg:text-[56px] lg:tracking-[-2px]">
              Как проходит поступление
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col gap-4 lg:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.no}>
              <div className="card relative flex min-h-[260px] flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-[#2A211D]/10 bg-white p-6 transition-all duration-300 hover:border-[#C88242]/40 hover:shadow-md lg:min-h-[380px] lg:gap-6 lg:p-9">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#120D0B] font-mono text-lg font-semibold text-[#E5B87A] lg:h-20 lg:w-20 lg:text-2xl" aria-hidden>
                  0{i + 1}
                </span>
                <div className="relative z-10 flex flex-col gap-2 lg:gap-3">
                  <h3 className="text-[22px] font-medium leading-[1.15] tracking-tight text-[#2A211D] lg:text-[32px]">{s.title}</h3>
                  <p className="text-[15px] font-normal leading-relaxed text-[#2A211D]/70 lg:text-[17px]">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
