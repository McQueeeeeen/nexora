import type { Metadata } from "next";
import Header from "../../components/Header";
import Contact from "../../components/Contact";
import MobileBar from "../../components/MobileBar";
import CtaBand from "../../components/CtaBand";
import Faq from "../../components/Faq";
import { Reveal, wrap, Tag, Btn } from "../../components/ui";

export const metadata: Metadata = {
  title: "Nexora Admissions — цены на поступление",
  description: "Консультация €10, учёба в Австрии от €1 450 в год, грант Stipendium Hungaricum 100%. Честно о ценах без скрытых платежей.",
};

const cards = [
  { top: "КОНСУЛЬТАЦИЯ", mid: "€10", bot: "Аудит шансов, дедлайны и план поступления" },
  { top: "АВСТРИЯ", mid: "€1 450", bot: "в год в государственных университетах" },
  { top: "ВЕНГРИЯ", mid: "0 €", bot: "по гранту Stipendium Hungaricum" },
];

const formula = [
  { no: "01", title: "Консультация — €10", text: "Разбираем оценки, язык и бюджет. Честно говорим шансы на грант и даём пошаговый план — дальше решаете вы." },
  { no: "02", title: "Программа", text: "Австрия: ~€1 450 в год. Венгрия: грант 100% или коммерция €2 500–5 000 в год. Подбираем под бюджет." },
  { no: "03", title: "Документы", text: "Переводы, апостили, нострификация — по чекам, без наценок. Готовим и проверяем весь пакет." },
  { no: "04", title: "ВНЖ и переезд", text: "Консульский сбор, страховка, общежитие. Сопровождаем до карточки ВНЖ и заселения." },
];

const included = [
  { title: "Академический аудит", desc: "Шансы на грант и бюджет — цифрами, а не ощущениями." },
  { title: "Шортлист вузов", desc: "3–6 программ: от амбициозных до гарантированных." },
  { title: "Переводы и апостили", desc: "Судебные переводы и легализация без ошибок." },
  { title: "Нострификация", desc: "Признание аттестата и диплома доводим до решения." },
  { title: "Мотивационные письма", desc: "Эссе под требования каждого факультета." },
  { title: "ВНЖ под ключ", desc: "Общежитие, банк, страховка и подача в посольство." },
];

const faqs = [
  { q: "Сколько стоит консультация?", a: "€10. Персональный разбор профиля: шансы на грант, подходящие программы, дедлайны и бюджет. После заявки пришлём детали." },
  { q: "Что входит в €10?", a: "Аудит оценок и языка, проверка шансов на Stipendium Hungaricum, шортлист программ и календарь дедлайнов. Никаких обязательств дальше." },
  { q: "Сколько стоит сопровождение под ключ?", a: "Стоимость фиксируем в договоре после аудита — зависит от страны и числа программ. Цена не меняется в процессе." },
  { q: "Есть ли скрытые платежи?", a: "Нет. Наша цена — в договоре. Госпошлины, переводы и страховки оплачиваются по чекам напрямую поставщикам." },
  { q: "Можно взять только консультацию?", a: "Да. Многие идут дальше сами с нашим планом — это нормально. Вернуться за сопровождением можно в любой момент." },
  { q: "Как оплатить из другой страны?", a: "После заявки пришлём ссылку на оплату картой. Чек и договор — до созвона." },
];

export default function Pricing() {
  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#2A211D]">
      <Header />

      <section className={`${wrap} pb-8 pt-40 lg:pt-48`}>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[1px] text-[#2A211D]/50">
            <a href="/" className="transition hover:text-[#2A211D]">Главная</a>
            <span> / Цены</span>
          </p>
          <Tag>Цены</Tag>
          <h1 className="mt-3 max-w-[800px] text-balance text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Сколько стоит поступление
          </h1>
          <p className="mt-4 max-w-[640px] text-[#2A211D]/60">
            Консультация — €10. Дальше платите только за то, что видите: программы, документы и сопровождение — всё по договору.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Btn href="#contact" className="h-14 rounded-xl px-8 text-base">Консультация — €10</Btn>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((s) => (
            <Reveal key={s.top}>
              <div className="flex min-h-[150px] flex-col gap-4 rounded-2xl bg-[#2A211D] px-6 py-7 text-[#FBF9F5] lg:min-h-[220px] lg:px-8 lg:py-10">
                <span className="font-mono text-[11px] uppercase tracking-[1px] text-[#FBF9F5]/60">{s.top}</span>
                <span className="whitespace-nowrap font-mono leading-[1] tabular-nums" style={{ fontSize: "clamp(40px,6vw,56px)", letterSpacing: "-2px" }}>{s.mid}</span>
                <span className="mt-auto text-[15px] text-[#FBF9F5]/70">{s.bot}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${wrap} py-24 lg:py-32`}>
        <Reveal>
          <Tag>Формула цены</Tag>
          <h2 className="mt-3 max-w-[900px] text-balance text-3xl font-medium tracking-[-0.02em] lg:text-5xl">
            Цена = консультация + программа + документы
          </h2>
          <p className="mt-4 max-w-[640px] text-[#2A211D]/60">Каждый пункт виден заранее. Ничего не прячем в мелкий шрифт.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formula.map((s) => (
            <Reveal key={s.no}>
              <div className="card h-full rounded-2xl border border-[#2A211D]/10 bg-white p-6 lg:p-8">
                <span className="font-mono text-sm font-semibold uppercase tracking-[1px] text-[var(--accent)]">{s.no}</span>
                <h3 className="mt-4 text-xl font-medium tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A211D]/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${wrap} pb-24 lg:pb-32`}>
        <Reveal>
          <Tag>Входит</Tag>
          <h2 className="mt-3 max-w-[900px] text-balance text-3xl font-medium tracking-[-0.02em] lg:text-5xl">Одна ставка — всё включено</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((it) => (
            <Reveal key={it.title}>
              <div className="card h-full rounded-2xl border border-[#2A211D]/10 bg-white p-6 lg:p-8">
                <h3 className="text-xl font-medium tracking-tight">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A211D]/60">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${wrap} pb-24 lg:pb-32`}>
        <Reveal>
          <Tag>Честно</Tag>
          <h2 className="mt-3 max-w-[900px] text-balance text-3xl font-medium tracking-[-0.02em] lg:text-5xl">Что будет и чего не будет в счёте</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-[#2A211D]/10 bg-white p-6 lg:p-8">
              <h3 className="text-xl font-medium tracking-tight">Никогда не будет</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-[#2A211D]/70">
                {["Скрытых наценок и комиссий", "Оплаты без договора", "Роста цены в процессе", "«Гарантии 100%» без условий"].map((li) => (
                  <li key={li} className="flex gap-3"><span aria-hidden className="font-bold text-[var(--accent)]">—</span>{li}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="h-full rounded-2xl bg-[#2A211D] p-6 text-[#FBF9F5] lg:p-8">
              <h3 className="text-xl font-medium tracking-tight">Возможно — и всегда заранее в счёте</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-[#FBF9F5]/70">
                {["Консульский сбор посольства", "Медицинская страховка", "Переводы и апостили (по чекам)", "Депозит общежития", "Перелёт и первые расходы"].map((li) => (
                  <li key={li} className="flex gap-3"><span aria-hidden className="font-bold text-[var(--accent-bright,#E5B87A)]">+</span>{li}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={faqs} title="Вопросы о ценах" />
      <CtaBand
        img="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=75"
        title="Начните с консультации за €10"
        sub="15 минут — и вы знаете точную цену своего поступления."
      />
      <Contact />
      <MobileBar />
    </main>
  );
}
