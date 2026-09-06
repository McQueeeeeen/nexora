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
    <div className="bg-[#0b0b0b] min-h-screen text-white selection:bg-[var(--accent)] selection:text-black">
      {/* Хлебные крошки */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-8 pt-[100px] lg:pt-[120px] pb-4">
        <div className="max-w-[1400px] mx-auto">
          <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50">
            <li>
              <a className="hover:text-white transition-colors" href="/">
                ГЛАВНАЯ
              </a>
            </li>
            <li className="text-white/30">/</li>
            <li className="text-white font-semibold" aria-current="page">
              ОТЗЫВЫ
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero-секция с совокупным рейтингом как на скриншоте эталона */}
      <section className="px-4 sm:px-6 lg:px-8 pt-4 pb-12 lg:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Заголовок слева */}
            <div className="flex flex-col gap-3 max-w-[650px]">
              <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white">
                <span className="text-[var(--accent,#E5A855)]">Что говорят</span> наши студенты
              </h1>
              <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed">
                312+ проверенных отзывов со средней оценкой 4.9. Реальные истории зачисления и отзывы студентов о поступлении в Австрию и Венгрию.
              </p>
            </div>

            {/* Рейтинг справа: большая оценка + платформы Google & Telegram */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 bg-[#141414] lg:bg-transparent p-5 sm:p-0 rounded-2xl border border-white/5 lg:border-0 shrink-0">
              {/* Большой рейтинг 4.9/5 */}
              <div className="flex flex-col gap-1.5 pr-0 sm:pr-8 border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 w-full sm:w-auto">
                <div className="flex items-baseline gap-1">
                  <span className="font-sans font-extrabold text-5xl lg:text-6xl tracking-tight text-white leading-none">
                    4.9
                  </span>
                  <span className="font-sans font-bold text-2xl lg:text-3xl text-white/40">
                    /5
                  </span>
                </div>
                <div className="flex gap-1 text-[#F59E0B]">
                  <Stars className="scale-90 origin-left" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 whitespace-nowrap">
                  312+ ВСЕГО ОТЗЫВОВ
                </span>
              </div>

              {/* Платформы */}
              <div className="flex flex-col gap-4">
                {/* Google */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/10">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 font-bold">
                      GOOGLE
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-base text-white">4.98</span>
                      <div className="flex gap-0.5 text-[#F59E0B]">
                        <Stars className="scale-75 origin-left" />
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      210+ ОТЗЫВОВ
                    </span>
                  </div>
                </div>

                {/* Telegram */}
                <a
                  href="https://t.me/nexora_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0088cc]/20 flex items-center justify-center shrink-0 border border-[#0088cc]/40 group-hover:bg-[#0088cc]/30 transition-colors">
                    <svg className="w-5 h-5 fill-[#29B6F6]" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 font-bold">
                      TELEGRAM
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-base text-white">4.92</span>
                      <div className="flex gap-0.5 text-[#F59E0B]">
                        <Stars className="scale-75 origin-left" />
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      102+ ОТЗЫВА
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-колоночная сетка отзывов */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {reviewsList.map((r) => (
              <div
                key={r.id}
                className="bg-[#161616] rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/[0.07] hover:border-white/20 hover:bg-[#1a1a1a] transition-all duration-300 group"
              >
                <div>
                  {/* Верхняя строка карточки: Аватар + Имя + Локация + Иконка платформы */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/10">
                        {r.avatarImg ? (
                          <img
                            src={r.avatarImg}
                            alt={r.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-white/10 font-mono text-sm font-bold text-white">
                            {r.initials}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans font-bold text-[15px] text-white truncate group-hover:text-[var(--accent,#E5A855)] transition-colors">
                          {r.name}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 truncate">
                          {r.location}
                        </span>
                      </div>
                    </div>

                    {/* Круглая кнопка-иконка платформы */}
                    <div
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                      aria-hidden
                    >
                      {r.platform === "tg" ? (
                        <svg className="w-4 h-4 fill-[#29B6F6]" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* 5 золотых звёзд */}
                  <div className="flex gap-1 text-[#F59E0B] mb-3">
                    <Stars />
                  </div>

                  {/* Текст отзыва в кавычках */}
                  <p className="font-sans text-[13.5px] sm:text-sm text-white/70 leading-relaxed font-normal">
                    “{r.text}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
