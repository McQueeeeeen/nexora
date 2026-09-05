import { steps } from "../app/data";
import { wrap, Tag, Reveal } from "./ui";

// Простые шаги: слева залипший заголовок, справа стопка высоких карточек — как у эталона.
export default function StepsPlain() {
  return (
    <section id="steps" className="bg-[#0c0c0c] py-[60px] lg:py-[100px]">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[6fr_6fr] lg:gap-12`}>
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <Reveal>
            <div className="border-b border-white/10 pb-3 lg:pb-4">
              <Tag>Процесс зачисления</Tag>
            </div>
            <h2 className="mt-6 text-balance text-[32px] font-bold leading-[1.2] tracking-[-1.28px] lg:text-[64px] lg:tracking-[-2.56px]">
              Как проходит поступление
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col gap-4 lg:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.no}>
              <div className="card relative flex min-h-[260px] flex-col justify-between gap-4 overflow-hidden p-6 lg:min-h-[400px] lg:gap-6 lg:p-9"
                style={{ backgroundColor: "#1a1a1a", borderRadius: 24 }}>
                <span className="relative z-10 flex h-14 w-14 items-center justify-center font-mono text-lg font-bold text-black lg:h-[88px] lg:w-[88px] lg:text-2xl"
                  style={{ borderRadius: 14, backgroundColor: "#FFE533" }} aria-hidden>
                  0{i + 1}
                </span>
                <div className="relative z-10 flex flex-col gap-2 lg:gap-3">
                  <h3 className="text-[22px] font-semibold leading-[1.15] tracking-[-0.6px] text-white lg:text-[34px]">{s.title}</h3>
                  <p className="text-[15px] font-normal leading-[1.45] tracking-[-0.2px] text-white/65 lg:text-[18px]">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
