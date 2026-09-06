import { Btn, Reveal, wrap } from "./ui";
import SafeImage from "./SafeImage";

// CTA-баннер: скруглённая карточка с фото, заголовок сверху, плашка снизу.
export default function CtaBand({ img, title, sub }: { img: string; title: string; sub: string }) {
  return (
    <section className="py-[60px] lg:py-[80px]">
      <Reveal className={`${wrap} relative h-[520px] overflow-hidden rounded-2xl bg-[#120D0B] lg:h-[580px] lg:rounded-3xl`}>
        <SafeImage src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120D0B]/80 via-[#120D0B]/30 to-[#120D0B]/70 lg:from-[#120D0B]/70 lg:via-[#120D0B]/20 lg:to-[#120D0B]/60" />
        <h2 className="absolute left-0 right-0 max-w-[640px] px-6 pt-8 text-[32px] font-medium leading-[1.15] tracking-tight text-[#FBF9F5] lg:px-12 lg:pt-12 lg:text-[52px]">
          {title}
        </h2>
        <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
          <div className="flex flex-col gap-3 rounded-xl border border-white/15 bg-[#120D0B]/90 px-5 py-4 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:rounded-2xl lg:px-8 lg:py-4">
            <p className="text-sm font-normal leading-relaxed text-[#FBF9F5]/90 lg:whitespace-nowrap lg:text-base">{sub}</p>
            <Btn href="#contact" light className="h-[46px] shrink-0 whitespace-nowrap rounded-xl px-7 text-[15px] font-semibold lg:h-[48px] lg:text-base">
              Получить стратегию
            </Btn>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
