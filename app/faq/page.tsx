import type { Metadata } from "next";
import Header from "../../components/Header";
import Intro from "../../components/Intro";
import Faq from "../../components/Faq";
import Contact from "../../components/Contact";
import MobileBar from "../../components/MobileBar";
import { Reveal, wrap } from "../../components/ui";

export const metadata: Metadata = {
  title: "Nexora Admissions — частые вопросы",
  description: "Гранты, язык, дедлайны, ВНЖ и гарантии: ответы на частые вопросы о поступлении в Австрию и Венгрию.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#F7F5EF] text-[#101418]">
      <Intro />
      <Header />
      <section className={`${wrap} pb-4 pt-40 lg:pt-48`}>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[1px] text-[#101418]/50">
            <a href="/" className="transition hover:text-[#101418]">Главная</a>
            <span> / FAQ</span>
          </p>
          <h1 className="mt-4 max-w-[800px] text-balance text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Частые вопросы о поступлении
          </h1>
          <p className="mt-4 max-w-[640px] text-[#101418]/60">
            Гранты, язык, дедлайны и визы. Не нашли свой вопрос — спросите в Telegram.
          </p>
        </Reveal>
      </section>
      <Faq title="Все вопросы" cats />
      <Contact />
      <MobileBar />
    </main>
  );
}
