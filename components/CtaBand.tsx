import { Btn, Reveal, wrap } from "./ui";

// CTA-баннер: скруглённая карточка с фото, заголовок сверху, жёлтая плашка снизу — как у эталона.
export default function CtaBand({ img, title, sub }: { img: string; title: string; sub: string }) {
  return (
    <section className="bg-[#0c0c0c] py-[60px] lg:py-[80px]">
      <Reveal className={`${wrap} relative h-[600px] overflow-hidden rounded-2xl lg:h-[640px] lg:rounded-3xl`}>
        <img src={img} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/30 lg:from-black/40 lg:via-black/10 lg:to-black/20" />
        <h2 className="absolute left-0 right-0 max-w-[600px] px-6 pt-8 text-[32px] font-bold leading-[1.1] tracking-[-0.96px] text-white lg:px-12 lg:pt-12 lg:text-[56px] lg:tracking-[-2.24px]">
          {title}
        </h2>
        <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
          <div className="flex flex-col gap-3 rounded-xl bg-[#FFE533] px-5 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:rounded-2xl lg:px-8 lg:py-3.5">
            <p className="text-sm font-normal leading-[1.4] text-black/80 lg:whitespace-nowrap lg:text-base">{sub}</p>
            <Btn href="#contact" className="h-[44px] shrink-0 whitespace-nowrap rounded-xl px-6 text-[15px] lg:h-[48px] lg:px-7 lg:text-base" style={{ background: "#0c0c0c", color: "#fff" }}>
              Получить стратегию ↗
            </Btn>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
