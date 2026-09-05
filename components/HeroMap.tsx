import { memo, type RefObject } from "react";

const ROUTE = "M 180,480 C 320,480 440,430 580,390 C 700,350 780,300 860,250";

interface Props {
  narrow: boolean;
  pathRef: RefObject<SVGPathElement | null>;
  drawA: RefObject<SVGPathElement | null>;
  drawB: RefObject<SVGPathElement | null>;
  budaRef: RefObject<SVGGElement | null>;
  cursorRef: RefObject<SVGGElement | null>;
}

/**
 * Презентационная карта Hero в эстетике Apple Maps / премиальной картографии.
 * - Многослойная топография: рельеф Альп, русло Дуная, озера Балатон и Нойзидлер-Зе
 * - Дорожная сеть: автомагистрали E60, A1, A2, M1, M3, M5, M7 и городские сетки
 * - Информационные бейджи Apple Maps для столиц и студенческих центров
 * - Все анимации управляются через ref из Hero.tsx (zero re-renders)
 */
const HeroMap = memo(function HeroMap({ narrow, pathRef, drawA, drawB, budaRef, cursorRef }: Props) {
  return (
    <svg
      viewBox="0 0 1000 700"
      preserveAspectRatio={narrow ? "xMidYMid meet" : "xMidYMid slice"}
      className="h-full w-full select-none"
      role="img"
      aria-label="Интерактивная карта академического маршрута Австрия — Венгрия"
    >
      <defs>
        {/* Координатная микросетка Apple Maps */}
        <pattern id="carto-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,33,29,0.04)" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="0.8" fill="rgba(42,33,29,0.12)" />
        </pattern>

        {/* Городская квартальная текстура */}
        <pattern id="urban-mesh" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="none" stroke="rgba(42,33,29,0.05)" strokeWidth="0.6" />
        </pattern>

        {/* Водный градиент для Дуная и озёр */}
        <linearGradient id="danube-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C88242" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#2A211D" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#2A211D" stopOpacity="0.18" />
        </linearGradient>

        <linearGradient id="lake-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A211D" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#C88242" stopOpacity="0.06" />
        </linearGradient>

        {/* Градиент свечения маршрута */}
        <linearGradient id="route-amber-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5B87A" />
          <stop offset="50%" stopColor="#C88242" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>

        {/* Мягкая тень карточек и бейджей */}
        <filter id="badge-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2A211D" floodOpacity="0.16" />
        </filter>
        <filter id="glow-heavy" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. БАЗОВЫЙ ФОН И СЕТКА */}
      <rect width="1000" height="700" fill="#FBF9F5" />
      <rect width="1000" height="700" fill="url(#carto-grid)" />

      {/* 2. ТОПОГРАФИЧЕСКИЙ РЕЛЬЕФ (ИЗОЛИНИИ АЛЬП И КАРПАТ) */}
      <g fill="none" stroke="rgba(42,33,29,0.04)" strokeWidth="1">
        {/* Восточные Альпы (Запад / Юго-Запад Австрии) */}
        <path d="M -40,420 C 40,430 110,480 140,550 S 120,680 80,740" />
        <path d="M -40,470 C 60,480 130,530 160,600 S 140,700 110,750" />
        <path d="M -30,520 C 70,530 150,580 180,650 S 160,720 140,760" strokeWidth="1.2" strokeOpacity="0.06" />
        <path d="M -20,580 C 80,590 170,630 200,700 S 190,750 170,780" />
        <path d="M 30,640 C 120,650 200,670 230,730" />
        
        {/* Штирийские холмы и Венский Лес (Wienerwald) */}
        <path d="M 120,380 C 150,400 170,440 180,470 S 210,540 250,570" />
        <path d="M 140,360 C 170,380 190,420 200,450 S 230,520 270,550" />

        {/* Карпатские предгорья и холмы Бёржёнь / Матра (Север Венгрии) */}
        <path d="M 680,80 C 740,110 820,130 890,110 S 970,60 1020,40" />
        <path d="M 710,120 C 770,150 840,170 910,150 S 980,100 1040,80" />
        <path d="M 740,160 C 800,190 870,210 930,190 S 990,140 1050,120" strokeWidth="1.2" strokeOpacity="0.06" />
        <path d="M 770,200 C 830,230 890,245 950,225" />
      </g>

      {/* 3. ГИДРОГРАФИЯ (ДУНАЙ, ОЗЕРА БАЛАТОН И НОЙЗИДЛЕР-ЗЕ, ТИСА) */}
      <g>
        {/* Озеро Балатон (Balaton) — крупнейшее озеро Центральной Европы */}
        <path
          d="M 460,540 C 490,525 535,510 575,495 C 585,492 590,496 580,504 C 540,522 495,542 465,552 C 455,555 450,548 460,540 Z"
          fill="url(#lake-grad)"
          stroke="rgba(42,33,29,0.12)"
          strokeWidth="1"
        />
        <text x="520" y="522" fill="rgba(42,33,29,0.35)" fontSize="9" letterSpacing="1.5" fontFamily="var(--font-mono), monospace" fontStyle="italic">
          LAKE BALATON
        </text>

        {/* Озеро Нойзидлер-Зе / Fertő tó (на границе Австрии и Венгрии) */}
        <path
          d="M 270,495 C 275,510 274,530 268,548 C 263,535 264,512 268,495 Z"
          fill="url(#lake-grad)"
          stroke="rgba(42,33,29,0.12)"
          strokeWidth="0.8"
        />

        {/* Река Тиса (Восточная Венгрия) */}
        <path
          d="M 970,40 C 930,120 900,220 890,340 S 840,540 820,680"
          fill="none"
          stroke="rgba(42,33,29,0.08)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Река Драва (Южная граница) */}
        <path
          d="M 120,720 C 260,700 420,710 600,685 S 780,670 900,720"
          fill="none"
          stroke="rgba(42,33,29,0.06)"
          strokeWidth="2"
        />

        {/* Главное русло Дуная (Danube / Donau / Duna) */}
        {/* Нижняя мягкая подложка русла */}
        <path
          d="M -20,500 C 90,490 140,485 180,475 S 300,445 340,430 S 480,410 580,395 S 740,310 780,240 S 830,220 860,260 S 875,360 885,480 S 895,620 905,720"
          fill="none"
          stroke="url(#danube-grad)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Чёткая гидрографическая линия Дуная */}
        <path
          d="M -20,500 C 90,490 140,485 180,475 S 300,445 340,430 S 480,410 580,395 S 740,310 780,240 S 830,220 860,260 S 875,360 885,480 S 895,620 905,720"
          fill="none"
          stroke="rgba(42,33,29,0.22)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Подпись реки Дунай */}
        <text x="390" y="415" fill="rgba(42,33,29,0.4)" fontSize="9" letterSpacing="2" fontFamily="var(--font-mono), monospace">
          DANUBE · DONAU
        </text>
        <text x="898" y="360" fill="rgba(42,33,29,0.35)" fontSize="8" letterSpacing="1.5" fontFamily="var(--font-mono), monospace" transform="rotate(85 898 360)">
          DUNA
        </text>
      </g>

      {/* 4. ГОСУДАРСТВЕННАЯ ГРАНИЦА АВСТРИЯ — ВЕНГРИЯ */}
      <g>
        <path
          d="M 295,430 C 290,460 282,500 285,550 S 275,620 270,700"
          fill="none"
          stroke="rgba(42,33,29,0.25)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Надписи стран в стиле высокой картографии */}
        <text x="215" y="410" fill="rgba(42,33,29,0.28)" fontSize="13" fontWeight="600" letterSpacing="4" fontFamily="var(--font-mono), monospace">
          AUSTRIA
        </text>
        <text x="325" y="440" fill="rgba(42,33,29,0.28)" fontSize="13" fontWeight="600" letterSpacing="4" fontFamily="var(--font-mono), monospace">
          HUNGARY
        </text>
      </g>

      {/* 5. ГОРОДСКИЕ СЕТКИ И КВАРТАЛЫ (METROPOLITAN URBAN MESH) */}
      <g>
        {/* Агломерация Вены */}
        <circle cx="180" cy="480" r="48" fill="url(#urban-mesh)" />
        <circle cx="180" cy="480" r="32" fill="none" stroke="rgba(42,33,29,0.08)" strokeWidth="1" />
        <circle cx="180" cy="480" r="54" fill="none" stroke="rgba(42,33,29,0.04)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Агломерация Будапешта */}
        <circle cx="860" cy="250" r="56" fill="url(#urban-mesh)" />
        <circle cx="860" cy="250" r="36" fill="none" stroke="rgba(42,33,29,0.08)" strokeWidth="1" />
        <circle cx="860" cy="250" r="62" fill="none" stroke="rgba(42,33,29,0.04)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Агломерация Граца */}
        <circle cx="260" cy="620" r="22" fill="url(#urban-mesh)" />
        {/* Агломерация Дьёра */}
        <circle cx="580" cy="390" r="20" fill="url(#urban-mesh)" />
      </g>

      {/* 6. ДОРОЖНАЯ И ЖЕЛЕЗНОДОРОЖНАЯ СЕТЬ (EUROPEAN HIGHWAYS & CORRIDORS) */}
      <g fill="none">
        {/* Второстепенная сеть дорог */}
        <g stroke="rgba(42,33,29,0.08)" strokeWidth="1.2">
          {/* A2 / E59: Вена -> Грац -> Клагенфурт */}
          <path d="M 180,480 C 190,530 220,580 260,620 S 210,670 120,700" />
          {/* A1 / E60 West: Вена -> Линц -> Зальцбург */}
          <path d="M 180,480 C 140,490 100,495 70,500 S 10,510 -30,520" />
          {/* M7: Будапешт -> Секешфехервар -> Балатон */}
          <path d="M 860,250 C 760,330 680,420 540,510 S 420,600 360,660" />
          {/* M3: Будапешт -> Мишкольц / Дебрецен */}
          <path d="M 860,250 C 880,210 885,170 890,150" />
          <path d="M 870,230 C 890,260 910,320 920,390" />
          {/* M5: Будапешт -> Кечкемет -> Сегед */}
          <path d="M 860,250 C 840,340 820,440 780,540" />
          {/* M6: Будапешт -> Печ */}
          <path d="M 860,250 C 830,360 760,480 620,570" />
          {/* Связка Грац -> Дьёр / Вена */}
          <path d="M 260,620 C 360,560 480,470 580,390" />
        </g>

        {/* Главная артерия E60 (бегущий световой пунктир транзита) */}
        <g stroke="rgba(42,33,29,0.22)" strokeWidth="1.5">
          <path className="street-flow" d="M 70,500 L 180,480 C 320,480 440,430 580,390 C 700,350 780,300 860,250 L 920,390" />
        </g>
      </g>

      {/* 7. АКАДЕМИЧЕСКИЕ ХАБЫ И ГОРОДА (APPLE MAPS CITY PINS) */}
      {(
        [
          { cx: 70, cy: 500, name: "ЛИНЦ", code: "JKU", lx: 70, ly: 526, side: "bot" },
          { cx: 60, cy: 620, name: "ИНСБРУК", code: "UIBK", lx: 60, ly: 644, side: "bot" },
          { cx: 260, cy: 620, name: "ГРАЦ", code: "KFU · TU", lx: 260, ly: 645, side: "bot" },
          { cx: 620, cy: 570, name: "ПЕЧ", code: "PTE", lx: 620, ly: 595, side: "bot" },
          { cx: 780, cy: 540, name: "СЕГЕД", code: "SZTE", lx: 780, ly: 565, side: "bot" },
          { cx: 920, cy: 390, name: "ДЕБРЕЦЕН", code: "UD", lx: 920, ly: 415, side: "bot" },
          { cx: 890, cy: 150, name: "МИШКОЛЬЦ", code: "ME", lx: 890, ly: 135, side: "top" },
        ] as { cx: number; cy: number; name: string; code: string; lx: number; ly: number; side: "top" | "bot" }[]
      ).map(({ cx, cy, name, code, lx, ly }) => (
        <g key={name} className="transition-transform duration-200 hover:scale-110">
          {/* Фоновое кольцо маркера */}
          <circle cx={cx} cy={cy} r="6" fill="#FBF9F5" stroke="rgba(42,33,29,0.3)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="2.5" fill="#2A211D" />
          {/* Лейбл города */}
          <text
            x={lx}
            y={ly}
            textAnchor="middle"
            fill="rgba(42,33,29,0.85)"
            fontSize="11"
            fontWeight="600"
            letterSpacing="1.2"
            fontFamily="var(--font-mono), monospace"
          >
            {name}
          </text>
          <text
            x={lx}
            y={ly + 11}
            textAnchor="middle"
            fill="rgba(42,33,29,0.4)"
            fontSize="8"
            letterSpacing="0.8"
            fontFamily="var(--font-mono), monospace"
          >
            {code}
          </text>
        </g>
      ))}

      {/* 8. ИНТЕРАКТИВНАЯ ТРАЕКТОРИЯ СКРОЛЛА (AMBER CREMA ROUTE) */}
      {/* Невидимый путь для считывания длины и угла в rAF-лупе */}
      <path ref={pathRef} d={ROUTE} fill="none" stroke="rgba(42,33,29,0.12)" strokeWidth="2" />

      {/* Широкий шлейф ореола траектории */}
      <path
        ref={drawA}
        d={ROUTE}
        fill="none"
        stroke="url(#route-amber-grad)"
        strokeOpacity="0.32"
        strokeWidth="16"
        strokeLinecap="round"
        className="route-glow"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      />
      {/* Чёткий неоновый стержень маршрута */}
      <path
        ref={drawB}
        d={ROUTE}
        fill="none"
        stroke="url(#route-amber-grad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      />

      {/* Информационный бейдж транзита вдоль маршрута (Railjet E60) */}
      <g transform="translate(415, 424)">
        <rect
          x="-60"
          y="-12"
          width="120"
          height="24"
          rx="12"
          fill="rgba(251, 249, 245, 0.94)"
          stroke="rgba(42, 33, 29, 0.18)"
          strokeWidth="1"
          filter="url(#badge-shadow)"
        />
        <circle cx="-44" cy="0" r="2.5" fill="var(--accent)" />
        <text
          x="-34"
          y="4"
          fill="#2A211D"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.8"
          fontFamily="var(--font-mono), monospace"
        >
          2h 20m · Railjet
        </text>
      </g>

      {/* Промежуточный студенческий хаб маршрута — Дьёр (Венгрия, университет Сечени) */}
      <g transform="translate(580, 390)">
        <circle r="7" fill="#FBF9F5" stroke="#C88242" strokeWidth="2.5" filter="url(#badge-shadow)" />
        <circle r="3" fill="#2A211D" />
        <rect
          x="-32"
          y="-30"
          width="64"
          height="18"
          rx="5"
          fill="rgba(42, 33, 29, 0.9)"
          filter="url(#badge-shadow)"
        />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fill="#FBF9F5"
          fontSize="10"
          fontWeight="600"
          letterSpacing="1"
          fontFamily="var(--font-mono), monospace"
        >
          ДЬЁР
        </text>
      </g>

      {/* 9. ВЕНА — СТОЛИЦА ПРОГРАММ В АВСТРИИ (APPLE MAPS HERO PIN) */}
      <g transform="translate(180, 480)">
        {/* Пульсирующие радио-маяки Crema */}
        <circle r="8" fill="var(--accent)">
          <animate attributeName="r" values="8;36" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.75;0" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle r="8" fill="var(--accent)">
          <animate attributeName="r" values="8;24" dur="2.6s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2.6s" begin="0.8s" repeatCount="indefinite" />
        </circle>
        <circle r="9" fill="#FBF9F5" stroke="#2A211D" strokeWidth="2.5" filter="url(#badge-shadow)" />
        <circle r="5" fill="var(--accent)" />

        {/* Премиальный бейдж Вены в стиле Apple Maps */}
        <g transform="translate(0, 24)">
          <rect
            x="-80"
            y="0"
            width="160"
            height="40"
            rx="10"
            fill="rgba(42, 33, 29, 0.95)"
            stroke="rgba(251, 249, 245, 0.2)"
            strokeWidth="1"
            filter="url(#badge-shadow)"
          />
          <circle cx="-62" cy="20" r="3.5" fill="var(--accent)" />
          <text
            x="-50"
            y="18"
            fill="#FBF9F5"
            fontSize="13"
            fontWeight="700"
            letterSpacing="2"
            fontFamily="var(--font-mono), monospace"
          >
            ВЕНА
          </text>
          <text
            x="64"
            y="18"
            textAnchor="end"
            fill="rgba(251, 249, 245, 0.6)"
            fontSize="9"
            letterSpacing="1"
            fontFamily="var(--font-mono), monospace"
          >
            VIE · AT
          </text>
          <text
            x="-50"
            y="31"
            fill="rgba(251, 249, 245, 0.75)"
            fontSize="8.5"
            letterSpacing="0.6"
            fontFamily="var(--font-mono), monospace"
          >
            14 ВУЗОВ · ОТ €1 450
          </text>
        </g>
      </g>

      {/* 10. БУДАПЕШТ — СТОЛИЦА ПРОГРАММ В ВЕНГРИИ (APPLE MAPS HERO PIN) */}
      <g ref={budaRef} style={{ opacity: 0 }} transform="translate(860, 250)">
        {/* Пульсирующие радио-маяки Crema */}
        <circle r="8" fill="var(--accent)">
          <animate attributeName="r" values="8;36" dur="2.6s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.75;0" dur="2.6s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        <circle r="8" fill="var(--accent)">
          <animate attributeName="r" values="8;24" dur="2.6s" begin="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2.6s" begin="1.8s" repeatCount="indefinite" />
        </circle>
        <circle r="9" fill="#FBF9F5" stroke="#2A211D" strokeWidth="2.5" filter="url(#badge-shadow)" />
        <circle r="5" fill="var(--accent)" />

        {/* Премиальный бейдж Будапешта */}
        <g transform="translate(0, -50)">
          <rect
            x="-88"
            y="0"
            width="176"
            height="40"
            rx="10"
            fill="rgba(42, 33, 29, 0.95)"
            stroke="rgba(251, 249, 245, 0.2)"
            strokeWidth="1"
            filter="url(#badge-shadow)"
          />
          <circle cx="-70" cy="20" r="3.5" fill="var(--accent)" />
          <text
            x="-58"
            y="18"
            fill="#FBF9F5"
            fontSize="13"
            fontWeight="700"
            letterSpacing="2"
            fontFamily="var(--font-mono), monospace"
          >
            БУДАПЕШТ
          </text>
          <text
            x="72"
            y="18"
            textAnchor="end"
            fill="rgba(251, 249, 245, 0.6)"
            fontSize="9"
            letterSpacing="1"
            fontFamily="var(--font-mono), monospace"
          >
            BUD · HU
          </text>
          <text
            x="-58"
            y="31"
            fill="rgba(251, 249, 245, 0.75)"
            fontSize="8.5"
            letterSpacing="0.6"
            fontFamily="var(--font-mono), monospace"
          >
            14 ВУЗОВ · ГРАНТ 100%
          </text>
        </g>
      </g>

      {/* 11. НАВИГАЦИОННЫЙ КУРСОР APPLE MAPS */}
      <g ref={cursorRef} transform="translate(180,480)">
        {/* Внешний ореол курсора */}
        <circle r="22" fill="rgba(200, 130, 66, 0.18)" />
        <circle r="16" fill="#FBF9F5" stroke="var(--accent)" strokeWidth="3" filter="url(#badge-shadow)" />
        <path d="M 9,0 L -6,-6 L -3,0 L -6,6 Z" fill="var(--accent)" />
      </g>

      {/* 12. КАРТОГРАФИЧЕСКИЕ ДЕТАЛИ И ШКАЛА МАСШТАБА (MAP CHROME) */}
      {/* Масштабная линейка в нижнем левом углу */}
      <g transform="translate(48, 648)">
        <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(42,33,29,0.5)" strokeWidth="2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(42,33,29,0.5)" strokeWidth="2" />
        <line x1="50" y1="-3" x2="50" y2="3" stroke="rgba(42,33,29,0.5)" strokeWidth="1.5" />
        <line x1="100" y1="-4" x2="100" y2="4" stroke="rgba(42,33,29,0.5)" strokeWidth="2" />
        <text x="0" y="14" fill="rgba(42,33,29,0.55)" fontSize="9" fontFamily="var(--font-mono), monospace">0</text>
        <text x="44" y="14" fill="rgba(42,33,29,0.55)" fontSize="9" fontFamily="var(--font-mono), monospace">50</text>
        <text x="86" y="14" fill="rgba(42,33,29,0.55)" fontSize="9" fontFamily="var(--font-mono), monospace">100 km</text>
        <text x="0" y="-8" fill="rgba(42,33,29,0.4)" fontSize="8" letterSpacing="1" fontFamily="var(--font-mono), monospace">
          SCALE 1:2,500,000
        </text>
      </g>

      {/* Компас N в правом верхнем углу */}
      <g transform="translate(940, 50)">
        <circle r="18" fill="rgba(251, 249, 245, 0.85)" stroke="rgba(42,33,29,0.15)" strokeWidth="1" />
        <polygon points="0,-12 3.5,-2 0,0 -3.5,-2" fill="var(--accent)" />
        <polygon points="0,12 3.5,2 0,0 -3.5,2" fill="rgba(42,33,29,0.3)" />
        <text x="0" y="-14" textAnchor="middle" fill="#2A211D" fontSize="8" fontWeight="700" fontFamily="var(--font-mono), monospace">
          N
        </text>
      </g>
    </svg>
  );
});

export default HeroMap;
