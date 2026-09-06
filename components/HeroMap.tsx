import { memo, type RefObject } from "react";

// Математически выверенная, гладкая S-образная траектория маршрута (Вена → Будапешт).
// Имеет строго C1-непрерывные касательные векторы (zero kinks),
// расположена в правой половине холста (x: 720..830, y: 270..770),
// гарантируя идеальную дистанцию от типографики и верхнего навбара.
const ROUTE = "M 780,770 C 770,650 720,540 740,440 C 760,340 860,360 800,270";

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
 * - Темный глубокий эспрессо-фон (#140F0D / #1C1613) с архитектурной сеткой
 * - Тонкие золотисто-янтарные векторы улиц, скоростных развязок и автострад
 * - Плавное русло Дуная с мягким янтарным свечением
 * - Безупречно гладкий неоновый S-образный маршрут с многослойным amber-свечением
 * - Светящийся круговой курсор с навигационной стрелкой, плавно следующей за скроллом
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
        <radialGradient id="map-vignette" cx="65%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#1E1714" />
          <stop offset="50%" stopColor="#140F0D" />
          <stop offset="100%" stopColor="#0B0908" />
        </radialGradient>

        {/* Координатная микросетка */}
        <pattern id="dark-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(229, 184, 122, 0.03)" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="0.7" fill="rgba(229, 184, 122, 0.1)" />
        </pattern>

        {/* Градиенты свечения маршрута */}
        <linearGradient id="route-gold-aura" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#C88242" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#E5B87A" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFE885" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="danube-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A211D" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#C88242" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#1A1412" stopOpacity="0.75" />
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

      {/* 2. ТОПОГРАФИЧЕСКИЕ ИЗОЛИНИИ РЕЛЬЕФА (TERRAIN CONTOURS) */}
      <g fill="none" stroke="rgba(229, 184, 122, 0.045)" strokeWidth="1">
        <path d="M 500,900 C 600,750 700,680 850,550 S 1100,320 1300,100" />
        <path d="M 560,900 C 660,770 760,700 910,570 S 1160,340 1360,120" />
        <path d="M 420,900 C 520,730 620,660 770,530 S 1020,300 1220,80" />
        <path d="M 680,900 C 780,800 880,730 1030,600 S 1280,370 1440,200" />
      </g>

      {/* 3. РУСЛО РЕКИ ДУНАЙ (DANUBE RIVER) */}
      <g>
        <path
          d="M 420,940 C 540,840 660,760 800,690 C 920,630 1020,520 1080,380 C 1140,240 1240,140 1460,50"
          fill="none"
          stroke="url(#danube-dark-grad)"
          strokeWidth="42"
          strokeLinecap="round"
        />
        <path
          d="M 420,940 C 540,840 660,760 800,690 C 920,630 1020,520 1080,380 C 1140,240 1240,140 1460,50"
          fill="none"
          stroke="rgba(229, 184, 122, 0.22)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <text
          x="1120"
          y="330"
          fill="rgba(229, 184, 122, 0.35)"
          fontSize="10"
          letterSpacing="3"
          fontFamily="var(--font-mono), monospace"
          transform="rotate(-55 1120 330)"
        >
          DANUBE · DUNA
        </text>
      </g>

      {/* 4. ОРГАНИЧЕСКАЯ УЛИЧНАЯ И АВТОМАГИСТРАЛЬНАЯ СЕТЬ (GOLDEN STREET MESH) */}
      <g fill="none">
        {/* Второстепенная сеть городских улиц */}
        <g stroke="rgba(229, 184, 122, 0.12)" strokeWidth="0.9">
          {/* Горизонтальные и наклонные улицы */}
          <path d="M 380,180 L 1380,140" />
          <path d="M 350,260 L 1350,220" />
          <path d="M 330,350 L 1370,310" />
          <path d="M 310,440 L 1360,410" />
          <path d="M 290,530 L 1350,510" />
          <path d="M 270,620 L 1340,610" />
          <path d="M 250,710 L 1330,710" />
          <path d="M 230,800 L 1320,810" />
          <path d="M 210,890 L 1310,900" />

          {/* Вертикальные и наклонные проспекты */}
          <path d="M 440,60 L 380,920" />
          <path d="M 540,50 L 490,920" />
          <path d="M 640,40 L 600,920" />
          <path d="M 740,40 L 710,920" />
          <path d="M 840,40 L 820,920" />
          <path d="M 940,50 L 930,920" />
          <path d="M 1040,60 L 1040,920" />
          <path d="M 1140,70 L 1150,920" />
          <path d="M 1240,90 L 1260,920" />

          {/* Диагональные связки и бульвары */}
          <path d="M 400,120 L 1250,920" />
          <path d="M 1280,160 L 420,920" />
          <path d="M 320,300 L 980,940" />
          <path d="M 620,60 L 1400,800" />
          <path d="M 500,180 L 1180,820" />
          <path d="M 920,120 L 450,780" />
        </g>

        {/* Скоростные магистрали и развязки (Highways & Interchanges) */}
        <g stroke="rgba(229, 184, 122, 0.28)" strokeWidth="1.8">
          {/* Главная трасса E60 / M1 */}
          <path d="M 280,900 C 460,800 600,730 730,650 S 950,450 1120,270 S 1300,150 1440,90" />
          {/* Южная объездная */}
          <path d="M 420,940 C 580,750 710,530 870,370 S 1160,190 1380,120" />
          {/* Западная артерия */}
          <path d="M 560,940 C 700,820 820,680 930,520 S 1120,320 1280,220" />

          {/* Кольцевые развязки (Cloverleaf / Loops в стиле эталона) */}
          <circle cx="820" cy="300" r="46" stroke="rgba(229, 184, 122, 0.35)" strokeWidth="1.6" strokeDasharray="6 4" />
          <circle cx="820" cy="300" r="26" stroke="rgba(229, 184, 122, 0.25)" strokeWidth="1.2" />
          
          <circle cx="670" cy="540" r="40" stroke="rgba(229, 184, 122, 0.32)" strokeWidth="1.6" strokeDasharray="5 3" />
          <circle cx="670" cy="540" r="22" stroke="rgba(229, 184, 122, 0.22)" strokeWidth="1.2" />

          <circle cx="920" cy="640" r="52" stroke="rgba(229, 184, 122, 0.28)" strokeWidth="1.4" />
          <circle cx="1060" cy="420" r="38" stroke="rgba(229, 184, 122, 0.26)" strokeWidth="1.4" strokeDasharray="5 3" />

          {/* Петли съездов */}
          <path d="M 780,270 C 810,240 860,260 870,310 S 830,360 790,340" />
          <path d="M 640,510 C 670,480 720,500 730,550 S 690,600 650,580" />
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
      <g transform="translate(780, 770)">
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
      <g ref={budaRef} style={{ opacity: 0 }} transform="translate(800, 270)">
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
      <g ref={cursorRef} transform="translate(780, 770)">
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
