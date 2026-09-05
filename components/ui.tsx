"use client";
import { useEffect, useRef, useState } from "react";

// Общий контейнер — класс .wrap из globals.css (чистый CSS, не зависит от сканера).
export const wrap = "wrap";
export const Y = "#FFE533";

/** Скролл через rAF: один пересчёт на кадр, без дерганий. */
export function onRafScroll(fn: () => void) {
  let raf = 0;
  const loop = () => { raf = 0; fn(); };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(loop); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
}

/** Прогресс 0..1 прохождения высокого блока (пин-эффекты эталона). */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => onRafScroll(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    setP(total <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / total)));
  }), []);
  return [ref, p] as const;
}

/** Прогресс входа обычной секции во вьюпорт: 0 — нижний край коснулся низа экрана, 1 — секция дошла до верха. */
export function useViewportProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [v, setV] = useState(0);
  useEffect(() => onRafScroll(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setV(Math.max(0, Math.min(1, (window.innerHeight - r.top) / window.innerHeight)));
  }), []);
  return [ref, v] as const;
}

/** Появление при входе в вьюпорт (tv5-fade эталона). */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`${seen ? "tv5-fade" : "opacity-0"} ${className}`}>{children}</div>;
}

export function Tag({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: Y }} />
      <span className="font-mono text-xs uppercase tracking-[2px] text-white/60">{children}</span>
    </div>
  );
}

export function Btn({ href, children, ghost = false, className = "", style }: {
  href: string; children: React.ReactNode; ghost?: boolean; className?: string; style?: React.CSSProperties;
}) {
  return (
    <a href={href} className={`mp5-btn ${ghost ? "mp5-btn--secondary" : "mp5-btn--primary"} ${className}`} style={style}>
      {children}
    </a>
  );
}
