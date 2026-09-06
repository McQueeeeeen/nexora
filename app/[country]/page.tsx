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
import SafeImage from "../../components/SafeImage";
import MobileBar from "../../components/MobileBar";
import { Btn, Reveal, ArrowIcon } from "../../components/ui";
import { countries, uniLinks, type Country } from "../data";

// Статический экспорт: пререндерим обе страны (как city pages у эталона).
export function generateStaticParams() {
  return [{ country: "austria" }, { country: "hungary" }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const slug = (await params).country;
  const c = countries[slug];
  if (!c) return {};
  return {
    title: `Nexora Admissions — учёба в стране: ${c.name}`,
    description: `${c.tagline} ${c.about}`,
    alternates: { canonical: `/${slug}` },
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

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://nexora-eight-opal.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.name,
        item: `https://nexora-eight-opal.vercel.app/${slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#2A211D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Intro />
      <Header />

      <section data-hero-region className="relative h-screen min-h-[720px] overflow-hidden bg-[#120D0B] lg:min-h-[900px]">
        <SafeImage src={c.heroImg} alt={c.name} eager className="absolute inset-0 h-full w-full object-cover object-[25%_center] lg:object-center" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#120D0B]/75 via-[#120D0B]/35 to-[#120D0B]/85" />
        <div className="wrap relative flex h-full items-end pb-8 lg:pb-[72px]">
          <Reveal className="flex max-w-[920px] flex-col gap-4 lg:gap-6">
            <span className="inline-flex w-fit items-center rounded-full border border-[#FBF9F5]/15 bg-[#120D0B]/70 px-4 py-1.5 backdrop-blur-[10px]">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E5B87A] lg:text-sm">{c.name}</span>
            </span>
            <h1 className="text-balance text-[40px] font-medium leading-[1.08] tracking-[-1.5px] text-[#FBF9F5] sm:text-[56px] lg:text-[76px] lg:tracking-[-2px]">
              {c.tagline}
            </h1>
            <p className="max-w-[720px] text-base font-normal leading-relaxed text-[#FBF9F5]/90 lg:text-xl">{c.about}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
              <Btn href="#database" light className="h-[48px] w-full justify-center rounded-xl px-7 text-base font-semibold sm:w-auto">Вузы страны</Btn>
              <Btn href="#contact" ghost className="h-[48px] w-full justify-center rounded-xl px-7 text-base font-semibold sm:w-auto">Консультация €10</Btn>
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

      <section className="wrap pb-24">
        <Reveal>
          <a href={other.href} className="card group flex items-center justify-between rounded-2xl border border-[#2A211D]/10 bg-white p-8 transition-all duration-300 hover:border-[#C88242]/40 hover:shadow-lg lg:p-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[1.5px] text-[#C88242]">Смотрите также</span>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#2A211D] lg:text-5xl">{other.title}</h2>
              <p className="mt-2 text-sm text-[#2A211D]/65 lg:text-base">{other.desc}</p>
            </div>
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#2A211D]/5 text-[#2A211D] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#120D0B] group-hover:text-[#FBF9F5] sm:flex" aria-hidden>
              <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </section>

      <Contact />
      <MobileBar />
    </main>
  );
}
