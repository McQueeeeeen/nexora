import type { CountryInfo } from "../app/data";
import { wrap, Tag, Reveal, ArrowIcon } from "./ui";

// Услуги страны — полноэкранные карточки с водяным номером, как у эталона.
export default function CountryServices({ c }: { c: CountryInfo }) {
  return (
    <section className="bg-[#0c0c0c] py-[60px] lg:py-[100px]">
      <div className={`${wrap} flex flex-col gap-8 lg:gap-16`}>
        <Reveal>
          <div className="border-b border-white/10 pb-4 lg:pb-6">
            <Tag>Направления</Tag>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="max-w-[900px] text-balance text-[32px] font-bold leading-[1.2] tracking-[-0.96px] lg:text-[64px] lg:tracking-[-2.56px]">{c.servicesTitle}</h2>
          <p className="mt-4 max-w-[640px] text-white/60">{c.servicesIntro}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          {c.servicesLocal.map((s, i) => (
            <Reveal key={s.title}>
              <a href="#database" className="card group relative flex h-[360px] flex-col justify-between overflow-hidden rounded-2xl bg-[#181818] lg:h-[515px]">
                <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-light text-[100px] leading-[1.2] tracking-[-4.92px] text-white/[0.07] lg:text-[164px]">
                  {i + 1}
                </span>
                <img src={s.img} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 overflow-hidden p-5 pb-16 lg:p-8 lg:pb-20">
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)" }} />
                  <h3 className="relative text-[28px] font-semibold leading-[1.2] tracking-[-0.84px] text-white lg:text-[42px] lg:tracking-[-1.26px]">{s.title}</h3>
                </div>
                <div className="relative z-10 overflow-hidden p-5 pt-16 lg:p-8 lg:pt-20">
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)" }} />
                  <div className="relative flex items-end gap-4 lg:gap-6">
                    <p className="flex-1 text-base font-normal leading-[1.4] text-white lg:text-xl">{s.desc}</p>
                    <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#242424] transition-all duration-300 ease-out group-hover:rotate-[-45deg] group-hover:scale-110 group-hover:bg-white lg:flex" aria-hidden>
                      <ArrowIcon className="h-5 w-5 text-white transition-all group-hover:text-black" />
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
