import { memo, type RefObject } from "react";

// Плавная органическая S-образная траектория маршрута (Вена → Будапешт)
// Расположена в правой половине холста (x: 580..860, y: 210..780),
// гарантируя идеальный отступ от верхнего навбара и чистый левый фланг для типографики.
const ROUTE = "M 760,780 C 740,650 580,560 610,430 C 640,290 840,320 780,210";

interface Props {
  narrow: boolean;
  pathRef: RefObject<SVGPathElement | null>;
  drawA: RefObject<SVGPathElement | null>;
  drawB: RefObject<SVGPathElement | null>;
  budaRef: RefObject<SVGGElement | null>;
  cursorRef: RefObject<SVGGElement | null>;
}

/**
 * Интерактивная темная карта Hero в кинематографичной эстетике эталона (goat-moving).
 * - Темный глубокий эспрессо-фон (#15100E / #1C1613) с архитектурной сеткой кварталов
 * - Тонкие золотисто-янтарные векторы улиц, развязок и автострад
 * - Русло Дуная с мягким янтарно-кофейным свечением
 * - Яркий неоновый S-образный маршрут с многослойным amber-свечением
 * - Светящийся круговой курсор с навигационной стрелкой, следующей за скроллом
 */
const HeroMap = memo(function HeroMap({ narrow, pathRef, drawA, drawB, budaRef, cursorRef }: Props) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio={narrow ? "xMidYMid meet" : "xMidYMid slice"}
      className="h-full w-full select-none"
      role="img"
      aria-label="Интерактивная карта академического маршрута Вена — Будапешт"
    >
      <defs>
        {/* Радиальный градиент глубины ночной карты */}
        <radialGradient id="map-vignette" cx="68%" cy="48%" r="80%">
          <stop offset="0%" stopColor="#1E1714" />
          <stop offset="55%" stopColor="#140F0D" />
          <stop offset="100%" stopColor="#0B0908" />
        </radialGradient>

        {/* Координатная микросетка */}
        <pattern id="dark-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(229, 184, 122, 0.035)" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="0.75" fill="rgba(229, 184, 122, 0.12)" />
        </pattern>

        {/* Градиенты свечения маршрута */}
        <linearGradient id="route-gold-aura" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#C88242" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#E5B87A" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFE885" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="danube-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A211D" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#C88242" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1A1412" stopOpacity="0.8" />
        </linearGradient>

        {/* Фильтры неонового свечения */}
        <filter id="route-blur-wide" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" result="blurWide" />
          <feMerge>
            <feMergeNode in="blurWide" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="route-blur-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blurSoft" />
          <feMerge>
            <feMergeNode in="blurSoft" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="dot-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="cursor-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#E5B87A" floodOpacity="0.9" />
          <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#C88242" floodOpacity="0.65" />
        </filter>
      </defs>

      {/* 1. ТЕМНЫЙ ФОН И СЕТКА */}
      <rect width="1440" height="900" fill="url(#map-vignette)" />
      <rect width="1440" height="900" fill="url(#dark-grid)" />

      {/* 2. АРХИТЕКТУРНЫЕ КВАРТАЛЫ И ЗОНЫ (URBAN POLYGON PARCELS) */}
      <g fill="rgba(42, 33, 29, 0.42)" stroke="rgba(229, 184, 122, 0.08)" strokeWidth="0.8">
        <polygon points="630,220 730,200 750,280 650,300" />
        <polygon points="770,220 890,210 880,300 780,290" />
        <polygon points="830,320 950,310 940,410 840,400" />
        <polygon points="690,330 800,320 790,400 680,390" />
        <polygon points="570,360 660,350 650,440 560,430" />
        
        <polygon points="530,480 630,470 620,570 520,560" />
        <polygon points="650,470 760,460 750,550 640,560" />
        <polygon points="770,440 880,430 870,530 760,530" />
        
        <polygon points="590,600 690,590 680,700 580,690" />
        <polygon points="710,590 830,580 820,690 700,700" />
        <polygon points="660,720 780,710 770,820 650,820" />
        <polygon points="800,710 920,700 910,810 790,820" />
        
        {/* Дополнительные кварталы */}
        <polygon points="970,340 1110,320 1090,450 960,440" />
        <polygon points="950,480 1090,470 1070,600 940,590" />
        <polygon points="930,630 1060,620 1050,750 920,740" />
        <polygon points="430,420 530,410 520,520 420,510" />
        <polygon points="400,560 500,550 490,670 390,660" />
        <polygon points="360,700 470,690 460,810 350,800" />
      </g>

      {/* 3. РУСЛО РЕКИ ДУНАЙ (DANUBE) */}
      <g>
        <path
          d="M 380,940 C 500,840 620,760 760,690 C 880,630 980,520 1040,380 C 1100,240 1200,140 1460,50"
          fill="none"
          stroke="url(#danube-dark-grad)"
          strokeWidth="42"
          strokeLinecap="round"
        />
        <path
          d="M 380,940 C 500,840 620,760 760,690 C 880,630 980,520 1040,380 C 1100,240 1200,140 1460,50"
          fill="none"
          stroke="rgba(229, 184, 122, 0.22)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text
          x="1080"
          y="330"
          fill="rgba(229, 184, 122, 0.4)"
          fontSize="10"
          letterSpacing="3"
          fontFamily="var(--font-mono), monospace"
          transform="rotate(-55 1080 330)"
        >
          DANUBE · DUNA
        </text>
      </g>

      {/* 4. ОРГАНИЧЕСКАЯ УЛИЧНАЯ И АВТОМАГИСТРАЛЬНАЯ СЕТЬ (GOLDEN STREET MESH) */}
      <g fill="none">
        {/* Второстепенная сеть улиц (City Mesh) */}
        <g stroke="rgba(229, 184, 122, 0.14)" strokeWidth="1">
          {/* Горизонтальные и наклонные улицы */}
          <path d="M 320,180 L 1380,140" />
          <path d="M 290,260 L 1350,220" />
          <path d="M 270,350 L 1370,310" />
          <path d="M 250,440 L 1360,410" />
          <path d="M 230,530 L 1350,510" />
          <path d="M 210,620 L 1340,610" />
          <path d="M 190,710 L 1330,710" />
          <path d="M 170,800 L 1320,810" />
          <path d="M 150,890 L 1310,900" />

          {/* Вертикальные и наклонные проспекты */}
          <path d="M 380,60 L 320,920" />
          <path d="M 480,50 L 430,920" />
          <path d="M 580,40 L 540,920" />
          <path d="M 680,40 L 650,920" />
          <path d="M 780,40 L 760,920" />
          <path d="M 880,50 L 870,920" />
          <path d="M 980,60 L 980,920" />
          <path d="M 1080,70 L 1090,920" />
          <path d="M 1180,90 L 1200,920" />
          <path d="M 1280,110 L 1310,920" />

          {/* Диагональные связки и бульвары */}
          <path d="M 350,120 L 1250,920" />
          <path d="M 1280,160 L 380,920" />
          <path d="M 250,300 L 980,940" />
          <path d="M 600,60 L 1400,800" />
          <path d="M 480,180 L 1180,820" />
          <path d="M 920,120 L 420,780" />
        </g>

        {/* Скоростные магистрали и развязки (Highways & Interchanges) */}
        <g stroke="rgba(229, 184, 122, 0.3)" strokeWidth="1.8">
          {/* Главная трасса E60 / M1 */}
          <path d="M 240,900 C 420,800 560,730 690,650 S 910,450 1080,270 S 1260,150 1440,90" />
          {/* Южная объездная */}
          <path d="M 380,940 C 540,750 670,530 830,370 S 1120,190 1360,120" />
          {/* Западная артерия */}
          <path d="M 520,940 C 660,820 780,680 890,520 S 1080,320 1240,220" />

          {/* Кольцевые развязки (Cloverleaf / Loops) */}
          <circle cx="780" cy="300" r="46" stroke="rgba(229, 184, 122, 0.35)" strokeWidth="1.6" strokeDasharray="6 4" />
          <circle cx="780" cy="300" r="26" stroke="rgba(229, 184, 122, 0.25)" strokeWidth="1.2" />
          
          <circle cx="610" cy="540" r="40" stroke="rgba(229, 184, 122, 0.32)" strokeWidth="1.6" strokeDasharray="5 3" />
          <circle cx="610" cy="540" r="22" stroke="rgba(229, 184, 122, 0.22)" strokeWidth="1.2" />

          <circle cx="880" cy="640" r="52" stroke="rgba(229, 184, 122, 0.28)" strokeWidth="1.4" />
          <circle cx="1020" cy="420" r="38" stroke="rgba(229, 184, 122, 0.26)" strokeWidth="1.4" strokeDasharray="5 3" />

          {/* Петли съездов */}
          <path d="M 740,270 C 770,240 820,260 830,310 S 790,360 750,340" />
          <path d="M 580,510 C 610,480 660,500 670,550 S 630,600 590,580" />
        </g>
      </g>

      {/* 5. ИНТЕРАКТИВНЫЙ НЕОНОВЫЙ МАРШРУТ (LUMINOUS AMBER S-CURVE) */}
      {/* Невидимый базовый путь для вычисления координат курсора */}
      <path ref={pathRef} d={ROUTE} fill="none" stroke="rgba(229, 184, 122, 0.08)" strokeWidth="2" />

      {/* Внешний широкий ореол неонового свечения */}
      <path
        ref={drawA}
        d={ROUTE}
        fill="none"
        stroke="url(#route-gold-aura)"
        strokeWidth="34"
        strokeLinecap="round"
        filter="url(#route-blur-wide)"
        opacity="0.55"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      />

      {/* Средний плотный слой золотого свечения */}
      <path
        d={ROUTE}
        fill="none"
        stroke="url(#route-gold-aura)"
        strokeWidth="14"
        strokeLinecap="round"
        filter="url(#route-blur-soft)"
        opacity="0.9"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      />

      {/* Яркий белый/золотой центральный стержень маршрута */}
      <path
        ref={drawB}
        d={ROUTE}
        fill="none"
        stroke="#FFF8C6"
        strokeWidth="4.5"
        strokeLinecap="round"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      />

      {/* 6. ТОЧКА СТАРТА МАРШРУТА (ORIGIN DOT — VIENNA) */}
      <g transform="translate(760, 780)">
        {/* Пульсирующие кольца */}
        <circle r="10" fill="#E5B87A" opacity="0.3">
          <animate attributeName="r" values="10;34" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {/* Внутренняя светящаяся точка */}
        <circle r="9" fill="#FFE533" filter="url(#dot-glow)" />
        <circle r="5" fill="#FFFFFF" />
        {/* Минималистичная подпись */}
        <text
          x="22"
          y="4"
          fill="rgba(229, 184, 122, 0.8)"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1.5"
          fontFamily="var(--font-mono), monospace"
        >
          VIENNA · 48°12&apos;N
        </text>
      </g>

      {/* 7. ФИНАЛЬНАЯ ТОЧКА МАРШРУТА (DESTINATION — BUDAPEST) */}
      <g ref={budaRef} style={{ opacity: 0 }} transform="translate(780, 210)">
        {/* Пульсирующий ореол завершения маршрута */}
        <circle r="14" fill="#FFE533" opacity="0.4">
          <animate attributeName="r" values="14;46" dur="2.2s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2.2s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        <circle r="10" fill="#FFE533" filter="url(#dot-glow)" />
        <circle r="5.5" fill="#FFFFFF" />
        {/* Минималистичная подпись */}
        <text
          x="24"
          y="5"
          fill="rgba(255, 232, 133, 0.95)"
          fontSize="11"
          fontWeight="700"
          letterSpacing="1.5"
          fontFamily="var(--font-mono), monospace"
        >
          BUDAPEST · 47°29&apos;N
        </text>
      </g>

      {/* 8. СВЕТЯЩИЙСЯ КРУГОВОЙ КУРСОР С НАВИГАЦИОННОЙ СТРЕЛКОЙ (BENCHMARK CURSOR) */}
      <g ref={cursorRef} transform="translate(760, 780)">
        {/* Внешнее золотое светящееся кольцо */}
        <circle
          r="34"
          fill="rgba(229, 184, 122, 0.12)"
          stroke="#FFE885"
          strokeWidth="5"
          filter="url(#cursor-glow)"
        />
        {/* Внутренняя навигационная стрелка-указатель */}
        <polygon
          points="0,-16 11,10 0,5 -11,10"
          fill="#FFFFFF"
          filter="drop-shadow(0 0 6px rgba(255,232,133,0.9))"
        />
      </g>
    </svg>
  );
});

export default HeroMap;
