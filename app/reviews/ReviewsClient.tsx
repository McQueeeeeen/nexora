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
    location: "Будапешт · ELTE",
    platform: "tg",
    initials: "АС",
    avatarImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    text: "Подали на Stipendium Hungaricum в ELTE и получили 100% грант со стипендией и общежитием. Ни одного отказа и полная ясность на каждом шаге.",
  },
  {
    id: "2",
    name: "Максим Романов",
    location: "Вена · TU Wien",
    platform: "google",
    initials: "МР",
    avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    text: "Поступил в TU Wien на Computer Science без потери года на бюрократию. Куратор контролировал каждый этап вплоть до получения карточки ВНЖ.",
  },
  {
    id: "3",
    name: "Дарья Ким",
    location: "Вена · WU Vienna",
    platform: "tg",
    initials: "ДК",
    avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    text: "Помогли выбрать программу в WU Vienna, подготовить портфолио и успешно пройти конкурс BBE. Зачисление с первой попытки!",
  },
  {
    id: "4",
    name: "Тимур Ахметов",
    location: "Будапешт · Corvinus",
    platform: "tg",
    initials: "ТА",
    avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    text: "Кураторы Nexora выстроили сильное мотивационное письмо и подготовили к интервью на Stipendium Hungaricum. Получил полный грант!",
  },
  {
    id: "5",
    name: "София Лебедева",
    location: "Грац · Uni Graz",
    platform: "google",
    initials: "СЛ",
    avatarImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    text: "Поступала после 11 класса без немецкого. Оформили VWU, за год подняла язык с нуля до C1 и перешла на бакалавриат. ВНЖ одобрили с первого раза.",
  },
  {
    id: "6",
    name: "Артур Варданян",
    location: "Вена · Uni Vienna",
    platform: "tg",
    initials: "АВ",
    avatarImg: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80",
    text: "Англоязычная магистратура по Data Science. Помогли с нострификацией диплома и перезачётом ECTS. Приглашение пришло за 3 недели!",
  },
  {
    id: "7",
    name: "Камила Нургалиева",
    location: "Будапешт · Semmelweis",
    platform: "google",
    initials: "КН",
    avatarImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    text: "Поступление на медицину в Semmelweis. Кураторы помогли с подготовкой к профильным экзаменам и всеми визовыми справками. Спасибо!",
  },
  {
    id: "8",
    name: "Евгений Павлов",
    location: "Линц · JKU Linz",
    platform: "tg",
    initials: "ЕП",
    avatarImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    text: "Программа Artificial Intelligence на английском в JKU. Благодарность за быстрые ответы в Telegram и подбор отличного студенческого общежития.",
  },
  {
    id: "9",
    name: "Анастасия Белова",
    location: "Вена · BOKU",
    platform: "google",
    initials: "АБ",
    avatarImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
    text: "Биотехнологии в BOKU. Все дедлайны соблюдены, переводы заверены присяжным переводчиком, подача прошла абсолютно гладко.",
  },
  {
    id: "10",
    name: "Ильяс Касымов",
    location: "Будапешт · BME",
    platform: "tg",
    initials: "ИК",
    avatarImg: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80",
    text: "Инженерная специальность на английском в BME с грантом Tempus. Решили сложный вопрос со школьным аттестатом.",
  },
  {
    id: "11",
    name: "Виктория Морозова",
    location: "Инсбрук · Uni Innsbruck",
    platform: "google",
    initials: "ВМ",
    avatarImg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=160&q=80",
    text: "Переживала насчёт блокированного счёта и ВНЖ. Nexora взяла бюрократию на себя — визу одобрили без единого дозапроса.",
  },
  {
    id: "12",
    name: "Дмитрий Гусев",
    location: "Будапешт · BGE",
    platform: "tg",
    initials: "ДГ",
    avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
    text: "Международный маркетинг в Будапеште. Жильё нашли рядом с кампусом, куратор помог с открытием счёта и проездным в день приезда.",
  },
  {
    id: "13",
    name: "Полина Чернова",
    location: "Вена · Uni Vienna",
    platform: "google",
    initials: "ПЧ",
    avatarImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    text: "Факультет психологии в Венском университете. Помогли подготовиться к вступительному тесту и собрать апостилированный пакет документов.",
  },
  {
    id: "14",
    name: "Руслан Идрисов",
    location: "Дебрецен · Uni Debrecen",
    platform: "tg",
    initials: "РИ",
    avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    text: "IT-направление с полным покрытием расходов по Stipendium Hungaricum. Постоянная поддержка куратора 24/7.",
  },
  {
    id: "15",
    name: "Екатерина Фомина",
    location: "Клагенфурт · AAU",
    platform: "google",
    initials: "ЕФ",
    avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    text: "Международный менеджмент на английском. Подобрали уютный кампус и помогли с регистрацией по месту жительства (Meldezettel).",
  },
  {
    id: "16",
    name: "Артем Смирнов",
    location: "Сегед · Uni Szeged",
    platform: "tg",
    initials: "АС",
    avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    text: "Фармацевтический факультет в Сегеде. Полное сопровождение: от перевода аттестата до получения венгерской студенческой карты.",
  },
];

export default function ReviewsClient() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white selection:bg-[var(--accent)] selection:text-black">
      {/* Хлебные крошки */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-8 pt-[85px] lg:pt-[95px] pb-2">
        <div className="max-w-[1400px] mx-auto">
          <ol className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/40">
            <li>
              <a className="hover:text-white transition-colors" href="/">
                ГЛАВНАЯ
              </a>
            </li>
            <li className="text-white/25">/</li>
            <li className="text-white font-medium" aria-current="page">
              ОТЗЫВЫ
            </li>
          </ol>
        </div>
      </nav>

      {/* Компактная Hero-секция с аккуратным рейтингом */}
      <section className="px-4 sm:px-6 lg:px-8 pt-2 pb-6 lg:pb-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 bg-[#121212] border border-white/[0.06] rounded-2xl p-4 sm:p-5 lg:p-6">
            {/* Заголовок слева */}
            <div className="flex flex-col gap-1.5 max-w-[620px]">
              <h1 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
                <span className="text-[var(--accent,#E5A855)]">Что говорят</span> наши студенты
              </h1>
              <p className="text-xs sm:text-sm text-white/60 font-normal leading-relaxed">
                312+ проверенных отзывов со средней оценкой 4.9. Реальный опыт поступления в вузы Австрии и Венгрии.
              </p>
            </div>

            {/* Аккуратный рейтинг справа */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
              {/* Оценка 4.9/5 */}
              <div className="flex flex-col gap-1 pr-4 sm:pr-6 border-r border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight text-white leading-none">
                    4.9
                  </span>
                  <span className="font-sans font-semibold text-base text-white/40">
                    /5
                  </span>
                </div>
                <div className="flex gap-0.5 text-[#F59E0B]">
                  <Stars className="scale-75 origin-left" />
                </div>
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-white/40 whitespace-nowrap">
                  312+ отзывов
                </span>
              </div>

              {/* Платформы: компактные строчки */}
              <div className="flex flex-col gap-2">
                {/* Google */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[11px] text-white/70">
                    Google <strong className="text-white font-semibold">4.98 ★</strong> <span className="text-white/40 text-[10px]">(210+)</span>
                  </span>
                </div>

                {/* Telegram */}
                <a
                  href="https://t.me/nexora_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0088cc]/20 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 fill-[#29B6F6]" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[11px] text-white/70">
                    Telegram <strong className="text-white font-semibold">4.92 ★</strong> <span className="text-white/40 text-[10px]">(102+)</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Плотная, компактная 4-колоночная сетка отзывов */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5 lg:gap-4">
            {reviewsList.map((r) => (
              <div
                key={r.id}
                className="bg-[#141414] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between border border-white/[0.06] hover:border-white/20 hover:bg-[#181818] transition-colors duration-200 group"
              >
                <div>
                  {/* Верхняя строка: компактный аватар + имя/город + микро-иконка */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10">
                        {r.avatarImg ? (
                          <img
                            src={r.avatarImg}
                            alt={r.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-white/10 font-mono text-xs font-bold text-white">
                            {r.initials}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans font-semibold text-[13.5px] text-white truncate leading-tight group-hover:text-[var(--accent,#E5A855)] transition-colors">
                          {r.name}
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-wider text-white/40 truncate leading-tight">
                          {r.location}
                        </span>
                      </div>
                    </div>

                    {/* Микро-иконка платформы */}
                    <div
                      className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0"
                      aria-hidden
                    >
                      {r.platform === "tg" ? (
                        <svg className="w-3 h-3 fill-[#29B6F6]" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* 5 золотых звёзд */}
                  <div className="flex gap-0.5 text-[#F59E0B] mb-2">
                    <Stars className="scale-[0.8] origin-left" />
                  </div>

                  {/* Текст отзыва */}
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-white/70 leading-relaxed font-normal">
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
