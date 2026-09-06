"use client";

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
    location: "БУДАПЕШТ · ELTE",
    platform: "tg",
    initials: "АС",
    avatarImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    text: "Подали на Stipendium Hungaricum в ELTE и получили 100% грант со стипендией и бесплатным общежитием. Ни одного отказа и полная ясность на каждом шаге. Спасибо кураторам за сильное мотивационное письмо!",
  },
  {
    id: "2",
    name: "Максим Романов",
    location: "ВЕНА · TU WIEN",
    platform: "google",
    initials: "МР",
    avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "Поступил в TU Wien на Computer Science без потери года на бюрократию с апостилями. Куратор контролировал каждый этап вплоть до получения карточки ВНЖ в магистрате Вены. Очень профессионально!",
  },
  {
    id: "3",
    name: "Дарья Ким",
    location: "ВЕНА · WU VIENNA",
    platform: "tg",
    initials: "ДК",
    avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    text: "Помогли выбрать англоязычную программу в WU Vienna, подготовить академическое портфолио и успешно пройти конкурс BBE. Зачисление пришло с первой попытки, переезд прошёл гладко.",
  },
  {
    id: "4",
    name: "Тимур Ахметов",
    location: "БУДАПЕШТ · CORVINUS",
    platform: "google",
    initials: "ТА",
    avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    text: "Stipendium Hungaricum казался нереальным из-за высокого конкурса. Но команда Nexora выстроила сильную стратегию подачи и подготовила к интервью в Corvinus. Получил полное финансирование!",
  },
  {
    id: "5",
    name: "София Лебедева",
    location: "ГРАЦ · UNI GRAZ",
    platform: "tg",
    initials: "СЛ",
    avatarImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    text: "Поступала после 11 класса без знания немецкого. Оформили подготовительное отделение VWU. За год выучила язык с нуля до C1 и перешла на бакалавриат. Пакет документов для посольства собрали безупречно.",
  },
  {
    id: "6",
    name: "Артур Варданян",
    location: "ВЕНА · UNI VIENNA",
    platform: "google",
    initials: "АВ",
    avatarImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    text: "Искал сильную англоязычную магистратуру по Data Science в Европе. Помогли с нострификацией диплома и признанием кредитов ECTS. Зачисление в University of Vienna пришло за 3 недели!",
  },
  {
    id: "7",
    name: "Камила Нургалиева",
    location: "БУДАПЕШТ · SEMMELWEIS",
    platform: "google",
    initials: "КН",
    avatarImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    text: "Поступление на медицину в Semmelweis требует сдачи сложных профильных тестов. Кураторы Nexora помогли с подготовкой к экзаменам и всеми визовыми справками. Рекомендую от всей души!",
  },
  {
    id: "8",
    name: "Евгений Павлов",
    location: "ЛИНЦ · JKU LINZ",
    platform: "tg",
    initials: "ЕП",
    avatarImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    text: "Программа Artificial Intelligence полностью на английском в JKU. Огромная благодарность за оперативные консультации в Telegram и помощь с бронью уютного студенческого общежития рядом с кампусом.",
  },
  {
    id: "9",
    name: "Анастасия Белова",
    location: "ВЕНА · BOKU VIENNA",
    platform: "google",
    initials: "АБ",
    avatarImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    text: "Поступила на экологические биотехнологии в BOKU Vienna. Сопровождение было максимально прозрачным: все дедлайны соблюдены, переводы заверены присяжным переводчиком, подача прошла без стресса.",
  },
  {
    id: "10",
    name: "Ильяс Касымов",
    location: "БУДАПЕШТ · BME",
    platform: "tg",
    initials: "ИК",
    avatarImg: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    text: "Инженерная программа на английском в BME с грантом Stipendium Hungaricum. Помогли решить сложный вопрос со школьным аттестатом и правильно подать заявку через фонд Tempus.",
  },
  {
    id: "11",
    name: "Виктория Морозова",
    location: "ИНСБРУК · UNI INNSBRUCK",
    platform: "google",
    initials: "ВМ",
    avatarImg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
    text: "Очень переживала насчёт студенческого ВНЖ и блокированного счёта. Nexora взяла всю бюрократию на себя — визу одобрили с первого раза без единого дозапроса со стороны магистрата.",
  },
  {
    id: "12",
    name: "Дмитрий Гусев",
    location: "БУДАПЕШТ · BGE",
    platform: "tg",
    initials: "ДГ",
    avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    text: "Учусь на международном маркетинге в Будапеште. Жильё нашли рядом с кампусом, куратор помог с открытием банковской карты и оформлением студенческого проездного в первый же день приезда.",
  },
];

function GoldStars({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className="flex items-center gap-1 text-[#FACC15]" role="img" aria-label="5 звёзд">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${className} fill-current`}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function MiniStars() {
  return (
    <div className="flex items-center gap-1 text-[#FACC15]">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsClient() {
  return (
    <div className="bg-[#120D0B] min-h-screen text-[#FBF9F5] selection:bg-[var(--accent)] selection:text-[#FBF9F5]">
      {/* Хлебные крошки */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-8 pt-[100px] lg:pt-[120px] pb-4">
        <div className="max-w-[1400px] mx-auto">
          <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FBF9F5]/50">
            <li>
              <a className="hover:text-[var(--accent-bright)] transition-colors" href="/">
                ГЛАВНАЯ
              </a>
            </li>
            <li className="text-[#FBF9F5]/30">/</li>
            <li className="text-[#FBF9F5] font-bold" aria-current="page">
              ОТЗЫВЫ
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero-секция с совокупным рейтингом — точь-в-точь по структуре эталона */}
      <section className="px-4 sm:px-6 lg:px-8 pt-2 pb-12 lg:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Заголовок слева */}
            <div className="flex flex-col gap-4 max-w-[620px]">
              <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-[64px] tracking-tight leading-[1.05] text-[#FBF9F5]">
                <span className="text-[var(--accent-bright)]">Что говорят</span> наши студенты
              </h1>
              <p className="text-base sm:text-lg text-[#FBF9F5]/65 font-normal leading-relaxed">
                312+ проверенных отзывов со средней оценкой 4.9. Реальные истории зачисления и отзывы студентов о поступлении в Австрию и Венгрию.
              </p>
            </div>

            {/* Рейтинг справа: 4.9/5 | Разделитель | Платформы Google & Telegram */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0">
              {/* Левый блок: 4.9/5 + звёзды + счётчик */}
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-baseline">
                  <span className="font-sans font-extrabold text-5xl sm:text-6xl lg:text-[72px] tracking-tight text-white leading-none">
                    4.9
                  </span>
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-white/40 ml-1 leading-none">
                    /5
                  </span>
                </div>
                <GoldStars className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-white/40 whitespace-nowrap mt-1">
                  312+ ВСЕГО ОТЗЫВОВ
                </span>
              </div>

              {/* Вертикальный разделитель (как на скриншоте эталона) */}
              <div className="w-px h-24 bg-white/15 mx-1 sm:mx-2 hidden sm:block" aria-hidden />

              {/* Правый блок: Платформы с круглыми иконками */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Google */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0 shadow-lg">
                    <span className="font-sans font-bold text-2xl text-white leading-none">G</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-[10px] tracking-widest text-white/50 uppercase">
                      GOOGLE
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-sans font-bold text-lg sm:text-xl text-white leading-none">
                        4.98
                      </span>
                      <MiniStars />
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase mt-0.5">
                      210+ ОТЗЫВОВ
                    </span>
                  </div>
                </div>

                {/* Telegram */}
                <a
                  href="https://t.me/nexora_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-[10px] tracking-widest text-white/50 uppercase">
                      TELEGRAM
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-sans font-bold text-lg sm:text-xl text-white leading-none">
                        4.92
                      </span>
                      <MiniStars />
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase mt-0.5">
                      102+ ОТЗЫВА
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-колоночная сетка отзывов — в точности как на эталоне в фирменной палитре эспрессо */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {reviewsList.map((r) => (
              <div
                key={r.id}
                className="bg-[#1D1613] rounded-[20px] p-6 lg:p-7 flex flex-col justify-between border border-[#FBF9F5]/[0.06] hover:border-[var(--accent)]/40 hover:bg-[#251D19] transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Верхняя строка: Круглый аватар + Имя + Локация + Круглая иконка справа */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#FBF9F5]/15">
                        {r.avatarImg ? (
                          <img
                            src={r.avatarImg}
                            alt={r.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#2A211D] font-mono text-sm font-bold text-[#FBF9F5]">
                            {r.initials}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans font-bold text-[16px] text-[#FBF9F5] truncate group-hover:text-[var(--accent-bright)] transition-colors">
                          {r.name}
                        </span>
                        <span className="font-mono font-bold text-[11px] uppercase tracking-wider text-[#FBF9F5]/40 truncate">
                          {r.location}
                        </span>
                      </div>
                    </div>

                    {/* Круглая кнопка-иконка платформы справа */}
                    <div
                      className="w-10 h-10 rounded-full bg-[#FBF9F5]/5 border border-[#FBF9F5]/10 flex items-center justify-center shrink-0 text-[#FBF9F5]/60 group-hover:text-[#FBF9F5] group-hover:border-[#FBF9F5]/20 transition-colors"
                      aria-hidden
                    >
                      {r.platform === "google" ? (
                        <span className="font-sans font-bold text-sm text-[#FBF9F5]/80">G</span>
                      ) : (
                        <svg className="w-4 h-4 fill-[var(--accent)]" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* 5 золотых звёзд */}
                  <div className="mb-4">
                    <GoldStars />
                  </div>

                  {/* Текст отзыва в кавычках */}
                  <p className="font-sans text-[14.5px] leading-[1.6] text-[#FBF9F5]/75 font-normal">
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
