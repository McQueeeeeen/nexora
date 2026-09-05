import type { Metadata } from "next";
import Header from "../../components/Header";
import Intro from "../../components/Intro";
import Contact from "../../components/Contact";
import MobileBar from "../../components/MobileBar";
import { Reveal, wrap, ArrowIcon } from "../../components/ui";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Nexora Admissions — блог о поступлении",
  description: "Гайды: грант Stipendium Hungaricum, подготовительное отделение VWU, нострификация документов.",
};

export default function Blog() {
  return (
    <main className="min-h-screen bg-[#F7F5EF] text-[#101418]">
      <Intro />
      <Header />
      <section className={`${wrap} pb-4 pt-40 lg:pt-48`}>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[1px] text-[#101418]/50">
            <a href="/" className="transition hover:text-[#101418]">Главная</a>
            <span> / Блог</span>
          </p>
          <h1 className="mt-4 max-w-[800px] text-balance text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Гайды по поступлению
          </h1>
          <p className="mt-4 max-w-[640px] text-[#101418]/60">
            Разбираем гранты, язык и документы без воды — то, о чём спрашиваем на консультациях чаще всего.
          </p>
        </Reveal>
      </section>
      <section className={`${wrap} grid grid-cols-1 gap-4 py-12 md:grid-cols-2 lg:grid-cols-3 lg:py-16`}>
        {posts.map((p, i) => (
          <Reveal key={p.slug}>
            <a href={`/blog/${p.slug}`} className="card group flex h-full min-h-[280px] flex-col justify-between rounded-2xl border border-[#101418]/10 bg-white p-6 lg:p-8">
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[1px] text-[#101418]/45">
                  <span>{p.date}</span>
                  <span>{p.read}</span>
                </div>
                <span className="mt-4 block font-mono text-2xl font-bold text-[var(--brand)]">0{i + 1}</span>
                <h2 className="mt-3 text-xl font-medium leading-snug tracking-tight lg:text-2xl">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#101418]/60">{p.excerpt}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition group-hover:text-[var(--brand)]">
                Читать <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        ))}
      </section>
      <Contact />
      <MobileBar />
    </main>
  );
}
