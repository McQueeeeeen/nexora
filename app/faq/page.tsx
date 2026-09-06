import type { Metadata } from "next";
import Header from "../../components/Header";
import Faq from "../../components/Faq";
import Contact from "../../components/Contact";
import MobileBar from "../../components/MobileBar";
import { Reveal } from "../../components/ui";
import { faqs } from "../data";

export const metadata: Metadata = {
  title: "Nexora Admissions — частые вопросы о поступлении",
  description: "Гранты, язык, дедлайны, ВНЖ и гарантии: ответы на частые вопросы о поступлении в Австрию и Венгрию.",
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://nexora-eight-opal.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://nexora-eight-opal.vercel.app/faq",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#2A211D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <section className="wrap pb-2 pt-36 lg:pt-44">
        <Reveal>
          <nav aria-label="Breadcrumb" className="pb-3">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[-0.3px] text-[#2A211D]/50 lg:text-sm">
              <li className="flex items-center gap-2">
                <a href="/" className="transition-colors duration-200 hover:text-[var(--brand)]">
                  Главная
                </a>
                <span className="text-[#2A211D]/25">/</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-[#2A211D]" aria-current="page">FAQ</span>
              </li>
            </ol>
          </nav>
          <h1 className="mt-2 max-w-[900px] text-balance text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-[var(--brand)]">Частые </span>
            <span className="text-[#2A211D]">вопросы о поступлении</span>
          </h1>
          <p className="mt-4 max-w-[640px] text-base text-[#2A211D]/65 lg:text-lg">
            Гранты, требования к языку, дедлайны и студенческий ВНЖ. Если не нашли свой вопрос — задайте его напрямую в Telegram.
          </p>
        </Reveal>
      </section>
      <Faq cats fullWidth />
      <Contact />
      <MobileBar />
    </main>
  );
}

