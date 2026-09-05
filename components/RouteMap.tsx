import { wrap, Tag, Reveal } from "./ui";

const D = "M 110,300 C 250,280 300,140 450,150 C 600,160 620,220 700,190";

// Тёмная карта Вена → Будапешт: сетка, рисующаяся линия, бегущая точка,
// пульсы на концах. Чистый SVG+CSS/SMIL, без JS и библиотек.
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
            <svg viewBox="0 0 800 420" className="block h-auto w-full" role="img" aria-label="Маршрут Вена — Будапешт">
              <defs>
                <pattern id="rm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="800" height="420" fill="url(#rm-grid)" />
              <path d={D} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
              <path d={D} fill="none" stroke="var(--brand-bright)" strokeWidth="3" strokeLinecap="round"
                pathLength={100} className="route-draw route-glow" />
              <g className="route-motion">
                <circle cx="110" cy="300" r="6" fill="var(--brand-bright)">
                  <animate attributeName="r" values="6;26" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="700" cy="190" r="6" fill="var(--brand-bright)">
                  <animate attributeName="r" values="6;26" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                </circle>
                <circle r="13" fill="var(--brand-bright)" opacity="0.35">
                  <animateMotion dur="7s" repeatCount="indefinite" path={D} />
                </circle>
                <circle r="6" fill="#fff">
                  <animateMotion dur="7s" repeatCount="indefinite" path={D} />
                </circle>
              </g>
              <circle cx="110" cy="300" r="6" fill="var(--brand-bright)" />
              <circle cx="700" cy="190" r="6" fill="var(--brand-bright)" />
              <text x="110" y="340" textAnchor="middle" fill="rgba(255,255,255,0.7)"
                fontSize="20" letterSpacing="4" fontFamily="var(--font-mono), monospace">ВЕНА</text>
              <text x="700" y="230" textAnchor="middle" fill="rgba(255,255,255,0.7)"
                fontSize="20" letterSpacing="4" fontFamily="var(--font-mono), monospace">БУДАПЕШТ</text>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
