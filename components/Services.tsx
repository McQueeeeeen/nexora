"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { services } from "../app/data";
import { onRafScroll } from "./ui";
import SafeImage from "./SafeImage";

// Направления — дословный sticky-steps эталона: список с гэпом 30dvh,
// залипшее медиа справа, статус active через observer, посимвольная заливка h2.
// Ноль ре-рендеров React при скролле.
export default function Services() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-sticky-steps-item]") ?? []);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(items.indexOf(e.target as HTMLElement))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((el) => io.observe(el));

    const charGroups = items.map((item) => Array.from(item.querySelectorAll<HTMLElement>(".sticky-steps__char")));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      charGroups.forEach((group) => {
        group.forEach((c) => {
          c.style.color = "#2A211D";
          c.style.textShadow = "none";
        });
      });
      return () => io.disconnect();
    }

    const unsub = onRafScroll(() => {
      const vh = window.innerHeight;
      items.forEach((item, i) => {
        const chars = charGroups[i];
        if (!chars || !chars.length) return;
        const r = item.getBoundingClientRect();

        if (r.bottom < 0) {
          chars.forEach((c) => {
            if (c.style.color !== "#2A211D") c.style.color = "#2A211D";
            if (c.style.textShadow !== "none") c.style.textShadow = "none";
          });
          return;
        }
        if (r.top > vh) {
          chars.forEach((c) => {
            if (c.style.color !== "") c.style.color = "";
            if (c.style.textShadow !== "none") c.style.textShadow = "none";
          });
          return;
        }

        const p = Math.max(0, Math.min(1, 1 - (r.top - vh * 0.15) / (vh * 0.6)));
        const total = chars.length;
        for (let idx = 0; idx < total; idx++) {
          const t = idx / total;
          const filled = t < p;
          const frontier = !filled && p - t < 0.07;
          const col = filled ? "#2A211D" : frontier ? "var(--accent)" : "";
          const shadow = frontier ? "0 0 20px var(--accent-glow)" : "none";
          const el = chars[idx];
          if (el.style.color !== col) el.style.color = col;
          if (el.style.textShadow !== shadow) el.style.textShadow = shadow;
        }
      });
    });

    return () => {
      io.disconnect();
      unsub();
    };
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
                      const words = s.title.split(" ");
                      return words.map((word, w) => (
                        <Fragment key={w}>
                          <span className="sticky-steps__word">
                            {word.split("").map((ch, c) => (
                              <span key={c} className="sticky-steps__char">
                                {ch}
                              </span>
                            ))}
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
