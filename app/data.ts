export type Country = "AT" | "HU";

export interface Uni {
  name: string; city: string; rank: string; fee: string;
  grant: string; apply: string; specialty: string; country: Country; chance: string;
}

// Официальные сайты вузов (Metropolitan — без ссылки: официальный домен не подтверждён).
export const uniSites: Record<string, string> = {
  "University of Vienna": "https://univie.ac.at",
  "WU Vienna": "https://wu.ac.at",
  "TU Wien": "https://tuwien.at",
  "BOKU Vienna": "https://boku.ac.at",
  "Medical University of Vienna": "https://meduniwien.ac.at",
  "University of Graz": "https://uni-graz.at",
  "TU Graz": "https://tugraz.at",
  "University of Innsbruck": "https://uibk.ac.at",
  "JKU Linz": "https://jku.at",
  "University of Klagenfurt": "https://aau.at",
  "University of Salzburg": "https://plus.ac.at",
  "FH Technikum Wien": "https://technikum-wien.at",
  "MODUL University Vienna": "https://modul.ac.at",
  "Webster Vienna": "https://webster.ac.at",
  "ELTE University": "https://elte.hu",
  "Corvinus University": "https://uni-corvinus.hu",
  "BME Technical University": "https://bme.hu",
  "Semmelweis University": "https://semmelweis.hu",
  "Óbuda University": "https://uni-obuda.hu",
  "BGE Business University": "https://uni-bge.hu",
  "University of Debrecen": "https://unideb.hu",
  "University of Szeged": "https://u-szeged.hu",
  "University of Pécs": "https://pte.hu",
  "University of Miskolc": "https://uni-miskolc.hu",
  "University of Győr (SZE)": "https://uni.sze.hu",
  "MATE University": "https://mate.hu",
  "IBS Business School": "https://www.ibsbudapest.com",
};

export const nav = [
  ["Направления", "#services"], ["База вузов", "#database"], ["Этапы", "#steps"],
  ["Отзывы", "#reviews"], ["FAQ", "#faq"], ["Контакты", "#contact"],
] as const;

export const agency = {
  tag: "Агентство",
  heading: "Бутик-агентство полного цикла",
  text: "Пять лет привозим студентов в Австрию и Венгрию: от первой консультации и академического аудита до зачисления и карточки ВНЖ. Офисы в Вене и Будапеште — встречаем и сопровождаем на месте.",
  points: ["Офисы в Вене и Будапеште", "312 зачислений за 5 лет", "Один куратор от аудита до ВНЖ"],
};

export const heroPhrases = [
  { t: "Поступление в вузы Европы — от первой консультации до визы.", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=75" },
  { t: "Гранты, дедлайны и зачисление без риска отказа.", img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=75" },
  { t: "Австрия и Венгрия — один куратор на весь путь.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=75" },
];

export const services = [
  { no: "SERVICE 01", title: "Бакалавриат в Австрии", desc: "от €1 450/год · VWU с нуля", text: "Государственные университеты Вены, Граца и Линца от €1 450/год. Поступление после 11 классов, подготовительное отделение (VWU) и программы на немецком и английском.", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=75" },
  { no: "SERVICE 02", title: "Гранты в Венгрии", desc: "100% грант · стипендия + общежитие", text: "Stipendium Hungaricum: 100% бесплатное обучение, ежемесячная стипендия, бесплатное общежитие и медицинская страховка. Полная подготовка портфолио.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=75" },
  { no: "SERVICE 03", title: "Магистратура и MBA", desc: "120+ программ на английском", text: "Топовые университеты (WU Vienna, TU Wien, Corvinus, ELTE). Более 120 программ полностью на английском языке с прямым зачислением без потери семестра.", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=75" },
  { no: "SERVICE 04", title: "Сопровождение под ключ", desc: "документы, заявки и ВНЖ", text: "Апостили, судебные переводы, нострификация аттестатов и дипломов, подача заявок в вузы и гарантированное получение студенческого ВНЖ.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=75" },
];

// Ссылки подменю «База вузов» (аналог Cities we serve у эталона) — ведут на страницы стран.
export const uniLinks = [
  { title: "Австрия", desc: "14 вузов · от €1 450/год", href: "/austria" },
  { title: "Венгрия", desc: "14 вузов · грант 100%", href: "/hungary" },
];

export interface CountryInfo {
  code: Country; name: string; heroImg: string; tagline: string; about: string;
  servicesTitle: string; servicesIntro: string;
  servicesLocal: { title: string; desc: string; img: string }[];
  whyTag: string; whyHeading: string; whyText: string; whyImg: string;
  whyPoints: { title: string; desc: string }[];
  includedTitle: string; includedIntro: string;
  included: { title: string; desc: string }[];
  reviewsTitle: string;
  faqTitle: string; faqsLocal: { q: string; a: string }[];
  ctaTitle: string; ctaSub: string; ctaImg: string;
}

// Контент отдельных страниц стран — как city pages у эталона.
export const countries: Record<string, CountryInfo> = {
  austria: {
    code: "AT", name: "Австрия",
    heroImg: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1920&q=75",
    tagline: "Учёба в сердце Европы — от €1 450 в год.",
    about: "Государственные университеты Вены, Граца, Инсбрука и Линца: сильный бакалавриат после 11 классов, подготовительное отделение VWU с нуля и диплом, который котируется по всему миру.",
    servicesTitle: "Программы поступления в Австрию",
    servicesIntro: "От бакалавриата после 11 классов до магистратуры на английском — ведём каждый этап без посредников.",
    servicesLocal: [
      { title: "Бакалавриат", desc: "Вена, Грац, Линц и Инсбрук после 11 классов. VWU с нуля, программы на немецком и английском.", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=75" },
      { title: "Подготовительное отделение", desc: "Vorstudienlehrgang при университете: немецкий с нуля и досдача академической разницы.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=75" },
      { title: "Магистратура и MBA", desc: "WU Vienna, TU Wien и другие: 120+ программ на английском с прямым зачислением.", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=75" },
      { title: "ВНЖ и переезд", desc: "Нострификация, подача в вуз, общежитие и студенческий ВНЖ до карточки на руках.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=75" },
    ],
    whyTag: "Почему Австрия",
    whyHeading: "Почему выбирают Австрию",
    whyText: "Австрийские вузы сочетают низкую цену и высокий статус диплома: €1 450 в год за образование уровня TU Wien и University of Vienna. Мы знаем дедлайны каждого факультета и готовим документы без потери семестра.",
    whyImg: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=75",
    whyPoints: [
      { title: "Цена госуниверситетов", desc: "~€726 за семестр для граждан не-ЕС" },
      { title: "Немецкий с нуля", desc: "VWU при вузе, без сертификата на старте" },
      { title: "Программы на английском", desc: "BBE, магистратуры и MBA полностью на английском" },
      { title: "Куратор в Вене", desc: "Встречаем, помогаем с общежитием и ВНЖ" },
    ],
    includedTitle: "Что входит в сопровождение",
    includedIntro: "Каждое поступление в Австрию — от бакалавриата до магистратуры — включает один и тот же чек-лист.",
    included: [
      { title: "Академический аудит", desc: "Разбираем оценки и язык, считаем шансы и бюджет." },
      { title: "Шортлист вузов", desc: "3–6 программ от топовых до гарантированных." },
      { title: "Переводы и апостиль", desc: "Судебные переводы и легализация документов." },
      { title: "Нострификация", desc: "Признание аттестата и диплома в Австрии." },
      { title: "Мотивационные письма", desc: "Сильные эссе под требования факультета." },
      { title: "ВНЖ под ключ", desc: "Общежитие, банк, страховка и подача в посольство." },
    ],
    reviewsTitle: "Что говорят студенты в Австрии",
    faqTitle: "Частые вопросы — Австрия",
    faqsLocal: [
      { q: "Сколько стоит учёба в Австрии?", a: "В государственных вузах — ~€1 450 в год (~€726 за семестр) плюс студенческий взнос ÖH около €26. Частные вузы — от €12 000 в год." },
      { q: "Можно ли поступить без немецкого?", a: "Да. Подготовительное отделение VWU учит немецкому с нуля прямо при университете, а часть программ идёт на английском." },
      { q: "Что такое нострификация?", a: "Признание вашего аттестата или диплома австрийской системой образования. Без неё вуз не зачислит — мы оформляем её под ключ." },
      { q: "Когда подавать документы?", a: "Летний приём: июль–октябрь, зимний: январь–март. Начинать подготовку лучше за 6–9 месяцев." },
      { q: "Дают ли общежитие?", a: "Да, бронируем место в студенческом общежитии Вены, Граца или Линца до подачи на ВНЖ." },
      { q: "Помогаете с ВНЖ после зачисления?", a: "Полностью: Zulassung, справка из банка, страховка, анкета и подготовка к собеседованию в посольстве." },
    ],
    ctaTitle: "Точную стратегию поступления в Австрию — за 15 минут",
    ctaSub: "Без воды: шансы, дедлайны и бюджет под ваш профиль.",
    ctaImg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=75",
  },
  hungary: {
    code: "HU", name: "Венгрия",
    heroImg: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=75",
    tagline: "Грант Stipendium Hungaricum покрывает всё.",
    about: "ELTE, Corvinus, BME и Сегед: 100% бесплатное обучение, ежемесячная стипендия, общежитие и медстраховка. Готовим портфолио, которое выигрывает конкурс.",
    servicesTitle: "Программы поступления в Венгрию",
    servicesIntro: "Грант Stipendium Hungaricum и коммерческие программы: ELTE, Corvinus, BME и медицинские вузы.",
    servicesLocal: [
      { title: "Stipendium Hungaricum", desc: "100% грант: учёба, стипендия, общежитие и страховка. Портфолио под конкурс.", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=75" },
      { title: "Бакалавриат на английском", desc: "Computer Science, бизнес и психология в ELTE, Corvinus и BME без венгерского.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=75" },
      { title: "Медицина", desc: "Semmelweis, Дебрецен и Сегед: общая медицина, стоматология и фармация.", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=75" },
      { title: "Магистратура", desc: "Грантовые и коммерческие магистратуры с прямым зачислением без потери года.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=75" },
    ],
    whyTag: "Почему Венгрия",
    whyHeading: "Почему выбирают Венгрию",
    whyText: "Венгрия — самый щедрый грант Европы: Stipendium Hungaricum закрывает учёбу, жильё и страховку целиком. Конкурс высокий, но с сильным портфолио шансы отличные — мы знаем критерии отбора изнутри.",
    whyImg: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=75",
    whyPoints: [
      { title: "Грант 100%", desc: "Учёба, стипендия, общежитие и страховка" },
      { title: "Без венгерского", desc: "Сотни программ полностью на английском" },
      { title: "Медицина топ-уровня", desc: "Semmelweis в топ-300 мира по медицине" },
      { title: "Куратор в Будапеште", desc: "Встречаем и помогаем с заселением" },
    ],
    includedTitle: "Что входит в сопровождение",
    includedIntro: "Каждое поступление в Венгрию — на грант или коммерцию — включает один и тот же чек-лист.",
    included: [
      { title: "Оценка шансов на грант", desc: "Честный разбор профиля под критерии Stipendium Hungaricum." },
      { title: "Портфолио под конкурс", desc: "Мотивационные письма и рекомендации, которые выигрывают." },
      { title: "Переводы и легализация", desc: "Судебные переводы, апостили и подача в срок." },
      { title: "Заявки в вузы", desc: "ELTE, Corvinus, BME и запасные варианты параллельно." },
      { title: "Подготовка к интервью", desc: "Прогоняем вопросы отбора и вступительных." },
      { title: "ВНЖ и заселение", desc: "Общежитие, страховка и студенческий ВНЖ." },
    ],
    reviewsTitle: "Что говорят студенты в Венгрии",
    faqTitle: "Частые вопросы — Венгрия",
    faqsLocal: [
      { q: "Что покрывает Stipendium Hungaricum?", a: "100% стоимости обучения, место в общежитии или компенсацию аренды, ежемесячную стипендию и медстраховку на весь срок учёбы." },
      { q: "Какой дедлайн у гранта?", a: "Приём закрывается 15 января. Начинать готовить портфолио нужно минимум за 4–6 месяцев — осенью." },
      { q: "Нужен ли венгерский язык?", a: "Нет. Подаёмся на программы полностью на английском — их сотни, включая Computer Science и медицину." },
      { q: "Что если не получу грант?", a: "Параллельно подаём на коммерческие места от €2 500 в год и готовим повторную заявку на следующий цикл." },
      { q: "Сколько стоит жизнь в Будапеште?", a: "С общежитием по гранту — от €300–400 в месяц на жизнь. Будапешт дешевле Вены почти вдвое." },
      { q: "Помогаете после зачисления?", a: "Да: заселение в общежитие, ВНЖ, банковская карта и поддержка первый семестр." },
    ],
    ctaTitle: "Шансы на грант Stipendium Hungaricum — за 15 минут",
    ctaSub: "Разберём профиль и скажем честно: грант или коммерция.",
    ctaImg: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=75",
  },
};

export const steps = [
  { no: "Step 01", title: "Академический аудит", text: "Анализируем оценки, уровень языка и академическую разницу. Рассчитываем точные шансы на грант и бюджет.", img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=75" },
  { no: "Step 02", title: "Стратегия и шортлист", text: "Подбираем 3–6 подходящих программ (от топовых до гарантированных) и формируем персональный календарь дедлайнов.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75" },
  { no: "Step 03", title: "Документы и подача", text: "Берём на себя присяжные переводы, апостили, нострификацию и написание сильных мотивационных писем.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=75" },
  { no: "Step 04", title: "Зачисление и ВНЖ", text: "Подаём документы в вузы, получаем подтверждение зачисления (Zulassung) и оформляем студенческий ВНЖ.", img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=75" },
];

export const stats = [
  { top: "QS #137", mid: "ТОП-ВУЗЫ", bot: "University of Vienna в мировом рейтинге" },
  { top: "ГРАНТЫ", mid: "100%", bot: "Покрытие учебы Stipendium Hungaricum" },
  { top: "КЕЙСЫ", mid: "312+", bot: "Успешных зачислений за 5 лет" },
  { top: "РЕЗУЛЬТАТ", mid: "98.4%", bot: "Одобрений виз и студенческих ВНЖ" },
];

export const quotes = [
  { text: "“Благодаря аудиту Nexora мы подали документы на Stipendium Hungaricum в ELTE и получили 100% грант со стипендией. Ни одного отказа и полная ясность на каждом шаге.”", author: "Алина Садыкова", role: "Студентка ELTE (Будапешт)" },
  { text: "“Поступил в TU Wien на Computer Science без потери года на бюрократию с апостилями. Куратор контролировал каждый этап вплоть до получения карточки ВНЖ в Вене.”", author: "Максим Романов", role: "Студент TU Wien (Вена)" },
  { text: "“Помогли выбрать программу в WU Vienna, подготовить портфолио и успешно пройти конкурс BBE. Зачисление с первой попытки!”", author: "Дарья Ким", role: "Студентка WU Vienna (Вена)" },
];

export const faqs = [
  { q: "Сколько стоит высшее образование в Австрии и Венгрии?", a: "В государственных вузах Австрии обучение для граждан не-ЕС стоит ~€1 450 в год (~€726 за семестр). В Венгрии по стипендии Stipendium Hungaricum обучение 100% бесплатное, а на коммерческой основе — от €2 500 до €5 000 в год." },
  { q: "Можно ли поступить без знания немецкого языка?", a: "Да! В Австрии действует подготовительное отделение (Vorstudienlehrgang / VWU), где можно учить немецкий язык с нуля при университете. Также доступно множество программ бакалавриата и магистратуры на английском языке." },
  { q: "Что покрывает грант Stipendium Hungaricum в Венгрии?", a: "Грант покрывает 100% стоимости обучения, предоставляет бесплатное проживание в студенческом общежитии (или компенсацию аренды), ежемесячную стипендию и медицинскую страховку на весь период учебы." },
  { q: "Когда нужно начинать подготовку к поступлению?", a: "Рекомендуем начинать за 6–9 месяцев до дедлайна. Для гранта в Венгрии приём документов закрывается в январе, а для Австрии основной летний прием идет в июле–октябре." },
  { q: "Помогаете ли вы с получением студенческого ВНЖ?", a: "Да. Мы сопровождаем весь процесс оформления студенческого ВНЖ (Aufenthaltsbewilligung): проверяем справки из банка, бронируем общежитие и готовим к подаче в посольство." },
  { q: "Какие гарантии зачисления вы предоставляете?", a: "В договоре фиксируется подбор программ разного уровня селективности, включая гарантированные варианты. 98.4% наших студентов успешно получают зачисление." },
];

// По одному вузу на строку — так проще читать и править, чем массивы-массивы.
export const universities: Uni[] = [
  { name: "University of Vienna", city: "Вена", rank: "QS №137", fee: "~€1 450 / год", grant: "Нет прямого гранта", apply: "Осень: 13 июля—31 октября · Весна: 7 января—31 марта", specialty: "Экономика, IT, Психология, Международные отношения", country: "AT", chance: "75%" },
  { name: "WU Vienna", city: "Вена", rank: "QS №20 Business", fee: "~€1 450 / год", grant: "Стипендия за успеваемость", apply: "BBE: 2 марта—19 мая · взнос €50", specialty: "Бизнес, Экономика, Финансы, Маркетинг", country: "AT", chance: "15–20%" },
  { name: "TU Wien", city: "Вена", rank: "QS №190", fee: "~€1 450 / год", grant: "Академическая стипендия", apply: "Осень: 13 июля—31 октября · Весна: 7 января—31 марта", specialty: "Информатика, Архитектура, Искусственный интеллект", country: "AT", chance: "30–40%" },
  { name: "BOKU Vienna", city: "Вена", rank: "QS №450–460", fee: "~€1 450 / год", grant: "Академическая стипендия", apply: "Осень: 13 июля—31 октября · Весна: 7 января—31 марта", specialty: "Биотехнологии, Экология, Ландшафтная архитектура", country: "AT", chance: "80–85%" },
  { name: "Medical University of Vienna", city: "Вена", rank: "QS №200 Medicine", fee: "~€1 450 / год", grant: "Академическая стипендия", apply: "MedAT: 1—31 марта · взнос €110", specialty: "Медицина, Стоматология, Нейронауки", country: "AT", chance: "10–12%" },
  { name: "University of Graz", city: "Грац", rank: "QS №300–350", fee: "~€1 450 / год", grant: "Льготное обучение", apply: "Осень: 1 июля—31 октября · Весна: 7 января—31 марта", specialty: "Право, Бизнес, Биология, Языкознание", country: "AT", chance: "80–85%" },
  { name: "TU Graz", city: "Грац", rank: "QS №400–420", fee: "~€1 450 / год", grant: "Академическая стипендия", apply: "Осень: 1 июля—31 октября · Весна: 7 января—31 марта", specialty: "Software Engineering, Кибербезопасность, Робототехника", country: "AT", chance: "60–70%" },
  { name: "University of Innsbruck", city: "Инсбрук", rank: "QS №280–300", fee: "~€1 450 / год", grant: "Академическая стипендия", apply: "Осень: 10 июля—31 октября · Весна: 7 января—31 марта", specialty: "Экономика, Мехатроника, Физика, Туризм", country: "AT", chance: "70–75%" },
  { name: "JKU Linz", city: "Линц", rank: "QS №440–460", fee: "~€1 450 / год", grant: "Академическая стипендия", apply: "Осень: 1 июля—31 октября · Весна: 7 января—31 марта", specialty: "AI, Бизнес-информатика, Инженерия, Право", country: "AT", chance: "75–80%" },
  { name: "University of Klagenfurt", city: "Клагенфурт", rank: "QS №500–550", fee: "~€1 450 / год", grant: "Стипендия AAU", apply: "Осень: 1 июля—31 октября · Весна: 7 января—31 марта", specialty: "Информатика, Менеджмент, Гейм-дизайн, Коммуникации", country: "AT", chance: "80–85%" },
  { name: "University of Salzburg", city: "Зальцбург", rank: "QS №680–700", fee: "~€1 450 / год", grant: "Академическая стипендия", apply: "Осень: 1 июля—31 октября · Весна: 7 января—31 марта", specialty: "Право, CS, Политология, Биология", country: "AT", chance: "75–80%" },
  { name: "FH Technikum Wien", city: "Вена", rank: "FH Top", fee: "~€1 450 / год", grant: "Льготное обучение", apply: "Осень: 10 января—30 апреля · взнос €50", specialty: "Software Engineering, Кибербезопасность, Мехатроника", country: "AT", chance: "45–55%" },
  { name: "MODUL University Vienna", city: "Вена", rank: "Top Private", fee: "€12 000–15 000 / год", grant: "Скидки до 30%", apply: "Осень: 1 февраля—31 мая · Весна: 1 июня—30 октября", specialty: "Менеджмент, Data Science, Международный туризм", country: "AT", chance: "70–80%" },
  { name: "Webster Vienna", city: "Вена", rank: "US Accredited", fee: "€18 000–21 000 / год", grant: "Внутренние стипендии", apply: "Осень: 16 марта—30 июня · Весна: 1 сентября—30 ноября", specialty: "Международные отношения, Бизнес, Психология, Медиа", country: "AT", chance: "65–75%" },
  { name: "ELTE University", city: "Будапешт", rank: "QS №700–750", fee: "€3 000–4 200 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 15 февраля—31 мая", specialty: "Computer Science, Психология, Международное право", country: "HU", chance: "65%" },
  { name: "Corvinus University", city: "Будапешт", rank: "QS №1000–1200", fee: "€3 800–5 000 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 15 февраля—30 апреля", specialty: "Бизнес, Экономика, Финансы, Маркетинг", country: "HU", chance: "25–35%" },
  { name: "BME Technical University", city: "Будапешт", rank: "QS №740–750", fee: "€3 200–4 500 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 15 февраля—31 мая", specialty: "Инженерия, Архитектура, IT, Строительство", country: "HU", chance: "40–50%" },
  { name: "Semmelweis University", city: "Будапешт", rank: "QS №250–300 Medicine", fee: "€9 000–18 000 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 1 декабря—31 мая", specialty: "Общая медицина, Стоматология, Фармация", country: "HU", chance: "20–30%" },
  { name: "Óbuda University", city: "Будапешт", rank: "QS №850–1000", fee: "€2 800–3 600 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 1 февраля—30 июня", specialty: "Кибербезопасность, Мехатроника, Программная инженерия", country: "HU", chance: "70–75%" },
  { name: "BGE Business University", city: "Будапешт", rank: "Regional Top", fee: "€3 000–3 800 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 15 февраля—30 июня", specialty: "Международный бизнес, Маркетинг, Туризм, Логистика", country: "HU", chance: "65–75%" },
  { name: "University of Debrecen", city: "Дебрецен", rank: "QS №670–680", fee: "€5 500–7 000 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 15 октября—15 июня", specialty: "Медицина, Биотехнологии, IT, Бизнес", country: "HU", chance: "65–75%" },
  { name: "University of Szeged", city: "Сегед", rank: "QS №600–610", fee: "€3 500–5 000 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 15 февраля—30 июня", specialty: "Биология, Медицина, Фармация, Computer Science", country: "HU", chance: "60–70%" },
  { name: "University of Pécs", city: "Печ", rank: "QS №750–800", fee: "€3 000–4 500 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 1 февраля—15 июля", specialty: "Психология, Архитектура, Бизнес, Международные отношения", country: "HU", chance: "70–80%" },
  { name: "University of Miskolc", city: "Мишкольц", rank: "QS №1000–1200", fee: "€2 500–3 500 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 15 февраля—30 июня", specialty: "Машиностроение, Материаловедение, Право, IT", country: "HU", chance: "75–85%" },
  { name: "University of Győr (SZE)", city: "Дьёр", rank: "QS №1000–1200", fee: "€3 000–4 000 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 1 февраля—30 июня", specialty: "Автомобилестроение, IT, Инженерия", country: "HU", chance: "70–80%" },
  { name: "MATE University", city: "Гёдёллё", rank: "QS №800–1000", fee: "€3 000–4 000 / год", grant: "Stipendium Hungaricum 100%", apply: "Грант: 15 ноября—15 января · коммерция: 15 февраля—30 июня", specialty: "Агрономия, Пищевая инженерия, Бизнес, Экология", country: "HU", chance: "80–85%" },
  { name: "Metropolitan University", city: "Будапешт", rank: "Regional Top", fee: "€4 400–6 500 / год", grant: "Скидки до 20%", apply: "Коммерция: 1 декабря—31 июля", specialty: "Дизайн, Анимация, Медиа, Графика, Бизнес", country: "HU", chance: "80–85%" },
  { name: "IBS Business School", city: "Будапешт", rank: "UK Accredited", fee: "€7 400–8 900 / год", grant: "Скидки до 30%", apply: "Осень: 1 марта—31 июля · Весна: 1 августа—30 ноября", specialty: "Международный менеджмент, Финансы, Маркетинг, HR", country: "HU", chance: "75–85%" },
];
