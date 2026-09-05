"use client";
import { useEffect, useRef, useState } from "react";

// Общий контейнер — класс .wrap из globals.css (чистый CSS, не зависит от сканера).
export const wrap = "wrap";
// Акценты палитры: Y — для светлых поверхностей, YB — яркий для тёмных.
export const Y = "var(--brand)";
export const YB = "var(--brand-bright)";

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

/** Сглаженный прогресс (аналог scrub:.4 у эталона — догоняющее отставание). */
export function useSmoothScrollProgress<T extends HTMLElement>(factor = 0.2) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    let cur = 0;
    const compute = () => {
      if (!ref.current) return 0;
      const r = ref.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / total));
    };
    const tick = () => {
      raf = 0;
      const t = compute();
      const next = cur + (t - cur) * factor;
      const v = Math.abs(t - next) < 0.0004 ? t : next;
      if (v !== cur) {
        cur = v;
        setP(v);
      }
      if (v !== t) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor]);
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

export function Tag({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span className={`font-mono text-xs uppercase tracking-[2px] ${dark ? "text-white/60" : "text-[#5B6470]"}`}>{children}</span>
  );
}

// SVG-стрелки как у эталона (текстовые →/↗ выглядят ИИшно).
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function ExtIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className={className} aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// Рейтинг-звёзды и галочка — SVG, а не текстовые символы.
export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-1 ${className}`} role="img" aria-label="5 из 5 звёзд">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
          <path d="M12 2.5l2.92 6.14 6.58.72-4.9 4.47 1.36 6.47L12 17.05l-5.96 3.25 1.36-6.47-4.9-4.47 6.58-.72L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" strokeOpacity={0.35} />
      <path d="m8 12.5 2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Btn({ href, children, ghost = false, outline = false, className = "", style }: {
  href: string; children: React.ReactNode; ghost?: boolean; outline?: boolean; className?: string; style?: React.CSSProperties;
}) {
  const kind = outline ? "mp5-btn--outline" : ghost ? "mp5-btn--secondary" : "mp5-btn--primary";
  const mref = useRef<HTMLAnchorElement>(null);
  // Магнит: кнопка слегка тянется за курсором (без ре-рендеров, напрямую в style).
  const onMove = (e: React.MouseEvent) => {
    const el = mref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x * 0.12).toFixed(1)}px, ${(y * 0.18).toFixed(1)}px)`;
  };
  const reset = () => { if (mref.current) mref.current.style.transform = ""; };
  return (
    <a ref={mref} href={href} onMouseMove={onMove} onMouseLeave={reset}
      className={`mp5-btn ${kind} ${className}`} style={style}>
      {children}
    </a>
  );
}
