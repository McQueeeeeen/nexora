"use client";
import { useEffect, useState } from "react";
import { onRafScroll } from "./ui";

// Мобильная CTA-панель: выезжает только после hero — дословно формула эталона.
export default function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => onRafScroll(() => {
    const hero = document.querySelector("[data-hero-region]") as HTMLElement | null;
    const limit = hero
      ? hero.offsetTop + hero.offsetHeight - window.innerHeight
      : Math.max(0.8 * window.innerHeight, 600);
    setShow((prev) => {
      const v = window.scrollY > limit;
      return prev === v ? prev : v;
    });
  }), []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-6 transition-transform duration-300 ease-out lg:hidden"
      aria-hidden={!show}
      style={{
        transform: show ? "translateY(0)" : "translateY(100%)",
        pointerEvents: show ? "auto" : "none",
        background: "linear-gradient(to top, #F7F5EFf2, transparent)",
      }}>
      <div className="flex gap-2">
        <a href="https://t.me/nexora_support" target="_blank" rel="noopener"
          className="flex h-12 flex-1 items-center justify-center rounded-xl border border-[#101418]/15 bg-white/85 text-sm font-semibold text-[#101418] backdrop-blur-md">
          Telegram
        </a>
        <a href="#contact" className="mp5-btn mp5-btn--primary h-12 flex-1 rounded-xl text-sm">
          Консультация €10
        </a>
      </div>
    </div>
  );
}
