"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, services, uniLinks } from "../app/data";
import { ArrowIcon } from "./ui";

type Panel = "services" | "unis" | null;

const features = {
  services: { label: "Все программы", img: services[0].img },
  unis: { label: "Все 28 вузов", img: services[1].img },
};

const parents: Record<Exclude<Panel, null>, string> = {
  services: "Направления",
  unis: "База вузов",
};

// Ролловер как у эталона.
function Roll({ text }: { text: string }) {
  return (
    <span className="swap-label">
      <span className="swap-label__inner">
        <span className="swap-label__txt">{text}</span>
        <span className="swap-label__txt" aria-hidden>{text}</span>
      </span>
    </span>
  );
}

// Буквы прыгают при ховере, как panel-link-char у эталона.
function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} className="mega-nav__panel-link-char" style={{ transitionDelay: `${Math.min(i, 9) * 18}ms` }}>
          {c === " " ? " " : c}
        </span>
      ))}
    </>
  );
}

function PanelLink({ title, desc, href, onGo }: { title: string; desc: string; href: string; onGo?: () => void }) {
  return (
    <a href={href} onClick={onGo} className="mega-nav__panel-link">
      <span className="mega-nav__panel-link-body">
        <span className="mega-nav__panel-link-text"><Chars text={title} /></span>
        <span className="mega-nav__panel-link-desc">{desc}</span>
      </span>
      <svg className="mega-nav__panel-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    </a>
  );
}

interface DropLink { title: string; desc: string; href: string }

function Panel({ feature, links, onGo }: { feature: { label: string; href: string; img: string }; links: DropLink[]; onGo?: () => void }) {
  return (
    <div className="mega-nav__dropdown-inner">
      <a href={feature.href} onClick={onGo} className="mega-nav__panel-feature" aria-label={feature.label}>
        <img src={feature.img} alt={feature.label} loading="lazy" className="mega-nav__panel-feature-img" />
        <div className="mega-nav__panel-feature-overlay">
          <span className="mega-nav__panel-feature-label">{feature.label}</span>
          <span className="mega-nav__panel-feature-cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>
      </a>
      <div className="mega-nav__panel-grid">
        <span className="mega-nav__panel-grid-label">Куда дальше</span>
        {links.map((l) => <PanelLink key={l.title} {...l} onGo={onGo} />)}
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState<Panel>(null); // десктоп-dropdown
  const [mobile, setMobile] = useState(false); // мобильное меню
  const [view, setView] = useState<Panel>(null); // drill-down панель на мобильном

  // На главной якоря скроллят, на подстраницах ведут домой.
  const pre = usePathname() === "/" ? "" : "/";
  const svcHref = `${pre}#services`;
  const contactHref = `${pre}#contact`;
  const panels: Record<Exclude<Panel, null>, { feature: { label: string; href: string; img: string }; links: DropLink[] }> = {
    services: {
      feature: { ...features.services, href: svcHref },
      links: services.map((s) => ({ title: s.title, desc: s.desc, href: svcHref })),
    },
    unis: {
      feature: { ...features.unis, href: "/austria" },
      links: uniLinks,
    },
  };
  const anchors = nav
    .filter(([, href]) => href !== "#services" && href !== "#database")
    .map(([t, href]) => [t, `${pre}${href}`] as const);

  const closeMobile = () => { setMobile(false); setView(null); };

  // Прячем шапку при скролле вниз, показываем при скролле вверх —
  // дословно логика эталона (в hero-зоне всегда видна).
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let prev = window.scrollY;
    let acc = 0;
    const show = (v: boolean) => setHidden(!v);
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.querySelector("[data-hero-region]") as HTMLElement | null;
      if (hero && y <= hero.offsetTop + hero.offsetHeight - window.innerHeight) {
        acc = 0; show(true); prev = y; return;
      }
      if (y <= 32) { acc = 0; show(true); }
      else if (y > prev) { acc = 0; show(false); }
      else { acc += prev - y; if (acc >= 80) show(true); }
      prev = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = !hidden || open !== null || mobile;

  // Закрытие с задержкой: курсор успевает дойти от кнопки до панели через мост.
  const timer = useRef(0);
  const poke = (k: Panel) => { window.clearTimeout(timer.current); setOpen(k); };
  const scheduleClose = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(null), 140);
  };

  return (
    <nav ref={navRef} className="mega-nav" data-mp5-mobile-open={mobile}
      style={{
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? undefined : "none",
      }}>
      <div className="mega-nav__bar" onMouseLeave={scheduleClose}>
        <div className="mega-nav__container">
          <a href="/" className="text-xl font-bold tracking-tight text-[#101418]">NEXORA<span style={{ color: "var(--brand)" }}>.</span></a>
          <div className="mega-nav__desktop-links ml-auto items-center gap-8">
            {(Object.keys(parents) as Exclude<Panel, null>[]).map((k) => (
              <button
                key={k}
                onMouseEnter={() => poke(k)}
                onClick={() => setOpen(open === k ? null : k)}
                aria-expanded={open === k}
                aria-haspopup="true"
                className="mega-nav__bar-link is--dropdown text-sm font-medium"
              >
                <Roll text={parents[k]} />
                <svg className="mega-nav__bar-link-icon is--dropdown" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M6.6665 8.3335L9.99984 11.6668L13.3332 8.3335" />
                </svg>
              </button>
            ))}
            {anchors.map(([t, href]) => (
              <a key={t} href={href} onMouseEnter={() => poke(null)} className="mega-nav__bar-link text-sm font-medium"><Roll text={t} /></a>
            ))}
            <a href="https://t.me/nexora_support" target="_blank" rel="noopener" className="hidden text-sm font-semibold text-[#101418]/80 transition hover:text-[var(--brand)] xl:inline">
              @nexora_support
            </a>
            <a href={contactHref} className="mp5-btn mp5-btn--primary rounded px-4 py-2 text-sm">Бесплатный аудит</a>
          </div>
          <button className="mega-nav__burger ml-auto" onClick={() => (mobile ? closeMobile() : setMobile(true))} aria-label="Меню" aria-expanded={mobile}>
            <span className="mega-nav__burger-line" data-burger-line="top" />
            <span className="mega-nav__burger-line" data-burger-line="bot" />
          </button>
        </div>

        {/* Десктоп-dropdown: панели лежат стопкой, видна активная */}
        <div className={`mega-nav__dropdown ${open ? "is--open" : ""}`} aria-hidden={!open}
          onMouseEnter={() => window.clearTimeout(timer.current)} onMouseLeave={scheduleClose}>
          {(Object.keys(parents) as Exclude<Panel, null>[]).map((k) => (
            <div key={k} data-panel-state={open === k ? "active" : ""} className="mega-nav__dropdown-panel">
              <Panel {...panels[k]} />
            </div>
          ))}
        </div>

        {/* Мобильное drill-down: меню → панель → Back */}
        {mobile && (
          <div className="mega-nav__mobile-panel flex-col gap-1 px-5 pb-5">
            {view === null ? (
              <>
                {(Object.keys(parents) as Exclude<Panel, null>[]).map((k) => (
                  <button key={k} onClick={() => setView(k)} className="flex w-full items-center justify-between border-b border-[#101418]/10 py-3 text-left text-lg font-medium text-[#101418]">
                    {parents[k]}<ArrowIcon className="h-5 w-5 text-[#101418]/50" />
                  </button>
                ))}
                {anchors.map(([t, href]) => (
                  <a key={t} href={href} onClick={closeMobile} className="border-b border-[#101418]/10 py-3 text-lg font-medium text-[#101418]">{t}</a>
                ))}
                <a href={contactHref} onClick={closeMobile} className="mp5-btn mp5-btn--primary mt-3 h-14 rounded-xl">Бесплатный аудит</a>
              </>
            ) : (
              <>
                <button onClick={() => setView(null)} aria-label="Назад в меню" className="flex items-center gap-2 py-3 text-base font-medium text-[#101418]/70">
                  <ArrowIcon className="h-4 w-4 rotate-180" />Назад
                </button>
                <Panel {...panels[view]} onGo={closeMobile} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
