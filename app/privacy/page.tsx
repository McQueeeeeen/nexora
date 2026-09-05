import type { Metadata } from "next";
import Header from "../../components/Header";
import Contact from "../../components/Contact";
import MobileBar from "../../components/MobileBar";
import { Reveal } from "../../components/ui";

export const metadata: Metadata = {
  title: "Nexora Admissions — политика конфиденциальности",
  description: "Какие данные собирает Nexora Admissions через форму заявки и как они используются.",
};

// Базовый текст политики (не юрконсультация — отдать юристу на вычитку
// перед приёмом реального трафика из ЕС/РФ).
const blocks: [string, string][] = [
  ["Какие данные мы собираем", "Через форму заявки: имя, телефон, email (необязательно), интересующую страну и данные об образовании, которые вы указываете сами. Больше ничего не собираем и не покупаем."],
  ["Зачем они нужны", "Единственная цель — связаться с вами по заявке: консультация (€10), дедлайны и план поступления. Ни спама, ни передачи третьим лицам для маркетинга."],
  ["Где хранятся и сколько", "Заявки падают письмом на admissions@nexora.eu. Храним переписку, пока идёт работа с вашей заявкой, затем удаляем по первому требованию."],
  ["Куки и аналитика", "Сайт не ставит рекламных куки. Технически необходимые данные (сессионный флаг прелоадера) живут только в вашем браузере."],
  ["Ваши права", "Напишите на admissions@nexora.eu — покажем, что храним о вас, исправим или удалим всё полностью."],
  ["Контакты оператора", "Nexora Admissions, admissions@nexora.eu, Telegram @nexora_support, Вена и Будапешт."],
];

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#F7F5EF] text-[#101418]">
      <Header />
      <section className="wrap pb-24 pt-40 lg:pt-48">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[1px] text-[#101418]/50">Главная / Privacy</p>
          <h1 className="mt-4 max-w-[800px] text-balance text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Политика конфиденциальности
          </h1>
          <p className="mt-4 max-w-[640px] text-[#101418]/60">Обновлено: сентябрь 2026. Коротко и по-человечески — без мелкого шрифта.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {blocks.map(([t, d], i) => (
            <Reveal key={t}>
              <div className="card h-full rounded-2xl border border-[#101418]/10 bg-white p-6 lg:p-8">
                <span className="font-mono text-sm font-bold text-[var(--brand)]">0{i + 1}</span>
                <h2 className="mt-3 text-xl font-medium tracking-tight">{t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#101418]/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Contact />
      <MobileBar />
    </main>
  );
}
