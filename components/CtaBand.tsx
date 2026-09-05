import { Btn, Reveal, wrap } from "./ui";
import SafeImage from "./SafeImage";

// CTA-баннер: скруглённая карточка с фото, заголовок сверху, жёлтая плашка снизу — как у эталона.
export default function CtaBand({ img, title, sub }: { img: string; title: string; sub: string }) {
  return (
    <section className="py-[60px] lg:py-[80px]">
      <Reveal className={`${wrap} relative h-[600px] overflow-hidden rounded-2xl bg-[#2A211D] lg:h-[640px] lg:rounded-3xl`}>
        <SafeImage src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/30 lg:from-black/40 lg:via-black/10 lg:to-black/20" />
        <h2 className="absolute left-0 right-0 max-w-[600px] px-6 pt-8 text-[32px] font-bold leading-[1.1] tracking-[-0.96px] text-white lg:px-12 lg:pt-12 lg:text-[56px] lg:tracking-[-2.24px]">
          {title}
        </h2>
        <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
          <div className="flex flex-col gap-3 rounded-xl border border-[#FBF9F5]/15 bg-[#2A211D]/90 px-5 py-3 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:rounded-2xl lg:px-8 lg:py-3.5">
            <p className="text-sm font-normal leading-[1.4] text-[#FBF9F5]/90 lg:whitespace-nowrap lg:text-base">{sub}</p>
            <Btn href="#contact" light className="h-[44px] shrink-0 whitespace-nowrap rounded-xl px-6 text-[15px] font-semibold lg:h-[48px] lg:px-7 lg:text-base">
              Получить стратегию
            </Btn>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
