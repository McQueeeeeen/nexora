"use client";
import { usePathname } from "next/navigation";
import { heroPhrases } from "../app/data";
import { useScrollProgress, Btn } from "./ui";

// Hero как у эталона: высокий регион + залипший фулскрин. Фразы непрерывно
// кроссфейдятся скроллом с вертикальным дрейфом, фон меняется под каждую
// фразу (скруб, как видео у эталона). В DOM один h1 — активная фраза.
const pos = [
  "top:14%;left:5%;text-align:left;max-width:min(720px,90vw)",
  "top:13%;left:5%;text-align:left;max-width:min(900px,66vw)",
  "bottom:12%;left:50%;text-align:center;max-width:min(1000px,92vw)",
] as const;

const CENTERED = 2; // фраза по центру (нужен translateX(-50%))

function css(s: string): React.CSSProperties {
  const o: Record<string, string> = {};
  s.split(";").forEach((kv) => {
    const i = kv.indexOf(":");
    if (i > 0) {
      const key = kv.slice(0, i).trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      o[key] = kv.slice(i + 1).trim();
    }
  });
  return o as React.CSSProperties;
}

export default function Hero() {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  const pre = usePathname() === "/" ? "" : "/";
  const n = heroPhrases.length;
  const x = p * Math.max(1, n - 1); // 0..n-1, центры фраз в целых точках
  const active = Math.min(n - 1, Math.round(x));

  return (
    <div ref={ref} data-hero-region className="relative w-full" style={{ height: "320vh" }}>
      <section className="sticky top-0 h-screen w-full overflow-hidden">
        {heroPhrases.map((ph, i) => {
          const d = x - i;
          const opacity = Math.max(0, Math.min(1, 1 - Math.abs(d)));
          return (
            <img
              key={ph.img}
              src={ph.img}
              alt=""
              aria-hidden
              fetchPriority={i === 0 ? "high" : undefined}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: opacity < 0.01 ? 0 : opacity,
                transform: `scale(${1 + p * 0.12})`,
                willChange: "opacity,transform",
              }}
            />
          );
        })}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
        <div className="pointer-events-none absolute inset-0 px-6 lg:px-12">
          {heroPhrases.map((ph, i) => {
            const d = x - i; // <0 — фраза ещё впереди, >0 — уже ушла
            const opacity = Math.max(0, Math.min(1, 1 - Math.abs(d)));
            const drift = -d * 44; // входящая снизу (+), уходящая вверх (−)
            const transform = `${i === CENTERED ? "translateX(-50%) " : ""}translateY(${drift.toFixed(1)}px)`;
            const Tag = i === active ? "h1" : "div";
            return (
              <Tag
                key={ph.t}
                data-hero-phrase
                aria-hidden={i === active ? undefined : true}
                className="font-normal text-white"
                style={{
                  position: "absolute",
                  fontSize: "clamp(29px,6.2vw,76px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.6)",
                  opacity: opacity < 0.01 ? 0 : opacity,
                  transform,
                  willChange: "opacity,transform",
                  ...css(pos[i]),
                }}
              >
                {ph.t}
              </Tag>
            );
          })}
        </div>
        <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-12">
          <div className="tv5-fade mx-auto flex w-full max-w-[1408px] flex-wrap items-center gap-4" style={{ animationDelay: "1.5s" }}>
            <span className="mr-auto hidden font-mono text-xs uppercase tracking-[2px] text-white/70 sm:inline">Приёмная кампания 2026/2027</span>
            <Btn href={`${pre}#contact`} className="h-14 rounded-xl px-8 text-base">Получить стратегию поступления</Btn>
            <Btn href="/austria" ghost className="h-14 rounded-xl px-8 text-base">Страны и вузы</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
