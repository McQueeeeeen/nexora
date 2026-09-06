"use client";
import { wrap, Tag, Reveal, Btn, CheckIcon } from "./ui";

interface PackageTier {
  id: string;
  badge?: string;
  featured?: boolean;
  name: string;
  desc: string;
  priceNote: string;
  features: string[];
  cta: string;
}

// Пакеты услуг / Тарифная сетка: премиальные карточки с акцентом на флагманский тариф,
// списком включённых опций и интерактивными кнопками.
const tiers: PackageTier[] = [
  {
    id: "tier-1",
    badge: "01 · Старт",
    name: "Академический аудит",
    desc: "Персональный разбор профиля, проверка документов и выбор оптимальных программ.",
    priceNote: "Фиксированная стоимость",
    features: [
      "Оценка шансов на зачисление и гранты",
      "Подбор 3–5 программ под ваш бюджет",
      "Календарь дедлайнов и требований",
      "Анализ академической разницы",
      "Q&A сессия с куратором в Zoom",
    ],
    cta: "Выбрать тариф",
  },
  {
    id: "tier-2",
    badge: "02 · Флагман",
    featured: true,
    name: "Сопровождение под ключ",
    desc: "Полное ведение от сбора документов до зачисления в вуз и получения студенческого ВНЖ.",
    priceNote: "Гарантия по договору",
    features: [
      "Всё, что входит в аудит и стратегию",
      "Судебные переводы и проставление апостилей",
      "Нострификация аттестата / диплома",
      "Написание мотивационных писем и CV",
      "Подача документов во все выбранные вузы",
      "Оформление студенческого ВНЖ под ключ",
      "Бронирование общежития и страховка",
      "Куратор на связи каждый день до приезда",
    ],
    cta: "Оставить заявку",
  },
  {
    id: "tier-3",
    badge: "03 · Грант",
    name: "Stipendium Hungaricum",
    desc: "Специализированная подготовка конкурсного портфолио на 100% грант в Венгрию.",
    priceNote: "Конкурсный трек",
    features: [
      "Аудит соответствия критериям гранта",
      "Академические рекомендации под конкурс",
      "Мотивационное эссе по стандартам фонда",
      "Подготовка к онлайн-собеседованию",
      "Подача на запасные коммерческие места",
      "Сопровождение визы и заселения",
    ],
    cta: "Участвовать в конкурсе",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-[#2A211D]/10 py-24 lg:py-36">
      <div className={wrap}>
        <Reveal>
          <div className="border-b border-[#2A211D]/10 pb-4 lg:pb-6">
            <Tag>Пакеты услуг</Tag>
          </div>
        </Reveal>

        <Reveal className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-balance text-3xl font-medium tracking-[-0.02em] text-[#2A211D] lg:text-5xl">
              Форматы сопровождения
            </h2>
            <p className="mt-4 max-w-[620px] text-base leading-relaxed text-[#2A211D]/70 lg:text-lg">
              Прозрачные условия под ваши цели: от точечной консультации и проверки портфолио до полного переезда и карточки ВНЖ на руках.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[1px] text-[#2A211D]/50">
            Сезон 2026 / 2027
          </span>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {tiers.map((t, i) => {
            const isFeatured = !!t.featured;
            return (
              <Reveal key={t.id} delay={i * 120} className="flex">
                <div
                  className={`card relative flex w-full flex-col justify-between rounded-3xl p-8 transition-all duration-300 lg:p-10 ${
                    isFeatured
                      ? "border-2 border-[var(--accent)] bg-[#2A211D] text-[#FBF9F5] shadow-[0_20px_50px_rgba(42,33,29,0.25)] ring-1 ring-[var(--accent)]/30"
                      : "border border-[#2A211D]/10 bg-white text-[#2A211D] shadow-sm hover:border-[#2A211D]/25 hover:shadow-md"
                  }`}
                >
                  {/* Фоновое свечение для флагманской карточки */}
                  {isFeatured && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[var(--accent)]/15 blur-3xl"
                    />
                  )}

                  <div>
                    {/* Бейдж тарифа */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-mono text-xs font-bold uppercase tracking-[1px] ${
                          isFeatured ? "text-[var(--accent)]" : "text-[#2A211D]/50"
                        }`}
                      >
                        {t.badge}
                      </span>
                      {isFeatured && (
                        <span className="rounded-full bg-[var(--accent)]/20 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.5px] text-[#E5B87A] border border-[var(--accent)]/40">
                          Популярный выбор
                        </span>
                      )}
                    </div>

                    {/* Заголовок и описание */}
                    <h3
                      className={`mt-4 text-2xl font-medium tracking-tight lg:text-3xl ${
                        isFeatured ? "text-[#FBF9F5]" : "text-[#2A211D]"
                      }`}
                    >
                      {t.name}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isFeatured ? "text-[#FBF9F5]/70" : "text-[#2A211D]/65"
                      }`}
                    >
                      {t.desc}
                    </p>

                    {/* Плейсхолдер цены / формата */}
                    <div className="mt-8 flex items-baseline gap-2">
                      <span
                        className={`font-mono text-xs uppercase tracking-[1px] ${
                          isFeatured ? "text-[#FBF9F5]/60" : "text-[#2A211D]/50"
                        }`}
                      >
                        {t.priceNote}
                      </span>
                    </div>

                    <div
                      className={`my-6 h-px ${
                        isFeatured ? "bg-[#FBF9F5]/12" : "bg-[#2A211D]/10"
                      }`}
                    />

                    {/* Список фичей */}
                    <div className="space-y-3.5">
                      <span
                        className={`block font-mono text-[11px] uppercase tracking-[1px] ${
                          isFeatured ? "text-[#FBF9F5]/50" : "text-[#2A211D]/45"
                        }`}
                      >
                        Что входит в пакет:
                      </span>
                      {t.features.map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 shrink-0 ${
                              isFeatured ? "text-[var(--accent)]" : "text-[var(--accent)]"
                            }`}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </span>
                          <span
                            className={`text-sm leading-snug ${
                              isFeatured ? "text-[#FBF9F5]/85" : "text-[#2A211D]/80"
                            }`}
                          >
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Кнопка действия */}
                  <div className="mt-10 pt-4">
                    <Btn
                      href="#contact"
                      light={isFeatured}
                      outline={!isFeatured}
                      className="h-14 w-full justify-center rounded-xl text-base font-semibold shadow-sm"
                    >
                      {t.cta}
                    </Btn>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
