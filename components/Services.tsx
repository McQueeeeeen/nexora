"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { services } from "../app/data";
import SafeImage from "./SafeImage";

// Направления — дословный sticky-steps эталона: список с гэпом 30dvh,
// залипшее медиа справа, статус active через observer, посимвольная заливка h2.
export default function Services() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState<number[]>(services.map(() => 0));

  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll("[data-sticky-steps-item]") ?? []);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(items.indexOf(e.target as HTMLElement))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((el) => io.observe(el));

    // Замер через rAF — один пересчёт на кадр, плавно.
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setFill((prev) => {
          const next = items.map((el) => {
            const r = (el as HTMLElement).getBoundingClientRect();
            const p = 1 - Math.max(0, Math.min(1, (r.top - window.innerHeight * 0.15) / (window.innerHeight * 0.6)));
            return Math.round(Math.max(0, Math.min(1, p)) * 100) / 100;
          });
          return next.every((v, j) => v === prev[j]) ? prev : next;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="sticky-steps" id="services">
      <div className="sticky-steps__container">
        <div className="sticky-steps__collection" data-sticky-steps-init>
          <div className="sticky-steps__list" ref={listRef}>
            {services.map((s, i) => (
              <div
                key={s.title}
                data-sticky-steps-item
                data-sticky-steps-item-status={i === active ? "active" : "after"}
                className="sticky-steps__item"
              >
                <div data-sticky-steps-anchor className="sticky-steps__text">
                  <span className="sticky-steps__eyebrow">{s.no}</span>
                  <h2 data-step-h2 className="sticky-steps__h2">
                    {(() => {
                      let gi = 0; // сквозной индекс символа для порога заливки
                      const total = s.title.length;
                      const words = s.title.split(" ");
                      return words.map((word, w) => (
                        <Fragment key={w}>
                          <span className="sticky-steps__word">
                            {word.split("").map((ch, c) => {
                              const idx = gi++;
                              const t = idx / total;
                              // Фронт заливки подсвечен брендом со свечением — единый эталон.
                              const filled = t < fill[i];
                              const frontier = !filled && fill[i] - t < 0.07;
                              return (
                                <span
                                  key={c}
                                  className="sticky-steps__char"
                                  style={{
                                    color: filled ? "#000" : frontier ? "var(--brand)" : undefined,
                                    textShadow: frontier ? "0 0 18px rgba(11,138,118,0.45)" : "none",
                                  }}
                                >
                                  {ch}
                                </span>
                              );
                            })}
                          </span>
                          {w < words.length - 1 ? " " : null}
                        </Fragment>
                      ));
                    })()}
                  </h2>
                  <p className="sticky-steps__p">{s.text}</p>
                </div>
                <div className="sticky-steps__media">
                  <div className="sticky-steps__sticky">
                    <div className="sticky-steps__visual">
                      <SafeImage src={s.img} alt={s.title} className="sticky-steps__cover-image" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
