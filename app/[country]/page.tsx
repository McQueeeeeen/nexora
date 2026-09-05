import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Intro from "../../components/Intro";
import CountryServices from "../../components/CountryServices";
import WhyCountry from "../../components/WhyCountry";
import Included from "../../components/Included";
import Database from "../../components/Database";
import Reviews from "../../components/Reviews";
import StepsPlain from "../../components/StepsPlain";
import CtaBand from "../../components/CtaBand";
import Faq from "../../components/Faq";
import Contact from "../../components/Contact";
import MobileBar from "../../components/MobileBar";
import { Btn, Reveal, wrap, Y } from "../../components/ui";
import { countries, uniLinks, type Country } from "../data";

// Статический экспорт: пререндерим обе страны (как city pages у эталона).
export function generateStaticParams() {
  return [{ country: "austria" }, { country: "hungary" }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const c = countries[(await params).country];
  if (!c) return {};
  return {
    title: `Nexora Admissions — учёба в стране: ${c.name}`,
    description: `${c.tagline} ${c.about}`,
  };
}

// Страница страны — структура city page эталона: hero → услуги → почему →
// включено → каталог → отзывы → шаги → CTA-баннер → локальный FAQ → перелинковка.
export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const slug = (await params).country;
  const c = countries[slug];
  if (!c) notFound();
  const otherSlug = slug === "austria" ? "hungary" : "austria";
  const other = uniLinks.find((u) => u.href === `/${otherSlug}`)!;

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white">
      <Intro />
      <Header />

      <section className="relative h-screen min-h-[720px] overflow-hidden bg-black lg:min-h-[900px]">
        <img src={c.heroImg} alt={c.name} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[25%_center] lg:object-center" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
        <div className="wrap relative flex h-full items-end pb-8 lg:pb-[72px]">
          <Reveal className="flex max-w-[920px] flex-col gap-4 lg:gap-6">
            <span className="inline-flex w-fit items-center gap-2.5 rounded-full bg-black/55 px-4 py-2 backdrop-blur-[10px]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#FFE533" }} />
              <span className="font-mono text-xs font-bold uppercase leading-[1.2] text-white lg:text-sm">{c.name}</span>
            </span>
            <h1 className="text-balance text-[40px] font-bold leading-[1.05] tracking-[-1.2px] text-white lg:text-[80px] lg:tracking-[-2.4px]">
              {c.tagline}
            </h1>
            <p className="max-w-[720px] text-base font-normal leading-[1.4] text-white lg:text-xl">{c.about}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
              <Btn href="#database" className="h-[44px] rounded-xl px-[18px] text-base">Вузы страны ↓</Btn>
              <Btn href="#contact" ghost className="h-[44px] rounded-xl px-[18px] text-base">Бесплатный аудит ↗</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      <CountryServices c={c} />
      <WhyCountry c={c} />
      <Included c={c} />
      <Database initial={c.code as Country} title={`Университеты страны: ${c.name}`} />
      <Reviews title={c.reviewsTitle} detailed />
      <StepsPlain />
      <CtaBand img={c.ctaImg} title={c.ctaTitle} sub={c.ctaSub} />
      <Faq items={c.faqsLocal} title={c.faqTitle} />

      <section className={`${wrap} pb-24`}>
        <Reveal>
          <a href={other.href} className="card flex items-center justify-between rounded-2xl border border-white/10 bg-[#181818] p-8 lg:p-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[2px] text-white/50">Смотрите также</span>
              <h2 className="mt-3 text-3xl font-medium tracking-tight lg:text-5xl">{other.title} →</h2>
              <p className="mt-2 text-sm text-white/60">{other.desc}</p>
            </div>
            <span className="hidden font-mono text-5xl sm:inline" style={{ color: Y }}>→</span>
          </a>
        </Reveal>
      </section>

      <Contact />
      <MobileBar />
    </main>
  );
}
