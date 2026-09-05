"use client";
import { useEffect, useState } from "react";

// Интро как у эталона: лоадер (вайп логотипа + полоса) → жёлтая шторка
// из 5 колонок съезжает вверх каскадом, открывая hero-текст.
export default function Intro() {
  const [phase, setPhase] = useState<"load" | "wipe" | "done">("load");
  const [bar, setBar] = useState(0);
  const [lift, setLift] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("preloaded");
      setPhase("done");
      return;
    }
    // Как у эталона: интро один раз за сессию.
    try {
      if (sessionStorage.getItem("nexora_preloaded")) {
        document.documentElement.classList.add("preloaded");
        setPhase("done");
        return;
      }
      sessionStorage.setItem("nexora_preloaded", "1");
    } catch { /* приватный режим — показываем как обычно */ }
    let v = 0;
    const t = setInterval(() => {
      v = Math.min(1, v + 0.14 + Math.random() * 0.12);
      setBar(v);
      if (v >= 1) {
        clearInterval(t);
        setTimeout(() => {
          document.documentElement.classList.add("preloaded");
          setPhase("wipe");
          requestAnimationFrame(() => requestAnimationFrame(() => setLift(true)));
          setTimeout(() => setPhase("done"), 1400);
        }, 200);
      }
    }, 70);
    return () => clearInterval(t);
  }, []);

  if (phase === "done") return null;
  const logo = <>NEXORA<span style={{ color: "#FFE533" }}>.</span></>;

  return (
    <>
      {phase === "load" && (
        <div data-load-wrap className="loader" aria-hidden>
          <div className="loader__bg" />
          <div className="loader__container">
            <div className="loader__logo" style={{ position: "relative", whiteSpace: "nowrap" }}>
              <span style={{ opacity: 0.18 }}>{logo}</span>
              <span aria-hidden style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${(1 - bar) * 100}% 0 0)` }}>{logo}</span>
            </div>
            <div className="loader__text">Загружаем кампусы…</div>
          </div>
          <div className="loader__bar" style={{ transform: `scaleX(${bar})` }} />
        </div>
      )}
      {phase === "wipe" && (
        <div aria-hidden className="pointer-events-none fixed inset-0 overflow-clip" style={{ zIndex: 9999 }}>
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative h-full"
                style={{
                  flex: "1 0 0%",
                  backgroundColor: "#FFE533",
                  boxShadow: "0 0 0 1px #FFE533",
                  willChange: "transform",
                  transform: lift ? "translateY(-100%)" : "translateY(0)",
                  transition: "transform .9s cubic-bezier(.65,0,.35,1)",
                  transitionDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
