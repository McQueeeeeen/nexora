"use client";
import { useMemo, useState } from "react";
import { universities, uniSites, type Country } from "../app/data";
import { wrap, Tag, Reveal, Y, ExtIcon } from "./ui";

// Каталог locked на страну страницы: чужих вузов не показываем.
// Название — ссылка на официальный сайт (новая вкладка), карточка статична.
export default function Database({ initial = "AT", title = "Университеты Австрии и Венгрии" }: {
  initial?: Country; title?: string;
}) {
  const [q, setQ] = useState("");
  const list = useMemo(() => universities.filter(
    (u) => u.country === initial && `${u.name} ${u.city} ${u.specialty}`.toLowerCase().includes(q.toLowerCase())
  ), [initial, q]);

  return (
    <section id="database" className="border-y border-[#2A211D]/10 py-24 lg:py-40">
      <div className={wrap}>
        <Reveal>
          <Tag>База данных</Tag>
          <h2 className="mt-3 max-w-[1100px] text-balance text-3xl font-medium tracking-[-0.02em] text-[#2A211D] lg:text-5xl">{title}</h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#2A211D]/10 bg-white px-4 py-3">
          <span className="font-mono text-xs uppercase text-[#2A211D]/50">Найдено: {list.length}</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по вузу, городу, специальности..."
            className="input-light w-72 max-w-[46vw] shrink-0 rounded-[10px] px-3 py-2 text-right text-base" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-[#2A211D]/20 py-16 text-center text-[#2A211D]/60">
              Ничего не найдено — попробуйте другой запрос или смените страну.
            </p>
          )}
          {list.map((u) => {
            const site = uniSites[u.name];
            return (
              <article key={u.name} className="card flex flex-col justify-between rounded-2xl border border-[#2A211D]/10 bg-white p-6 transition-all duration-300 hover:border-[#C88242]/40 hover:shadow-md">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-white/10 bg-[#120D0B] px-3 py-0.5 font-mono text-[11px] font-semibold text-[#E5B87A]">Шанс {u.chance}</span>
                    <span className="font-mono text-xs text-[#2A211D]/50">{u.city} · {u.rank}</span>
                  </div>
                  {site ? (
                    <a href={site} target="_blank" rel="noopener noreferrer" title={`Официальный сайт — ${u.name}`}
                      className="group/link mt-5 inline-flex items-center gap-1.5 text-2xl font-medium tracking-tight text-[#2A211D] transition hover:text-[#C88242]">
                      <span>{u.name}</span>
                      <ExtIcon className="h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <h3 className="mt-5 text-2xl font-medium tracking-tight text-[#2A211D]">{u.name}</h3>
                  )}
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#2A211D]/65">{u.specialty}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#2A211D]/10 pt-4 text-xs text-[#2A211D]">
                  <div><span className="block font-mono text-[10px] uppercase text-[#2A211D]/45">Обучение</span><span className="font-medium text-[#2A211D]">{u.fee}</span></div>
                  <div><span className="block font-mono text-[10px] uppercase text-[#2A211D]/45">Подача</span><span className="line-clamp-2">{u.apply}</span></div>
                  <div className="col-span-2"><span className="block font-mono text-[10px] uppercase text-[#2A211D]/45">Гранты</span><span className="font-semibold text-[#2A211D]">{u.grant}</span></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
