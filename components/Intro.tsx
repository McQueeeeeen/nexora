"use client";
import { useEffect, useState } from "react";

// Интро и переходы как у эталона: лоадер (вайп логотипа + полоса) →
// жёлтая... мятная шторка из 5 колонок съезжает вверх каскадом.
// При кликах по внутренним ссылкам шторка накрывает, на новой
// странице — быстро открывается. Раз в сессию — полное интро.
type Phase = "load" | "wipe" | "reveal" | "cover" | "done";

export default function Intro() {
  const [phase, setPhase] = useState<Phase>("load");
  const [bar, setBar] = useState(0);
  const [lift, setLift] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("preloaded");
      setPhase("done");
      return;
    }
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("nexora_preloaded");
      sessionStorage.setItem("nexora_preloaded", "1");
    } catch { /* приватный режим — показываем как обычно */ }
    if (seen) {
      // Повторный заход: быстрое открытие шторки вместо полного интро.
      document.documentElement.classList.add("preloaded");
      setPhase("reveal");
      requestAnimationFrame(() => requestAnimationFrame(() => setLift(true)));
      const t = setTimeout(() => setPhase("done"), 900);
      return () => clearTimeout(t);
    }
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

  // Переход шторкой по внутренним ссылкам (якоря, tel/mailto/blank — мимо).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || a.target === "_blank" || a.hasAttribute("download")) return;
      let url: URL;
      try { url = new URL(href, window.location.href); } catch { return; }
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      setLift(false);
      setDrop(false);
      setPhase("cover");
      requestAnimationFrame(() => requestAnimationFrame(() => setDrop(true)));
      setTimeout(() => { window.location.href = url.href; }, 950);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (phase === "done") return null;
  const logo = <>NEXORA<span style={{ color: "var(--brand)" }}>.</span></>;
  const cols = [0, 1, 2, 3, 4].map((i) => (
    <div
      key={i}
      className="relative h-full"
      style={{
        flex: "1 0 0%",
        backgroundColor: "var(--brand)",
        boxShadow: "0 0 0 1px var(--brand)",
        willChange: "transform",
        transform:
          phase === "cover"
            ? drop ? "translateY(0)" : "translateY(-100%)"
            : lift ? "translateY(-100%)" : "translateY(0)",
        transition: "transform .7s cubic-bezier(.65,0,.35,1)",
        transitionDelay: `${i * 60}ms`,
      }}
    />
  ));

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
      {phase !== "load" && (
        <div aria-hidden className="pointer-events-none fixed inset-0 overflow-clip" style={{ zIndex: 9999 }}>
          <div className="absolute inset-0 flex">{cols}</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold tracking-tight text-[#101418] sm:text-4xl">
              NEXORA<span className="text-white">.</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
