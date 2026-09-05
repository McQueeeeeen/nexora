import { wrap, Tag, Reveal } from "./ui";

const ROUTE = "M 150,250 C 230,244 290,232 360,225 C 440,217 480,212 540,210";

// Детализированная карта: Дунай, остановки, остальные города вузов,
// компас, масштаб, легенда. Линия рисуется, точка бежит — SVG+SMIL без JS.
export default function RouteMap() {
  return (
    <section className="py-24 lg:py-32">
      <div className={wrap}>
        <Reveal>
          <Tag>Маршрут</Tag>
          <h2 className="mt-3 max-w-[700px] text-balance text-3xl font-medium tracking-[-0.02em] lg:text-5xl">
            Две страны — один маршрут
          </h2>
          <p className="mt-4 max-w-[560px] leading-relaxed text-[#101418]/65">
            ≈240 км между кампусами. Куда бы ты ни поступил — рядом свой куратор.
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-2xl bg-[#101418] lg:rounded-3xl">
            <svg viewBox="0 0 800 420" className="block h-auto w-full" role="img" aria-label="Детальная карта маршрута Вена — Будапешт">
              <defs>
                <pattern id="rm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                </pattern>
                <filter id="rm-soft" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              <rect width="800" height="420" fill="url(#rm-grid)" />

              {/* Дунай */}
              <path d="M -20,205 C 140,190 260,232 400,218 C 540,204 660,178 820,198"
                fill="none" stroke="#7DD3FC" strokeOpacity="0.16" strokeWidth="9" strokeLinecap="round" />
              <text x="770" y="172" textAnchor="end" fill="rgba(125,211,252,0.5)"
                fontSize="13" letterSpacing="3" fontFamily="var(--font-mono), monospace">ДУНАЙ</text>

              {/* Второстепенные ветки */}
              <path d="M 150,250 C 165,290 172,315 180,340" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="5 6" />
              <path d="M 540,210 C 610,225 655,250 700,280" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="5 6" />

              {/* Остальные города вузов */}
              {[
                [50, 290, "Инсбрук"], [110, 190, "Линц"], [62, 248, "Зальцбург"],
                [180, 340, "Грац"], [620, 330, "Сегед"], [700, 280, "Дебрецен"],
                [560, 362, "Печ"], [680, 118, "Мишкольц"], [120, 352, "Клагенфурт"],
              ].map(([x, y, name]) => (
                <g key={name as string}>
                  <circle cx={x as number} cy={y as number} r="3.5" fill="rgba(255,255,255,0.35)" />
                  <text x={(x as number) + 10} y={(y as number) + 4} fill="rgba(255,255,255,0.4)"
                    fontSize="13" letterSpacing="2" fontFamily="var(--font-mono), monospace">{name}</text>
                </g>
              ))}

              {/* Главный маршрут */}
              <path d={ROUTE} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
              <path d={ROUTE} fill="none" stroke="var(--brand-bright)" strokeWidth="3" strokeLinecap="round"
                pathLength={100} className="route-draw route-glow" />

              {/* Промежуточные остановки */}
              {[
                [250, 240, "Братислава"], [360, 225, "Дьёр"],
              ].map(([x, y, name]) => (
                <g key={name as string}>
                  <circle cx={x as number} cy={y as number} r="5" fill="#101418" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                  <text x={x as number} y={(y as number) - 14} textAnchor="middle" fill="rgba(255,255,255,0.65)"
                    fontSize="14" letterSpacing="2" fontFamily="var(--font-mono), monospace">{name}</text>
                </g>
              ))}

              {/* Хабы */}
              <g className="route-motion">
                <circle cx="150" cy="250" r="6" fill="var(--brand-bright)">
                  <animate attributeName="r" values="6;26" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="540" cy="210" r="6" fill="var(--brand-bright)">
                  <animate attributeName="r" values="6;26" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                </circle>
                <circle r="13" fill="var(--brand-bright)" opacity="0.35">
                  <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} />
                </circle>
                <circle r="6" fill="#fff">
                  <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} />
                </circle>
              </g>
              <circle cx="150" cy="250" r="6" fill="var(--brand-bright)" />
              <circle cx="540" cy="210" r="6" fill="var(--brand-bright)" />
              <text x="150" y="286" textAnchor="middle" fill="rgba(255,255,255,0.85)"
                fontSize="20" letterSpacing="4" fontFamily="var(--font-mono), monospace">ВЕНА</text>
              <text x="150" y="306" textAnchor="middle" fill="rgba(255,255,255,0.45)"
                fontSize="13" letterSpacing="2" fontFamily="var(--font-mono), monospace">14 ВУЗОВ</text>
              <text x="540" y="172" textAnchor="middle" fill="rgba(255,255,255,0.85)"
                fontSize="20" letterSpacing="4" fontFamily="var(--font-mono), monospace">БУДАПЕШТ</text>
              <text x="540" y="192" textAnchor="middle" fill="rgba(255,255,255,0.45)"
                fontSize="13" letterSpacing="2" fontFamily="var(--font-mono), monospace">14 ВУЗОВ</text>

              {/* Компас */}
              <g transform="translate(752,52)" opacity="0.7">
                <circle r="20" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <path d="M 0,9 L 0,-9 M -5,-3 L 0,-9 L 5,-3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" />
                <text y="-26" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12"
                  fontFamily="var(--font-mono), monospace">N</text>
              </g>

              {/* Масштаб */}
              <g transform="translate(40,384)" opacity="0.6">
                <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <line x1="60" y1="-5" x2="60" y2="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <line x1="120" y1="-5" x2="120" y2="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <text x="0" y="-10" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--font-mono), monospace">0</text>
                <text x="52" y="-10" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--font-mono), monospace">120</text>
                <text x="96" y="-10" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="var(--font-mono), monospace">240 км</text>
              </g>

              {/* Легенда */}
              <g transform="translate(620,384)" opacity="0.8">
                <line x1="0" y1="0" x2="28" y2="0" stroke="var(--brand-bright)" strokeWidth="3" strokeLinecap="round" />
                <text x="36" y="4" fill="rgba(255,255,255,0.6)" fontSize="12" letterSpacing="1" fontFamily="var(--font-mono), monospace">маршрут</text>
                <circle cx="128" cy="0" r="3.5" fill="rgba(255,255,255,0.5)" />
                <text x="138" y="4" fill="rgba(255,255,255,0.6)" fontSize="12" letterSpacing="1" fontFamily="var(--font-mono), monospace">город</text>
              </g>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
