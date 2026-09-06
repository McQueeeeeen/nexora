"use client";
import { useState, useMemo } from "react";
import { wrap, Tag, Reveal, Stars, Btn, ArrowIcon } from "../../components/ui";

interface StudentReview {
  id: string;
  name: string;
  city: string;
  uni: string;
  program: string;
  category: "Австрия" | "Венгрия" | "Магистратура" | "Бакалавриат";
  year: string;
  platform: "Telegram" | "Google" | "Прямой отзыв";
  text: string;
  avatarBg?: string;
}

const allReviews: StudentReview[] = [
  {
    id: "r1",
    name: "Алина Садыкова",
    city: "Будапешт",
    uni: "ELTE University",
    program: "Computer Science · Грант 100%",
    category: "Венгрия",
    year: "2025/2026",
    platform: "Telegram",
    text: "Благодаря аудиту и подготовке портфолио от Nexora мы подали документы на Stipendium Hungaricum в ELTE и выиграли 100% грант со стипендией и бесплатным общежитием. Ни одного отказа, куратор вела каждый шаг от мотивационного письма до встречи в Будапеште!",
  },
  {
    id: "r2",
    name: "Максим Романов",
    city: "Вена",
    uni: "TU Wien",
    program: "Software Engineering & IT",
    category: "Австрия",
    year: "2025",
    platform: "Google",
    text: "Поступил в TU Wien без потери года на бюрократию с апостилями. Куратор контролировал каждый этап, включая судебные переводы и нострификацию, вплоть до получения карточки ВНЖ в магистрате Вены. Очень спокойный и системный процесс.",
  },
  {
    id: "r3",
    name: "Дарья Ким",
    city: "Вена",
    uni: "WU Vienna",
    program: "BBE (Business and Economics)",
    category: "Бакалавриат",
    year: "2025",
    platform: "Telegram",
    text: "Помогли выбрать программу в WU Vienna, подготовить академическое резюме и успешно пройти вступительный конкурс BBE на английском языке. Зачисление с первой попытки и быстрое бронирование студенческого общежития!",
  },
  {
    id: "r4",
    name: "Тимур Ахметов",
    city: "Будапешт",
    uni: "Corvinus University",
    program: "International Business · Грант",
    category: "Венгрия",
    year: "2025",
    platform: "Google",
    text: "Stipendium Hungaricum казался нереальным из-за огромного конкурса. Но в Nexora помогли написать невероятно сильное мотивационное письмо и подготовили к интервью с профессором. Итог — я учусь в лучшем бизнес-вузе Венгрии полностью бесплатно!",
  },
  {
    id: "r5",
    name: "София Лебедева",
    city: "Грац",
    uni: "University of Graz",
    program: "VWU + Бакалавриат (Право)",
    category: "Австрия",
    year: "2024/2025",
    platform: "Прямой отзыв",
    text: "Поступала после 11 классов без знания немецкого. Оформили подготовительное отделение VWU при Университете Граца. За год подняла язык с нуля до C1 и перешла на основной факультет. Документы на визу собрали без единой ошибки.",
  },
  {
    id: "r6",
    name: "Артур Варданян",
    city: "Вена",
    uni: "University of Vienna",
    program: "Data Science & AI · Магистратура",
    category: "Магистратура",
    year: "2025",
    platform: "Telegram",
    text: "Искал сильную англоязычную магистратуру в Европе. Подобрали Data Science в главном венском университете. Помогли правильно легализовать бакалаврский диплом и подтвердить кредиты ECTS. Зачисление пришло за 3 недели!",
  },
  {
    id: "r7",
    name: "Камила Нургалиева",
    city: "Будапешт",
    uni: "Semmelweis University",
    program: "General Medicine",
    category: "Венгрия",
    year: "2025",
    platform: "Google",
    text: "Поступление на медицину в Semmelweis — это сложнейшие экзамены по химии и биологии. Кураторы Nexora предоставили актуальные материалы прошлых лет, помогли с таймингом подачи и визой D. Я уже студентка медфака!",
  },
  {
    id: "r8",
    name: "Евгений Павлов",
    city: "Линц",
    uni: "JKU Linz",
    program: "Artificial Intelligence (BSc)",
    category: "Бакалавриат",
    year: "2024",
    platform: "Telegram",
    text: "JKU Linz — топовый центр AI в Европе. Программа полностью на английском. Огромная благодарность агентству за помощь со студенческим общежитием и страховкой ÖGK. Все вопросы решались в Telegram за считанные минуты.",
  },
];

const categories = ["Все", "Австрия", "Венгрия", "Бакалавриат", "Магистратура"] as const;

export default function ReviewsClient() {
  const [activeCat, setActiveCat] = useState<string>("Все");
  const [query, setQuery] = useState<string>("");

  const filtered = useMemo(() => {
    return allReviews.filter((r) => {
      const matchCat = activeCat === "Все" || r.category === activeCat;
      const matchSearch =
        !query.trim() ||
        `${r.name} ${r.uni} ${r.city} ${r.program} ${r.text}`.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCat, query]);

  return (
    <>
      {/* Хлебные крошки и Hero-секция отзывов */}
      <section className="border-b border-[#2A211D]/10 bg-[#2A211D] px-6 pt-36 pb-16 text-[#FBF9F5] lg:px-12 lg:pt-44 lg:pb-24">
        <div className={wrap}>
          <Reveal>
            <nav aria-label="Breadcrumb" className="pb-4">
              <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-[-0.3px] text-[#FBF9F5]/50 lg:text-sm">
                <li>
                  <a href="/" className="hover:text-white transition">
                    Главная
                  </a>
                </li>
                <li className="text-[#FBF9F5]/30">/</li>
                <li className="font-semibold text-white" aria-current="page">
                  Отзывы
                </li>
              </ol>
            </nav>
          </Reveal>

          <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-end">
            <Reveal className="lg:col-span-7">
              <span className="font-mono text-xs font-bold uppercase tracking-[1px] text-[var(--accent)]">
                Реальные истории зачислений
              </span>
              <h1 className="mt-4 text-balance text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Что говорят <span className="text-[var(--accent)]">наши студенты</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-base leading-relaxed text-[#FBF9F5]/75 lg:text-lg">
                312+ зачислений за 5 лет работы. Честный опыт студентов, поступивших в государственные вузы Австрии и выигравших гранты в Венгрии.
              </p>
            </Reveal>

            {/* Блок совокупного рейтинга — как у эталона */}
            <Reveal delay={120} className="lg:col-span-5">
              <div className="flex flex-col gap-6 rounded-3xl border border-[#FBF9F5]/15 bg-[#362B26]/80 p-6 backdrop-blur-md lg:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-[#FBF9F5]/10 pb-5">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-4xl font-bold tracking-tight text-white lg:text-5xl">
                        4.94
                      </span>
                      <span className="font-mono text-xl text-[#FBF9F5]/50">/ 5</span>
                    </div>
                    <div className="mt-2 text-[var(--accent)]">
                      <Stars />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-xs uppercase tracking-[1px] text-[#FBF9F5]/50">
                      Всего отзывов
                    </span>
                    <span className="font-mono text-2xl font-bold text-white">312+</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/20 font-bold text-[var(--accent)]">
                      TG
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-[#FBF9F5]/50">Telegram</span>
                      <span className="text-xs font-semibold text-white">4.98 ★ (210+)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 font-bold text-blue-400">
                      G
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-[#FBF9F5]/50">Google</span>
                      <span className="text-xs font-semibold text-white">4.9 ★ (100+)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Фильтры и карточки отзывов */}
      <section className="py-16 lg:py-24">
        <div className={wrap}>
          {/* Панель фильтров */}
          <Reveal className="flex flex-col gap-5 border-b border-[#2A211D]/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`cursor-pointer rounded-xl px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.5px] transition-all duration-200 ${
                    activeCat === c
                      ? "bg-[#2A211D] text-[#FBF9F5] shadow-sm"
                      : "border border-[#2A211D]/10 bg-white/60 text-[#2A211D]/60 hover:bg-white hover:text-[#2A211D]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative max-w-xs">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по вузу, имени, городу..."
                className="input-light h-11 w-full rounded-xl px-4 text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2A211D]/40 hover:text-[#2A211D]"
                >
                  ✕
                </button>
              )}
            </div>
          </Reveal>

          {/* Сетка отзывов */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8">
            {filtered.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-[#2A211D]/20 p-12 text-center text-[#2A211D]/60">
                Ничего не найдено. Попробуйте сменить фильтр или поисковый запрос.
              </div>
            ) : (
              filtered.map((r, i) => {
                const initials = r.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("");

                return (
                  <Reveal key={r.id} delay={(i % 4) * 100} className="flex">
                    <article className="card flex w-full flex-col justify-between rounded-3xl border border-[#2A211D]/10 bg-white p-7 shadow-sm transition-all hover:border-[#2A211D]/25 hover:shadow-md lg:p-9">
                      <div>
                        {/* Шапка карточки студента */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <span
                              className="flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-base font-bold text-[#FBF9F5] shadow-inner"
                              style={{ backgroundColor: "#2A211D" }}
                              aria-hidden
                            >
                              {initials}
                            </span>
                            <div>
                              <h3 className="text-lg font-semibold tracking-tight text-[#2A211D]">
                                {r.name}
                              </h3>
                              <span className="font-mono text-xs uppercase tracking-[0.5px] text-[#2A211D]/50">
                                {r.city} · {r.year}
                              </span>
                            </div>
                          </div>
                          <span className="rounded-full bg-[#2A211D]/5 px-3 py-1 font-mono text-[11px] font-bold text-[var(--accent)] border border-[#2A211D]/10">
                            {r.platform}
                          </span>
                        </div>

                        {/* Теги вуза и программы */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="rounded-lg bg-[#FBF9F5] px-2.5 py-1 text-xs font-semibold text-[#2A211D] border border-[#2A211D]/10">
                            {r.uni}
                          </span>
                          <span className="rounded-lg bg-[var(--accent)]/10 px-2.5 py-1 text-xs font-medium text-[#C88242]">
                            {r.program}
                          </span>
                        </div>

                        {/* Звёзды */}
                        <div className="mt-4 text-[var(--accent)]">
                          <Stars />
                        </div>

                        {/* Текст отзыва */}
                        <p className="mt-4 text-[15px] leading-relaxed text-[#2A211D]/80 lg:text-base">
                          «{r.text}»
                        </p>
                      </div>

                      {/* Футер отзыва: статус зачисления */}
                      <div className="mt-6 flex items-center justify-between border-t border-[#2A211D]/8 pt-4">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.5px] text-emerald-700">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Зачисление подтверждено
                        </span>
                        <span className="font-mono text-[11px] text-[#2A211D]/45">
                          Сезон {r.year}
                        </span>
                      </div>
                    </article>
                  </Reveal>
                );
              })
            )}
          </div>

          {/* Нижний CTA баннер на странице отзывов */}
          <Reveal className="mt-16 rounded-3xl bg-[#2A211D] p-8 text-[#FBF9F5] shadow-xl lg:mt-24 lg:p-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="font-mono text-xs uppercase tracking-[1px] text-[var(--accent)]">
                  Ваша история зачисления
                </span>
                <h2 className="mt-3 text-3xl font-medium tracking-tight text-white lg:text-4xl">
                  Хотите поступить в европейский университет без стресса?
                </h2>
                <p className="mt-3 text-sm text-[#FBF9F5]/70 lg:text-base">
                  Начните с персональной консультации за €10: оценим шансы, подберём программы и рассчитаем точный бюджет.
                </p>
              </div>
              <Btn
                href="/#contact"
                light
                className="h-14 shrink-0 rounded-xl px-8 text-base font-semibold"
              >
                Записаться на разбор
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
