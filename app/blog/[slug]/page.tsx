import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Intro from "../../../components/Intro";
import Contact from "../../../components/Contact";
import MobileBar from "../../../components/MobileBar";
import { Reveal, Btn, ArrowIcon } from "../../../components/ui";
import { posts } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `Nexora Admissions — ${post.title}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== slug).slice(0, 2);

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: "2026-09-01",
    author: {
      "@type": "Organization",
      name: "Nexora Admissions",
    },
    publisher: {
      "@type": "Organization",
      name: "Nexora Admissions",
      logo: {
        "@type": "ImageObject",
        url: "https://nexora-eight-opal.vercel.app/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nexora-eight-opal.vercel.app/blog/${slug}`,
    },
  };

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
        name: "Блог",
        item: "https://nexora-eight-opal.vercel.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://nexora-eight-opal.vercel.app/blog/${slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#2A211D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Intro />
      <Header />
      <article className="wrap max-w-[860px] pb-8 pt-40 lg:pt-48">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[1px] text-[#2A211D]/50">
            <a href="/" className="transition hover:text-[#2A211D]">Главная</a>
            <span> / </span>
            <a href="/blog" className="transition hover:text-[#2A211D]">Блог</a>
          </p>
          <h1 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[1px] text-[#2A211D]/45">{post.date} · {post.read}</p>
        </Reveal>
        <div className="mt-10 flex flex-col gap-8">
          {post.blocks.map((b, i) => (
            <Reveal key={i}>
              {b.h && <h2 className="text-2xl font-medium tracking-tight lg:text-3xl">{b.h}</h2>}
              {b.p && <p className="mt-3 leading-relaxed text-[#2A211D]/75">{b.p}</p>}
              {b.list && (
                <ul className="mt-3 flex flex-col gap-2">
                  {b.list.map((li) => (
                    <li key={li} className="flex gap-3 leading-relaxed text-[#2A211D]/75">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--brand)" }} aria-hidden />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 rounded-2xl bg-[#2A211D] p-8 text-[#FBF9F5] lg:p-10">
          <h2 className="max-w-[560px] text-2xl font-medium tracking-tight lg:text-3xl">Остались вопросы по теме?</h2>
          <p className="mt-2 text-[#FBF9F5]/70">Разберём ваш профиль на консультации за €10.</p>
          <div className="mt-6">
            <Btn href="/#contact" light className="h-14 rounded-xl px-8 text-base">Записаться</Btn>
          </div>
        </Reveal>
        {others.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <a key={o.slug} href={`/blog/${o.slug}`} className="card group rounded-2xl border border-[#2A211D]/10 bg-white p-6">
                <span className="font-mono text-[11px] uppercase tracking-[1px] text-[#2A211D]/45">{o.date} · {o.read}</span>
                <h3 className="mt-2 font-medium leading-snug tracking-tight">{o.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition group-hover:text-[var(--brand)]">
                  Читать <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        )}
      </article>
      <Contact />
      <MobileBar />
    </main>
  );
}
