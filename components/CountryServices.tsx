import type { CountryInfo } from "../app/data";
import { wrap, Tag, Reveal, ArrowIcon } from "./ui";
import SafeImage from "./SafeImage";

// Услуги страны — полноэкранные карточки с водяным номером, как у эталона.
export default function CountryServices({ c }: { c: CountryInfo }) {
  return (
    <section id="services" className="py-[60px] lg:py-[100px]">
      <div className={`${wrap} flex flex-col gap-8 lg:gap-16`}>
        <Reveal>
          <div className="border-b border-[#2A211D]/10 pb-4 lg:pb-6">
            <Tag>Направления</Tag>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="max-w-[900px] text-balance text-[32px] font-medium leading-[1.15] tracking-[-0.96px] text-[#2A211D] lg:text-[56px] lg:tracking-[-2px]">{c.servicesTitle}</h2>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-[#2A211D]/70 lg:text-lg">{c.servicesIntro}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {c.servicesLocal.map((s, i) => (
            <Reveal key={s.title}>
              <a href="#database" className="card group relative flex h-[360px] flex-col justify-between overflow-hidden rounded-2xl border border-[#2A211D]/10 bg-[#120D0B] transition-all duration-300 hover:border-[#C88242]/40 hover:shadow-lg lg:h-[500px]">
                <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-mono font-bold text-[100px] leading-none tracking-tighter text-white/[0.08] lg:text-[150px]">
                  0{i + 1}
                </span>
                <SafeImage src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 overflow-hidden p-6 pb-16 lg:p-9 lg:pb-20">
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(18,13,11,0.9) 0%, rgba(18,13,11,0.45) 55%, transparent 100%)" }} />
                  <h3 className="relative text-[26px] font-medium leading-[1.2] tracking-tight text-[#FBF9F5] lg:text-[38px]">{s.title}</h3>
                </div>
                <div className="relative z-10 overflow-hidden p-6 pt-16 lg:p-9 lg:pt-20">
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,13,11,0.9) 0%, rgba(18,13,11,0.45) 55%, transparent 100%)" }} />
                  <div className="relative flex items-end gap-4 lg:gap-6">
                    <p className="flex-1 text-base font-normal leading-relaxed text-[#FBF9F5]/90 lg:text-lg">{s.desc}</p>
                    <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1D1613]/90 text-[#FBF9F5] backdrop-blur-sm transition-all duration-300 ease-out group-hover:rotate-[-45deg] group-hover:scale-110 group-hover:bg-[#C88242] group-hover:text-white lg:flex" aria-hidden>
                      <ArrowIcon className="h-5 w-5 transition-all" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
