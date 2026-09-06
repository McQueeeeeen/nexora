"use client";
import { Stars } from "../../components/ui";

interface ReviewItem {
  id: string;
  name: string;
  location: string;
  platform: "tg" | "google";
  text: string;
  avatarImg?: string;
  initials: string;
}

const reviewsList: ReviewItem[] = [
  {
    id: "1",
    name: "Алина Садыкова",
    location: "Будапешт · ELTE University",
    platform: "tg",
    initials: "АС",
    avatarImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    text: "Благодаря аудиту Nexora подали документы на Stipendium Hungaricum в ELTE и получили 100% грант со стипендией и бесплатным общежитием. Ни одного отказа и полная ясность на каждом шаге.",
  },
  {
    id: "2",
    name: "Максим Романов",
    location: "Вена · TU Wien",
    platform: "google",
    initials: "МР",
    avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    text: "Поступил в TU Wien на Computer Science без потери года на бюрократию с апостилями. Куратор контролировал каждый этап вплоть до получения карточки ВНЖ в Вене.",
  },
  {
    id: "3",
    name: "Дарья Ким",
    location: "Вена · WU Vienna",
    platform: "tg",
    initials: "ДК",
    avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    text: "Помогли выбрать программу в WU Vienna, подготовить портфолио и успешно пройти конкурс BBE. Зачисление с первой попытки и быстрый переезд!",
  },
  {
    id: "4",
    name: "Тимур Ахметов",
    location: "Будапешт · Corvinus University",
    platform: "tg",
    initials: "ТА",
    avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    text: "Stipendium Hungaricum казался нереальным из-за высокого конкурса. Но кураторы Nexora выстроили сильное мотивационное письмо и подготовили к интервью. Получил полный грант!",
  },
  {
    id: "5",
    name: "София Лебедева",
    location: "Грац · University of Graz",
    platform: "google",
    initials: "СЛ",
    avatarImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    text: "Поступала после 11 классов без знания немецкого. Оформили подготовительное отделение VWU. За год выучила язык с нуля до C1 и перешла на бакалавриат. Пакет документов для посольства собрали безупречно.",
  },
  {
    id: "6",
    name: "Артур Варданян",
    location: "Вена · University of Vienna",
    platform: "tg",
    initials: "АВ",
    avatarImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80",
    text: "Искал сильную англоязычную магистратуру по Data Science в Европе. Помогли с нострификацией диплома и признанием кредитов ECTS. Зачисление пришло за 3 недели!",
  },
  {
    id: "7",
    name: "Камила Нургалиева",
    location: "Будапешт · Semmelweis University",
    platform: "google",
    initials: "КН",
    avatarImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    text: "Поступление на медицину в Semmelweis требует сдачи сложных профильных тестов. Кураторы Nexora помогли с подготовкой к экзаменам и всеми визовыми справками. Рекомендую от всей души!",
  },
  {
    id: "8",
    name: "Евгений Павлов",
    location: "Линц · JKU Linz",
    platform: "tg",
    initials: "ЕП",
    avatarImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    text: "Программа Artificial Intelligence полностью на английском. Огромная благодарность за оперативные консультации в Telegram и помощь с бронью студенческого общежития.",
  },
  {
    id: "9",
    name: "Анастасия Белова",
    location: "Вена · BOKU Vienna",
    platform: "google",
    initials: "АБ",
    avatarImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
    text: "Поступила на экологические биотехнологии в BOKU. Сопровождение было максимально прозрачным: все дедлайны соблюдены, переводы заверены присяжным переводчиком.",
  },
  {
    id: "10",
    name: "Ильяс Касымов",
    location: "Будапешт · BME Technical",
    platform: "tg",
    initials: "ИК",
    avatarImg: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80",
    text: "Инженерная программа на английском в BME с грантом Stipendium Hungaricum. Помогли решить сложный вопрос со школьным аттестатом и правильно подать заявку через фонд Tempus.",
  },
  {
    id: "11",
    name: "Виктория Морозова",
    location: "Инсбрук · University of Innsbruck",
    platform: "google",
    initials: "ВМ",
    avatarImg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=160&q=80",
    text: "Очень переживала насчёт студенческого ВНЖ и блокированного счёта. Nexora взяла всю бюрократию на себя — визу одобрили с первого раза без единого дозапроса.",
  },
  {
    id: "12",
    name: "Дмитрий Гусев",
    location: "Будапешт · BGE University",
    platform: "tg",
    initials: "ДГ",
    avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
    text: "Учусь на международном маркетинге в Будапеште. Жильё нашли рядом с кампусом, куратор помог с открытием банковской карты и проездного в первый же день приезда.",
  },
];

export default function ReviewsClient() {
  return (
    <>
      {/* Хлебные крошки (дословно структура эталона) */}
      <nav aria-label="Breadcrumb" className="bg-[#120D0B] px-4 pt-[100px] lg:pt-[120px] pb-3 lg:pb-4">
        <ol className="max-w-[1408px] mx-auto flex flex-wrap items-center gap-2 font-mono font-medium text-xs lg:text-sm tracking-[-0.48px] uppercase text-white/50">
          <li className="flex items-center gap-2">
            <a className="hover:text-[var(--accent)] transition-colors duration-200" href="/">
              Главная
            </a>
            <span className="text-white/25">/</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-white" aria-current="page">
              Отзывы
            </span>
          </li>
        </ol>
      </nav>

      {/* Hero-секция с совокупным рейтингом (дословно разметка эталона) */}
      <section className="bg-[#120D0B]">
        <div className="max-w-[1408px] mx-auto px-4 w-full pt-6 lg:pt-10 pb-[40px] lg:pb-[60px]">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-10">
            <div className="flex flex-col gap-4 lg:gap-5">
              <h1 className="font-sans font-bold text-[36px] lg:text-[72px] leading-none tracking-[-1.08px] lg:tracking-[-2.16px]">
                <span className="text-[var(--accent)]">Что говорят</span> <span className="text-white">наши студенты</span>
              </h1>
              <p className="font-sans font-normal text-base lg:text-xl leading-[1.4] tracking-[-0.48px] lg:tracking-[-0.6px] text-white/60 max-w-[540px]">
                312+ проверенных отзывов с рейтингом 4.9. Реальные истории зачисления в университеты Австрии и Венгрии.
              </p>
            </div>

            {/* Рейтинговый виджет */}
            <div className="rounded-2xl bg-[#1D1613] lg:bg-transparent ring-1 ring-white/5 lg:ring-0 p-5 lg:p-0 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8 shrink-0">
              <div className="flex flex-col gap-2 pb-5 lg:pb-0 lg:pr-8 border-b border-white/10 lg:border-b-0 lg:border-r border-white/10">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-sans font-bold text-[48px] lg:text-[72px] leading-[1] tracking-[-1.92px] lg:tracking-[-2.88px] text-white">
                    4.9
                  </span>
                  <span className="font-sans font-bold text-2xl lg:text-3xl leading-[1] tracking-[-0.72px] text-white/50">
                    /5
                  </span>
                </div>
                <div className="flex gap-1 text-[var(--accent)]">
                  <Stars />
                </div>
                <span className="font-mono font-medium text-[11px] uppercase tracking-[-0.44px] text-white/40 whitespace-nowrap">
                  312+ всего отзывов
                </span>
              </div>

              <div className="flex flex-col gap-4 lg:gap-6">
                {/* Telegram */}
                <a
                  href="https://t.me/nexora_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#2A211D", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <svg className="w-5 h-5 fill-[var(--accent)]" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono font-bold text-[11px] lg:text-xs uppercase tracking-[-0.48px] text-white/50">
                      Telegram
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-lg lg:text-xl leading-[1] tracking-[-0.54px] text-white">
                        4.98
                      </span>
                      <div className="flex gap-1 text-[var(--accent)]">
                        <Stars className="scale-75 origin-left" />
                      </div>
                    </div>
                    <span className="font-mono font-medium text-[10px] lg:text-[11px] uppercase tracking-[-0.44px] text-white/40 whitespace-nowrap">
                      210+ отзывов
                    </span>
                  </div>
                </a>

                {/* Google / Maps */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#2A211D", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span className="font-bold text-sm text-blue-400">G</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono font-bold text-[11px] lg:text-xs uppercase tracking-[-0.48px] text-white/50">
                      Google
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-lg lg:text-xl leading-[1] tracking-[-0.54px] text-white">
                        4.90
                      </span>
                      <div className="flex gap-1 text-[var(--accent)]">
                        <Stars className="scale-75 origin-left" />
                      </div>
                    </div>
                    <span className="font-mono font-medium text-[10px] lg:text-[11px] uppercase tracking-[-0.44px] text-white/40 whitespace-nowrap">
                      100+ отзывов
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-колоночная сетка отзывов (дословно верстка эталона) */}
      <section className="bg-[#120D0B] px-4 pb-[60px] lg:pb-[100px]">
        <div className="max-w-[1408px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {reviewsList.map((r) => (
              <div
                key={r.id}
                className="bg-[#1D1613] rounded-xl lg:rounded-2xl p-5 lg:p-6 flex flex-col gap-5 group hover:bg-[#271E1A] transition-colors duration-300 ring-1 ring-white/5"
              >
                <div className="flex gap-3 items-center">
                  <div className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-full overflow-hidden shrink-0">
                    {r.avatarImg ? (
                      <img
                        src={r.avatarImg}
                        alt={r.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#2A211D] font-mono text-sm font-bold text-white">
                        {r.initials}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <span className="font-sans font-semibold text-lg lg:text-xl leading-[1.3] tracking-[-0.54px] lg:tracking-[-0.6px] text-white truncate">
                      {r.name}
                    </span>
                    <span className="font-mono font-bold text-xs lg:text-sm leading-[1.2] tracking-[-0.56px] uppercase text-white/40 truncate">
                      {r.location}
                    </span>
                  </div>
                  <div
                    className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#2A211D] flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                    aria-hidden
                  >
                    {r.platform === "tg" ? (
                      <svg className="w-4 h-4 fill-[var(--accent)]" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                      </svg>
                    ) : (
                      <span className="font-bold text-xs text-blue-400">G</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 text-[var(--accent)]">
                  <Stars />
                </div>

                <p className="font-sans font-normal text-sm lg:text-base leading-[1.5] tracking-[-0.42px] lg:tracking-[-0.48px] text-white/70">
                  “{r.text}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
