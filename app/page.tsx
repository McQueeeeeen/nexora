"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { universities } from "./data";

const nav = [["Направления", "#services"], ["База вузов", "#database"], ["Этапы", "#steps"], ["Отзывы", "#reviews"], ["FAQ", "#faq"], ["Контакты", "#contact"]] as const;
const stepImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1400&q=80"
];
const services = [
  ["SERVICE 01", "Бакалавриат в Австрии", "Государственные университеты Вены, Граца и Линца от €1 450/год. Поступление после 11 классов, подготовительное отделение (VWU) и программы на немецком и английском."],
  ["SERVICE 02", "Гранты в Венгрии", "Stipendium Hungaricum: 100% бесплатное обучение, ежемесячная стипендия, бесплатное общежитие и медицинская страховка. Полная подготовка портфолио."],
  ["SERVICE 03", "Магистратура и MBA", "Топовые университеты (WU Vienna, TU Wien, Corvinus, ELTE). Более 120 программ полностью на английском языке с прямым зачислением без потери семестра."],
  ["SERVICE 04", "Сопровождение под ключ", "Апостили, судебные переводы, нострификация аттестатов и дипломов, подача заявок в вузы и гарантированное получение студенческого ВНЖ."]
];
const steps = [
  ["Step 01", "Академический аудит", "Анализируем оценки, уровень языка и академическую разницу. Рассчитываем точные шансы на грант и бюджет."],
  ["Step 02", "Стратегия и шортлист", "Подбираем 3–6 подходящих программ (от топовых до гарантированных) и формируем персональный календарь дедлайнов."],
  ["Step 03", "Документы и подача", "Берём на себя присяжные переводы, апостили, нострификацию и написание сильных мотивационных писем."],
  ["Step 04", "Зачисление и ВНЖ", "Подаём документы в вузы, получаем подтверждение зачисления (Zulassung) и оформляем студенческий ВНЖ."]
];
const quotes = [
  { text: "“Благодаря аудиту Nexora мы подали документы на Stipendium Hungaricum в ELTE и получили 100% грант со стипендией. Ни одного отказа и полная ясность на каждом шаге.”", author: "Алина Садыкова", role: "Студентка ELTE (Будапешт)" },
  { text: "“Поступил в TU Wien на Computer Science без потери года на бюрократию с апостилями. Куратор контролировал каждый этап вплоть до получения карточки ВНЖ в Вене.”", author: "Максим Романов", role: "Студент TU Wien (Вена)" },
  { text: "“Помогли выбрать программу в WU Vienna, подготовить портфолио и успешно пройти конкурс BBE. Зачисление с первой попытки!”", author: "Дарья Ким", role: "Студентка WU Vienna (Вена)" }
];
const faqs = [
  ["Сколько стоит высшее образование в Австрии и Венгрии?", "В государственных вузах Австрии обучение для граждан не-ЕС стоит ~€1 450 в год (~€726 за семестр). В Венгрии по стипендии Stipendium Hungaricum обучение 100% бесплатное, а на коммерческой основе — от €2 500 до €5 000 в год."],
  ["Можно ли поступить без знания немецкого языка?", "Да! В Австрии действует подготовительное отделение (Vorstudienlehrgang / VWU), где можно учить немецкий язык с нуля при университете. Также доступно множество программ бакалавриата и магистратуры на английском языке."],
  ["Что покрывает грант Stipendium Hungaricum в Венгрии?", "Грант покрывает 100% стоимости обучения, предоставляет бесплатное проживание в студенческом общежитии (или компенсацию аренды), ежемесячную стипендию и медицинскую страховку на весь период учебы."],
  ["Когда нужно начинать подготовку к поступлению?", "Рекомендуем начинать за 6–9 месяцев до дедлайна. Для гранта в Венгрии приём документов закрывается в январе, а для Австрии основной летний прием идет в июле–октябре."],
  ["Помогаете ли вы с получением студенческого ВНЖ?", "Да. Мы сопровождаем весь процесс оформления студенческого ВНЖ (Aufenthaltsbewilligung): проверяем справки из банка, бронируем общежитие и готовим к подаче в посольство."],
  ["Какие гарантии зачисления вы предоставляете?", "В договоре фиксируется подбор программ разного уровня селективности, включая гарантированные варианты. 98.4% наших студентов успешно получают зачисление."]
];

export default function Page() {
  const [country, setCountry] = useState<"AT" | "HU">("AT");
  const [query, setQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [sent, setSent] = useState(false);

  const filtered = useMemo(() => universities.filter(x => x.country === country && `${x.name} ${x.city} ${x.specialty}`.toLowerCase().includes(query.toLowerCase())), [country, query]);

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0C0C0C]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1408px] items-center justify-between px-6 py-4 lg:px-12">
          <a href="#" className="font-inter text-2xl font-bold tracking-tight text-white">NEXORA<span className="text-[#FFE533]">.</span></a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 lg:flex">
            {nav.map(([title, href]) => <a key={title} href={href} className="transition hover:text-[#FFE533]">{title}</a>)}
          </nav>
          <div className="flex items-center gap-5">
            <a href="https://t.me/nexora_support" target="_blank" className="hidden text-sm font-semibold text-white/90 hover:text-[#FFE533] sm:inline">@nexora_support</a>
            <a href="#contact" className="rounded-xl bg-[#FFE533] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#FFE533]/90">Бесплатный аудит</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[1408px] flex-col justify-center px-6 py-20 lg:px-12 lg:py-28">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FFE533]" />
            <span className="font-mono text-xs uppercase tracking-[2px] text-white/70">Приёмная кампания 2026/2027</span>
          </div>
          <h1 className="mt-7 max-w-[1100px] font-inter text-[clamp(34px,6.8vw,80px)] font-normal leading-[1.04] tracking-[-0.03em] text-white">
            Поступление в вузы Европы — от первой консультации до визы.
          </h1>
          <p className="mt-7 max-w-[740px] text-lg text-white/70 lg:text-xl">
            Академический аудит, дедлайны, гранты Stipendium Hungaricum и OeAD. Гарантированное зачисление в вузы Австрии и Венгрии без риска отказа.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex h-14 items-center justify-center rounded-xl bg-[#FFE533] px-8 text-base font-semibold text-black transition hover:bg-[#FFE533]/90">
              Получить стратегию поступления ↗
            </a>
            <a href="#database" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 text-base font-medium text-white transition hover:bg-white/10">
              База 28 университетов ↓
            </a>
          </div>
        </div>
      </section>

      {/* Mid-page Statement */}
      <section className="border-b border-white/10 bg-[#0C0C0C] px-6 py-24 text-center lg:py-32">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-balance font-inter text-3xl font-normal leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
            Поступление без случайностей — проверенные требования, один куратор, каждый документ под контролем.
          </h2>
        </div>
      </section>

      {/* Services Grid (01–04) */}
      <section id="services" className="mx-auto max-w-[1408px] px-6 py-24 lg:px-12">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FFE533]" />
          <span className="font-mono text-xs uppercase tracking-[2px] text-white/60">Направления</span>
        </div>
        <h2 className="mt-3 font-inter text-3xl font-bold tracking-tight text-white lg:text-5xl">Ключевые программы поступления</h2>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map(([eyebrow, title, desc]) => (
            <div key={title} className="card flex min-h-[300px] flex-col justify-between rounded-2xl border border-white/10 bg-[#181818] p-8">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-[2px] text-[#FFE533]">{eyebrow}</span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65">{desc}</p>
              </div>
              <span className="mt-6 text-xs text-white/40">Подробнее на консультации →</span>
            </div>
          ))}
        </div>
      </section>

      {/* University Database Section */}
      <section id="database" className="border-y border-white/10 bg-[#0C0C0C] px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-[1408px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FFE533]" />
                <span className="font-mono text-xs uppercase tracking-[2px] text-white/60">База данных</span>
              </div>
              <h2 className="mt-3 font-inter text-3xl font-bold tracking-tight text-white lg:text-5xl">Университеты Австрии и Венгрии</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-xl border border-white/15 bg-[#181818] p-1 text-xs font-semibold">
                <button onClick={() => setCountry("AT")} className={`rounded-lg px-4 py-2 transition ${country === "AT" ? "bg-[#FFE533] text-black" : "text-white/70 hover:text-white"}`}>
                  🇦🇹 Австрия (14)
                </button>
                <button onClick={() => setCountry("HU")} className={`rounded-lg px-4 py-2 transition ${country === "HU" ? "bg-[#FFE533] text-black" : "text-white/70 hover:text-white"}`}>
                  🇭🇺 Венгрия (14)
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between rounded-xl border border-white/10 bg-[#181818] px-4 py-3">
            <span className="font-mono text-xs uppercase tracking-wider text-white/50">Найдено: {filtered.length} вузов</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск по вузу, городу, специальности..."
              className="w-72 bg-transparent text-right text-sm text-white outline-none placeholder:text-white/40"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(uni => (
              <article key={uni.name} className="card flex flex-col justify-between rounded-2xl border border-white/10 bg-[#181818] p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#FFE533] px-3 py-0.5 font-mono text-[11px] font-bold text-black">{uni.tag || uni.rank}</span>
                    <span className="font-mono text-xs text-white/50">{uni.city}</span>
                  </div>
                  <h3 className="mt-5 font-inter text-2xl font-bold tracking-tight text-white">{uni.name}</h3>
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/60">{uni.specialty}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-white/40">Обучение</span>
                    <span className="font-medium text-white">{uni.fee}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-white/40">Подача</span>
                    <span className="font-medium text-white">{uni.apply}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block font-mono text-[10px] uppercase text-white/40">Гранты / Стипендии</span>
                    <span className="font-medium text-[#FFE533]">{uni.grant}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Yellow Stat Tiles (Matches goat-moving 1-to-1) */}
      <section className="mx-auto max-w-[1408px] px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["QS #137", "ТОП-ВУЗЫ", "University of Vienna в мировом рейтинге"],
            ["ГРАНТЫ", "100%", "Покрытие учебы Stipendium Hungaricum"],
            ["КЕЙСЫ", "312+", "Успешных зачислений за 5 лет"],
            ["РЕЗУЛЬТАТ", "98.4%", "Одобрений виз и студенческих ВНЖ"]
          ].map(([top, mid, bot]) => (
            <div key={top} className="flex min-h-[220px] flex-col justify-between rounded-2xl bg-[#FFE533] p-7 text-black lg:min-h-[260px] lg:p-9">
              <span className="font-mono text-xs font-semibold uppercase tracking-[2px] text-black/60">{top}</span>
              <span className="font-mono text-4xl font-bold tracking-tight lg:text-5xl">{mid}</span>
              <span className="font-inter text-sm font-medium leading-tight text-black/75">{bot}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process / Sticky Pinned Scroll Steps Section */}
      <StickySteps />

      {/* Testimonials / Social Proof Quote */}
      <section id="reviews" className="border-t border-white/10 bg-[#0C0C0C] px-6 py-24 text-center lg:py-32">
        <div className="mx-auto max-w-[1000px]">
          <blockquote className="font-sans text-2xl font-normal leading-snug text-white sm:text-3xl lg:text-4xl">
            {quotes[quoteIdx].text}
          </blockquote>
          <div className="mt-8 flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-white">{quotes[quoteIdx].author}</span>
            <span className="font-mono text-xs uppercase tracking-wider text-white/60">{quotes[quoteIdx].role}</span>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIdx(i)}
                aria-label={`Отзыв ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${quoteIdx === i ? "w-8 bg-[#FFE533]" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="border-t border-white/10 bg-[#0C0C0C] px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-[1408px]">
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
            <div className="lg:max-w-[480px]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FFE533]" />
                <span className="font-mono text-xs uppercase tracking-[2px] text-white/60">FAQ</span>
              </div>
              <h2 className="mt-3 font-sans text-3xl font-bold tracking-tight text-white lg:text-5xl">Часто задаваемые вопросы</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Всё, что нужно знать о грантах, языковых требованиях, дедлайнах и оформлении студенческих виз.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 lg:max-w-[760px]">
              {faqs.map(([q, a], idx) => {
                const open = activeFaq === idx;
                return (
                  <div key={q} className="overflow-hidden rounded-xl border border-white/10 bg-[#181818] transition">
                    <button
                      onClick={() => setActiveFaq(open ? null : idx)}
                      className="flex w-full items-center justify-between p-6 text-left"
                    >
                      <span className="text-base font-semibold text-white sm:text-lg">{q}</span>
                      <div className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#242424] text-lg font-bold text-white">
                        {open ? "−" : "+"}
                      </div>
                    </button>
                    {open && <p className="px-6 pb-6 text-sm leading-relaxed text-white/70">{a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts / Lead Capture Form & Footer */}
      <footer id="contact" className="border-t border-white/10 bg-[#141414] px-6 pt-20 pb-12 lg:px-12">
        <div className="mx-auto max-w-[1408px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FFE533]" />
                <span className="font-mono text-xs uppercase tracking-[2px] text-white/60">Контакты</span>
              </div>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                Получите персональную стратегию за 15 минут
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
                Заполните форму — эксперт по образованию в Европе оценит шансы на грант, проверит дедлайны и составит пошаговый план поступления.
              </p>
              <div className="mt-8 space-y-4 text-sm text-white/80">
                <p>📍 <b>Вена:</b> Schottengasse 4, 1010 Wien, Austria</p>
                <p>📍 <b>Будапешт:</b> Váci utca 12, 1052 Budapest, Hungary</p>
                <p>💬 <b>Telegram:</b> <a href="https://t.me/nexora_support" target="_blank" className="text-[#FFE533] underline">@nexora_support</a></p>
                <p>✉️ <b>Email:</b> <a href="mailto:admissions@nexora.eu" className="text-[#FFE533] underline">admissions@nexora.eu</a></p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#181818] p-8">
              {sent ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <span className="text-5xl text-[#FFE533]">✓</span>
                  <h4 className="mt-4 text-2xl font-bold text-white">Заявка принята</h4>
                  <p className="mt-2 max-w-sm text-sm text-white/70">Мы свяжемся с вами в течение 30 минут для бесплатной диагностики профиля.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/60">Ваше имя <span className="text-[#FFE533]">*</span></label>
                    <input required placeholder="Иван Иванов" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#FFE533]" />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/60">Телефон или Telegram <span className="text-[#FFE533]">*</span></label>
                    <input required placeholder="+7 (999) 000-00-00 или @username" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#FFE533]" />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-white/60">Интересующая страна и уровень</label>
                    <input placeholder="Например: Бакалавриат в Австрии или Грант в Венгрии" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#FFE533]" />
                  </div>
                  <button type="submit" className="mt-2 w-full rounded-xl bg-[#FFE533] py-4 text-sm font-bold text-black transition hover:bg-[#FFE533]/90">
                    Записаться на бесплатный аудит ↗
                  </button>
                  <p className="text-center text-[11px] text-white/40">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
                </form>
              )}
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
            <span>© 2026 Nexora Admissions. Все права защищены. Правила приёма актуальны на сезон 2026/2027.</span>
            <div className="flex gap-6">
              <a href="#services" className="hover:text-white">Программы</a>
              <a href="#database" className="hover:text-white">Вузы</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
              <a href="#contact" className="hover:text-white">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StickySteps() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentStep = Math.min(3, Math.floor(progress * 4));
  const stepFraction = (progress * 4) % 1;

  return (
    <div ref={ref} id="steps" className="relative h-[360vh] bg-[#0C0C0C]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden border-t border-white/10 px-6 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1408px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Text block */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FFE533]" />
              <span className="font-mono text-xs uppercase tracking-[2px] text-white/60">Процесс зачисления</span>
            </div>
            <div className="mt-6 min-h-[260px] flex flex-col justify-center">
              <span className="font-mono text-sm font-semibold uppercase tracking-[2px] text-[#FFE533]">
                {steps[currentStep][0]} / 04
              </span>
              <div className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-500">
                {steps[currentStep][1].split('').map((char, i) => {
                  const letterProgress = Math.max(0, Math.min(1, (stepFraction * steps[currentStep][1].length - i)));
                  const opacity = Math.min(1, Math.max(0, letterProgress));
                  const color = letterProgress > 0.5 ? '#FFFFFF' : '#FFE533';
                  return (
                    <span key={i} style={{ opacity, color }}>{char}</span>
                  );
                })}
              </div>
              <div className="my-5 h-[3px] w-28 bg-white/10 overflow-hidden rounded-full">
                <div className="h-full bg-[#FFE533] transition-all duration-200" style={{ width: `${Math.max(15, stepFraction * 100)}%` }} />
              </div>
              <p key={`p-${currentStep}`} className="text-base sm:text-lg text-white/70 leading-relaxed transition-all duration-500">
                {steps[currentStep][2]}
              </p>
            </div>
            {/* Step Indicators */}
            <div className="mt-8 flex gap-2">
              {steps.map((s, idx) => (
                <button
                  key={s[0]}
                  onClick={() => {
                    if (!ref.current) return;
                    const top = ref.current.offsetTop + (idx / 4) * (ref.current.offsetHeight - window.innerHeight);
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentStep === idx ? "w-12 bg-[#FFE533]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                  aria-label={`Шаг ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Media block with smooth crossfade and subtle scale */}
          <div className="lg:col-span-7 relative h-[45vh] lg:h-[65vh] w-full rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-[#181818] shadow-2xl">
            {stepImages.map((src, idx) => (
              <div
                key={src}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  currentStep === idx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
                }`}
              >
                <img src={src} alt={steps[idx][1]} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-black/25 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="rounded-full bg-black/60 px-3.5 py-1.5 font-mono text-xs font-medium text-white/90 backdrop-blur-md border border-white/15">
                    {steps[idx][0]}: {steps[idx][1]}
                  </span>
                  <span className="font-mono text-xs text-[#FFE533] hidden sm:inline">Nexora Verified Campus ✦</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
